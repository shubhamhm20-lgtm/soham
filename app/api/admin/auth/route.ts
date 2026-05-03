import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const password = String(body?.password || "");
  const expected = process.env.ADMIN_PASSWORD || "admin123";

  if (password !== expected) {
    return NextResponse.json({ ok: false, error: "Invalid password" }, { status: 401 });
  }

  return NextResponse.json({ ok: true });
}
