// Single source of truth for identity, links, and taglines.
// Edit here — never hardcode these in components.

export const site = {
  name: "Shorif Ahmed Afridi Mozumder",
  shortName: "Afridi Mozumder",
  positioning: "Cybersecurity · GRC",
  location: "Copenhagen, Denmark",
  description:
    "MSc Cybersecurity student focused on governance, risk, and compliance — with a technical foundation in software and network engineering.",
  email: "afridimozumder@gmail.com",
  // CV lives in /public so it downloads directly.
  cvPath: "/cv/Shorif-Ahmed-Afridi-Mozumder-CV.pdf",
  links: {
    linkedin: "https://www.linkedin.com/in/ahmedafridi/",
    github: "https://github.com/afridimozumder",
    instagram: "https://www.instagram.com/afridimozumder",
  },
} as const;

export type Site = typeof site;
