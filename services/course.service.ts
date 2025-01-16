
import { Course } from '../models/course.model';
import { ICourse } from './../interfaces/course.interface';
export const courseService = async (course: Partial<ICourse>): Promise<ICourse | null> => {
    try {
        // Validate input
        if (!course) {
            throw new Error("Course data is required.");
        }
        // Save the course in the database
        const createCourse = await Course.create(course);
        return createCourse;
    } catch (error) {
        console.error("Error in courseService:", error);
        throw new Error("Failed to create course.");
    }
}