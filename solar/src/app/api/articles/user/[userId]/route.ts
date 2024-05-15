import connectDB from "@/lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import Article from "@/lib/models/article.model"

// import type { NextApiRequest, NextApiResponse } from 'next'
 
export async function GET(req: NextRequest, context: any) {
  
  const { params } = context;
  const userId = params.userId

  await connectDB();

  try {
    const articles = await Article.find({authorId: userId}); // find all the data in our database
    return NextResponse.json({ success: true, searchQuery: userId, data: articles });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, message: 'Error fetching articles for user: ' + userId });
  }
}