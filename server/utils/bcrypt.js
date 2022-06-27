import React from "react";
import bcrypt from "bcrypt";

const encryptPassword = async (password) => {
  try {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  } catch (error) {
    console.log("error hashing password", error);
  }
};

const verifyPassword = async (plain, hash) => {
  const verified = bcrypt.compare(plain, hash);
  return verified;
};

export { encryptPassword, verifyPassword };
