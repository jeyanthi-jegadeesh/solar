export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
import  dbConnect  from "../../../../lib/db";
import User from "../../../../lib/models/user.model";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req : NextRequest) {
  try {
    await dbConnect();
    const url = new URL(req.url);
    const email = url.searchParams.get("email")
    const user = await User.findOne({ email }).select("-password");
    return NextResponse.json(user);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ success: false });
  }
}
