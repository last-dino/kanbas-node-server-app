import mongoose from "mongoose";


const UserCourseSchema = new mongoose.Schema({
   userId: { type: mongoose.Schema.Types.ObjectId, ref: "UserModel" },
   courseId: { type: mongoose.Schema.Types.ObjectId, ref: "CourseModel" },
});

export const UserCourseModel = mongoose.model("UserCourseModel", UserCourseSchema);

