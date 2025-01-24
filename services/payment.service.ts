import { IPayment } from "../interfaces/paymentSuccess.interface";
import { Payment } from "../models/payment.model";

export const paymentService = async (payment: Partial<IPayment>): Promise<IPayment> => {
    try {
        // Validate input
        if (!payment) {
            throw new Error("Payment data is required.");
        }

        // Save the payment in the database
        const createPayment = await Payment.create(payment);

        return createPayment;
    } catch (error) {
        console.error("Error in paymentService:", error);
        throw new Error("Failed to create payment.");
    }
}