import usersModel from "../models/usersModel.js";
import { v2 as cloudinary } from "cloudinary";
import encryptPassword from "../utils/encryptPassword.js";

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

export { getOneUser, uploadUserPicture, signUp };
