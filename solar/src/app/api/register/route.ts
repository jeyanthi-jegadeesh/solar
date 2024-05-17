import  dbConnect  from "@/../lib/dbConnect";
import User from "@/../lib/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
export async function POST(req : NextRequest) {
  try {
    const { firstName, lastName, email, password } = await req.json();
    const hashedPassword = await bcrypt.hash(password, 10);
    await dbConnect();
    await User.create({ firstName, lastName, email, password: hashedPassword });
    return NextResponse.json({ message: "User registered." }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false });
  }
}
