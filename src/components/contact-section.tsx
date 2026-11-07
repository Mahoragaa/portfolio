"use client";

import { useState, type FormEvent } from "react";
import { site } from "@/content/content";
import { useHighlight } from "@/components/highlight-context";

type SubmitState = "idle" | "submitting" | "success" | "error";

export function ContactSection() {
  const { showToast } = useHighlight();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [botField, setBotField] = useState("");
  const [status, setStatus] = useState<SubmitState>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(site.email);
      showToast(`Copied ${site.email} to clipboard`);
    } catch {
      showToast(site.email);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage(null);

    // Honeypot check
    if (botField.trim().length > 0) {
      setStatus("success");
      return;
    }

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedMsg = message.trim();

    if (trimmedName.length < 2) {
      setErrorMessage("Please enter your name.");
      setStatus("error");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      setErrorMessage("Please enter a valid email address.");
      setStatus("error");
      return;
    }
    if (trimmedMsg.length < 10) {
      setErrorMessage("Please write a message of at least 10 characters.");
      setStatus("error");
      return;
    }

    setStatus("submitting");
    const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;

    if (accessKey) {
      try {
        const res = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            access_key: accessKey,
            name: trimmedName,
            email: trimmedEmail,
            message: trimmedMsg,
            subject: `Portfolio inquiry from ${trimmedName}`,
          }),
        });
        const data = (await res.json()) as { success?: boolean; message?: string };
        if (res.ok && data.success) {
          setStatus("success");
          setName("");
          setEmail("");
          setMessage("");
          showToast("Message sent — thank you!");
          return;
        }
        throw new Error(data.message || "Submission failed");
      } catch (err) {
        setStatus("error");
        setErrorMessage(
          err instanceof Error
            ? `${err.message}. You can also email me directly at ${site.email}.`
            : `Could not send right now. Please email ${site.email}.`
        );
        return;
      }
    }

    // Graceful mailto fallback when NEXT_PUBLIC_WEB3FORMS_KEY isn't configured yet
    const subject = encodeURIComponent(`Portfolio inquiry from ${trimmedName}`);
    const body = encodeURIComponent(
      `Name: ${trimmedName}\nEmail: ${trimmedEmail}\n\n${trimmedMsg}`
    );
    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
    setStatus("success");
    showToast("Opened your email client with the pre-filled message.");
  };

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="scroll-mt-20 py-20 sm:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-12">
          {/* Left column: human pitch & direct links */}
          <div className="space-y-6 lg:col-span-5">
            <div>
              <p className="font-mono text-xs uppercase tracking-widest text-accent">
                {"// 05 — Contact"}
              </p>
              <h2
                id="contact-heading"
                className="mt-2 font-display text-3xl font-bold tracking-tight text-text sm:text-4xl"
              >
                Let’s talk about AI, Cloud, or Backend roles.
              </h2>
            </div>

            <p className="text-sm leading-relaxed text-muted sm:text-base">
              I’m seeking software developer roles in AI, Generative AI, cloud,
              and backend engineering. Whether you want to discuss a role,
              walk through one of the repositories above, or talk PL/SQL and
              serverless architectures—my inbox is open.
            </p>

            {/* Direct contact cards */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between gap-3 rounded-2xl border border-line bg-surface p-4">
                <div className="min-w-0">
                  <p className="font-mono text-[11px] uppercase tracking-wider text-muted">
                    Direct Email
                  </p>
                  <a
                    href={`mailto:${site.email}`}
                    className="mt-0.5 block truncate font-mono text-sm font-medium text-text hover:text-accent"
                  >
                    {site.email}
                  </a>
                </div>
                <button
                  type="button"
                  onClick={copyEmail}
                  className="shrink-0 rounded-full border border-accent-border bg-accent-dim px-3.5 py-1.5 font-mono text-xs font-medium text-accent transition-colors hover:bg-accent hover:text-accent-ink"
                >
                  Copy email
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <a
                  href={site.links.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between rounded-2xl border border-line bg-surface p-4 font-mono text-xs text-text transition-colors hover:border-accent-border"
                >
                  <span>LinkedIn</span>
                  <span className="text-accent">↗</span>
                </a>
                <a
                  href={site.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between rounded-2xl border border-line bg-surface p-4 font-mono text-xs text-text transition-colors hover:border-accent-border"
                >
                  <span>GitHub (@{site.links.githubUser})</span>
                  <span className="text-accent">↗</span>
                </a>
              </div>

              <a
                href={site.resume}
                download="Raghav_Arora_Resume.pdf"
                className="flex items-center justify-between rounded-2xl border border-line bg-elevated/60 p-4 font-mono text-xs text-text transition-colors hover:border-accent-border"
              >
                <span>Download Web-Safe Résumé (PDF, phone redacted)</span>
                <span className="text-accent">↓</span>
              </a>
            </div>
          </div>

          {/* Right column: Validated contact form with honeypot */}
          <div className="rounded-3xl border border-line bg-surface p-6 sm:p-8 lg:col-span-7">
            <h3 className="font-display text-xl font-bold text-text">
              Send a message
            </h3>
            <p className="mt-1 text-xs text-muted">
              Protected by client-side validation and a honeypot field.
            </p>

            <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-4">
              {/* Honeypot field — hidden from humans & screen readers */}
              <div className="hidden" aria-hidden="true">
                <label htmlFor="contact-company-website">
                  Leave this field blank
                </label>
                <input
                  id="contact-company-website"
                  type="text"
                  name="botcheck"
                  tabIndex={-1}
                  autoComplete="off"
                  value={botField}
                  onChange={(e) => setBotField(e.target.value)}
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="contact-name"
                    className="block font-mono text-xs text-text"
                  >
                    Name <span className="text-accent">*</span>
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    required
                    autoComplete="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    className="mt-1.5 w-full rounded-xl border border-line bg-bg px-3.5 py-2.5 text-sm text-text placeholder:text-muted/60 focus:border-accent"
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-email"
                    className="block font-mono text-xs text-text"
                  >
                    Email <span className="text-accent">*</span>
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@company.com"
                    className="mt-1.5 w-full rounded-xl border border-line bg-bg px-3.5 py-2.5 text-sm text-text placeholder:text-muted/60 focus:border-accent"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="contact-message"
                  className="block font-mono text-xs text-text"
                >
                  Message <span className="text-accent">*</span>
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={4}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell me about the role, team, or project..."
                  className="mt-1.5 w-full rounded-xl border border-line bg-bg px-3.5 py-2.5 text-sm text-text placeholder:text-muted/60 focus:border-accent"
                />
              </div>

              {status === "error" && errorMessage && (
                <p
                  role="alert"
                  className="rounded-xl border border-red-500/40 bg-red-500/10 px-3.5 py-2.5 font-mono text-xs text-red-300"
                >
                  {errorMessage}
                </p>
              )}

              {status === "success" && (
                <p
                  role="status"
                  className="rounded-xl border border-accent-border bg-accent-dim px-3.5 py-2.5 font-mono text-xs text-accent"
                >
                  Thanks for reaching out — your message is on its way.
                </p>
              )}

              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 font-mono text-xs font-semibold text-accent-ink transition-transform hover:-translate-y-0.5 disabled:opacity-60"
                >
                  <span>
                    {status === "submitting" ? "Sending..." : "Send message →"}
                  </span>
                </button>
                <span className="font-mono text-[11px] text-muted">
                  Or email{" "}
                  <a
                    href={`mailto:${site.email}`}
                    className="text-text underline underline-offset-4 hover:text-accent"
                  >
                    {site.email}
                  </a>
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
