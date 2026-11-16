"use client";
import { startTransition, useActionState, useSyncExternalStore } from "react";
import { Loader2, Send } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

type FormState = {
  status: "idle" | "success" | "error";
  message?: string;
  submittedAt?: number;
};

async function sendMessage(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  try {
    const res = await fetch("/api/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(Object.fromEntries(formData)),
    });
    if (res.ok) {
      return {
        status: "success",
        message: "Message sent successfully!",
        submittedAt: Date.now(),
      };
    }
    const data = await res.json();
    return {
      status: "error",
      message: data.error || "Failed to send message.",
    };
  } catch (err) {
    return { status: "error", message: "Failed to send message." + err };
  }
}

const fieldLabel = "text-sm font-medium";

const noopSubscribe = () => () => {};

/** `false` during SSR and hydration, `true` once mounted on the client. */
function useHydrated() {
  return useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false,
  );
}

/**
 * Same-size stand-in rendered on the server. It contains no <input>s, so
 * autofill / password-manager extensions have nothing to inject into before
 * React hydrates (which would otherwise cause a hydration mismatch).
 */
function ContactFormPlaceholder() {
  const field = "border-input dark:bg-input/30 rounded-md border shadow-xs";
  return (
    <div aria-hidden className="flex flex-col gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <span className={fieldLabel}>Name</span>
          <div className={cn(field, "h-11")} />
        </div>
        <div className="flex flex-col gap-2">
          <span className={fieldLabel}>Email</span>
          <div className={cn(field, "h-11")} />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <span className={fieldLabel}>Message</span>
        <div className={cn(field, "h-36")} />
      </div>
      <div className="flex justify-end">
        <div className="bg-primary/80 h-11 w-40 rounded-full" />
      </div>
    </div>
  );
}

export default function ContactForm() {
  const hydrated = useHydrated();
  return hydrated ? <ContactFormFields /> : <ContactFormPlaceholder />;
}

function ContactFormFields() {
  const [state, formAction, pending] = useActionState(sendMessage, {
    status: "idle",
  });

  return (
    <form
      onSubmit={(e) => {
        // Submit manually so the fields are kept when sending fails.
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        startTransition(() => formAction(formData));
      }}
      className="flex flex-col gap-5"
      autoComplete="off"
      aria-label="Contact form"
      // Remount (and thereby clear) the fields after a successful submission.
      key={state.submittedAt}
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="flex flex-col gap-2">
          <span className={fieldLabel}>Name</span>
          <Input
            name="name"
            type="text"
            required
            placeholder="Your name"
            className="h-11"
          />
        </label>
        <label className="flex flex-col gap-2">
          <span className={fieldLabel}>Email</span>
          <Input
            name="email"
            type="email"
            required
            placeholder="you@example.com"
            className="h-11"
          />
        </label>
      </div>
      <label className="flex flex-col gap-2">
        <span className={fieldLabel}>Message</span>
        <textarea
          name="message"
          required
          rows={6}
          placeholder="Your message"
          className="border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 dark:bg-input/30 field-sizing-content min-h-36 w-full resize-y rounded-md border bg-transparent px-3 py-2.5 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] md:text-sm"
        />
      </label>

      <div className="flex flex-col-reverse items-start justify-between gap-4 sm:flex-row sm:items-center">
        <p
          role="status"
          aria-live="polite"
          className={cn(
            "text-sm",
            state.status === "success" && "text-success",
            state.status === "error" && "text-destructive",
          )}
        >
          {state.message}
        </p>
        <Button
          type="submit"
          size="lg"
          className="h-11 rounded-full px-6 sm:ml-auto"
          disabled={pending}
        >
          {pending ? <Loader2 className="animate-spin" /> : <Send />}
          {pending ? "Sending..." : "Send Message"}
        </Button>
      </div>
    </form>
  );
}
