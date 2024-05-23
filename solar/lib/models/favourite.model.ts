import mongoose from 'mongoose';

// Favourites Collection

const favouritesSchema = new mongoose.Schema({
    userId: { type: Number, ref: 'User', required: true },
    favArticles: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Article' }], // array of articles with reference to the ArticleSchema
    favPlanets: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Planet' }], // siehe oben
    favImages: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Image' }], 
});

export default mongoose.models.Favourites || mongoose.model("Favourites", favouritesSchema);