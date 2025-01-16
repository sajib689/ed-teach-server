import { Request, Response } from "express";
import { courseService, getCourseByIdService, getCourseService } from "../services/course.service";
import { ICourse } from "../interfaces/course.interface";
import mongoose from "mongoose";

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

export const getCourseByIdController = async (req: Request, res: Response): Promise<Response> => {
    try {
        const id = req.params.id;
        console.log("Fetching course with id:", id); 
        // Ensure the id is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid course ID format" });
        }

        const result = await getCourseByIdService(id);
        if (!result) {
            return res.status(404).json({ message: "Course not found" });
        }

        return res.status(200).json({
            message: "Course fetched successfully",
            data: result
        });
    } catch (err: any) {
        return res.status(500).json({ err: err.message });
    }
};