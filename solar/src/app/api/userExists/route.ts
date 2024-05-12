import  dbConnect  from "../../../../lib/db";
import User from "../../../../lib/models/user.model";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req : NextRequest) {
  try {
    await dbConnect();
    const { email } = await req.json();
    const user = await User.findOne({ email });
    return NextResponse.json({ user });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ success: false });
  }
}
