import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { VendorPayload } from "../dto";
import { APP_SECRET } from "../config";

export const generateSalt = async () => {
  return await bcrypt.genSalt();
};

export const generatePassword = async (password: string, salt: string) => {
  return await bcrypt.hash(password, salt);
};

export const validatePassword = async (
  enteredPassword: string,
  userPassword: string,
  salt: string
) => {
  return (await generatePassword(enteredPassword, salt)) === userPassword;
};

export const generateToken = (payload: VendorPayload) => {
  return jwt.sign(payload, APP_SECRET, { expiresIn: '1d'});
};
