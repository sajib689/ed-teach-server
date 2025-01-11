import { Request, Response } from "express";

const sendUsers = async (res: Response, req: Request) => {
    const {user} = await req.body 
}