import { model, Model, Schema } from "mongoose";
import { IUser } from "../interfaces/users.interface";


type userModel = Model<IUser, object>
export const userSchema = new Schema <IUser>({
    id: { type: String, required: true },
    role: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
})

export const User = model<IUser, userModel>("User", userSchema);