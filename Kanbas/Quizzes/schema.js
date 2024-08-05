import mongoose from "mongoose";

// const questionSchema = new mongoose.Schema({
//     question: String,
//     answer: String
// });

const quizSchema = new mongoose.Schema({
    course: {type: String, required: true},
    title: String,
    // quizGroup: {
    //     type: String,
    //     enum: ["Quizzes", "Exams", "Assignments", "Project"],
    //     default: "Quizzes"
    // },
    // shuffleAnswers: {type: Boolean, default: true},
    // timeLimit: {type: String, default: "20"},
    // multipleAttempts: {type: Boolean, default: false},
    // showCorrectAnswers: Boolean,
    // accessCode: {type: String, default: "None"},
    // oneQuestionAtTime: {type: Boolean, default: true},
    // webcamRequried: {type: Boolean, default: false},
    // lockQuestionsAfterAnswering: {type: Boolean, default: false},
    // published: {type: Boolean, default: false},
    available: String,
    due: String,
    // untilDate: {type: String, default: "Forever"},
    points: String,
    // open: {type: Boolean, default: false},
    // questions: [questionSchema],
},
    { collection: "quizzes"});

export default quizSchema;