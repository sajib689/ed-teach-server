import { Request, Response } from "express";
import { courseService, getCourseService } from "../services/course.service";

export const courseController = async (req: Request,res: Response) => {
    try {
        const course = req.body;
        const result = await courseService(course);
        return res.status(200).json({
            message: "Course created successfully",
            data: result
        })
    } catch (err: any) {
        return res.status(500).json({err: err.message})
    }
}

export const getCourseController = async ( req: Request,res: Response) => {
    try {
        const result = await getCourseService();
        return res.status(200).json({
            message: "Courses fetched successfully",
            data: result
        })
    } catch (err: any) {
        return res.status(500).json({err: err.message})
    }
}