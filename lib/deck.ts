import "server-only";
import { communities, opportunities } from "./data";
import { effectiveStatus } from "./status";
import { formatDate, statusLabel } from "./labels";
import { getQrCodes } from "./qr";
import { getAvailablePhotos } from "./photos.server";
import { speaker } from "./site";
import type { DeckContext } from "@/components/presentation/Slides";

const norm = (s: string) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

const STATE_ORGS = [
  "OSIPTEL",
  "Osinergmin",
  "SUNAT",
  "SBS",
  "OEFA",
  "ProInversión",
  "SERVIR",
  "BCRP",
  "Indecopi",
  "OSITRAN",
  "SUNASS",
  "Contraloría",
  "RENIEC",
  "Poder Judicial",
  "MEF",
  "PCM",
];

export async function getDeckContext(): Promise<Omit<DeckContext, "animate">> {
  const qr = await getQrCodes();
  const byCat = (cats: string[]) => opportunities.filter((o) => cats.includes(o.category)).length;
  const publicOrgs = opportunities.filter((o) => o.category === "peu" || o.category === "sector-publico");

  const research = opportunities
    .filter((o) => (o.category === "investigacion" || o.category === "becas") && o.region === "internacional")
    .sort((a, b) => Number(b.featured) - Number(a.featured))
    .slice(0, 6)
    .map((o) => {
      const st = effectiveStatus(o);
      const when =
        st === "open" && o.applicationDeadline
          ? `Cierra ${formatDate(o.applicationDeadline)}`
          : st === "upcoming" && o.applicationStart
            ? `Abre ${formatDate(o.applicationStart)}`
            : statusLabel[st];
      return { title: o.title, organization: o.organization, status: st, when };
    });

  return {
    qr: qr ? { oportunidades: qr.oportunidades, inicio: qr.inicio, ponente: qr.ponente } : null,
    routeCounts: [
      { label: "Sector público", count: byCat(["sector-publico", "peu"]), href: "/oportunidades?c=sector-publico,peu" },
      { label: "Prácticas remotas", count: byCat(["practicas", "empleo-junior"]), href: "/oportunidades?c=practicas,empleo-junior" },
      { label: "Investigación", count: byCat(["investigacion", "becas"]), href: "/oportunidades?c=investigacion,becas" },
      { label: "Comunidades", count: communities.length, href: "/comunidades" },
      { label: "Competencias", count: byCat(["competencias"]), href: "/oportunidades?c=competencias" },
      { label: "Emprendimiento", count: byCat(["startups"]), href: "/oportunidades?c=startups" },
    ],
    stateOrgs: STATE_ORGS.map((name) => ({
      name,
      listed: publicOrgs.some((o) => norm(`${o.organization} ${o.title}`).includes(norm(name))),
    })),
    research,
    totalOpportunities: opportunities.length,
    photos: getAvailablePhotos(),
    speakerName: speaker.name,
    linkedin: speaker.linkedin,
  };
}
