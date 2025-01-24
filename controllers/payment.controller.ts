import { Request, Response } from "express";
import { paymentService } from "../services/payment.service";

export const paymentController = async (req: Request, res: Response) => {
    try {
        // Extract payment data from the request body
        const payment = req.body;

        // Validate required fields manually
        if (
            !payment ||
            typeof payment.tran_id !== "string" ||
            typeof payment.amount !== "number" ||
            typeof payment.status !== "string" ||
            !payment.customer ||
            typeof payment.customer.name !== "string" ||
            typeof payment.customer.email !== "string" ||
            !/^\S+@\S+\.\S+$/.test(payment.customer.email) || // Basic email validation
            typeof payment.customer.phone !== "string" ||
            typeof payment.courseName !== "string" ||
            !Date.parse(payment.createdAt)
        ) {
            return res.status(400).json({
                message: "Invalid or missing required fields. Please provide valid data.",
            });
        }

        // Call the service to create the payment
        const result = await paymentService(payment);

        // Respond with success
        return res
            .status(200)
            .json({ message: "Payment created successfully", data: result });
    } catch (err) {
        console.error("Error in paymentController:", err);

        return res.status(500).json({
            message: "An error occurred while creating the payment",
            error: err.message,
        });
    }
};
