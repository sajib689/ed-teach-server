import express from "express";
import { sendUsers } from "../controllers/users.controllers";

const router = express.Router();

router.post('/users', sendUsers)


export default router;