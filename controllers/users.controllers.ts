import { Request, Response } from "express";
import { createUsers, getAdmin, getUsers } from "../services/users.services";
import { getUsersByEmailService } from "../services/users.services";
import { User } from "../models/users.model";

export const sendUsers = async (req: Request, res: Response) => {
  try {
    // Extract user data from the request body
    const user = req.body;
    // Validate required fields
    if (
      !user ||
      !user.role ||
      !user.name ||
      !user.email ||
      !user.password ||
      !user.number
    ) {
      return res.status(400).json({
        message:
          "Missing required fields. Please provide role, name, email, password, and number.",
      });
    }

    // Call the service to create the user
    const result = await createUsers(user);

    // Respond with success
    return res
      .status(200)
      .json({ message: "User created successfully", data: result });
  } catch (error) {
    console.error("Error in sendUsers:", error);

    // Respond with error details
    return res.status(500).json({
      message: "An error occurred while creating the user",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

export const getUsersByEmailController = async (
  req: Request,
  res: Response
) => {
  try {
    // Extract email from the request body----
    const {email} = req.params;
    // Validate required fields
    if (!email) {
      return res.status(400).json({
        message: "Email is required.",
      });
    }
    const result = await getUsersByEmailService(email);
    res.status(200).json({ message: "User found successfully", data: result });
  } catch (err) {
    console.error("Error in getUsersByEmailService:", err);
    throw new Error("Failed to get user by email.");
  }
};

export const getUsersController = async (req: Request, res: Response) => {
  try {
    const users = await getUsers();
    
    if (!users) {
      return res.status(404).json({ message: "No users found" });
    }

    return res.status(200).json(users);
  } catch (err) {
    console.error("Error fetching users:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};


export const getAdminController = async (req: Request, res: Response) => {
  try {
    let role = req.query.role; // Extract from query params

    if (!role) {
      return res.status(400).json({ message: "Role is required." });
    }

    if (Array.isArray(role)) {
      role = role[0]; // Take the first element if multiple values exist
    }

    console.log("Requested Role:", role);

    const admin = await getAdmin(role as string); // Explicitly cast to string

    if (!admin) {
      return res.status(404).json({ message: "Admin not found.", data: null });
    }

    res.status(200).json({ message: "Admin found", data: admin });
  } catch (err) {
    console.error("Error in getAdminController:", err);
    res.status(500).json({ message: "Failed to get admin." });
  }
};