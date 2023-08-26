import { Response, Request, NextFunction } from "express";
import { EditVendorInput, VendorLoginInput } from "../dto";
import { findVendor } from "./Admin";
import { generateToken, validatePassword } from "../utility";

export const VendorLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = <VendorLoginInput>req.body;

  const existingVendor = await findVendor("", email);

  if (existingVendor !== null) {
    const isValidPassword = await validatePassword(
      password,
      existingVendor.password,
      existingVendor.salt
    );

    if (isValidPassword) {
      const token = generateToken({
        _id: existingVendor._id,
        email: existingVendor.email,
        name: existingVendor.name,
        foodTypes: existingVendor.foodType,
      });
      return res.json(token);
    } else {
      return res.json({ message: "Login credentials is not valid" });
    }
  }

  return res.json({ message: "Login credentials is not valid" });
};

export const GetVendorProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = req.user;
  if (user) {
    const existingVendor = await findVendor(user._id);
    return res.json(existingVendor);
  }

  return res.json({ message: "Vendor not found" });
};

export const UpdateVendorProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, phone, address, foodTypes } = <EditVendorInput>req.body;
  const user = req.user;
  if (user) {
    const existingVendor = await findVendor(user._id);
    if (existingVendor !== null) {
      existingVendor.name = name;
      existingVendor.phone = phone;
      existingVendor.address = address;
      existingVendor.foodType = foodTypes;
      const savedResult = await existingVendor.save();
      return res.json(savedResult);
    }
  }

  return res.json({ message: "Vendor not found" });
};

export const UpdateVendorService = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = req.user;
  if (user) {
    const existingVendor = await findVendor(user._id);
    if (existingVendor !== null) {
      existingVendor.serviceAvailable = !existingVendor.serviceAvailable;
      const savedResult = await existingVendor.save();
      return res.json(savedResult);
    }
  }
  return res.json({ message: "Vendor not found" });
};
