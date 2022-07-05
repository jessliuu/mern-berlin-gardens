import express from "express";
import cors from "cors";
import gardensRoute from "./routes/gardensRoute.js";
import usersRoute from "./routes/usersRoute.js";
import commentsRoute from "./routes/commentsRoute.js";
import * as dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import { cloudinaryConfig } from "./config/cloudinaryConfig.js";
import passport from "passport";
import passportConfig from "./config/passportConfig.js";

// 0. Define app and port
const app = express();
const port = process.env.PORT || 5001;

// 1. Start server
const startServer = () => {
  app.listen(port, () => {
    console.log("Server is running on port " + port);
  });
};
// 2. Load routes
const loadRoutes = () => {
  app.use("/api/garden", gardensRoute);
  app.use("/api/comment", commentsRoute);
  app.use("/api/user", usersRoute);
};
// 3. Add middleware
const addMiddleware = () => {
  app.use(express.json());
  app.use(
    express.urlencoded({
      extended: true,
    })
  );
  app.use(cors());
  cloudinaryConfig();
  app.use(passport.initialize());
  passportConfig(passport);
};
// 4. Connect to Mongodb
const connectToMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connection to Mongo DB established");
  } catch (error) {
    console.log("Error connecting to Mongo DB", error);
  }
};
// 5a. Add all functions in reverse order to Controller Function
// const serverController = async () => {
//   connectToMongoDB();
//   addMiddleware();
//   loadRoutes();
//   startServer();
// };
// serverController()

// 5b. Add all functions in reverse order to async immediately invoked function
(async () => {
  await connectToMongoDB();
  addMiddleware();
  loadRoutes();
  startServer();
})();
