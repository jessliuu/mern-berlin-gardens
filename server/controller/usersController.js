import usersModel from "../models/usersModel.js";
import gardensModel from "../models/gardensModel.js";
import commentsModel from "../models/commentsModel.js";
import { v2 as cloudinary } from "cloudinary";
import { encryptPassword, verifyPassword } from "../utils/bcrypt.js";
import { issueToken } from "../utils/jwt.js";

const getProfileByUserId = async (req, res) => {
  try {
    console.log("req.user", req.user);
    const user = await usersModel
      .findOne({ _id: req.user._id })
      .populate({
        path: "gardens",
        select: ["neighborhood", "farmName", "image", "volunteers"],
        populate: { path: "volunteers", select: ["name", "email"] },
      })
      .populate({
        path: "volunteeredgardens",
        select: ["neighborhood", "farmName", "image"],
      })
      .exec();
    console.log("user", user);
    // res.status(200).json({ user });
    console.log("user.gardens", user.gardens);
    res.status(200).json({
      role: user.role,
      name: user.name,
      email: user.email,
      gardens: user.gardens,
      // foo: user.gardens.volunteers,
      volunteeredgardens: user.volunteeredgardens,
      id: user._id,
    });
  } catch (err) {
    console.log("err", err);
    res.status(400).json({
      error: err,
      message: "No user is found.",
    });
  }
  // try {
  //   const selectedGardenByUserId = await gardensModel
  //     .find({ userid: req.user._id })
  //     .exec();
  //   res.status(200).json({ selectedGardenByUserId });
  // } catch (err) {
  //   res.status(400).json({ message: "This user has not posted any garden." });
  // }
};

const addGarden = async (req, res) => {
  console.log("addGarden req.body", req.body);
  const imageURL = await uploadUserPicture(req, res);
  // to make new gardensModel shorter, use deconstructuring:
  // const {farmName, availableOn} = req.body
  // const newGarden = new gardensModel({farmName, availbleOne})
  const newGarden = new gardensModel({
    farmName: req.body.farmName,
    availableOn: req.body.availableOn,
    description: req.body.description,
    groupSize: req.body.groupSize,
    task: req.body.task,
    neighborhood: req.body.neighborhood,
    experienceRequired: req.body.experienceRequired,
    childrenWelcome: req.body.childrenWelcome,
    image: imageURL,
    userid: req.user._id,
    volunteers: [],
  });
  console.log("newGarden", newGarden);
  try {
    const savedGarden = await newGarden.save();
    console.log("savedGarden", savedGarden);

    const idToFind = req.user._id;
    const gardenid = savedGarden._id;
    let doc = await usersModel.findByIdAndUpdate(idToFind, {
      // new:true
      $push: { gardens: gardenid },
    });
    console.log("doc", doc);

    res.status(201).json({
      userid: savedGarden.userid,
      farmName: savedGarden.farmName,
      availableOn: savedGarden.availableOn,
      description: savedGarden.description,
      groupSize: savedGarden.groupSize,
      task: savedGarden.task,
      neighborhood: savedGarden.neighborhood,
      experienceRequired: savedGarden.experienceRequired,
      childrenWelcome: savedGarden.childrenWelcome,
      image: savedGarden.image,
      volunteers: savedGarden.volunteers,
      message: "garden successfully added",
    });
  } catch (error) {
    res.status(409).json({
      message: "error with adding garden",
      error: error,
    });
  }
};

const deleteGarden = async (req, res) => {
  // console.log("inside delete garden", req);
  try {
    let userdoc = await usersModel
      .findByIdAndUpdate(
        req.user._id,
        { $pull: { gardens: req.body.gardenid } },
        { new: true }
      )
      .exec();
    const commentsToDelete = await commentsModel
      .deleteMany({ gardenid: req.body.gardenid })
      .exec();
    const gardenToDelete = await gardensModel
      .findByIdAndDelete({ _id: req.body.gardenid })
      .exec();
    console.log("gardenToDelete", gardenToDelete);
    res.status(200).json({
      gardenToDelete,
      message:
        "You have successfully deleted the garden. Refresh page to view the updated list.",
    });
  } catch (error) {
    console.log("error with deleting this garden", error);
    res.status(400).json({
      error: error,
      message: "Error with deleting this garden",
    });
  }
};

const volunteerForGarden = async (req, res) => {
  const idToFind = req.user._id;
  const gardenid = req.body._id;
  const volunteerEmail = idToFind.email;
  let doc = await usersModel.findByIdAndUpdate(
    idToFind,
    {
      $push: { volunteeredgardens: gardenid },
    },
    { new: true }
  );
  let gardendoc = await gardensModel
    .findByIdAndUpdate(gardenid, {
      $push: { volunteers: idToFind },
      // $push: { volunteers: { id: idToFind, email: volunteerEmail } },
    })
    .exec();
  // console.log("volunteerforgarden doc", doc);
};

const unvolunteerForGarden = async (req, res) => {
  const idToFind = req.user._id;
  const gardenid = req.body._id;
  let userdoc = await usersModel
    .findOneAndUpdate(
      { _id: idToFind },
      { $pull: { volunteeredgardens: gardenid } }
      // { new: true }
    )
    .exec();
  let gardendoc = await gardensModel
    .findOneAndUpdate(
      { _id: gardenid },
      { $pull: { volunteers: idToFind } }
      // { new: true }
    )
    .exec();
  res.status(200).json({
    message:
      "You have successfully unsubscribed from the garden. Refresh page to view the updated list.",
  });
  console.log("unvolunteerforgarden doc", userdoc);
};

const likeGarden = async (req, res) => {
  const idToFind = req.user._id;
  const gardenid = req.body._id;
  let doc = await usersModel
    .findByIdAndUpdate(
      idToFind,
      {
        $push: { likedgardens: gardenid },
      },
      { new: true }
    )
    .exec();
  res.status(200).json({
    message: "You have successfully liked this garden.",
  });
  console.log("likedgarden doc", doc);
};

const unlikeGarden = async (req, res) => {
  const idToFind = req.user._id;
  const gardenid = req.body._id;
  let doc = await usersModel
    .findByIdAndUpdate(idToFind, {
      $pull: { likedgardens: gardenid },
    })
    .exec();
  res.status(200).json({
    message: "You have successfully un-liked this garden.",
  });
  console.log("unlikedgarden doc", doc);
};

const logIn = async (req, res) => {
  console.log("req.body", req.body);
  const existingUser = await usersModel.findOne({ email: req.body.email });
  if (!existingUser) {
    res.status(401).json({ msg: "You have to register first" });
  } else {
    const verified = await verifyPassword(
      req.body.password,
      existingUser.password
    );
    if (!verified) {
      res.status(401).json({ msg: "Incorrect password" });
    } else {
      const token = issueToken(existingUser._id);
      res.status(200).json({
        msg: "You have successfully logged in",
        user: {
          name: existingUser.name,
          email: existingUser.email,
          id: existingUser._id,
          picture: existingUser.picture,
          role: existingUser.role,
          gardens: existingUser.garden,
        },
        token,
      });
    }
  }
};
const signUp = async (req, res) => {
  try {
    console.log(req.body);
    const existingUser = await usersModel.findOne({ email: req.body.email });
    if (existingUser) {
      res.status(409).json({ message: "User already exists" });
    } else {
      const hashedPassword = await encryptPassword(req.body.password);
      console.log("hashedPassword:", hashedPassword);
      const newUser = new usersModel({
        email: req.body.email,
        password: hashedPassword,
        name: req.body.name,
        role: req.body.role,
        picture: req.body.picture,
        gardens: req.body.gardens,
      });
      try {
        const savedUser = await newUser.save();
        res.status(201).json({
          email: savedUser.email,
          name: savedUser.name,
          role: savedUser.role,
          picture: savedUser.picture,
          gardens: savedUser.gardens,
          message: "User successfully registered",
        });
      } catch (error) {
        res.status(409).json({
          message:
            "Error with registration. Please make sure all fields are filled out.",
          error: error,
        });
      }
    }
  } catch (error) {
    res.status(401).json({
      message: "error with signing up",
      error: error,
    });
  }
};

const getOneUser = async (req, res) => {
  try {
    const selectedUserByEmail = await usersModel
      .find({ email: req.params.email })
      .exec();
    res.status(200).json({ selectedUserByEmail });
  } catch (err) {
    res
      .status(400)
      .json({ message: "Unable to retrieve user by this email address" });
  }
};

const uploadUserPicture = async (req, res) => {
  console.log("req.body", req.body);
  try {
    console.log("req.file", req.file); //Multer is storing the file in that property(objec) of the request object
    const uploadResult = await cloudinary.uploader.upload(req.file.path, {
      folder: "garden-users",
    });
    console.log("result", uploadResult); //this show us the object with all the information about the upload, including the public URL in result.url
    return uploadResult.url;
    // message: "image succesfully uploaded",
    // imageUrL: uploadResult.url
  } catch (error) {
    res
      .status(500)
      .json({ message: "image couldn't be uploaded", error: error });
  }
};

export {
  getOneUser,
  uploadUserPicture,
  signUp,
  logIn,
  // getProfile,
  deleteGarden,
  addGarden,
  getProfileByUserId,
  volunteerForGarden,
  unvolunteerForGarden,
  likeGarden,
  unlikeGarden,
};
