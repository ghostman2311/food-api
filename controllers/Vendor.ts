import { Response, Request, NextFunction } from "express";
import { EditVendorInput, VendorLoginInput } from "../dto";
import { findVendor } from "./Admin";
import { generateToken, validatePassword } from "../utility";
import { CreateFoodInput } from "../dto/food.dto";
import { Food } from "../models/Food";

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

export const AddFood = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = req.user;

  if (user) {
    const { name, description, category, foodType, readyTime, price } = <
      CreateFoodInput
    >req.body;
    const vendor = await findVendor(user._id);
    if (vendor !== null) {
      const files = req.files as [Express.Multer.File]
      const images = files.map((file: Express.Multer.File) => file.filename)
      const createFood = await Food.create({
        vendorId: vendor._id,
        name,
        description,
        category,
        foodType,
        images,
        readyTime,
        price,
        rating: 0,
      });

      vendor.foods.push(createFood);
      const result = await vendor.save();
      return res.json(result);
    }
  }

  return res.json({ message: "Vendor not found" });
};

export const GetFoods = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = req.user;

  if (user) {
    const foods = await Food.findOne({ vendorId: user._id });
    if (foods !== null) {
      return res.json(foods);
    }
  }

  return res.json({ message: "Foods information not found" });
};
