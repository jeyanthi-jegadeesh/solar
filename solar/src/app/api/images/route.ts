import { NextApiRequest, NextApiResponse } from "next";
import connectDB from "../../../lib/dbConnect";
import Image from "../../../lib/models/image.model";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  await connectDB();

  try {
    const images = await Image.find({}); // find all the data in our database
    console.log(images);
    return NextResponse.json({ success: true, data: images });
  } catch (error) {
    return NextResponse.json({ success: false });
  }
}

export async function POST(req: NextRequest, res: NextResponse) {
  await connectDB();

  try {
    const image = await Image.create(req.body); // create a new model in the database
    return NextResponse.json({ success: true, data: image });
  } catch (error) {
    return NextResponse.json({ success: false });
  }
}