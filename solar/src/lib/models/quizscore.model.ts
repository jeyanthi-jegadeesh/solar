import mongoose from 'mongoose';

// QuizScores Collection

const quizScoresSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    totalQuestionsAnswered: { type: Number, required: true },
    totalQuestionsCorrectlyAnswered: { type: Number, required: true },
    totalQuizzesCompleted: { type: Number, required: true },
});

export default mongoose.models.QuizScores || mongoose.model("QuizScores", quizScoresSchema);
