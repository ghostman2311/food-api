import { plainToClass } from "class-transformer";
import { Request, Response, NextFunction } from "express";
import { CreateUserInputs } from "../dto/user.dto";
import { validate } from "class-validator";
import { generatePassword, generateSalt } from "../utility";
import { User } from "../models/User";
import { generateOtp } from "../utility/notificationUtility";

export const UserSignUp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
    const customerInput = plainToClass(CreateUserInputs, req.body)
    const inputErrors = await validate(customerInput, {validationError: {target: true}})
    if(inputErrors.length > 0){
        return res.status(400).json(inputErrors)
    }

    const {email, phone, password} = req.body
    const salt = await generateSalt()
    const userPassword = await generatePassword(password, salt)
    const { otp, otp_expiry} = generateOtp()
    const result = await User.create({
        email,
        password:userPassword,
        phone,
        firstName:'',
        lastName:'',
        otp,
        otp_expiry,
        address:'',
        verified: false,
        lat: 0,
        lng: 0
    })

    if(result){
        // Send otp to the User
    }
};
