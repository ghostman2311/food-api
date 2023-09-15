import { plainToClass } from "class-transformer";
import { Request, Response, NextFunction } from "express";
import { CreateUserInputs } from "../dto/user.dto";
import { validate } from "class-validator";
import { generateOtp, generatePassword, generateSalt, generateToken, onRequestOTP } from "../utility";
import { User } from "../models/User";

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
    const existingUser = await User.findOne({ email })
    if(existingUser !== null){
        return res.status(409).json({message: 'An user already exist with same email id.'})
    }
    const salt = await generateSalt()
    const userPassword = await generatePassword(password, salt)
    const { otp, expiry} = generateOtp()
    const result = await User.create({
        email,
        password:userPassword,
        phone,
        firstName:'',
        lastName:'',
        otp,
        otp_expiry: expiry,
        address:'',
        verified: false,
        lat: 0,
        lng: 0
    })

    if(result){
        await onRequestOTP(otp, phone)

        const token = generateToken({
            _id: result._id.toString(),
            email: result.email,
            verified: result.verified
        })

        return res.status(201).json({
            token,
            verified: result.verified,
            email: result.email
        })
    }
};

export const UserVerify = async (req:Request, res: Response, next:NextFunction) => {
    const { otp } = req.body
    const user = req.user

    if(user){
        const profile = await User.findById(user._id)
        if(profile){
            if(profile.otp === parseInt(otp) && profile.otp_expiry >= new Date()){
                profile.verified = true
                const updatedUserResponse = await profile.save()

                // generate the signature
                const signature = generateToken({
                    _id: updatedUserResponse._id.toString(),
                    email: updatedUserResponse.email,
                    verified: updatedUserResponse.verified
                })

                return res.status(201).json({
                    signature,
                    verified: updatedUserResponse.verified,
                    email: updatedUserResponse.email
                })
            }
        }
    }

    return res.status(401).json({ messsage: 'Error with OTP validation'})
}