import model from "./model.js";
export const createAssignment = (assignment) => {
    delete assignment._id
    return model.create(assignment);
} 
export const findAssignmentByCourse = (course) => {
    const assignments = model.find({course: course});
    return assignments;
}
export const updateAssignment = (assignmentId, assignment) =>  model.updateOne({ _id: assignmentId }, { $set: assignment });
export const deleteAssignment = (assignmentId) => model.deleteOne({ _id: assignmentId });