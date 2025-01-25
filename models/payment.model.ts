import { model, Model, Schema } from "mongoose";
import { IPayment } from "../interfaces/paymentSuccess.interface";

type PaymentModel = Model<IPayment>;

export const paymentSchema = new Schema<IPayment>(
  {
    tran_id: { type: String, required: true },
    courseName: { type: String, required: true },
    customer: {
      name: { type: String, required: true },
      email: { type: String, required: true },
      phone: { type: String, required: true },
    }, // Consolidated customer data
    total_amount: { type: Number, required: true },
    status: { type: String, default: "PENDING" }, // Default to PENDING
  },
  { timestamps: true }
);

export const Payment = model<IPayment, PaymentModel>("Payment", paymentSchema);
