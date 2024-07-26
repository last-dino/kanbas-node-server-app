import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
        title: String,
        course: String,
        available: Date,
        due: Date,
        points: Number, 
        description: String,
    },
    { collection: "courses" }
);
export default courseSchema;