import mongoose from 'mongoose';

// Articles Collection

const articleSchema = new mongoose.Schema({
    authorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    isPrivate: { type: Boolean, default: false },
    title: { type: String, required: true },
    subtitle: { type: String },
    articleBody: { type: String, required: true },
    associatedPlanets: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Planet' }],
}, { timestamps: true });

export default mongoose.models.Article || mongoose.model("Article", articleSchema);