import { IUser } from "../interfaces/users.interface";
import { User } from "../models/users.model";
import {generateUserId} from '../utils/generateUserId '
export const createUsers = async (user: Partial<IUser>): Promise<IUser | null> => {
  try {
    // Validate input
    if (!user) {
      throw new Error("User data is required.");
    }

    // Generate a unique ID for the user
    const id = await generateUserId();
    user.id = id;

    // Save the user in the database
    const createUser = await User.create(user);

    return createUser;
  } catch (error) {
    console.error("Error in createUsers:", error);
    throw new Error("Failed to create user.");
  }
};

export const getUsersByEmailService = async (email: string): Promise<IUser | null> => {
  try {
    // Validate input
    if (!email) {
      throw new Error("Email is required.");
    }

    // Find the user by email
    const user = await User.findOne({ email: email });
    return user;
  } catch (err) {
    console.error("Error in getUsersByEmailService:", err);
    throw new Error("Failed to get user by email.");
  }}


  export const getAdmin = async (role: string): Promise<IUser | null> => {
    try {
      if (!role) {
        throw new Error("Role is required.");
      }
  
      // Case-insensitive search for role
      const admin = await User.findOne({ role: { $regex: new RegExp("^" + role + "$", "i") } });
  
      return admin;
    } catch (err) {
      console.error("Error in getAdmin:", err);
      throw new Error("Failed to get admin.");
    }
  };
  