
import express from 'express';
import { asyncHandler } from './../middlewares/asyncHandler';
import { courseController, getCourseByIdController, getCourseController } from '../controllers/course.controller';
const courseRouter = express.Router();

courseRouter.post('/addcourse', asyncHandler(courseController))
courseRouter.get('/getcourses', asyncHandler(getCourseController))
courseRouter.get('/getcourse/:id', asyncHandler(getCourseByIdController)); 
export default courseRouter;