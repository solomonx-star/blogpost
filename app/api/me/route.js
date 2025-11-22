import { NextResponse } from "next/server";
import { verifyToken } from "../../../lib/auth";

export async function GET(request) {
  try {
    const cookie = request.cookies.get("authToken")?.value;
    if (!cookie)
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

    const user = verifyToken(cookie);
    if (!user)
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });

    return NextResponse.json({ user });
  } catch (err) {
    console.error("Authentication error:", err);

    if (err.name === "JsonWebTokenError" || err.name === "TokenExpiredError")
      return NextResponse.json(
        { error: "Invalid or expired token" },
        { status: 401 }
      );

    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
