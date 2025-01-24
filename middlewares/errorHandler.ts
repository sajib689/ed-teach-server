import { NextFunction, Request, Response } from "express";

export const errorHandler = async (err: any, req: Request, res: Response, next: NextFunction) => {
    res.status(err.status || 500).json({
        message: err.message || 'Internal Server Error',
    });
}