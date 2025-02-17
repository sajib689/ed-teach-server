import { model, Model, Schema } from "mongoose";
import { IUser } from "../interfaces/users.interface";

type userModel = Model<IUser, object>;

export const userSchema = new Schema<IUser>({
  id: { type: String, required: true },
  role: { 
    type: String, 
    enum: ['student', 'instructor', 'admin'], 
    required: true 
  },
  name: { type: String, required: true },
  email: { type: String, required: true,unique: true},
  password: { type: String, required: true },
  number: { type: Number, required: true },
  create_At: { 
    type: Date, 
    default: Date.now 
  },
});

export const User = model<IUser, userModel>("User", userSchema);
