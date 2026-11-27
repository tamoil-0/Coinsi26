"use client";

import { Bookmark, BookmarkCheck } from "lucide-react";
import { useLocalSet } from "@/hooks/useLocalSet";

export function SaveButton({ slug }: { slug: string }) {
  const fav = useLocalSet("dpam:favoritos");
  const saved = fav.items.has(slug);
  return (
    <button
      type="button"
      onClick={() => fav.toggle(slug)}
      aria-pressed={saved}
      className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[14px] ${saved ? "border-gold text-gold" : "border-line text-ink hover:border-gold/60"}`}
    >
      {saved ? <BookmarkCheck size={16} /> : <Bookmark size={16} />}
      {saved ? "Guardada" : "Guardar"}
    </button>
  );
}
