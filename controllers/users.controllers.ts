import { Request, Response } from "express";
import { createUsers } from "../services/users.services";

export const sendUsers = async ( req: Request, res: Response) => {
  const { user } = req.body;
  const result = await createUsers(user);
  res.status(200).json({ message: "User Created successfully", data: result });
};
