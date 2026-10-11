import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { users } from "@/db/schema";

export async function GET() {
  try {
    const userList = await db.select().from(users);
    return NextResponse.json({ users: userList });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}