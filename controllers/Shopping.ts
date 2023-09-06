import express, { Request, Response, NextFunction } from "express";
import { Vendor } from "../models";
import { FoodDoc } from "../models/Food";

export const GetFoodAvailibility = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const pincode = req.params.pincode;
  const result = await Vendor.find({ pincode, serviceAvailable: false })
    .sort([["rating", "descending"]])
    .populate("foods");

  if (result.length > 0) {
    return res.status(200).json(result);
  }

  return res.status(400).json({ message: "Data not found" });
};

export const GetTopRestaurants = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const pincode = req.params.pincode;
  const result = await Vendor.find({ pincode, serviceAvailable: false })
    .sort([["rating", "descending"]])
    .limit(1);

  if (result.length > 0) {
    return res.status(200).json(result);
  }

  return res.status(400).json({ message: "Data not found" });
};

export const GetFoodIn30Mins = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const pincode = req.params.pincode;
  const result = await Vendor.find({
    serviceAvailable: false,
    pincode,
  }).populate("foods");

  if (result.length > 0) {
    let foodResult: any = [];

    result.forEach((vendor) => {
      const foods = vendor.foods as [FoodDoc];
      foodResult.push(...foods.filter((food) => food.readyTime < 30));
    });

    return res.status(200).json(foodResult);
  }
  return res.status(400).json({ message: "data not found" });
};

export const SearchFood = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const pincode = req.params.pincode;

  const result = await Vendor.find({
    pincode,
    serviceAvailable: false,
  }).populate("foods");

  if (result.length > 0) {
    let foodResult: any = [];

    result.forEach((vendor) => {
      const foods = vendor.foods as [FoodDoc];
      foodResult.push(...foods.map((food) => food));
    });

    return res.status(200).json(foodResult);
  }

  return res.status(400).json({ message: "data not found" });
};

export const RestaurantById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = req.params.id;
  const result = await Vendor.findById(id).populate("foods");

  if (result) {
    return res.status(200).json(result);
  }

  return res.status(400).json({ message: "data not found" });
};
