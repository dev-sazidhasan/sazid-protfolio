export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
  featured?: boolean;
  color?: 'primary' | 'secondary' | 'tertiary' | 'primary-container';
}

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 1,
    title: 'Optimizing Core Web Vitals for Modern JavaScript Frameworks',
    excerpt: 'Exploring the frontiers of edge rendering and partial hydration to achieve sub-second LCP on complex enterprise dashboards.',
    category: 'Performance',
    date: 'Oct 12, 2025',
    readTime: '8 min read',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC2Fk0tl1uZYFD-oLGTF8Y1qs4paogq5RPkeXr3APs-vCjtu1gzRvQX8sdFdugX7bFWhgPMP1DB-8oijDBP_XsmiDKTMv-NcUH74rSAGqLD4NMtJ0vIQMvFX4ch--t58eamkLaBf45DKCCxuhRilH1COe-Q3WzN5wzxuxsyeiDQpnB4UA3XWdkvalogSmKo9NMCtE03U7xt_W2axWm5l8e12FkOvmhONtD8ICu9TL6-ff6w4C9ikVcfW_E--DtoD91bLVYLj_kzgm4',
    featured: true,
    color: 'primary'
  },
  {
    id: 2,
    title: 'Server Components: The End of Client-Side Bloat?',
    excerpt: 'A deep dive into the architectural shift of React and how to master the transition to RSC-first development.',
    category: 'Next.js',
    date: 'Sep 28, 2025',
    readTime: '5 min read',
    image: '', // No image for this vertical card in the mockup
    color: 'secondary'
  },
  {
    id: 3,
    title: 'Smooth as Silk: Framer Motion Masterclass',
    excerpt: 'Leveraging spring physics for layout transitions that feel tactile and organic.',
    category: 'Animations',
    date: 'Aug 15, 2025',
    readTime: '3 min read',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC3ho9RFfAihRvFFfHfD1uiCCFfiimSbvthGiY_0-y7yS9vbCMF5yDKmRNmAbf4IPTgHxPoPtgTATFQxF8he8EevqcZw3XTA96qVFwLFPCffl9ykCzRqwr-Amk-5kJlohGX3VusMibXP1XktXnFSpADHKFSmK3eFkO_BK5vO0MbCpz9VUGh5Dx5LfCkmCFuWuZ702qBSy9Pn92XGRz3h8GGPzx986I7CoaccI_ZwVxUsQFdGkadsKVbDpwk8dnf9RAjzWyUFaFpt3I',
    color: 'tertiary'
  },
  {
    id: 4,
    title: 'Atomic Design in 2026',
    excerpt: "How we're using AI to generate and maintain design tokens across multi-platform apps.",
    category: 'Design Systems',
    date: 'Jul 04, 2025',
    readTime: '12 min read',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAoIvTs8b2uaAuxRY_HMg_eT9uLjo2SaZewMf6zw9HjJ17Lgv4D1pJkxLZwb5Og0e5VI6RLk2dTxdBF1RJu7CS9JgjvqqiPVoDL3M1QX92DIRdt5fJG589IBV60uTnqER1AmxkTTkVAmIb8WW6OtIzi9vrCvKruKhT0V_OozcltCAT6RsZ4P832-TeFq4LzUWDncxU_RoONPsXlOzRLqbNaEgx47RiCTPPkKtxGe7QsldhCHOgVn_2wroScG0f75D7pTQM1I1Zk4zc',
    color: 'primary'
  }
];
