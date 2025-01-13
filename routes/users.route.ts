import express from "express";
import { sendUsers } from "../controllers/users.controllers";
import { asyncHandler } from './../utils/asyncHandler';

const router = express.Router();

router.post('/users',asyncHandler(sendUsers))


export default router;