import { Request, Response } from "express";
import { createPaymentSession, updatePaymentStatus } from '../services/payment.service';
import { PaymentData } from "../interfaces/payment.interface";

export const initPayment = async (req: Request, res: Response): Promise<void> => {
    const { amount, courseName, name, email, phone, address, city, country } = req.body;
  
    // Validate required fields
    if (!name || !email || !phone) {
       res.status(400).json({ message: 'Missing required customer information.' });
    }
  
    if (!courseName) {
       res.status(400).json({ message: 'Course name is required.' });
    }
  
    // Check if the email format is valid
    if (!/^\S+@\S+\.\S+$/.test(email)) {
       res.status(400).json({ message: 'Invalid email format.' });
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
    console.log('Request body:', req.body);  // Check the incoming request
  
    const { 
      courseName, 
      cus_name, 
      cus_email, 
      cus_phone, 
      tran_id, 
      val_id, 
      amount, 
      store_amount, 
      status 
    } = req.body;
  
    const missingFields: string[] = [];
  
    if (!courseName) missingFields.push('courseName');
    if (!cus_name) missingFields.push('cus_name');
    if (!cus_email) missingFields.push('cus_email');
    if (!cus_phone) missingFields.push('cus_phone');
  
    if (missingFields.length > 0) {
      return res.status(400).json({
        message: "Missing required fields",
        missingFields
      });
    }
  
    // Create customer data object to pass as a separate argument
    const customerData = {
      name: cus_name,
      email: cus_email,
      phone: cus_phone
    };
  
    try {
      // Call updatePaymentStatus with 5 arguments
      const paymentStatus = await updatePaymentStatus(
        tran_id, 
        status, 
        customerData, 
        courseName, 
        amount
      );
  
      res.status(200).json({ message: 'Payment status updated successfully', paymentStatus });
    } catch (error) {
      console.error('Error updating payment status:', error);
      res.status(500).json({ message: 'Error updating payment status', error });
    }
  };