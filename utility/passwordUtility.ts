import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { APP_SECRET } from "../config";
import { Request } from "express";
import { AuthPayload } from "../dto/auth.dto";

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

export const generateToken = (payload: AuthPayload) => {
  return jwt.sign(payload, APP_SECRET, { expiresIn: "1d" });
};

export const validateToken = async (req: Request) => {
  const token = req.get("Authorization");

  if (token) {
    const payload = await jwt.verify(token?.split(" ")[1], APP_SECRET) as AuthPayload;
    req.user = payload;
    return true;
  }

  return false;
};
