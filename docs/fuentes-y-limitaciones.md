# Inventario de fuentes y limitaciones conocidas

Investigación realizada el 27 de noviembre de 2026 con búsqueda web y lectura de páginas oficiales. Cada registro incluye en `sourceUrls` las páginas efectivamente consultadas.

## Criterios

- Solo se marca **Abierta** cuando una página oficial confirma que la convocatoria acepta postulaciones hoy.
- Lo no publicado figura como "No publicado". No se completaron datos por inferencia.
- Los montos y fechas corresponden a la edición citada; pueden cambiar en la siguiente.

## Limitaciones conocidas

**Acceso a fuentes**
- Varios portales `gob.pe` y algunos oficiales (OSIPTEL, Osinergmin, SUNAT, SBS, BCRP, Talento Perú, CERN careers, summer.epfl.ch, GSoC, Kaggle, Devpost) no pudieron abrirse durante la investigación. En esos casos los datos provienen de otras páginas oficiales o de medios estatales (El Peruano, Andina). En algunos registros también se citan sitios de terceros, que aparecen en `sourceUrls`.
- LinkedIn, Computrabajo e Indeed no tienen páginas consultadas (sin `sourceUrls`); son portales permanentes.

**Sector público**
- **Osinergmin PEU 2027:** la página oficial (becas.osinergmin.gob.pe) anuncia inscripciones abiertas del 9 de octubre al 30 de noviembre, por eso figura como abierta. Las fechas de examen y del programa provienen de portales no oficiales, y la lista vigente de carreras no se pudo leer (Sistemas figuró en la edición 2026).
- OSIPTEL (XXXI PEU), OEFA PEU 2027 y el curso de MINCETUR cerraron recientemente y figuran como recurrentes.
- SUNASS, OSITRAN, OEFA, MINCETUR, MEF, ProInversión y BCRP **no** listan Ingeniería de Sistemas entre las carreras admitidas en sus últimas convocatorias. Se incluyen porque admiten otras carreras; el filtro "Admite Sistemas o afines" las excluye.
- Sin fuentes oficiales legibles sobre prácticas en Contraloría, RENIEC e Indecopi: no se incluyeron.

**Internacional**
- Mitacs Globalink 2027: las únicas universidades peruanas elegibles son U. Científica del Sur y UNALM (UNA Puno no figura).
- Outreachy: desde el hemisferio sur solo aplica la cohorte de diciembre.
- Summer@EPFL: un laboratorio indica cierre el 1 de diciembre; no se confirmó en la página oficial.
- Beca Generación del Bicentenario: Andina informó que no hubo convocatoria 2026 por presupuesto.
- No se verificaron programas trainee de Google, Microsoft, Interbank o Globant abiertos a Perú; no se incluyeron.

**Emprendimiento y competencias**
- Huawei ICT Competition 2026–2027: fechas de etapas tomadas de prensa chilena; las fechas para Perú no están verificadas.
- Hult Prize: inscripción activa, sin fecha de cierre publicada.
- No se encontró una incubadora de la UNA Puno ni "IncunaLab" con canales oficiales.

**Comunidades**
- No se encontraron canales públicos verificados de IEEE UNA Puno, GDG on Campus o AWS en Puno. Las más cercanas: GDG Tacna y el grupo AWS de la UNSA (Arequipa).
- Semillero de Emprendedores Perú y Potencia tu Talento no se pudieron identificar con fuentes públicas y se omitieron del directorio de comunidades.
- Comunitarios (Fundación Territorial de Puno) solo tiene perfil en Luma.

**Contenido biográfico**
- Los documentos de contexto (dossier, guion, keynote, prompts, oportunidades iniciales y programa del congreso) no estuvieron disponibles durante la construcción. El contenido biográfico se basa solo en el brief del proyecto. Pendientes: fechas de cada experiencia, tipo de colaboración con Friding, institución del PEU de Angie, tecnologías del proyecto de reconocimiento facial, detalles de ROWAN, usuario de GitHub del ponente.
- No hay fotografías reales todavía: los espacios muestran una ilustración neutra con el nombre de la foto pendiente.

## Inventario de oportunidades

### sector-publico.json (19)

| Oportunidad | Estado | Fuente oficial |
| --- | --- | --- |
| XXXI Programa de Extensión Universitaria en Regulación con Especialización en Telecomunicaciones (PEU Osiptel 2027) | recurring | https://beca.osiptel.gob.pe/ |
| Programa de Extensión Universitaria de Osinergmin (PEU 2027) – Regulación y Supervisión de la Industria Energética y Minera | unconfirmed | https://becas.osinergmin.gob.pe/requisitos-e-inscripcion/ |
| Programa de Extensión Universitaria de la SBS (PEXT) – Supervisión Financiera | recurring | https://www.sbs.gob.pe/programa-de-extension |
| I Programa de Extensión Universitaria del Ministerio de Energía y Minas (PEU MINEM 2027) | closed | https://peu.minem.gob.pe/inscripcion |
| Programa de Extensión Universitaria en Fiscalización Ambiental 2027 (PEU OEFA) | recurring | https://www.oefa.gob.pe/peu2027/ |
| Programa de Extensión Universitaria de la Sunass (PEU) – Regulación de Servicios de Saneamiento | unconfirmed | https://www.gob.pe/institucion/sunass/campa%C3%B1as/114697-programa-de-extension-universitaria-2026 |
| Curso de Extensión Universitaria de Ositrán (CEU) – Regulación de Infraestructura de Transporte | unconfirmed | https://www.gob.pe/institucion/ositran/noticias/1237763-ositran-abre-inscripciones-para-su-xxiii-curso-de-extension-universitaria-en-regulacion-de-infraestructura-de-transporte |
| Programa de Extensión Universitaria de ProInversión (PEU) en Asociaciones Público-Privadas y Proyectos en Activos | unconfirmed | https://www.investinperu.pe/programa-de-extension-universitaria-peu |
| Cursos de Extensión Universitaria del BCRP (Economía Avanzada y Finanzas Avanzadas) | recurring | https://www.bcrp.gob.pe/ |
| Curso de Extensión Universitaria del MEF (CEU +Líderes) | recurring | https://www.mef.gob.pe/convocas/procesos_extensionu2026.php?estado=CONCLUIDAS |
| Programa de Extensión Universitaria en Desarrollo e Inclusión Social (PEUDIS) | unconfirmed | https://elperuano.pe/noticia/286793-midis-lanza-programa-de-extension-universitaria-en-desarrollo-e-inclusion-social |
| Curso de Negociaciones Comerciales Internacionales (CNCI) – MINCETUR | recurring | https://consultasenlinea.mincetur.gob.pe/cursoNegociaciones/web/index.html |
| Prácticas preprofesionales y profesionales en la SUNAT | recurring | https://unete.sunat.gob.pe/ |
| Talento Perú – Portal de empleos y prácticas en el Estado | permanent | https://www.gob.pe/institucion/servir/campa%C3%B1as/4782-talento-peru |
| Prácticas preprofesionales y profesionales en el MEF (Convo-MEF) | recurring | https://apps4.mineco.gob.pe/ConvMEF/Login |
| Prácticas preprofesionales y profesionales en el INEI (incluida la ODEI Puno) | recurring | https://www.inei.gob.pe/usuarios/convocatoria-depersonal/ |
| Convocatorias de personal del Poder Judicial (sistema PSEP) | permanent | https://www.gob.pe/institucion/pj/informes-publicaciones/tipos/80-convocatoria-de-trabajo |
| Cursos virtuales gratuitos de IA, programación web y ciberseguridad – Plataforma Nacional de Talento Digital | unconfirmed | https://www.gob.pe/institucion/pcm/noticias/1423146-pcm-lanza-cursos-virtuales-gratuitos-de-inteligencia-artificial-programacion-web-y-ciberseguridad-con-certificacion-internacional |
| Cursos MOOC gratuitos de la ENAP-SERVIR (incluye Transformación Digital) | recurring | https://www.gob.pe/cursosmooc |

### internacional.json (29)

| Oportunidad | Estado | Fuente oficial |
| --- | --- | --- |
| LinkedIn Empleos: prácticas y empleos junior (Perú y remoto) | permanent | https://www.linkedin.com/jobs/ |
| Get on Board: empleos y prácticas tech en Latinoamérica | permanent | https://www.getonbrd.com/empleos |
| Wellfound (ex AngelList Talent): empleos en startups | permanent | https://wellfound.com/ |
| Work at a Startup (Y Combinator) | permanent | https://www.workatastartup.com/ |
| Remote OK: prácticas y empleos remotos | permanent | https://remoteok.com/remote-internship-jobs |
| We Work Remotely: empleos remotos «Anywhere in the World» | permanent | https://weworkremotely.com/100-percent-remote-jobs |
| Torre: red profesional y empleos remotos con IA | permanent | https://torre.ai/es/jobnetworkforprofessionals |
| Bumeran Perú: practicantes, pasantías y trainees | permanent | https://www.bumeran.com.pe/empleos.html |
| Computrabajo Perú: practicante de sistemas y TI | permanent | https://pe.computrabajo.com/ |
| Indeed Perú: prácticas y empleos de TI | permanent | https://pe.indeed.com/ |
| BCP Talento Joven: Prácticas de Verano | recurring | https://www.viabcp.com/unete-al-equipo-bcp/talento-joven |
| CERN openlab Summer Student Programme 2027 | open | https://openlab.cern/cern-openlab-summer-student-programme |
| CERN Summer Student Programme 2027 (Estados miembros y no miembros) | open | https://home.cern/summer-student-programme |
| Google Summer of Code (GSoC) 2027 | recurring | https://developers.google.com/open-source/gsoc/timeline |
| Outreachy: prácticas remotas en open source | recurring | https://www.outreachy.org/ |
| OIST Research Internship Program (ronda Fall 2027) | upcoming | https://www.oist.jp/admissions/research-internship/apply-research-internship |
| Mitacs Globalink Research Internship (GRI) | recurring | https://www.mitacs.ca/our-programs/globalink-research-internship-students/ |
| ETH Student Summer Research Fellowship 2027 | open | https://inf.ethz.ch/studies/summer-research-fellowship/how-to-apply.html |
| Summer@EPFL (Facultad de Computación y Comunicaciones) | unconfirmed | https://www.epfl.ch/labs/claire/summerepfl |
| KAUST Visiting Student Research Program (VSRP) | permanent | https://admissions.kaust.edu.sa/study/internships |
| ISTA: pasantías científicas (todo el año) | permanent | https://phd.ista.ac.at/scientific-internships/ |
| IAESTE Perú: prácticas técnicas en el extranjero | recurring | https://www.udep.edu.pe/internacional/estudiantes-udep/practicas/iaeste/ |
| Becas Erasmus Mundus de Maestría Conjunta (Erasmus+) | recurring | https://erasmus-plus.ec.europa.eu/opportunities/individuals/students/erasmus-mundus-joint-masters |
| DAAD EPOS: becas de posgrado relacionadas con el desarrollo (Alemania) | recurring | https://www.daad.de/en/information-services-for-higher-education-institutions/further-information-on-daad-programmes/epos/ |
| Beca Generación del Bicentenario (Pronabec) | unconfirmed | https://www.gob.pe/institucion/pronabec/campa%C3%B1as/145205-beca-generacion-del-bicentenario-convocatoria-2026 |
| Beca Permanencia (Pronabec) | unconfirmed | https://www.gob.pe/institucion/pronabec/colecciones/6339-noticias-sobre-beca-permanencia |
| Beca Alianza del Pacífico – Plataforma de Movilidad Estudiantil y Académica | recurring | https://www.pronabec.gob.pe/beca-alianza-pacifico-materiales/ |
| MLH Fellowship – Open Source (batch Spring 2027) | upcoming | https://fellowship.mlh.com/programs/open-source |
| LFX Mentorship (Linux Foundation) | recurring | https://www.linuxfoundation.org/about/mentorship-programs/ |

### emprendimiento-competencias.json (27)

| Oportunidad | Estado | Fuente oficial |
| --- | --- | --- |
| Startup Perú – Concurso Emprendimientos Innovadores | recurring | https://startup.proinnovate.gob.pe/ |
| Startup Perú – Concurso Emprendimientos Dinámicos | recurring | https://startup.proinnovate.gob.pe/ |
| Emprendimiento Académico – Fase 2 (spin-offs universitarias) | closed | https://prociencia.gob.pe/wp-content/uploads/2026/Emprendimiento%20Acad%C3%A9mico%20Fase%202/UD4_20260709_Emp%20Acad_Fase%202_Bases%5BF%5D%5BF%5D.pdf |
| Desafío Kunan | recurring | https://kunan.org/ |
| Premio Protagonistas del Cambio UPC por los ODS | recurring | https://upc.edu.pe/en/nosotros/eventos-institucionales/premio-protagonistas-del-cambio-upc |
| Impact Regional Fellowship (IRF) | unconfirmed | https://irf.spinoutworld.org/ |
| Hult Prize 2026–2027 | open | https://www.hultprize.org/ |
| Santander X Global Challenge | recurring | https://www.santander.com/en/press-room/press-releases/2026/05/santander-seeks-companies-with-the-best-solutions-in-quantum-computing-and-artificial-intelligence |
| Founder Institute – Cohorte Colombia 2027 (virtual) | open | https://fi.co/apply/lima |
| Y Combinator (incluye Early Decision para estudiantes) | recurring | https://ycombinator.com/apply |
| Start-Up Chile – Convocatoria BIG (Build, Ignite, Growth) | recurring | https://startupchile.org/ |
| Microsoft for Startups (ex Founders Hub) | permanent | https://www.microsoft.com/startups |
| AWS Activate | permanent | https://aws.amazon.com/startups/credits |
| Google for Startups Accelerator: Latinoamérica hispanohablante | recurring | https://startup.google.com/programs/accelerator/spanish-speaking-latin-america/ |
| UTEC Ventures – Programa de Aceleración | unconfirmed | https://utecventures.com/startups/aceleradora-uv |
| Programa de Incubación Kaman | recurring | https://ucsp.edu.pe/wp-content/uploads/2026/05/BASES-P.-INCUBACION-2026-1.pdf |
| Huawei ICT Competition 2026–2027 | unconfirmed | https://www.huawei.com/minisite/ict-competition-2025-2026-global/en/ |
| NASA International Space Apps Challenge | recurring | https://www.spaceappschallenge.org/2026/ |
| ICPC – Competencia Regional Latinoamericana de Programación | recurring | https://icpc.global/ |
| Microsoft Imagine Cup 2027 | open | https://imaginecup.microsoft.com/ |
| IEEEXtreme – Competencia Global de Programación | recurring | https://ieeextreme.org/ |
| Hackatón TransformaGob | unconfirmed | https://www.gob.pe/institucion/pcm/informes-publicaciones/8294757-resultados-finalistas-hackaton-transformagob-2026 |
| Kaggle Competitions | permanent | https://www.kaggle.com/competitions |
| Devpost – Hackatones en línea y presenciales | permanent | https://devpost.com/hackathons |
| Devfolio – Hackatones | permanent | https://devfolio.co/hackathons |
| Zindi – Retos de IA y ciencia de datos | permanent | https://www.zindi.africa/ |
| AIcrowd – Retos de IA y machine learning | permanent | https://www.aicrowd.com/ |
