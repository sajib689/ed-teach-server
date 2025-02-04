import { PaymentData } from "../interfaces/payment.interface";
import { IPayment } from "../interfaces/paymentSuccess.interface";
import { Payment } from "../models/payment.model";

import SSLCommerzPayment from 'sslcommerz-lts';

const store_id = 'sajib6791f92014765';
const store_passwd = 'sajib6791f92014765@ssl';

export const createPaymentSession = async (paymentData: PaymentData) => {
  try {
    // Directly call SSLCommerzPayment.init() with the options object
    const apiResponse = await SSLCommerzPayment.init({
      store_id,
      store_password: store_passwd,
      currency: 'BDT',
      total_amount: 100,  // Replace with actual amount
      product_category: 'Electronics', // Example, replace it with actual value
      product_name: 'Laptop', // Example, replace it with actual value
      customer_name: 'John Doe', // Example, replace it with actual value
      customer_email: 'johndoe@example.com', // Example, replace it with actual value
      customer_phone: '1234567890', // Example, replace it with actual value
      success_url: 'http://your-success-url.com', // Example, replace it with actual value
      fail_url: 'http://your-fail-url.com', // Example, replace it with actual value
      cancel_url: 'http://your-cancel-url.com', // Example, replace it with actual value
      ipn_url: 'http://your-ipn-url.com' // Example, replace it with actual value
    });
    return apiResponse;
  } catch (error) {
    throw new Error('Payment initialization failed');
  }
};

export const updatePaymentStatus = async (
  tran_id: string,
  status: string,
  customerData: { name: string; email: string; phone: string },
  courseName: string,
  total_amount: number
): Promise<IPayment> => {
  try {
    let payment = await Payment.findOne({ tran_id });

    if (!payment) {
      payment = new Payment({
        tran_id,
        status,
        customer: customerData, // Use consolidated field
        courseName,
        total_amount,
      });
    } else {
      payment.status = status;
      payment.customer = customerData; // Update consolidated field
      payment.total_amount = total_amount;
      payment.courseName = courseName;
    }

    await payment.save();
    return payment;
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error updating payment status:", error.message);
      throw new Error("Failed to update payment status: " + error.message);
    }
    throw new Error("An unknown error occurred while updating payment status.");
  }
};

export const paymentHistoryService = async ({email}: {email: string}) => {
  try {
    const payments = await Payment.find({email}).lean();
    return payments;
  } catch (error) {
    throw new Error('Payment initialization failed');
  }
};
