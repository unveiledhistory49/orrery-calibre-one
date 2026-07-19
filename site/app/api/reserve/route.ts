import { NextResponse } from "next/server";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
  let body: any;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }
  const email = (body?.email ?? "").toString().trim();
  const ref = (body?.ref ?? "").toString().trim();

  if (!EMAIL_RE.test(email)) {
    return NextResponse.json(
      { ok: false, error: "That doesn't look like an email." },
      { status: 422 }
    );
  }
  if (ref && ref.length > 32) {
    return NextResponse.json({ ok: false, error: "Bad reference." }, { status: 422 });
  }

  // No persistence layer in scope — acknowledge the request and return a waitlist
  // position. In production this would write to a store or trigger an email.
  return NextResponse.json({
    ok: true,
    email,
    ref: ref || "C1-039-TI",
    message: "WAITLIST SPOT RECEIVED",
  });
}
