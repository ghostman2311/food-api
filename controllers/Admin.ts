import express, { NextFunction, Request, Response } from "express";
import { CreateVendorInput } from "../dto";
import { Vendor } from "../models/Vendor";
import { generatePassword, generateSalt } from "../utility/passwordUtility";

export const CreateVendor = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const {
    name,
    ownerName,
    email,
    password,
    phone,
    pincode,
    address,
    foodType,
  } = <CreateVendorInput>req.body;

  const existingVendor = await Vendor.findOne({ email });
  if (existingVendor !== null) {
    return res.json({
      message: "A vendor is already exisitng with this email Id",
    });
  }

  // Generate salt

  const salt = await generateSalt();

  // Generate Password

  const userPassword = await generatePassword(password, salt);

  const createVendor = await Vendor.create({
    name,
    ownerName,
    email,
    password: userPassword,
    salt,
    phone,
    pincode,
    address,
    rating: 0,
    serviceAvailable: false,
    coverImages: [],
    foodType,
  });
  return res.json(createVendor);
};

export const GetVendors = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const vendors = await Vendor.find();
  if (vendors !== null) {
    return res.json(vendors);
  }

  return res.json({ message: "Vendor is not present at the moment" });
};

export const GetVendorById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const vendorId = req.params.id;
  const vendor = await Vendor.findById(vendorId);
  if (vendor !== null) {
    return res.json(vendor);
  }

  return res.json({ message: "Vendor is not present at the moment" });
};
