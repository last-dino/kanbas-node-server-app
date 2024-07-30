import mongoose from "mongoose";

const assignmentSchema = new mongoose.Schema({
        title: String,
        course: String,
        available: Date,
        due: Date,
        points: Number, 
        description: String,
    },
    { collection: "assignments" }
);
export default assignmentSchema;