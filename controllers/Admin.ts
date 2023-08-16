import express, { NextFunction, Request, Response } from "express";
import { CreateVendorInput } from "../dto";
import { Vendor } from "../models/Vendor";

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

  const createVendor = await Vendor.create({
    name,
    ownerName,
    email,
    password,
    salt: "sdasdasdas dfasdasd",
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

export const GetVendors = (
  req: Request,
  res: Response,
  next: NextFunction
) => {};

export const GetVendorById = (
  req: Request,
  res: Response,
  next: NextFunction
) => {};
