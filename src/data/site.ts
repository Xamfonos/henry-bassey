/** Locked copy and identity. Do not paraphrase the title, H1, hook, subtitle, or description. */
export const site = {
  name: 'Henry Bassey',
  url: 'https://www.henrybassey.com',
  /** Online handle. Used as alternateName so search engines tie it to Henry. */
  handle: 'Xamfonos',
  title: 'Henry Bassey | Developer Marketing & AI Automation Consultant',
  h1: 'Henry Bassey, Developer Marketing and AI Automation Consultant',
  hook: 'Developer marketing for AI and infrastructure companies',
  description:
    'I grow developer tools with paid and organic marketing, and I build the tools and AI workflows that help that growth compound.',
  twitter: '@xamfonos_',
  gtmId: 'GTM-NKDGVTZ2',
  linkedin: 'https://www.linkedin.com/in/henrybassey/',
  x: 'https://x.com/xamfonos_',
  github: 'https://github.com/Xamfonos',
  /**
   * Every profile confirmed as Henry's (8 Nov 2026). These feed the Person schema's sameAs,
   * which tells search engines they all belong to the same person as this site.
   * Instagram is from the previous live site; DEV links back to this site already.
   */
  profiles: [
    'https://www.linkedin.com/in/henrybassey/',
    'https://x.com/xamfonos_',
    'https://github.com/Xamfonos',
    'https://www.instagram.com/xamfonos/',
    'https://dev.to/xamfonos',
    'https://hackmamba.io/author/henry-bassey',
    'https://thenewstack.io/author/henry-bassey/',
  ],
  /** TODO(henry): public email address. The Email button stays hidden until this is set. */
  email: null as string | null,
  jobTitle: 'Developer Marketing and AI Automation Consultant',
  worksFor: 'Hackmamba',
} as const;
