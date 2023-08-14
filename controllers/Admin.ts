import express, { NextFunction, Request, Response } from "express";
import { CreateVendorInput } from "../dto";

export const CreateVendor = (
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
  res.json({
    name,
    ownerName,
    email,
    password,
    phone,
    pincode,
    address,
    foodType,
  });
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
