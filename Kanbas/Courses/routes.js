import * as dao from "./dao.js";

export default function ModuleRoutes(app) {
    const createCourse = async (req, res) => {
        const course = await dao.createCourse(req.body);
        res.json(course);
    }
    const findAllCourses = async (req, res) => {
        const courses = await dao.findAllCourses();
        res.json(courses); 
    }
    const updateCourse = async (req, res) => {
        const course = await dao.findCourseByNumber(req.params.id);
        const status = await dao.updateCourse(course._id, req.body);
        res.json(status);
    }
    const deleteCourse = async (req, res) => {
        const course = await dao.findCourseByNumber(req.params.id);
        const status = await dao.deleteCourse(course._id);
        res.json(status);
    }
        
    app.post("/api/courses", createCourse);    
    app.get("/api/courses", findAllCourses);
    app.put("/api/courses/:id", updateCourse);
    app.delete("/api/courses/:id", deleteCourse);    
}