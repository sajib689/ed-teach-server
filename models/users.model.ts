import { Schema } from "mongoose";
import { IUser } from "../interfaces/users.interface";

export const userSchema = new Schema <IUser>({
    id: { type: Number, required: true },
    role: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
})