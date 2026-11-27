"use client";

import { useState } from "react";
import { Check, Link2 } from "lucide-react";

export function ShareActions({ title, path }: { title: string; path: string }) {
  const [copied, setCopied] = useState(false);
  const url = () => `${window.location.origin}${path}`;

  const whatsapp = () => {
    const text = `${title}\n${url()}\n\nVía De Puno al mundo`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank", "noopener,noreferrer");
  };
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.prompt("Copia este enlace:", url());
    }
  };
  return (
    <div className="flex flex-wrap gap-2">
      <button type="button" onClick={whatsapp} className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 text-[14px] text-ink hover:border-mint/60">
        <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden fill="#66E3B4">
          <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.2-.4.7-1.4.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.1.6.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.1-.3-.2-.5-.3Z" />
        </svg>
        Compartir por WhatsApp
      </button>
      <button type="button" onClick={copy} className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 text-[14px] text-ink hover:border-cyan/60">
        {copied ? <Check size={16} className="text-mint" /> : <Link2 size={16} />}
        {copied ? "Enlace copiado" : "Copiar enlace"}
      </button>
    </div>
  );
}
