import express from 'express';
import { asyncHandler } from './../middlewares/asyncHandler';
import { paymentController } from '../controllers/payment.controller';

const route = express.Router();

route.post('/payment/success/:tran_id', asyncHandler(paymentController))