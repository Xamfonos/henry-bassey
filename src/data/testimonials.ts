/**
 * Wall of love. Quotes that were on the previous live site are copied from it in full;
 * the rest come from Henry's homepage copy doc (8 Nov 2026).
 *
 * TODO(henry): surnames for Rocio (Rocio B.) and Blessing (Blessing E. V.), if you want them shown.
 */
export interface Testimonial {
  quote: string;
  name: string;
  /** Role, organisation or channel, shown after the name. */
  role?: string;
}

export interface TestimonialGroup {
  id: string;
  title: string;
  /** Chat lines render as a short conversation rather than separate quotes. */
  chat?: boolean;
  items: Testimonial[];
}

export const testimonialGroups: TestimonialGroup[] = [
  {
    id: 'clients',
    title: 'From clients',
    items: [
      {
        // On the "LangChain alternatives" draft.
        quote:
          'Great edits here. I think this is one of the best pieces of content we’ve drafted as a company.',
        name: 'John-Henry Scherck',
        role: 'Founder & CEO, Growth Plays',
      },
      {
        quote: 'We rely on your great work to take the drafts to an even better place.',
        name: 'Alex Timms',
        role: 'Operations Manager, Growth Plays',
      },
      {
        quote:
          'We really appreciate your work! If you have any colleagues or friends with a similar skillset, we’d love to consider them :)',
        name: 'Alex Timms',
        role: 'Operations Manager, Growth Plays',
      },
      {
        // The rate amount stays off the site.
        quote: 'We really appreciate your hard work on all of these. I’d actually like to increase your rate.',
        name: 'Alex Timms',
        role: 'Operations Manager, Growth Plays',
      },
      {
        quote: 'Hackmamba didn’t just execute a plan. They helped us build the right plan.',
        name: 'Jennifer Jackson',
        role: 'CMO, Actian',
      },
      {
        quote:
          'the articles are all reviewed and i’m very impressed by them and the work your team did. Awesome job will have these on our website in the next few days',
        name: 'CodeRabbit',
        role: 'via Slack',
      },
      {
        quote:
          'This is great! And you finally put a word to it. You do a great job highlighting the client. The post itself is really good. I need to reread to see if I can break down a template to follow. I think that would be a valuable asset for you. Some sort of template for each step. Of the Halo Strat.',
        name: 'Director of Content',
        role: 'via DM',
      },
    ],
  },
  {
    id: 'teammates',
    title: 'From teammates',
    items: [
      {
        quote:
          'Nick messaged me about the website. He said he showed the website to Dee as well and she loves it too! Great job man!',
        name: 'Gergely Mate',
        role: 'Project Manager · Hackmamba',
      },
      {
        quote:
          'You are an inspiration for all of us in Hackmamba, thanks for all the great work on the client side!',
        name: 'Tahir Mohammed',
        role: 'Senior Growth Marketer · Hackmamba',
      },
      {
        quote:
          'It’s always been a pleasure working with you and looking forward to working closely with you for years to come!',
        name: 'Asjad Khan',
        role: 'Developer Advocate · Hackmamba',
      },
      {
        quote:
          'It is genuinely a pleasure working with you. I appreciate all your contributions to our team.',
        name: 'Blessing E. V.',
        role: 'Head of Operations · Hackmamba',
      },
      {
        quote:
          'I have always been in awe of your work and I’m glad I get to see you perform magic close up.',
        name: 'Praise James',
        role: 'Developer Advocate & Operations Manager Associate · Hackmamba',
      },
      {
        quote: 'It’s a pleasure to learn from you, and get to work together.',
        name: 'Rocio B.',
        role: 'Growth Marketer · Hackmamba',
      },
      {
        quote: 'Fantastic work on the content strategy',
        name: 'William',
        role: 'via Discord',
      },
      {
        quote:
          'I read one in the middle of the night one time and I felt the holy ghost. It was too good. It’s amazing how he’s able to create awesome work in a rigid space like tech. He writes with so much grace, like he’s floating. I could talk about his work all day. It mesmerizes me.',
        name: 'Praise James',
        role: 'via Discord',
      },
      {
        quote:
          'I used to struggle with creating a compelling intro, but when I read the edits he did on one of my project. I got more insights for other tasks.',
        name: 'Emilson',
        role: 'via Discord',
      },
    ],
  },
  {
    id: 'discord',
    title: 'From the Hackmamba Discord (unprompted)',
    chat: true,
    items: [
      { name: 'Muyiwa', quote: 'I was reading @Xamfonos content today and all I can say is DAMN 😄' },
      { name: 'Benye', quote: 'Me everytime I read his work' },
      { name: 'Muyiwa', quote: 'It’s all interesting. Like you start and you just continue.' },
      { name: 'Praise James', quote: 'It reads like a song' },
    ],
  },
  {
    id: 'readers',
    title: 'From readers and listeners',
    items: [
      {
        quote:
          'I know you’re probably been told this a lot, but you’re so good at writing. Your writing reads like a song. When someone starts, they don’t know when they finish. I wonder the years of experience it took to attain such next-level writing. I hope you never stop writing because people like me will never stop reading your work.',
        name: 'Reader',
        role: 'via LinkedIn',
      },
      {
        quote:
          'I read some of your work on Hackmamba’s blog and 🔥🔥🔥 Your storytelling is amazing and your writing is so clear and easy to follow. How did you become this good?',
        name: 'Reader',
        role: 'via DM',
      },
      {
        quote:
          'The insights you shared in the video were genuinely strong and thoughtful. They added a lot of depth to the conversation and made the content truly valuable for the audience. I also really appreciate the effort you and the team put into distributing the video across channels. That amplification made a meaningful difference.',
        name: 'Isha Srivastava',
        role: 'via email',
      },
    ],
  },
];
