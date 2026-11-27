/**
 * Auditoría del directorio.
 *   npm run validate:data   → esquema, duplicados, fechas vencidas, datos incompletos (sin red)
 *   npm run audit:data      → lo anterior + enlaces rotos (requiere red)
 * Sale con código 1 si hay errores de esquema o duplicados.
 */
import fs from "node:fs";
import path from "node:path";
import { communitySchema, opportunitySchema, resourceSchema } from "../lib/schema";

const offline = process.argv.includes("--offline");
const root = path.join(__dirname, "..", "data");
const today = new Date().toISOString().slice(0, 10);
const STALE_DAYS = 90;

type Issue = { level: "error" | "aviso"; file: string; id: string; msg: string };
const issues: Issue[] = [];
const urls = new Map<string, string[]>();

function read(dir: string) {
  return fs
    .readdirSync(path.join(root, dir))
    .filter((f) => f.endsWith(".json"))
    .map((f) => ({ file: `${dir}/${f}`, rows: JSON.parse(fs.readFileSync(path.join(root, dir, f), "utf8")) as Record<string, unknown>[] }));
}

function addUrl(u: unknown, ref: string) {
  if (typeof u !== "string") return;
  urls.set(u, [...(urls.get(u) ?? []), ref]);
}

const daysSince = (iso: string) => Math.round((Date.parse(today) - Date.parse(iso)) / 86_400_000);

const seen = new Map<string, string>();
for (const { file, rows } of read("opportunities")) {
  for (const row of rows) {
    const id = String(row.id ?? "?");
    const res = opportunitySchema.safeParse(row);
    if (!res.success) {
      issues.push({ level: "error", file, id, msg: res.error.issues.map((i) => `${i.path.join(".")}: ${i.message}`).join("; ") });
      continue;
    }
    const o = res.data;
    if (seen.has(o.slug)) issues.push({ level: "error", file, id, msg: `slug duplicado (también en ${seen.get(o.slug)})` });
    seen.set(o.slug, file);
    const titleKey = `${o.organization}|${o.title}`.toLowerCase();
    if (seen.has(titleKey)) issues.push({ level: "aviso", file, id, msg: "posible duplicado por título y organización" });
    seen.set(titleKey, file);

    if ((o.status === "open" || o.status === "upcoming") && o.applicationDeadline && o.applicationDeadline < today)
      issues.push({ level: "aviso", file, id, msg: `figura como ${o.status} pero cerró el ${o.applicationDeadline}: actualizar estado` });
    if (o.status === "open" && !o.applicationDeadline)
      issues.push({ level: "aviso", file, id, msg: "abierta sin fecha de cierre publicada: verificar en la fuente" });
    if (daysSince(o.lastVerifiedAt) > STALE_DAYS)
      issues.push({ level: "aviso", file, id, msg: `verificada hace ${daysSince(o.lastVerifiedAt)} días` });
    if (!o.eligibility) issues.push({ level: "aviso", file, id, msg: "sin perfil elegible" });
    if (!o.benefits.length) issues.push({ level: "aviso", file, id, msg: "sin beneficios" });
    if (!o.sourceUrls.length) issues.push({ level: "aviso", file, id, msg: "sin fuentes consultadas" });
    addUrl(o.officialUrl, `${file}#${id}`);
    addUrl(o.applicationUrl, `${file}#${id}`);
  }
}

for (const { file, rows } of read("communities"))
  for (const row of rows) {
    const res = communitySchema.safeParse(row);
    if (!res.success) issues.push({ level: "error", file, id: String(row.id), msg: res.error.issues.map((i) => i.message).join("; ") });
    else Object.values(res.data.links).forEach((u) => addUrl(u, `${file}#${res.data.id}`));
  }
for (const { file, rows } of read("resources"))
  for (const row of rows) {
    const res = resourceSchema.safeParse(row);
    if (!res.success) issues.push({ level: "error", file, id: String(row.id), msg: res.error.issues.map((i) => i.message).join("; ") });
    else addUrl(res.data.url, `${file}#${res.data.id}`);
  }

async function checkLinks() {
  const list = [...urls.keys()];
  const results = await Promise.all(
    list.map(async (u) => {
      try {
        const ctrl = AbortSignal.timeout(15_000);
        let r = await fetch(u, { method: "HEAD", redirect: "follow", signal: ctrl });
        if (r.status === 405 || r.status === 403) r = await fetch(u, { method: "GET", redirect: "follow", signal: AbortSignal.timeout(15_000) });
        return { u, status: r.status };
      } catch (e) {
        return { u, status: 0, err: (e as Error).message };
      }
    }),
  );
  for (const r of results) {
    if (r.status === 0 || r.status >= 400) {
      // 401/403/429 suelen ser protección anti-bots, no enlaces rotos
      const level = [401, 403, 429].includes(r.status) ? "aviso" : "error";
      for (const ref of urls.get(r.u) ?? [])
        issues.push({ level, file: ref.split("#")[0], id: ref.split("#")[1], msg: `enlace ${r.status || "sin respuesta"}: ${r.u}` });
    }
  }
}

(async () => {
  if (!offline) await checkLinks();
  const errors = issues.filter((i) => i.level === "error");
  const warnings = issues.filter((i) => i.level === "aviso");
  for (const i of [...errors, ...warnings]) console.log(`[${i.level}] ${i.file} › ${i.id}: ${i.msg}`);
  console.log(`\n${seen.size / 2} oportunidades · ${urls.size} enlaces · ${errors.length} errores · ${warnings.length} avisos`);
  if (process.env.GITHUB_STEP_SUMMARY) {
    fs.appendFileSync(
      process.env.GITHUB_STEP_SUMMARY,
      `## Auditoría del directorio\n\n${errors.length} errores · ${warnings.length} avisos\n\n` +
        [...errors, ...warnings].map((i) => `- **${i.level}** \`${i.id}\`: ${i.msg}`).join("\n") +
        "\n",
    );
  }
  // Los enlaces rotos son avisos para CI: no bloquean el despliegue.
  const blocking = errors.filter((e) => !e.msg.startsWith("enlace"));
  process.exit(blocking.length ? 1 : 0);
})();
