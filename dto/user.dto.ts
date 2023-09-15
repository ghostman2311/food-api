import { IsEmail, Length } from "class-validator";

export class CreateUserInputs {
    @IsEmail()
    email: string;

    @Length(7,12)
    phone: number;

    @Length(6,12)
    password: string
}

export interface UserPayload {
    _id: string,
    email: string,
    verified: boolean
}