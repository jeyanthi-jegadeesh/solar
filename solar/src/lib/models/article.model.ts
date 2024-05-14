import mongoose from 'mongoose';

// Articles Collection

const articleSchema = new mongoose.Schema({
    authorId: { type: Number , required: true }, // type:  mongoose.Schema.Types.ObjectId
    isPrivate: { type: Boolean, default: false },
    title: { type: String, required: true },
    subtitle: { type: String },
    titleImage: { type: String },
    articleBody: { type: String, required: true },
    associatedPlanets: [{ type: String, ref: 'Planet' }],
}, { timestamps: true });

export default mongoose.models.Article || mongoose.model("Article", articleSchema);