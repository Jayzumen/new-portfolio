import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const rateLimitWindowMs = 10 * 60 * 1000;
const maxRequestsPerWindow = 5;
const ipRequestMap = new Map<string, { count: number; firstRequest: number }>();

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function getClientIp(req: Request) {
  const xff = req.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0].trim();
  return "unknown";
}

function isRateLimited(ip: string) {
  const now = Date.now();
  const entry = ipRequestMap.get(ip);

  if (!entry || now - entry.firstRequest >= rateLimitWindowMs) {
    ipRequestMap.set(ip, { count: 1, firstRequest: now });
    return false;
  }
  if (entry.count >= maxRequestsPerWindow) return true;
  entry.count++;
  return false;
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

export async function POST(req: Request) {
  if (isRateLimited(getClientIp(req))) {
    return Response.json(
      { error: "Too many requests. Please try again later." },
      { status: 429 },
    );
  }

  try {
    const body = (await req.json()) as Record<string, unknown>;
    const name = String(body.name ?? "").trim();
    const email = String(body.email ?? "").trim();
    const message = String(body.message ?? "").trim();

    if (!name || !message || !EMAIL_PATTERN.test(email)) {
      return Response.json({ error: "Invalid form data." }, { status: 400 });
    }

    const { error } = await resend.emails.send({
      from: "Contact Form <onboarding@resend.dev>",
      to: ["jnreinhardt96@gmail.com"],
      subject: `New Contact Form Submission from ${name}`,
      replyTo: email,
      html: `<p><strong>Name:</strong> ${escapeHtml(name)}</p><p><strong>Email:</strong> ${escapeHtml(email)}</p><p><strong>Message:</strong><br/>${escapeHtml(message).replaceAll("\n", "<br/>")}</p>`,
    });

    if (error) {
      return Response.json(
        { error: error.message || "Unknown error" },
        { status: 500 },
      );
    }

    return Response.json({ success: true });
  } catch (error) {
    return Response.json(
      { error: error instanceof Error ? error.message : JSON.stringify(error) },
      { status: 500 },
    );
  }
}
