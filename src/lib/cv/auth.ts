import { createHmac, scryptSync, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

export const CV_SESSION_COOKIE = "ch_cv_session";
export const CV_SESSION_TTL_SECONDS = 60 * 60 * 12;

const AUTH_USERNAME = process.env.CV_AUTH_USERNAME ?? "c.hincapie";
const PASSWORD_SALT = process.env.CV_AUTH_SALT ?? "c87a34c09eade8a70275576deca54f6c";
const PASSWORD_HASH =
  process.env.CV_AUTH_HASH ??
  "ff1a37e99213989b166d3fa8b5e7efff0611310698dd0ee8539b67abd2fd228818ba72dde5dd8839bb44e9059ab624bbd6993c88c3aca42904c8ad3d73969e00";
// Secret used to sign the session token. Override in production:
const AUTH_SECRET = process.env.CV_AUTH_SECRET ?? "dev-cv-secret-change-me";

interface SessionPayload {
  u: string;
  exp: number;
}

function hashPassword(password: string): Buffer {
  return scryptSync(password, PASSWORD_SALT, 64);
}

export function verifyCredentials(username: string, password: string): boolean {
  if (typeof username !== "string" || typeof password !== "string") return false;
  if (username !== AUTH_USERNAME) return false;
  try {
    const a = hashPassword(password);
    const b = Buffer.from(PASSWORD_HASH, "hex");
    return a.length === b.length && timingSafeEqual(a, b);
  } catch {
    return false;
  }
}

function base64url(input: string): string {
  return Buffer.from(input, "utf8").toString("base64url");
}

function sign(data: string): string {
  return createHmac("sha256", AUTH_SECRET).update(data).digest("base64url");
}

export function signSession(username: string): string {
  const payload: SessionPayload = {
    u: username,
    exp: Date.now() + CV_SESSION_TTL_SECONDS * 1000,
  };
  const body = base64url(JSON.stringify(payload));
  return `${body}.${sign(body)}`;
}

export function verifySessionToken(token: string | undefined | null): SessionPayload | null {
  if (!token) return null;
  const dot = token.lastIndexOf(".");
  if (dot <= 0) return null;
  const body = token.slice(0, dot);
  const sig = token.slice(dot + 1);
  const expected = sign(body);
  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return null;
  try {
    const payload = JSON.parse(Buffer.from(body, "base64url").toString("utf8")) as SessionPayload;
    if (typeof payload.u !== "string" || typeof payload.exp !== "number") return null;
    if (payload.exp < Date.now()) return null;
    return payload;
  } catch {
    return null;
  }
}

export async function getSessionUser(): Promise<string | null> {
  const store = await cookies();
  const payload = verifySessionToken(store.get(CV_SESSION_COOKIE)?.value);
  return payload?.u ?? null;
}