import express from 'express';
import { asyncHandler } from './../middlewares/asyncHandler';
import { initPayment, paymentHistoryController, paymentSuccessController } from '../controllers/payment.controller';

const paymentRouter = express.Router();

paymentRouter.post('/payment/success/:tran_id', asyncHandler(paymentSuccessController));
paymentRouter.post('/init', initPayment);
paymentRouter.get('/paymenthistory/:email', asyncHandler(paymentHistoryController));
export default paymentRouter;
