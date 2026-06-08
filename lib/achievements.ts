import type { Achievement } from '@/types/index.ts';

export const achievements: Achievement[] = [
  {
    badge: '2ND',
    org: 'Technical Education and Skills Development Authority Regional Skills Competition. Category: Web Development.',
    competition: 'TESDA Regional Competition',
    result: '2nd Place',
    desc: 'A rigorous front-to-back regional development contest verifying advanced engineering layouts under pressure.',
    images: ['/achievements/Tesda.png', '/achievements/Tesda2.png'],
    whatIDid: 'Competed in a high-pressure 3-day Web Development competition. Designed, structured, and implemented multi-page web applications and database integrations within tight deadlines, adhering to strict international skills standards.',
    howIDid: 'Leveraged modern ReactJS, Tailwind, Express JavaScript, and MySQL. Implemented responsive design grids, secured form handling, optimized database queries, and structured clear client-server APIs under rigid invigilation and local offline environment constraints.',
    whatILearned: 'Mastered speed coding, efficient problem-solving under extreme stress, semantic code structures, and the value of preparing robust fallback strategies for unexpected system configuration issues.',
  },
  {
    badge: '2ND',
    org: 'A competitive hackathon challenging developers to build innovative solutions under time pressure.',
    competition: 'Devkada Hackathon',
    result: '2nd Place',
    desc: 'Fostered dynamic prototype development, testing layout stability, swift backend synchronization, and execution Speed.',
    images: ['/achievements/devkada1.jpg', '/achievements/devkada2.jpg', '/achievements/devkada3.jpg', '/achievements/devkada4.jpg'],
    whatIDid: 'Partnered with a team to build a working SnapNotesAI from scratch in 6 hours. Designed the user experience and front-end interface while integrating live API requests and database states.',
    howIDid: 'Used ReactJS and Tailwind CSS for rapid responsive front-end construction, Supabase for authentication and real-time database updates, OpenAI for Quiz, Reviewer Generation, and deployed a live demonstration under crunch time.',
    whatILearned: 'Learned the critical importance of effective team coordination, scope management (building a Minimum Viable Product first), and pitching complex technical architectures clearly to a panel of judges.',
  },
  {
    badge: 'FIN',
    org: 'An international ideathon focused on AI-driven solutions for Southeast Asia. Selected among participants from across the ASEAN region.',
    competition: 'AI Ready ASEAN International Ideathon',
    result: 'Top 10 Finalist',
    desc: 'Conceptualized and crafted scalable artificial intelligence models targeted to solve regional educational voids.',
    youtubeEmbed: 'https://www.youtube.com/embed/VOl4ojS9mGc?si=dGBW_SHPEM_Jb8jR',
    whatIDid: 'Represented as a finalist from the ASEAN region to design an AI-powered solution tackling regional educational disparities and digital accessibility barriers.',
    howIDid: 'Conceptualized a localized AI flood monitoring system integrated with voice-to-text engines, formatted a comprehensive business model, mapped technical architecture scaling, and presented a video pitch to industry leaders.',
    whatILearned: 'Gained deep insights into AI scaling logic, prompt engineering, regional user needs in Southeast Asia, and how to pitch concepts that blend technical feasibility with business viability.',
  },
];
