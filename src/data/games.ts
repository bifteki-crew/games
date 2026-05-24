export type GameStatus = 'Released' | 'WIP' | 'Prototype';

export interface Game {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  tech: string;
  tags: string[];
  status: GameStatus;
  repo: string;
  cover?: string;
  accent: string;
}

export const games: Game[] = [
  {
    slug: 'programmer-panic',
    title: 'Programmer Panic',
    tagline: 'Developer-themed action RPG. Fight bugs, memory leaks, and the npm install boss.',
    description:
      'Procedural office levels, loot, skill tree, and a stress meter that punishes panic. Built in Three.js with Matter.js physics.',
    tech: 'Three.js · Matter.js · TypeScript',
    tags: ['Action RPG', 'Wave Survival'],
    status: 'WIP',
    repo: 'https://github.com/bifteki-crew/programmer-panic',
    accent: '#ef4444',
  },
  {
    slug: 'werewolf-hunter',
    title: 'Werewolf Hunter',
    tagline: '2D side-scrolling brawler in the style of Double Dragon.',
    description:
      'Hand-drawn sprites, aggro enemy AI, mobile touch controls. Built for co-op and versus multiplayer down the road.',
    tech: 'Phaser 3 · Next.js',
    tags: ['Brawler', 'Side-Scroller', 'Retro'],
    status: 'WIP',
    repo: 'https://github.com/bifteki-crew/werewolf-hunter-web-v1',
    accent: '#a855f7',
  },
  {
    slug: 'weazel-trampoline',
    title: 'Weazel Trampoline',
    tagline: 'Bounce a weasel to the skies in this physics arcade.',
    description:
      'Control the trampoline, catch stars, dodge the ground. Use bombs for thrust boosts and wall slams for combo points.',
    tech: 'Phaser 3 · Next.js',
    tags: ['Arcade', 'Physics', 'Casual'],
    status: 'WIP',
    repo: 'https://github.com/bifteki-crew/weazel-trampoline',
    accent: '#22d3ee',
  },
  {
    slug: 'currywurst-kingpin',
    title: 'Currywurst Kingpin',
    tagline: 'Food-themed empire builder. Coming from the kitchen of crime.',
    description:
      'Early prototype. The currywurst empire will rise — once the gameplay lands. Watch this slot.',
    tech: 'Phaser 3 · Next.js',
    tags: ['Simulator', 'Prototype'],
    status: 'Prototype',
    repo: 'https://github.com/bifteki-crew/currywurst-kingpin',
    accent: '#f59e0b',
  },
];
