import  dbConnect  from "../../../../lib/db";
import User from "../../../../lib/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
export async function POST(req : NextRequest) {
  try {
    console.log("registering user...")
    
    const { firstName, lastName, email, password } = await req.json();
    console.log("registering user...", firstName, lastName, email, password)
    const hashedPassword = await bcrypt.hash(password, 10);
    await dbConnect();
    await User.create({ firstName, lastName, email, password: hashedPassword });

    return NextResponse.json({ message: "User registered." }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "An error occurred while registering the user." },
      { status: 500 }
    );
  }
}