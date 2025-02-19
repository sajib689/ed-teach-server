import express from "express";
import { getAdminController, getUsersByEmailController, getUsersController, sendUsers } from "../controllers/users.controllers";
import { asyncHandler } from '../middlewares/asyncHandler';

const router = express.Router();
// post the users data to db
router.post('/users',asyncHandler(sendUsers))
// get the users by email
router.get('/users/:email',asyncHandler(getUsersByEmailController))
// get the all users
router.get('/users',asyncHandler(getAdminController))
// get the admin
router.get('/userss',asyncHandler(getUsersController))
export default router;