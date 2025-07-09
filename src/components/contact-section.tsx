"use client";
import { useEffect, useRef, useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

export default function ContactSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const observer = new window.IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.2 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setSuccess(null);
    setError(null);
    const form = e.currentTarget;
    const formData = new FormData(form);
    const name = formData.get("name");
    const email = formData.get("email");
    const message = formData.get("message");
    try {
      const res = await fetch("/api/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });
      if (res.ok) {
        setSuccess("Message sent successfully!");
        form.reset();
      } else {
        const data = await res.json();
        setError(data.error || "Failed to send message.");
      }
    } catch (err) {
      setError("Failed to send message." + err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section
      id="contact"
      className="bg-background py-16"
      aria-label="Contact section"
    >
      <div
        ref={ref}
        className={`mx-auto max-w-xl px-4 transition-opacity duration-1000 ${visible ? "animate-fade-in opacity-100" : "opacity-0"}`}
      >
        <h2 className="mb-8 text-center text-3xl font-semibold">Contact</h2>
        <form
          className="flex flex-col gap-6"
          autoComplete="off"
          aria-label="Contact form"
          onSubmit={handleSubmit}
        >
          <label className="flex flex-col gap-2">
            <span className="text-base font-medium">Name</span>
            <Input name="name" type="text" required placeholder="Your name" />
          </label>
          <label className="flex flex-col gap-2">
            <span className="text-base font-medium">Email</span>
            <Input
              name="email"
              type="email"
              required
              placeholder="you@example.com"
            />
          </label>
          <label className="flex flex-col gap-2">
            <span className="text-base font-medium">Message</span>
            <textarea
              name="message"
              required
              placeholder="Your message"
              className="border-input focus-visible:border-ring focus-visible:ring-ring/50 min-h-[120px] rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-colors outline-none focus-visible:ring-[3px]"
            />
          </label>
          <Button
            type="submit"
            size="lg"
            className="self-end"
            disabled={loading}
          >
            {loading ? "Sending..." : "Send Message"}
          </Button>
          {success && <p className="mt-2 text-sm text-green-600">{success}</p>}
          {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
        </form>
      </div>
    </section>
  );
}
