import connectDB from "@/../lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import Article from "@/../lib/models/article.model"

// import type { NextApiRequest, NextApiResponse } from 'next'
 
export async function GET(req: NextRequest, context: any) {
  
  const { params } = context;
  const searchName = params.planetName
  const planetName = searchName.toLowerCase();
  
  await connectDB();

  try {
    const articles = await Article.find({associatedPlanets: planetName}); // find all the data in our database
    return NextResponse.json({ success: true, searchQuery: planetName, data: articles });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, message: 'Error fetching articles for ' + planetName });
  }
}