import usersModel from "../models/usersModel.js";
import gardensModel from "../models/gardensModel.js";
import { v2 as cloudinary } from "cloudinary";
import { encryptPassword, verifyPassword } from "../utils/bcrypt.js";
import { issueToken } from "../utils/jwt.js";

const addGarden = async (req, res) => {
  const newGarden = new gardensModel({
    farmName: req.body.farmName,
    hostName: req.body.hostName,
    availableOn: req.body.availableOn,
    description: req.body.description,
    groupSize: req.body.groupSize,
    task: req.body.task,
    neighborhood: req.body.neighborhood,
    experienceRequired: req.body.experienceRequired,
    childrenWelcome: req.body.childrenWelcome,
  });
  try {
    const savedGarden = await newGarden.save();
    res.status(201).json({
      farmName: savedGarden.farmName,
      hostName: savedGarden.hostName,
      availableOn: savedGarden.availableOn,
      description: savedGarden.description,
      groupSize: savedGarden.groupSize,
      task: savedGarden.task,
      neighborhood: savedGarden.neighborhood,
      experienceRequired: savedGarden.experienceRequired,
      childrenWelcome: savedGarden.childrenWelcome,
      message: "garden successfully added",
    });
  } catch (error) {
    res.status(409).json({
      message: "error with adding garden",
      error: error,
    });
  }
};

const getProfile = (req, res) => {
  console.log("backend get profile displaying req.user", req.user);
  res.status(200).json({
    name: req.user.name,
    email: req.user.email,
    picture: req.user.picture,
    role: req.user.role,
  });
};

const logIn = async (req, res) => {
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
      res.status(409).json({ message: "user already exists" });
    } else {
      const hashedPassword = await encryptPassword(req.body.password);
      console.log("hashedPassword:", hashedPassword);
      const newUser = new usersModel({
        email: req.body.email,
        password: hashedPassword,
        name: req.body.name,
        role: req.body.role,
        picture: req.body.picture,
      });
      try {
        const savedUser = await newUser.save();
        res.status(201).json({
          email: savedUser.email,
          name: savedUser.name,
          role: savedUser.role,
          picture: savedUser.picture,
          message: "user successfully registered",
        });
      } catch (error) {
        res.status(409).json({
          message: "error with saving user",
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
    res.status(200).json({
      message: "image succesfully uploaded",
      imageUrL: uploadResult.url,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "image couldn't be uploaded", error: error });
  }
};

export { getOneUser, uploadUserPicture, signUp, logIn, getProfile, addGarden };
