import { PaymentData } from "../interfaces/payment.interface";
import { IPayment } from "../interfaces/paymentSuccess.interface";
import { Payment } from "../models/payment.model";
 
import SSLCommerzPayment from 'sslcommerz-lts';

const store_id = 'sajib6791f92014765';
const store_passwd = 'sajib6791f92014765@ssl'
const is_live = false; 

const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);

export const createPaymentSession = async (paymentData: PaymentData) => {
  try {
    const apiResponse = await sslcz.init(paymentData);
    return apiResponse;
  } catch (error) {
    throw new Error('Payment initialization failed');
  }
};



export const updatePaymentStatus = async (
    tran_id: string,
    status: string,
    customerData: any,
    courseName: string,
    amount: number
  ): Promise<IPayment> => {
    try {
      let payment = await Payment.findOne({ tran_id });
  
      if (!payment) {
        payment = new Payment({
          tran_id,
          status,
          amount,
          customer: customerData,
          courseName,
        });
      } else {
        payment.status = status;
        payment.customer = customerData;
        payment.amount = amount;
        payment.courseName = courseName;
      }
  
      await payment.save();
      return payment;
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error updating payment status:', error.message);
        throw new Error('Failed to update payment status: ' + error.message);
      }
      throw new Error('An unknown error occurred while updating payment status.');
    }
  };
  