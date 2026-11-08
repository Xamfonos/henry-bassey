/** Selected published pieces. Blog posts are listed after these from the content collection. */
export interface ExternalPiece {
  title: string;
  href: string;
  note: string;
  outlet: string;
}

export const externalWriting: ExternalPiece[] = [
  {
    title: 'How to write for a technical audience',
    href: 'https://thenewstack.io/sponsorship/developer-marketing-how-to-write-for-a-technical-audience/',
    note: "Why readers can tell when you haven't run the code yourself.",
    outlet: 'The New Stack',
  },
  {
    title: 'How to advertise to developers',
    href: 'https://thenewstack.io/sponsorship/developer-marketing/',
    note: "How to buy developers' attention when they still make up their own minds.",
    outlet: 'The New Stack',
  },
  {
    title: 'Hackmamba is now a full-cycle developer growth agency',
    href: 'https://hackmamba.io/developer-marketing/full-cycle-developer-growth-agency/',
    note: 'The rebrand and the Developer Adoption Architecture behind it.',
    outlet: 'Hackmamba',
  },
  {
    title: 'The Halo Signal and SHARE framework',
    href: 'https://hackmamba.io/developer-marketing/the-halo-signal-and-share-framework/',
    note: 'How to show proof before you have a case study, and tell client stories the right way.',
    outlet: 'Hackmamba',
  },
];
