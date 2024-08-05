import * as dao from "./dao.js";
import { findCourseById } from "../Courses/dao.js";

export default function QuizRoutes(app) {
    const findQuizByCourse = async (req, res) => {
        const course = await findCourseById(req.params.cid);
        const quizzes = await dao.findQuizByCourse(course.number);
        res.json(quizzes); 
    }
    app.get("/api/courses/:cid/quizzes", findQuizByCourse);

    const findAllQuizzes = async (req, res) => {
        const quizzes = await dao.findAllQuizzes()
        console.log("findallquize");
        console.log(quizzes);
        res.json(quizzes)
    }
    app.get("/api/quizzes", findAllQuizzes);

    const findQuizById = async (req, res) => {
        try {
            console.log("findQuizById");
            const quiz = await dao.findQuizById(req.params.quizId);
            res.json(quiz);
        } catch (error) {
            console.error("Error fetching quiz by ID:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    };
    app.get("/api/quizzes/:quizId", findQuizById)

    const findQuizzesForCourse = async (req, res) => {
        const { courseId }  = req.params;
        const course = await findCourseById(req.params.cid);
        const assignments = await dao.findAssignmentByCourse(course.number);
        console.log("findQuizzesForCourse");
        const quizzes = await dao.findQuizzesForCourse(courseId)
        res.json(quizzes)
    }
    app.get("/api/courses/:courseId/quizzes", findQuizzesForCourse)

    const createQuiz = async (req, res) => {
        const quiz  = req.body
        console.log("createQuiz");
        const newQuiz = await dao.createQuiz(quiz)
        res.json(newQuiz)
    }
    app.post("/api/quizzes/addQuiz", createQuiz);

    const deleteQuiz = async (req, res) => {
        console.log("deleteQuiz");
        const status = await dao.deleteQuiz(req.params.quizId);
        res.json(status);
    };
    app.delete("/api/quizzes/:quizId", deleteQuiz);

    const updateQuiz = async (req, res) => {
        const { quizId } = req.params;
        const quiz = req.body
        console.log("updateQuiz")
        const status = await dao.updateQuiz(quizId, quiz);
        console.log(quiz.published)
        res.json(status);
    };
    app.put("/api/quizzes/:quizId", updateQuiz)
}