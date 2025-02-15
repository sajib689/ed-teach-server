import express from "express";
import { getAdminController, getUsersByEmailController, sendUsers } from "../controllers/users.controllers";
import { asyncHandler } from '../middlewares/asyncHandler';

const router = express.Router();

router.post('/users',asyncHandler(sendUsers))
router.get('/users/:email',asyncHandler(getUsersByEmailController))
router.get('/users/:role',asyncHandler(getAdminController))

export default router;