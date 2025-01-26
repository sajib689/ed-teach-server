import { Request, Response } from "express";
import { createPaymentSession, paymentHistoryService, updatePaymentStatus } from '../services/payment.service';
import { PaymentData } from "../interfaces/payment.interface";
import { Payment } from "../models/payment.model";

export const initPayment = async (req: Request, res: Response): Promise<void> => {
    const { amount, courseName, name, email, phone, address, city, country } = req.body;

    if (!name || !email || !phone || !amount || !courseName) {
        res.status(400).json({ message: 'Missing required fields: name, email, phone, amount, or courseName.' });
        return;
    }

    const transactionId = `tran_${Date.now()}`;
    const paymentData: PaymentData = {
        total_amount: amount,
        currency: "BDT",
        tran_id: transactionId,
        success_url: `http://localhost:5000/api/v1/payment/success/${transactionId}`,
        fail_url: process.env.FAIL_URL || "http://localhost:5000/fail",
        cancel_url: process.env.CANCEL_URL || "http://localhost:5000/cancel",
        ipn_url: process.env.IPN_URL || "http://localhost:5000/payment/ipn",
        product_name: courseName,
        product_category: "Education",
        product_profile: "general",
        cus_name: name,
        cus_email: email,
        cus_phone: phone,
        cus_add1: address || "Default Address",
        cus_city: city || "Default City",
        cus_country: country || "Bangladesh",
        shipping_method: "NO",
    };

    try {
        await Payment.create({
            tran_id: transactionId,
            courseName,
            customer: { name, email, phone },
            total_amount: amount,
            status: "PENDING",
        });

        const apiResponse = await createPaymentSession(paymentData);
        const { GatewayPageURL } = apiResponse;

        if (GatewayPageURL) {
            res.status(200).json({ url: GatewayPageURL });
        } else {
            res.status(400).json({ message: 'Failed to create payment session', apiResponse });
        }
    } catch (error) {
        console.error('Payment initialization error:', error);
        res.status(500).json({ message: 'Payment initialization failed', error });
    }
};



export const paymentSuccessController = async (req: Request, res: Response) => {
    const { tran_id, status, amount } = req.body;
  
    try {
      const payment = await Payment.findOne({ tran_id });
      if (!payment) {
        return res.status(404).json({ message: "Transaction not found" });
      }
  
      const { courseName, customer } = payment;
  
      if (!courseName || !customer?.name || !customer?.email || !customer?.phone) {
        return res.status(400).json({ message: "Missing required fields" });
      }
  
      const paymentStatus = await updatePaymentStatus(
        tran_id,
        status,
        customer,
        courseName,
        amount
      );
  
      res.status(200).json({ message: "Payment status updated successfully", paymentStatus });
    } catch (error) {
      console.error("Error updating payment status:", error);
      res.status(500).json({ message: "Error updating payment status", error });
    }
  };
  

  export const paymentHistoryController = async (req: Request, res: Response) => {
    try {
      const { email } = req.body;
      const payment = await paymentHistoryService({ email });
      res.status(200).json({ payment });
    } catch (error) {
      console.error("Error fetching payment history:", error);
      res.status(500).json({ message: "Error fetching payment history", error });
    }
  }