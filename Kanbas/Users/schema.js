import mongoose from "mongoose";

const quizAttemptSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true },
    quizId: { type: mongoose.Schema.Types.ObjectId, ref: 'Quizzes', required: true },
    attemptNumber: { type: Number, required: true },
    answers: [{ questionId: String, answer: String }],
    score: { type: Number, required: true }
});

const userSchema = new mongoose.Schema({
        username: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        firstName: String,
        email: String,
        lastName: String,
        dob: Date,
        role: {
            type: String,
            enum: ["STUDENT", "FACULTY", "ADMIN", "USER"],
            default: "USER",
        },
        loginId: String,
        section: String,
        lastActivity: Date,
        totalActivity: String,
        quizAttempts: [{
            quizId: { type: mongoose.Schema.Types.ObjectId, ref: 'Quizzes' },
            attempts: [quizAttemptSchema],
            totalAttempts: { type: Number, default: 0 },
        }],
    },
    { collection: "users" }
);
export default userSchema;