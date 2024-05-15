import mongoose from 'mongoose';

// Images Collection

const imageSchema = new mongoose.Schema({
    public_id: { type: String, required: true },
    URL: { type: String, required: true },
    associatedArticles: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Article' }],
    associatedPlanets: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Planet' }],
    uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

export default mongoose.models.Image || mongoose.model("Image", imageSchema);