import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt";
import * as dotenv from "dotenv";
import usersModel from "../models/usersModel.js";
dotenv.config();

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET_OR_KEY,
  iss: "caberlin",
};

const jwtStrategy = new JwtStrategy(jwtOptions, function (jwt_payload, done) {
  usersModel.findById(jwt_payload.sub, function (err, user) {
    if (err) {
      return done(err, false);
    }
    if (user) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  });
});

const passportConfig = (passport) => {
  passport.use(jwtStrategy);
};

export default passportConfig;
