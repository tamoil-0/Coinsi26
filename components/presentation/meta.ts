export const acts = [
  { n: "I", name: "Empezar" },
  { n: "II", name: "Aprender haciendo" },
  { n: "III", name: "Descubrir oportunidades" },
  { n: "IV", name: "Prepararse y actuar" },
  { n: "V", name: "Regresar y construir" },
] as const;

/** minutes: tiempo sugerido por diapositiva. Suma = 45 min. */
export const slideMeta = [
  { title: "De Puno al mundo", act: 0, minutes: 1 },
  { title: "La paradoja de la experiencia", act: 0, minutes: 1.5 },
  { title: "Todo empezó con curiosidad", act: 0, minutes: 2 },
  { title: "Dos caminos que pueden convivir", act: 0, minutes: 1.5 },
  { title: "Salir de mi burbuja", act: 1, minutes: 2 },
  { title: "Expectativa versus realidad", act: 1, minutes: 2 },
  { title: "¿Y si no hay internet?", act: 1, minutes: 2.5 },
  { title: "No todo es programar", act: 1, minutes: 2 },
  { title: "Un buen proyecto no basta", act: 1, minutes: 2 },
  { title: "Perdimos una hackathon. Ganamos una comunidad.", act: 1, minutes: 2 },
  { title: "No existe una sola ruta profesional", act: 2, minutes: 1.5 },
  { title: "Angie: de un PEU a una práctica", act: 2, minutes: 1.5 },
  { title: "El Estado también busca talento", act: 2, minutes: 2 },
  { title: "Diego: competir internacionalmente", act: 2, minutes: 1.5 },
  { title: "Paolo: un fellow de nuestra universidad", act: 2, minutes: 1.5 },
  { title: "Trabajar desde Puno para otros países", act: 2, minutes: 2 },
  { title: "Investigación y oportunidades internacionales", act: 2, minutes: 2 },
  { title: "De una idea a una solución real", act: 2, minutes: 2 },
  { title: "No me digas qué sabes. Muéstrame qué construyes.", act: 3, minutes: 2 },
  { title: "El ingeniero en la era de la IA", act: 3, minutes: 2 },
  { title: "Tu próximo mes puede verse así", act: 3, minutes: 1.5 },
  { title: "Las oportunidades se comparten", act: 3, minutes: 1.5 },
  { title: "Puno no solo exporta talento", act: 4, minutes: 1.5 },
  { title: "Recién estamos comenzando", act: 4, minutes: 1 },
  { title: "¿Qué vas a empezar esta semana?", act: 4, minutes: 1 },
] as const;

export const TOTAL_SLIDES = slideMeta.length;
