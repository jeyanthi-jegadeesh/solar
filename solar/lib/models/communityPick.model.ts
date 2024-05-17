import mongoose from 'mongoose';

// CommunityPicks Collection

const communityPickSchema = new mongoose.Schema({
    type: { type: String, enum: ['article', 'image'], required: true },
}, { timestamps: true });

export default mongoose.models.CommunityPick || mongoose.model("CommunityPick", communityPickSchema);