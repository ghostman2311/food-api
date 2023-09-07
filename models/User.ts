import mongoose, { Schema } from "mongoose";

interface UserDoc extends Document {
  email: string;
  password: string;
  salt: string;
  firstName: string;
  lastName: string;
  address: string;
  phone: string;
  verified: boolean;
  otp: number;
  otp_expiry: Date;
  lat: number;
  lng: number;
}

const userSchema = new Schema(
  {
    email: { type: String, require: true },
    password: { type: String, require: true },
    salt: { type: String, require: true },
    firstName: { type: String },
    lastName: { type: String },
    address: { type: String },
    phone: { type: String, require: true },
    verified: { type: Boolean, require: true },
    otp: { type: Number, require: true },
    otp_expiry: { type: Date, require: true },
    lat: { type: Number },
    long: { type: Number },
  },
  {
    toJSON: {
      transform(doc, ret) {
        delete ret.password;
        delete ret.salt;
        delete ret.__v;
        delete ret.createdAt;
        delete ret.updatedAt;
      },
    },
    timestamps: true,
  }
);

const User = mongoose.model<UserDoc>("user", userSchema);
export { User };
