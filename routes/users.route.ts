import express from "express";
import { getAdminController, getUsersByEmailController, getUsersController, sendUsers } from "../controllers/users.controllers";
import { asyncHandler } from '../middlewares/asyncHandler';

const router = express.Router();

router.post('/users',asyncHandler(sendUsers))
router.get('/users/:email',asyncHandler(getUsersByEmailController))
router.get('/users',asyncHandler(getAdminController))
router.get('/userss',asyncHandler(getUsersController))
export default router;