import "server-only";
import fs from "node:fs";
import path from "node:path";
import { photoSlots, type PhotoKey, type PhotoMap } from "./photos";

const EXT = [".webp", ".avif", ".jpg", ".jpeg", ".png"];

/** Devuelve las fotos reales presentes en public/images/real/ */
export function getAvailablePhotos(): PhotoMap {
  const dir = path.join(process.cwd(), "public", "images", "real");
  const map: PhotoMap = {};
  let files: string[] = [];
  try {
    files = fs.readdirSync(dir);
  } catch {
    return map;
  }
  for (const key of Object.keys(photoSlots) as PhotoKey[]) {
    const file = files.find((f) => EXT.some((e) => f.toLowerCase() === `${key}${e}`));
    if (file) map[key] = `/images/real/${file}`;
  }
  return map;
}
