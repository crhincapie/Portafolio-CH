import { NextResponse } from "next/server";
import { CV_SESSION_COOKIE, CV_SESSION_TTL_SECONDS, signSession, verifyCredentials } from "@/lib/cv/auth";

export async function POST(request: Request) {
  let body: { username?: unknown; password?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, message: "Solicitud inválida" }, { status: 400 });
  }

  const { username, password } = body;

  if (!verifyCredentials(String(username ?? ""), String(password ?? ""))) {
    return NextResponse.json({ ok: false, message: "Credenciales incorrectas" }, { status: 401 });
  }

  const token = signSession(String(username));
  const response = NextResponse.json({ ok: true });
  response.cookies.set({
    name: CV_SESSION_COOKIE,
    value: token,
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: CV_SESSION_TTL_SECONDS,
  });
  return response;
}