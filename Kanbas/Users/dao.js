import model from "./model.js";
export const createUser = (user) => {
    delete user._id
    return model.create(user);
} 
export const findAllUsers = () => model.find();
export const findUserById = (userId) => model.findById(userId);
export const findUserByUsername = (username) =>  model.findOne({ username: username });
export const findUserByCredentials = (username, password) =>  model.findOne({ username, password });
export const updateUser = (userId, user) =>  model.updateOne({ _id: userId }, { $set: user });
export const deleteUser = (userId) => model.deleteOne({ _id: userId });
export const findUsersByRole = (role) => model.find({ role: role });
export const findUsersByPartialName = (partialName) => {
    const regex = new RegExp(partialName, "i"); // 'i' makes it case-insensitive
    return model.find({
        $or: [{ firstName: { $regex: regex } }, { lastName: { $regex: regex } }],
    });
};

export const findUserByEmailAddress = (email) => model.findOne({ email: email });

// Fetch attempts for a specific quiz and user
export const findAttemptsForQuiz = async (userId, quizId) => {
    try {
        const user = await User.findOne(
            { _id: userId, 'quizAttempts.quizId': quizId },
            { 'quizAttempts.$': 1 }
        );
        return user ? user.quizAttempts[0] : null;
    } catch (error) {
        throw new Error('Error fetching quiz attempts: ' + error.message);
    }
};

// Update or add a new attempt for a specific quiz and user
export const updateQuizAttempt = async (userId, quizId, attemptData) => {
    try {
        const { attemptNumber, answers, score } = attemptData;

        const user = await model.findOneAndUpdate(
            { _id: userId, 'quizAttempts.quizId': quizId },
            {
                $push: {
                    'quizAttempts.$.attempts': {
                        attemptNumber,
                        answers,
                        score,
                    }
                },
                $inc: {
                    'quizAttempts.$.totalAttempts': 1
                }
            },
            { new: true, upsert: true }
        );

        if (!user) {
            // If the user or quiz attempt is not found, create it
            const newAttempt = {
                quizId,
                attempts: [{ attemptNumber, answers, score }],
                totalAttempts: 1
            };

            const updatedUser = await model.findByIdAndUpdate(
                userId,
                { $push: { quizAttempts: newAttempt } },
                { new: true, upsert: true }
            );

            return updatedUser;
        } else {
            return user;
        }
    } catch (error) {
        throw new Error('Error updating quiz attempts: ' + error.message);
    }
};