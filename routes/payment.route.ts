import express from 'express';
import { asyncHandler } from './../middlewares/asyncHandler';
import { initPayment, paymentSuccessController } from '../controllers/payment.controller';

const paymentRouter = express.Router();

paymentRouter.post('/payment/success/:tran_id', asyncHandler(paymentSuccessController));
paymentRouter.post('/init', initPayment);
export default paymentRouter;
