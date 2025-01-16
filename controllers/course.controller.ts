import { Request, Response } from "express";
import { courseService } from "../services/course.service";

export const courseController = async (res: Response, req: Request) => {
    try {
        const course = req.body;
        const result = await courseService(course);
        return res.status(200).json({
            message: "Course created successfully",
            data: result
        })
    } catch (err) {
        return res.status(500).json({err: err.message})
    }
}