import { Response, Request, NextFunction } from "express";
import { VendorLoginInput } from "../dto";
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
        foodTypes: existingVendor.foodType
      })
      return res.json(token);
    } else {
      return res.json({ message: "Login credentials is not valid" });
    }
  }

  return res.json({ message: "Login credentials is not valid" });
};


export const GetVendorProfile = (req:Request, res: Response, next: NextFunction) => {
    
}
