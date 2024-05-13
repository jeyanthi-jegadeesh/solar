import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String
  }
}, { timestamps: true })

const User = mongoose.models.User || mongoose.model("User", userSchema)

export default User