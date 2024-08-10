import model from "./model.js";
import {UserCourseModel} from "./user-course.schema.js";
import mongoose from "mongoose";
export const createCourse = (course) => {
    delete course._id
    return model.create(course);
} 
export const findAllCourses = () => model.find().lean();
export const findCourseById = (courseId) => model.findById(courseId);
export const findCourseByNumber = (number) => model.findOne({number: number});
export const updateCourse = (courseId, course) =>  model.updateOne({ _id: courseId }, { $set: course });
export const deleteCourse = (courseId) => model.deleteOne({ _id: courseId });


export const findCoursesOfStudent = (userId) => {
    return UserCourseModel.find({
       userId: new mongoose.mongo.ObjectId(userId.toString()),
    }).populate("courseId");
}

export const createStudentCourseRecord = async (userId, courseId) => {
    return await UserCourseModel.create({
        userId: new mongoose.mongo.ObjectId(userId.toString()),
        courseId: new mongoose.mongo.ObjectId(courseId.toString()),
    })
}