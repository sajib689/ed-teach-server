import { Request, Response } from "express";
import { createUsers } from "../services/users.services";
import { User } from "../models/users.model";

export const sendUsers = async (req: Request, res: Response) => {
  try {
    // Extract user data from the request body
    const user = req.body;
    // Validate required fields
    if (!user || !user.role || !user.name || !user.email || !user.password || !user.number) {
      return res.status(400).json({
        message: "Missing required fields. Please provide role, name, email, password, and number.",
      });
    }

    // Call the service to create the user
    const result = await createUsers(user);

    // Respond with success
    return res.status(200).json({ message: "User created successfully", data: result });
  } catch (error) {
    console.error("Error in sendUsers:", error);

    // Respond with error details
    return res.status(500).json({
      message: "An error occurred while creating the user",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};
