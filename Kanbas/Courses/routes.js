import * as dao from "./dao.js";
import {checkerUser} from "../../middlwares/checkerUser.js";

export default function CourseRoutes(app) {
    const createCourse = async (req, res) => {
        const course = await dao.createCourse(req.body);
        res.json(course);
    }




    const findAllCourses = async (req, res) => {
        const user = req.user;
        const courses = await dao.findAllCourses();

        let userCourses = [];
        if (user) {
            userCourses = await dao.findCoursesOfStudent(user._id);
        }

        return res.json([...courses].map(course => {
            if (user?.role === 'FACULTY') {
                course.canView = true;
                return course;
            }
            course.editable = false;

            if (user?.role === 'STUDENT') {
                course.joined = userCourses.find(courseItem => courseItem.courseId._id.toString() === course._id.toString()) !== undefined;
                course.canView = course.joined;
                return course;
            }
            return course;
        }));



    }
    const updateCourse = async (req, res) => {
        const status = await dao.updateCourse(req.params.id, req.body);
        res.json(status);
    }
    const deleteCourse = async (req, res) => {
        const status = await dao.deleteCourse(req.params.id);
        res.json(status);
    }

    const enrollCourse = async (req, res) => {
       try {
           const user = req.user;
           if (!user) {
               return res.status(401).json({ message: "Unauthorized" });
           }

           const courseId = req.body.courseId;
           await dao.createStudentCourseRecord(user._id, courseId);
           res.json({ message: "Enrolled" });
       } catch (err) {
              console.log(err);
              res.status(400).json({ message: err.message });
       }
    }
        
    app.post("/api/courses", createCourse);    
    app.get("/api/courses", checkerUser, findAllCourses);
    app.get("/api/courses", checkerUser, findAllCourses);
    app.put("/api/courses/:id", updateCourse);
    app.delete("/api/courses/:id", deleteCourse);
    app.post("/api/courses/enroll", checkerUser, enrollCourse);
    app.delete("/api/courses/:id", deleteCourse);
    app.post("/api/courses/enroll", checkerUser, enrollCourse);
}