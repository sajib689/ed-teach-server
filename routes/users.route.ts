import express from "express";
import { getUsersByEmailController, sendUsers } from "../controllers/users.controllers";
import { asyncHandler } from '../middlewares/asyncHandler';

const router = express.Router();

router.post('/users',asyncHandler(sendUsers))
router.get('/users/:email',asyncHandler(getUsersByEmailController))


export default router;