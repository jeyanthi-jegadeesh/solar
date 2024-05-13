import connectDB from "../../../../lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import Planet from "@/lib/models/planet.model";

// import type { NextApiRequest, NextApiResponse } from 'next'
 
export async function GET(req: NextRequest, context: any) {
  
  const { params } = context;
  const planetName = params.planetName

  await connectDB();

  try {
    const planets = await Planet.find({name: planetName}); // find all the data in our database
    return NextResponse.json({ success: true, searchQuery: planetName, data: planets });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, message: 'Error fetching planets' });
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