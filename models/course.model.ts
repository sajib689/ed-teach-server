import { model, Model, Schema } from "mongoose";
import { ICourse } from "../interfaces/course.interface";

type courseModel = Model<ICourse, object>;
export const courseSchema = new Schema <ICourse>({
    id: { type: Number, required: true },
  courseImage: { type: String, required: true },
  courseName: { type: String, required: true },
  providerName: { type: String, required: true },
  providerImage: { type: String, required: true },
  providerTitle: { type: String, required: true },
  price: { type: String, required: true },
  totalEnrolls: { type: String, required: false },
  courseCategory: { type: String, required: true },
  courseType: { type: String, required: true },
});

export const Course = model<ICourse, courseModel>("Course", courseSchema);