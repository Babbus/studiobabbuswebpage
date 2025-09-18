"use client";

import { useState } from "react";
import { siteMeta } from "@/content/site";

export default function ContactModal({ open, onClose, serviceTitle }: { open: boolean; onClose: () => void; serviceTitle?: string }) {
  const [status, setStatus] = useState<"idle" | "sent">("idle");
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm grid place-items-center p-4" onClick={onClose}>
      <div className="w-full max-w-lg bg-black/70 border border-white/10 rounded-xl p-5" onClick={(e) => e.stopPropagation()}>
        <div className="text-base font-semibold mb-3">Contact — {serviceTitle ?? "Inquiry"}</div>
        <form
          className="grid gap-3"
          onSubmit={(e) => {
            e.preventDefault();
            const form = e.currentTarget as HTMLFormElement;
            const data = new FormData(form);
            const subject = encodeURIComponent(`Inquiry${serviceTitle ? `: ${serviceTitle}` : ""}`);
            const body = encodeURIComponent(
              `Service: ${serviceTitle ?? "General"}\nName: ${data.get("name")}\nCompany: ${data.get("company") || "-"}\nEmail: ${data.get("email")}\n\nMessage:\n${data.get("message")}`
            );
            window.location.href = `mailto:${siteMeta.email}?subject=${subject}&body=${body}`;
            setStatus("sent");
          }}
        >
          <div className="grid sm:grid-cols-2 gap-3">
            <label className="grid gap-1 text-sm">
              <span>Name</span>
              <input name="name" required className="bg-transparent border border-white/15 rounded px-3 py-2" />
            </label>
            <label className="grid gap-1 text-sm">
              <span>Company</span>
              <input name="company" className="bg-transparent border border-white/15 rounded px-3 py-2" />
            </label>
          </div>
          <label className="grid gap-1 text-sm">
            <span>Email</span>
            <input type="email" name="email" required className="bg-transparent border border-white/15 rounded px-3 py-2" />
          </label>
          <label className="grid gap-1 text-sm">
            <span>Message</span>
            <textarea name="message" rows={5} required className="bg-transparent border border-white/15 rounded px-3 py-2" />
          </label>
          <div className="flex items-center gap-3 mt-1">
            <button className="rounded-full border border-white/10 bg-teal-500/20 text-teal-200 hover:bg-teal-500/30 px-5 py-2 text-sm">
              Send Email
            </button>
            <a href="/contact" className="text-sm underline underline-offset-4 opacity-80 hover:opacity-100">Go to contact page</a>
          </div>
          {status === "sent" && <div className="text-xs opacity-70 mt-2">Your email client should open. If not, write to {siteMeta.email}.</div>}
        </form>
        <button className="absolute top-3 right-3 text-sm opacity-80 hover:opacity-100" onClick={onClose} aria-label="Close">✕</button>
      </div>
    </div>
  );
} 