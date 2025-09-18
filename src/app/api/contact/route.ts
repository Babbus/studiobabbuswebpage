import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const RESEND_API_KEY = process.env.RESEND_API_KEY;
    if (!RESEND_API_KEY) {
      return NextResponse.json({ ok: false, error: "Email service not configured" }, { status: 501 });
    }

    const body = await req.json();
    const { name, company, email, budget, timeline, message } = body || {};

    const subject = `New inquiry from ${name || "(no name)"}`;
    const content = `Name: ${name || "-"}\nCompany: ${company || "-"}\nEmail: ${email || "-"}\nBudget: ${budget || "-"}\nTimeline: ${timeline || "-"}\n\nMessage:\n${message || "-"}`;

    // Send via Resend HTTP API directly to avoid SDK dependency
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${RESEND_API_KEY}`,
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
      const err = await res.text();
      return NextResponse.json({ ok: false, error: err || "Failed to send" }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : typeof e === "string" ? e : "Unknown error";
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
} 