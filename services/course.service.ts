import {generateUserId} from '../utils/generateUserId '

import { Course } from '../models/course.model';
import { ICourse } from './../interfaces/course.interface';
import mongoose from 'mongoose';
export const courseService = async (course: Partial<ICourse>): Promise<ICourse | null> => {
    try {
        // Validate input
        if (!course) {
            throw new Error("Course data is required.");
        }
        // Generate a unique ID for the user
        const id = await generateUserId();
        course.id = id;
        // Save the course in the database
        const createCourse = await Course.create(course);
        return createCourse;
    } catch (error) {
        console.error("Error in courseService:", error);
        throw new Error("Failed to create course.");
    }
}

export const getCourseService = async (): Promise<ICourse[]> => {
    try {
        const courses = await Course.find();
        return courses;
    } catch (error) {
        console.error("Error in getCourseService:", error);
        throw new Error("Failed to get courses.");
    }
}

export const getCourseByIdService = async (id: string) => {
    try {
        // Check if it's a valid ObjectId format
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new Error("Invalid course ID format");
        }
        // If you are querying by MongoDB's ObjectId (default _id)
        const course = await Course.findOne({ _id: new mongoose.Types.ObjectId(id) });
        
        // Or, if you're querying by a custom `id` field:
        // const course = await Course.findOne({ id: id });

        if (!course) {
            throw new Error("Course not found.");
        }
        return course;
    } catch (error) {
        console.error("Error in getCourseByIdService:", error);
        throw new Error("Failed to get course.");
    }
}
