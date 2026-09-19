import { NextResponse } from "next/server";
import { CV_SESSION_COOKIE } from "@/lib/cv/auth";

export async function POST() {
  const response = NextResponse.json({ ok: true });
  response.cookies.set({
    name: CV_SESSION_COOKIE,
    value: "",
    maxAge: 0,
    path: "/",
  });
  return response;
}

export async function GET() {
  return POST();
}