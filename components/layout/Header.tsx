"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { nav } from "@/lib/site";
import { Mark } from "@/components/ui/Mark";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="sticky top-0 z-40 border-b border-line/70 bg-obsidian/85 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-[1320px] items-center gap-3 px-4 sm:gap-6 sm:px-5 md:h-16 md:px-8">
        <Link href="/" className="flex items-center gap-2.5 text-ink" onClick={() => setOpen(false)}>
          <Mark className="h-6 w-6" />
          <span className="hidden whitespace-nowrap font-display text-[15px] font-semibold tracking-tight min-[380px]:inline">De Puno al mundo</span>
        </Link>

        <nav aria-label="Principal" className="ml-auto hidden items-center gap-1 lg:flex">
          {nav.map((item) => {
            const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`rounded-md px-3 py-2 text-sm transition-colors ${
                  active ? "text-ink" : "text-muted hover:text-ink"
                }`}
              >
                {item.label}
                {active && <span className="mt-0.5 block h-px bg-gold" />}
              </Link>
            );
          })}
        </nav>

        <Link
          href="/oportunidades"
          className="ml-auto whitespace-nowrap rounded-full bg-gold px-3.5 py-1.5 text-[13px] sm:px-4 sm:text-sm font-semibold text-obsidian transition hover:bg-[#f6c988] lg:ml-2"
          onClick={() => setOpen(false)}
        >
          <span className="sm:hidden">Oportunidades</span>
          <span className="hidden sm:inline">Explorar oportunidades</span>
        </Link>

        <button
          type="button"
          className="-mr-2 rounded-md p-2 text-muted hover:text-ink lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {open && (
        <nav id="mobile-nav" aria-label="Principal móvil" className="border-t border-line bg-obsidian lg:hidden">
          <ul className="mx-auto max-w-[1320px] px-5 py-3">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between border-b border-line/60 py-3.5 font-display text-xl text-ink last:border-0"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/ponente" onClick={() => setOpen(false)} className="block py-3.5 font-display text-xl text-ink">
                Ponente
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
