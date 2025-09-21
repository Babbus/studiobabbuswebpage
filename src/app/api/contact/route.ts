import { NextResponse } from "next/server";

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const RATE_LIMIT_MAX = 5; // max requests per IP per window
const ipToRequestLog = new Map<string, number[]>();

function getClientIp(req: Request): string {
  const xff = req.headers.get("x-forwarded-for") || "";
  const first = xff.split(",")[0]?.trim();
  return first || "unknown";
}

function isRateLimited(req: Request): boolean {
  const now = Date.now();
  const ip = getClientIp(req);
  const log = ipToRequestLog.get(ip) || [];
  const fresh = log.filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
  if (fresh.length >= RATE_LIMIT_MAX) {
    ipToRequestLog.set(ip, fresh);
    return true;
  }
  fresh.push(now);
  ipToRequestLog.set(ip, fresh);
  return false;
}

function sanitizeSingleLine(input: string, max = 200): string {
  return String(input || "").replace(/[\r\n]+/g, " ").trim().slice(0, max);
}

function sanitizeMultiline(input: string, max = 5000): string {
  return String(input || "").toString().slice(0, max);
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isOriginAllowed(req: Request): boolean {
  const allowed = process.env.ALLOWED_ORIGIN || process.env.NEXT_PUBLIC_SITE_URL;
  const origin = req.headers.get("origin") || req.headers.get("referer") || "";
  // Allow localhost during development
  if (origin.startsWith("http://localhost") || origin.startsWith("http://127.0.0.1")) return true;
  if (!allowed) return true;
  try {
    const allowedUrl = new URL(allowed);
    const requestUrl = new URL(origin);
    return requestUrl.origin === allowedUrl.origin;
  } catch {
    return false;
  }
}

export async function POST(req: Request) {
  try {
    if (!isOriginAllowed(req)) {
      return NextResponse.json({ ok: false, error: "Forbidden" }, { status: 403 });
    }

    if (isRateLimited(req)) {
      // Do not reveal rate limit details
      return NextResponse.json({ ok: true });
    }

    const RESEND_API_KEY = process.env.RESEND_API_KEY;
    if (!RESEND_API_KEY) {
      // Avoid leaking configuration to clients
      return NextResponse.json({ ok: true });
    }

    const body = await req.json();
    const { name, company, email, budget, timeline, message, website, hp } = body || {};

    // Honeypot fields: if filled, silently accept
    if ((typeof website === "string" && website.trim() !== "") || (typeof hp === "string" && hp.trim() !== "")) {
      return NextResponse.json({ ok: true });
    }

    const safeName = sanitizeSingleLine(name, 100);
    const safeCompany = sanitizeSingleLine(company, 120);
    const safeEmail = sanitizeSingleLine(email, 200);
    const safeBudget = sanitizeSingleLine(budget, 60);
    const safeTimeline = sanitizeSingleLine(timeline, 60);
    const safeMessage = sanitizeMultiline(message, 5000);

    if (!safeEmail || !isValidEmail(safeEmail)) {
      return NextResponse.json({ ok: false, error: "Invalid input" }, { status: 400 });
    }

    const subject = `New inquiry from ${safeName || "(no name)"}`;
    const content = `Name: ${safeName || "-"}\nCompany: ${safeCompany || "-"}\nEmail: ${safeEmail || "-"}\nBudget: ${safeBudget || "-"}\nTimeline: ${safeTimeline || "-"}\n\nMessage:\n${safeMessage || "-"}`;

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM || "no-reply@resend.dev",
        to: ["babbusbatu@gmail.com"],
        subject,
        text: content,
      }),
    });

    if (!res.ok) {
      // Intentionally do not leak upstream error details
      return NextResponse.json({ ok: true });
    }

    return NextResponse.json({ ok: true });
  } catch (e: unknown) {
    return NextResponse.json({ ok: true });
  }
} 