import { z } from "zod";

const isoDate = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, "Fecha en formato YYYY-MM-DD");

const url = z.string().url();

export const CATEGORIES = [
  "sector-publico",
  "peu",
  "practicas",
  "empleo-junior",
  "investigacion",
  "becas",
  "startups",
  "competencias",
  "cursos",
] as const;

export const STATUSES = ["open", "upcoming", "recurring", "permanent", "unconfirmed", "closed"] as const;
export const REGIONS = ["peru", "latam", "internacional"] as const;
export const MODALITIES = ["remoto", "presencial", "hibrido"] as const;
export const FUNDING = [
  "pagado",
  "beca-completa",
  "beca-parcial",
  "subvencion",
  "gratuito",
  "no-remunerado",
  "premio",
] as const;

export const opportunitySchema = z.object({
  id: z.string().min(2),
  slug: z.string().regex(/^[a-z0-9-]+$/),
  title: z.string().min(2),
  organization: z.string().min(2),
  category: z.enum(CATEGORIES),
  description: z.string().min(10),
  country: z.string(),
  region: z.enum(REGIONS),
  modality: z.enum(MODALITIES).nullable(),
  status: z.enum(STATUSES),
  applicationStart: isoDate.nullable(),
  applicationDeadline: isoDate.nullable(),
  deadlineTimezone: z.string().nullable(),
  programStart: isoDate.nullable(),
  programEnd: isoDate.nullable(),
  duration: z.string().nullable(),
  eligibility: z.string().nullable(),
  eligibleCareers: z.array(z.string()),
  academicCycles: z.string().nullable(),
  languageRequirements: z.string().nullable(),
  requirements: z.array(z.string()),
  benefits: z.array(z.string()),
  fundingType: z.enum(FUNDING).nullable(),
  applicationCost: z.string().nullable(),
  applicationSteps: z.array(z.string()),
  officialUrl: url,
  applicationUrl: url.nullable(),
  sourceUrls: z.array(url),
  lastVerifiedAt: isoDate,
  nextExpectedEdition: z.string().nullable(),
  featured: z.boolean(),
  logo: z.string().nullable().optional(),
  tags: z.array(z.string()),
});

export type Opportunity = z.infer<typeof opportunitySchema>;
export type Category = (typeof CATEGORIES)[number];
export type Status = (typeof STATUSES)[number];
export type Region = (typeof REGIONS)[number];
export type Modality = (typeof MODALITIES)[number];
export type Funding = (typeof FUNDING)[number];

const nullableUrl = url.nullable();

export const communitySchema = z.object({
  id: z.string(),
  slug: z.string().regex(/^[a-z0-9-]+$/),
  name: z.string(),
  type: z.enum(["comunidad-tech", "emprendimiento", "estudiantil", "investigacion", "eventos"]),
  description: z.string(),
  whatOffers: z.array(z.string()),
  howToJoin: z.string(),
  scope: z.enum(["puno", "peru", "latam", "global"]),
  links: z.object({
    web: nullableUrl,
    linkedin: nullableUrl,
    instagram: nullableUrl,
    discord: nullableUrl,
    telegram: nullableUrl,
    whatsapp: nullableUrl,
    luma: nullableUrl,
    meetup: nullableUrl,
  }),
  sourceUrls: z.array(url),
  lastVerifiedAt: isoDate,
  featured: z.boolean(),
});

export type Community = z.infer<typeof communitySchema>;

export const resourceSchema = z.object({
  id: z.string(),
  name: z.string(),
  provider: z.string(),
  description: z.string(),
  category: z.enum(["cursos", "certificaciones", "herramientas", "ingles", "ia"]),
  cost: z.enum(["gratuito", "freemium", "pago", "gratis-con-certificado-de-pago"]),
  url,
  notes: z.string().nullable(),
  lastVerifiedAt: isoDate,
});

export type Resource = z.infer<typeof resourceSchema>;
