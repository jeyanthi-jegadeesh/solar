import connectDB from "@/../lib/dbConnect";
import Planet from "@/../lib/models/planet.model";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  await connectDB();

  try {
    const planets = await Planet.find({}); // find all the data in our database
    return NextResponse.json({ success: true, data: planets });
  } catch (error) {
    return NextResponse.json({ success: false });
  }
}

export async function POST(req: NextRequest, res: NextResponse) {
  await connectDB();

  try {
    const planet = await Planet.create(req.body); // create a new model in the database
    return NextResponse.json({ success: true, data: planet });
  } catch (error) {
    return NextResponse.json({ success: false });
  }
}