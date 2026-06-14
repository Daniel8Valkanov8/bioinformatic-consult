"use client";

import { useState } from "react";
import { bg } from "@/content/bg";

const FORM_NAME = "contact";

/** Кодира полетата като application/x-www-form-urlencoded за Netlify AJAX submit. */
function encode(data: Record<string, string>) {
  return Object.keys(data)
    .map((k) => encodeURIComponent(k) + "=" + encodeURIComponent(data[k]))
    .join("&");
}

export function ContactForm() {
  const t = bg.contact.form;
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">(
    "idle",
  );

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    const form = e.currentTarget;
    const formData = new FormData(form);
    const data: Record<string, string> = { "form-name": FORM_NAME };
    formData.forEach((value, key) => {
      data[key] = value.toString();
    });

    try {
      // Netlify приема POST към произволен path на статичния сайт.
      await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encode(data),
      });
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-bio/40 bg-surface p-8 text-center">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-bio/15 text-2xl text-bio">
          ✓
        </div>
        <p className="text-lg text-fg">{t.success}</p>
      </div>
    );
  }

  return (
    <form
      name={FORM_NAME}
      method="POST"
      data-netlify="true"
      data-netlify-honeypot="bot-field"
      onSubmit={handleSubmit}
      className="space-y-5 rounded-2xl border border-line bg-surface/60 p-6 sm:p-8"
    >
      {/* Скрити полета, нужни на Netlify Forms */}
      <input type="hidden" name="form-name" value={FORM_NAME} />
      <p className="hidden">
        <label>
          Не попълвайте това поле: <input name="bot-field" />
        </label>
      </p>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="name" label={t.name} required>
          <input
            id="name"
            name="name"
            type="text"
            required
            placeholder={t.namePlaceholder}
            className={inputClass}
          />
        </Field>
        <Field id="email" label={t.email} required>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder={t.emailPlaceholder}
            className={inputClass}
          />
        </Field>
      </div>

      <Field id="org" label={t.org}>
        <input
          id="org"
          name="organization"
          type="text"
          placeholder={t.orgPlaceholder}
          className={inputClass}
        />
      </Field>

      <Field id="serviceType" label={t.serviceType}>
        <select
          id="serviceType"
          name="serviceType"
          className={inputClass}
          defaultValue=""
        >
          <option value="" disabled>
            —
          </option>
          {t.serviceOptions.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </Field>

      <Field id="message" label={t.message} required>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          placeholder={t.messagePlaceholder}
          className={`${inputClass} resize-y`}
        />
      </Field>

      {status === "error" && (
        <p className="text-sm text-red-400">
          Възникна грешка при изпращането. Опитайте отново или ни пишете директно
          по имейл.
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full rounded-lg bg-bio px-6 py-3 text-sm font-semibold text-carbon transition-colors hover:bg-bio-soft disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
      >
        {status === "submitting" ? "Изпращане…" : t.submit}
      </button>

      <p className="text-xs text-faint">{t.privacyNote}</p>
    </form>
  );
}

const inputClass =
  "w-full rounded-lg border border-line bg-carbon px-4 py-3 text-sm text-fg placeholder:text-faint outline-none transition-colors focus:border-bio/60";

function Field({
  id,
  label,
  required = false,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm text-muted">
        {label}
        {required && <span className="ml-0.5 text-bio">*</span>}
      </label>
      {children}
    </div>
  );
}
