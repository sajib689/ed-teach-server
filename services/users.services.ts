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
