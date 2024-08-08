import mongoose from "mongoose";

const schema = new mongoose.Schema({
    course: { type: String, required: true },
    title: { type: String, required: true },
    quizType:{
        type: String,
        enum: ["Graded Quiz", "Practice Quiz", "Graded Survey", "Ungraded Survey"],
        default: "Graded Quiz"
    },
    assignmentGroup: {
        type: String,
        enum: ["Quizzes", "Exams", "Assignments", "Project"],
        default: "Quizzes"
    },
    shuffleAnswers: { type: Boolean, default: true },
    timeLimit: { type: Number, default: 20 }, 
    multipleAttempts: { type: Number, default: 1 }, 
    showCorrectAnswers: Boolean,
    accessCode: { type: String, default: "None" },
    oneQuestionAtTime: { type: Boolean, default: true },
    webcamRequired: { type: Boolean, default: false },  
    lockQuestionsAfterAnswering: { type: Boolean, default: false },
    published: { type: Boolean, default: false },
    available: Date,
    due: Date,
    until: Date,  
    points: Number,
},
    { collection: "quizzes" });
export default schema;
