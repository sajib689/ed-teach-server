import { Request, Response } from "express";
import { createUsers } from "../services/users.services";

export const sendUsers = async (res: Response, req: Request) => {
  const { user } = await req.body;
  const result = await createUsers(user);
  res.status(200).json(
    {   message: "User created successfully",
        data: result }
);
};
