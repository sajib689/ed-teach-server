
import express from 'express';
import { asyncHandler } from './../middlewares/asyncHandler';
import { courseController } from '../controllers/course.controller';
const router = express.Router();

router.post('/addcourse', asyncHandler(courseController))