import { Response, Request, NextFunction } from "express";
import { VendorLoginInput } from "../dto";
import { findVendor } from "./Admin";
import { validatePassword } from "../utility";

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
      return res.json(existingVendor);
    } else {
      return res.json({ message: "Login credentials is not valid" });
    }
  }

  return res.json({ message: "Login credentials is not valid" });
};
