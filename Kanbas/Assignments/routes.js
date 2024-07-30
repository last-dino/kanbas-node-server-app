import * as dao from "./dao.js";
import { findCourseById } from "../Courses/dao.js";

export default function AssignmentRoutes(app) {
    const createAssignment = async (req, res) => {
        const course = await findCourseById(req.params.cid);
        const newAssignment = {
            ...req.body,
            course: course.number,
        };
        const assignment = await dao.createAssignment(newAssignment);
        res.json(assignment);
    }
    const findAssignmentByCourse = async (req, res) => {
        const course = await findCourseById(req.params.cid);
        const assignments = await dao.findAssignmentByCourse(course.number);
        res.json(assignments); 
    }
    const updateAssignment = async (req, res) => {
        const { aid } = req.params;
        const status = await dao.updateAssignment(aid, req.body);
        res.json(status);
    }
    const deleteAssignment = async (req, res) => {
        const status = await dao.deleteAssignment(req.params.aid);
        res.json(status);
    }
        
    app.post("/api/courses/:cid/assignments", createAssignment);    
    app.get("/api/courses/:cid/assignments", findAssignmentByCourse);
    app.put("/api/assignments/:aid", updateAssignment);
    app.delete("/api/assignments/:aid", deleteAssignment);    
}