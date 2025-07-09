import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const rateLimitWindowMs = 10 * 60 * 1000;
const maxRequestsPerWindow = 5;
const ipRequestMap = new Map<string, { count: number; firstRequest: number }>();

function getClientIp(req: Request) {
  const xff = req.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0].trim();
  return "unknown";
}

export async function POST(req: Request) {
  const ip = getClientIp(req);
  const now = Date.now();
  const entry = ipRequestMap.get(ip);
  if (entry) {
    if (now - entry.firstRequest < rateLimitWindowMs) {
      if (entry.count >= maxRequestsPerWindow) {
        return new Response(
          JSON.stringify({
            error: `Too many requests. Please try again later.`,
          }),
          { status: 429, headers: { "Content-Type": "application/json" } },
        );
      }
      entry.count++;
    } else {
      ipRequestMap.set(ip, { count: 1, firstRequest: now });
    }
  } else {
    ipRequestMap.set(ip, { count: 1, firstRequest: now });
  }

  try {
    const { name, email, message } = await req.json();
    const { data, error } = await resend.emails.send({
      from: "Contact Form <onboarding@resend.dev>",
      to: ["jnreinhardt96@gmail.com"],
      subject: `New Contact Form Submission from ${name}`,
      reply_to: email,
      html: `<p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Message:</strong><br/>${message}</p>`,
    });

    if (error) {
      return Response.json(
        {
          error:
            typeof error === "string"
              ? error
              : error?.message || "Unknown error",
        },
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
