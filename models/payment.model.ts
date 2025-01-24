import { model, Model, Schema } from "mongoose";
import { IPayment } from "../interfaces/paymentSuccess.interface";

type paymentModel = Model<IPayment, object>;
export const paymentSchema = new Schema<IPayment>(
  {
    tran_id: { type: String, required: true, unique: true },
    amount: { type: Number, required: true },
    status: { type: String, required: true },
    customer: {
      name: { type: String, required: true },
      email: { type: String, required: true },
      phone: { type: String, required: true },
      address: { type: String },
      city: { type: String },
      country: { type: String },
    },
    courseName: { type: String, required: true },
  },
  { timestamps: true }
);

export const Payment = model<IPayment, paymentModel>("Payment", paymentSchema);
