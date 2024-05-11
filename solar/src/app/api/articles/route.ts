import { NextApiRequest, NextApiResponse } from "next";
import connectDB from "../../../lib/dbConnect";
import Article from "../../../lib/models/article.model";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  await connectDB();

  try {
    const articles = await Article.find({}); // find all the data in our database
    console.log(articles);
    return NextResponse.json({ success: true, data: articles });
  } catch (error) {
    return NextResponse.json({ success: false });
  }
}

export async function POST(req: NextRequest, res: NextResponse) {
  await connectDB();

  try {
    const article = await Article.create(req.body); // create a new model in the database
    return NextResponse.json({ success: true, data: article });
  } catch (error) {
    return NextResponse.json({ success: false });
  }
}