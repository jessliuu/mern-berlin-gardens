import jsonwebtoken from "jsonwebtoken";
import * as dotenv from "dotenv";
dotenv.config();

const issueToken = (uniqueid) => {
  const payload = {
    sub: uniqueid,
    iss: "caberlin",
  };

  const signOptions = {
    expiresIn: "1 day",
  };

  const jwt = jsonwebtoken.sign(
    payload,
    process.env.SECRET_OR_KEY,
    signOptions
  );

  return jwt;
};

export { issueToken };
