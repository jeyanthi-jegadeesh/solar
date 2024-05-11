import mongoose from 'mongoose';

// Users Collection -> this needs to be changed jeyanthi?

const userSchema = new mongoose.Schema({
    userName: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    userEmail: { type: String, required: true, unique: true },
    password: { type: String, required: true },
}, { timestamps: true });

export default mongoose.models.Users || mongoose.model("User", userSchema);