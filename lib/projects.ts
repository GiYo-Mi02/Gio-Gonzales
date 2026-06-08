import React from 'react';
import { Sparkles, Code, Terminal, Database, Cpu, Layers } from 'lucide-react';
import type { Project, CaseStudy } from '@/types/index.ts';

// ─── Project list (used by WorkSection) ─────────────────────────────────────

export const projects: Project[] = [
  {
    id: 'interactive-dsa',
    num: '01',
    title: 'Interactive DSA Learning Platform',
    type: 'Web Application',
    tech: ['Next.js', 'p5.js', 'Tailwind CSS'],
    year: '2025',
    link: 'https://interactive-dsa-fawn.vercel.app/',
    image: '/selected-work/3.png',
  },
  {
    id: 'snapnotes-ai',
    num: '02',
    title: 'SnapNotes AI',
    type: 'Full Stack',
    tech: ['Next.js', 'GPT-4', 'Supabase'],
    year: '2025',
    link: 'https://snap-noting-ai-ybs6.vercel.app/',
    image: '/selected-work/2.png',
  },
  {
    id: 'mr-and-ms-umak-tabulation-system',
    num: '03',
    title: 'Mr. & Ms. UMak Tabulation System',
    type: 'Web Application',
    tech: ['React.js', 'Node.js', 'Express'],
    year: '2025',
    link: 'https://github.com/giojoshua',
    image: '/selected-work/7.png',
  },
  {
    id: 'resume-ai-analyzer',
    num: '04',
    title: 'Resume AI Analyzer',
    type: 'Web Application',
    tech: ['Next.js', 'OpenAI', 'Tailwind CSS'],
    year: '2025',
    link: 'https://ai-resume-analyzer-jade.vercel.app/',
    image: '/selected-work/5.png',
  },
  {
    id: 'logistics-management-system',
    num: '05',
    title: 'Logistics Management System',
    type: 'Full Stack',
    tech: ['Next.js', 'Redis', 'Supabase'],
    year: '2025',
    link: 'https://logistics-system-one.vercel.app/',
    image: '/selected-work/4.png',
  },
  {
    id: 'web-based-photobooth-application',
    num: '06',
    title: 'Web Based Photobooth Application',
    type: 'Web Application',
    tech: ['JavaScript', 'Canvas API', 'HTML5'],
    year: '2025',
    link: 'https://github.com/giojoshua',
    image: '/selected-work/6.png',
  },
  {
    id: 'ccis-ticket-automation-system',
    num: '07',
    title: 'CCIS Ticket Automation System',
    type: 'Automation',
    tech: ['Next.js', 'QR Code', 'Node.js'],
    year: '2025',
    link: 'https://github.com/giojoshua',
    image: '/selected-work/8.png',
  },
];

// ─── Case study detail data (used by /work/[slug]) ──────────────────────────

export const caseStudiesData: Record<string, CaseStudy> = {
  'interactive-dsa': {
    id: 'interactive-dsa',
    num: '01',
    title: 'Interactive DSA Learning Platform',
    type: 'Web Application',
    tech: ['Next.js', 'p5.js', 'Tailwind CSS', 'TypeScript'],
    year: '2025',
    link: 'https://interactive-dsa-fawn.vercel.app/',
    github: 'https://github.com/giojoshua',
    image: '/selected-work/3.png',
    role: 'Lead Developer & Interactive Designer',
    timeline: 'Jan 2025 - Mar 2025',
    problem:
      'Understanding complex data structures and algorithms (DSA) has traditionally been heavy on abstract theory and dry code snippets, creating a high barrier of entry for visual learners who benefit from physical, spatial, and step-by-step interactive concepts.',
    process: [
      {
        number: '01',
        title: 'p5.js Coordinate State Mapping',
        description:
          'Mapped raw drawing coordinates inside an active p5.js canvas directly to interactive React states, enabling dynamic nodes to respond instantly to button clicks.',
      },
      {
        number: '02',
        title: 'Visual Node Traversals & Recursion Debugger',
        description:
          'Designed multi-state tree traversals (DFS, BFS) with custom step-by-step forward and back buttons that act as an algorithm state debugger.',
      },
      {
        number: '03',
        title: 'Performance Optimization & Cache Layers',
        description:
          'Optimized frame buffer refreshes to prevent browser canvas memory leaks on heavy recursive call-stack simulations.',
      },
    ],
    features: [
      {
        icon: React.createElement(Sparkles, { className: 'w-5 h-5 text-[#c8f45e]' }),
        name: 'Interactive Node Editor',
        description: 'Add, drag, and delete nodes on the live canvas with automatic route and edge weight calculations.',
      },
      {
        icon: React.createElement(Terminal, { className: 'w-5 h-5 text-[#c8f45e]' }),
        name: 'Synchronized Code Tracing',
        description: 'Inspect code lines running concurrently with visual animations highlighting local variables and memory states.',
      },
      {
        icon: React.createElement(Cpu, { className: 'w-5 h-5 text-[#c8f45e]' }),
        name: 'Big-O Growth Curve Analytics',
        description: 'Interactive graph visualizer displaying real-time space and time complexity curves based on input parameters.',
      },
      {
        icon: React.createElement(Database, { className: 'w-5 h-5 text-[#c8f45e]' }),
        name: 'Custom Workspace Presets',
        description: 'Save custom tree or graph mock structures locally via client state to reload visual challenges instantly.',
      },
    ],
    learned:
      'Designing interactive visual maps for computer science heuristics taught me structural tree layouts, p5.js coordinate transforms, and how to synchronize raw canvas renderings with React lifecycle renders seamlessly.',
  },
  'snapnotes-ai': {
    id: 'snapnotes-ai',
    num: '02',
    title: 'SnapNotes AI',
    type: 'Full Stack',
    tech: ['Next.js', 'GPT-4', 'Supabase', 'PostgreSQL'],
    year: '2025',
    link: 'https://snap-noting-ai-ybs6.vercel.app/',
    github: 'https://github.com/giojoshua',
    image: '/selected-work/2.png',
    role: 'Full-Stack AI Engineer',
    timeline: 'Feb 2025',
    problem:
      'Modern professionals and students capture high volumes of disconnected, unstructured voice transcripts and raw scratchpad notes, struggling to group them semantic-conceptually or generate clean, actionable summaries.',
    process: [
      {
        number: '01',
        title: 'Semantic Vector Embeddings Setup',
        description:
          'Configured OpenAI embed pipelines parsing text notes into multi-dimensional vectors stored in Postgres pgvector for semantic retrieval.',
      },
      {
        number: '02',
        title: 'Action Item Parsing Prompts',
        description:
          'Developed robust GPT-4 assistant prompts tasked to extract discrete tasks, priority flags, and timeline deadlines with high strictness.',
      },
      {
        number: '03',
        title: 'Reactive Database Subscriptions',
        description:
          'Mapped active Supabase channels to automatically feed generated updates to user devices without pulling raw APIs continuously.',
      },
    ],
    features: [
      {
        icon: React.createElement(Cpu, { className: 'w-5 h-5 text-[#c8f45e]' }),
        name: 'Semantic Summaries Generator',
        description: 'Transforms 20+ minute voice transcripts into accurate structural bullet points and task definitions.',
      },
      {
        icon: React.createElement(Sparkles, { className: 'w-5 h-5 text-[#c8f45e]' }),
        name: 'Vector-Based Note Search',
        description: 'Input natural language questions to fetch semantically related paragraphs even if keyword strings differ.',
      },
      {
        icon: React.createElement(Database, { className: 'w-5 h-5 text-[#c8f45e]' }),
        name: 'Structured PostgreSQL Cache',
        description: 'Secure, optimized database configurations mapping user metadata arrays, file histories, and token totals.',
      },
      {
        icon: React.createElement(Layers, { className: 'w-5 h-5 text-[#c8f45e]' }),
        name: 'Dynamic Markdown Rendering',
        description: 'Pristine markdown layout formatting presenting structured notes in a gorgeous, editorial, readable canvas.',
      },
    ],
    learned:
      'Integrating multi-model LLM APIs with real-time vector embeddings broadened my understanding of non-relational cache layers, streaming response tokens, and cost-effective prompt engineering practices.',
  },
  'mr-and-ms-umak-tabulation-system': {
    id: 'mr-and-ms-umak-tabulation-system',
    num: '03',
    title: 'Mr. & Ms. UMak Tabulation System',
    type: 'Web Application',
    tech: ['React.js', 'Node.js', 'Express', 'Socket.io'],
    year: '2025',
    link: 'https://github.com/giojoshua',
    github: 'https://github.com/giojoshua',
    image: '/selected-work/7.png',
    role: 'Lead Full-Stack Architect',
    timeline: 'Feb 2025 - Mar 2025',
    problem:
      'Traditional beauty pageant tabulation setups rely on manual spreadsheet data inputs, resulting in immense delay times, math conversion errors, and a complete lack of real-time visualizations.',
    process: [
      {
        number: '01',
        title: 'High-Performance Websocket Layers',
        description: 'Assembled low-latency WebSocket triggers streaming individual judge clicks safely in milliseconds.',
      },
      {
        number: '02',
        title: 'Strict Calculation Schemas',
        description: 'Programmed strict server-side schema constraints validating judge scores to prevent manual rule-breaking.',
      },
      {
        number: '03',
        title: 'Live Audience Board Rendering',
        description: 'Coded beautiful, responsive large-screen projection boards triggering smooth rank transformations on score updates.',
      },
    ],
    features: [
      {
        icon: React.createElement(Terminal, { className: 'w-5 h-5 text-[#c8f45e]' }),
        name: 'Judge Tablet Panel',
        description: 'Extremely simple, high-contrast inputs optimized for instant touch interactions with back-end audit chains.',
      },
      {
        icon: React.createElement(Sparkles, { className: 'w-5 h-5 text-[#c8f45e]' }),
        name: 'Zero Latency Scores Sync',
        description: 'Runs instant websocket relays notifying audit admins of discrepancies within fractions of a second.',
      },
      {
        icon: React.createElement(Layers, { className: 'w-5 h-5 text-[#c8f45e]' }),
        name: 'Print-Ready PDF Auditing',
        description: 'Generates tamper-proof, perfectly aligned PDF logs certified to be printed and signed by independent auditors.',
      },
      {
        icon: React.createElement(Cpu, { className: 'w-5 h-5 text-[#c8f45e]' }),
        name: 'Tie-Breaker Engine',
        description: 'Automated execution of complex pageant rules regarding ties, calculating secondary criteria instantenously.',
      },
    ],
    learned:
      'Managing high-pressure, event-driven web environments taught me the extreme importance of offline backup syncing, redundant websocket paths, and foolproof client interface designs.',
  },
  'resume-ai-analyzer': {
    id: 'resume-ai-analyzer',
    num: '04',
    title: 'Resume AI Analyzer',
    type: 'Web Application',
    tech: ['Next.js', 'OpenAI', 'Tailwind CSS', 'PDFParse'],
    year: '2025',
    link: 'https://ai-resume-analyzer-jade.vercel.app/',
    github: 'https://github.com/giojoshua',
    image: '/selected-work/5.png',
    role: 'Lead AI & UX Architect',
    timeline: 'April 2025',
    problem:
      'Applicant tracking systems filter candidate resumes using rigid, outdated keyword-matching structures, leading to qualified engineers being rejected solely due to synonym matching voids.',
    process: [
      {
        number: '01',
        title: 'Structured Text Parsing',
        description: 'Built custom text stream extractors pulling content sections from PDF uploads regardless of columns layout and styling.',
      },
      {
        number: '02',
        title: 'Persona HR Prompts Modeling',
        description: 'Configured strict AI evaluator personas scoring candidate strengths, structure, and text density against job descriptions.',
      },
      {
        number: '03',
        title: 'Interactive Gap Graphing',
        description: 'Integrated clean SVG metrics visualizing skill matches, highlighting critical missing keywords easily.',
      },
    ],
    features: [
      {
        icon: React.createElement(Cpu, { className: 'w-5 h-5 text-[#c8f45e]' }),
        name: 'ATS Score Analyzer',
        description: 'Generates structured ratings on resume structure, impact words usage, and overall readability instantly.',
      },
      {
        icon: React.createElement(Database, { className: 'w-5 h-5 text-[#c8f45e]' }),
        name: 'Keyword Gap Locator',
        description: 'Cross-checks resume against specific job requirements, spitting out concrete tags to add.',
      },
      {
        icon: React.createElement(Terminal, { className: 'w-5 h-5 text-[#c8f45e]' }),
        name: 'Instant Bullet Point Rewriter',
        description: 'Uses AI embeddings to suggest high-impact action verbs and quantitative metrics for custom career positions.',
      },
      {
        icon: React.createElement(Layers, { className: 'w-5 h-5 text-[#c8f45e]' }),
        name: 'PDF Multi-Format Support',
        description: 'Parses multiple text encodings smoothly with high resistance to structural glitches and scan overlaps.',
      },
    ],
    learned:
      'Building clean multi-level PDF engines helped me master stream conversions, token payload management under context limits, and clean data parsing configurations.',
  },
  'logistics-management-system': {
    id: 'logistics-management-system',
    num: '05',
    title: 'Logistics Management System',
    type: 'Full Stack',
    tech: ['Next.js', 'Redis', 'Supabase', 'PostgreSQL'],
    year: '2025',
    link: 'https://logistics-system-one.vercel.app/',
    github: 'https://github.com/giojoshua',
    image: '/selected-work/4.png',
    role: 'Lead Database Engineer',
    timeline: 'April 2025 - May 2025',
    problem:
      'Enterprise courier systems face massive query bottlenecks on PostgreSQL during driver location spikes and status modifications, leading to site lag and slow customer notifications.',
    process: [
      {
        number: '01',
        title: 'In-Memory Caching Setup',
        description: 'Structured high-speed Redis buffers to fetch, record, and serve active driver locations instantly.',
      },
      {
        number: '02',
        title: 'Relational Database Map',
        description: 'Mapped detailed PostgreSQL relational structures managing shipment logs, invoice details, and customer information.',
      },
      {
        number: '03',
        title: 'Routing Distance Optimization',
        description: 'Coded dynamic grid sort algorithms routing parcel dispatches based on geolocation proximity indices.',
      },
    ],
    features: [
      {
        icon: React.createElement(Sparkles, { className: 'w-5 h-5 text-[#c8f45e]' }),
        name: 'Real-Time Courier Updates',
        description: 'Pipes vehicle progress events instantly to client screens via serverless event-driven configurations.',
      },
      {
        icon: React.createElement(Database, { className: 'w-5 h-5 text-[#c8f45e]' }),
        name: 'Redis Tracking Buffers',
        description: 'Bypasses slow database queries during tracking bursts to preserve computing power on core hosts.',
      },
      {
        icon: React.createElement(Layers, { className: 'w-5 h-5 text-[#c8f45e]' }),
        name: 'Carrier Portal Hubs',
        description: 'Complete localized views for warehouse managers, truck operators, and dispatch analysts.',
      },
      {
        icon: React.createElement(Cpu, { className: 'w-5 h-5 text-[#c8f45e]' }),
        name: 'Dynamic Dispatch Queuing',
        description: 'Orders parcel queues automatically relative to carrier weight boundaries and local timelines.',
      },
    ],
    learned:
      'Gained invaluable experience building real-time caching systems with Redis, scaling data architectures, and managing ACID transaction consistency.',
  },
  'web-based-photobooth-application': {
    id: 'web-based-photobooth-application',
    num: '06',
    title: 'Web Based Photobooth Application',
    type: 'Web Application',
    tech: ['JavaScript', 'Canvas API', 'HTML5', 'WebRTC'],
    year: '2025',
    link: 'https://github.com/giojoshua',
    github: 'https://github.com/giojoshua',
    image: '/selected-work/6.png',
    role: 'Interactive Canvas Lead',
    timeline: 'May 2025',
    problem:
      'Most event overlays and photo frames tools force users to upload files to remote servers, complicating simple workflows and exposing personal media files to privacy hazards.',
    process: [
      {
        number: '01',
        title: 'WebRTC Video Steam Config',
        description: 'Synchronized modern browser capture mechanisms fetching high-framerate, clean local camera feeds.',
      },
      {
        number: '02',
        title: 'CPU Pixel Matrix Mathematics',
        description: 'Designed rapid local algorithms computing custom parameters for filters (monochrome, high-exposure) in real-time.',
      },
      {
        number: '03',
        title: 'Export Layout Compositor',
        description: 'Wrote clean drawing pathways rendering layered vector boundaries, timestamps, and images safely to clean exports.',
      },
    ],
    features: [
      {
        icon: React.createElement(Cpu, { className: 'w-5 h-5 text-[#c8f45e]' }),
        name: 'Local Stream Capture',
        description: 'Operates entirely on-device, offering instant image framing with absolute file security.',
      },
      {
        icon: React.createElement(Terminal, { className: 'w-5 h-5 text-[#c8f45e]' }),
        name: 'Color Matrix Filters',
        description: 'Applies immediate pixel-level changes to images through math transforms calculated inside the browser viewport.',
      },
      {
        icon: React.createElement(Sparkles, { className: 'w-5 h-5 text-[#c8f45e]' }),
        name: 'Interactive Frame Overlay',
        description: 'Drag, scale, and rotate high-contrast vector borders seamlessly prior to exporting images.',
      },
      {
        icon: React.createElement(Layers, { className: 'w-5 h-5 text-[#c8f45e]' }),
        name: 'Single-Click Capture Export',
        description: 'Flattens layered elements into gorgeous print-ready 300DPI PNG downloads instantaneously.',
      },
    ],
    learned:
      'Working directly with camera video stream variables, rendering frames, and manipulating individual color pixels on the Canvas layout is incredibly fast and performant.',
  },
  'ccis-ticket-automation-system': {
    id: 'ccis-ticket-automation-system',
    num: '07',
    title: 'CCIS Ticket Automation System',
    type: 'Automation',
    tech: ['Next.js', 'QR Code', 'Node.js', 'MongoDB'],
    year: '2025',
    link: 'https://github.com/giojoshua',
    github: 'https://github.com/giojoshua',
    image: '/selected-work/8.png',
    role: 'Full-Stack Automation Lead',
    timeline: 'May 2025 - June 2025',
    problem:
      'Academic departments face immense friction processing entry tickets manually for events, leading to gridlock at entrances, fraudulent entries, and poor post-event metrics reporting.',
    process: [
      {
        number: '01',
        title: 'Cryptographic QR Generation',
        description: 'Assembled secure unique hash tokens saved into student entries, drawing readable high-resolution QR graphics.',
      },
      {
        number: '02',
        title: 'Nodemailer Automation Queues',
        description: 'Engineered local mail queues delivering generated tickets to student email accounts securely on bulk registrations.',
      },
      {
        number: '03',
        title: 'Browser Scanning Interface',
        description: 'Developed quick scan pages parsing QR captures with local web cameras to confirm and record present states immediately.',
      },
    ],
    features: [
      {
        icon: React.createElement(Layers, { className: 'w-5 h-5 text-[#c8f45e]' }),
        name: 'Automatic PDF Dispatcher',
        description: 'Batch generates and dispatches tickets as beautiful email attachments immediately on form submission.',
      },
      {
        icon: React.createElement(Sparkles, { className: 'w-5 h-5 text-[#c8f45e]' }),
        name: 'Instant Scan Validation',
        description: 'Updates backend MongoDB collections instantly, logging timestamps and gate designations.',
      },
      {
        icon: React.createElement(Database, { className: 'w-5 h-5 text-[#c8f45e]' }),
        name: 'Comprehensive Rosters Grid',
        description: 'Easily filter, group, search, and export student attendance registers across years and sections.',
      },
      {
        icon: React.createElement(Cpu, { className: 'w-5 h-5 text-[#c8f45e]' }),
        name: 'Metrics Data Charts',
        description: 'Clean dashboard charts showing real-time turnout figures and peak check-in time windows.',
      },
    ],
    learned:
      'Gained deep insight into secure asset generation, background task automation, and high-performance camera index parsing on mobile devices.',
  },
};

export const projectKeys = Object.keys(caseStudiesData);
