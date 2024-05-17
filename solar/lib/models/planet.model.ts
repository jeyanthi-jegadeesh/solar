import mongoose, { Document, Model, Schema } from 'mongoose';

// Define an interface for the Planet document
export interface IPlanet extends Document {
  name: string;
  description: string;
  planetData: object; // Assuming planetData is a JSON object
}

// Define the Planet schema
const planetSchema: Schema<IPlanet> = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    planetData: { type: Object, required: true }, // JSON data
  },
  { timestamps: true }
);

// Create the Planet model
const Planet: Model<IPlanet> = mongoose.models.Planet || mongoose.model<IPlanet>('Planet', planetSchema);

export default Planet;