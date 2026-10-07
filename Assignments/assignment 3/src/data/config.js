// ─────────────────────────────────────────────────────────────
// SINGLE SOURCE OF TRUTH FOR ALL PORTFOLIO CONTENT
// Edit this file to update the site. No numbers below are
// fabricated — set them once you know the real values.
// ─────────────────────────────────────────────────────────────

export const profile = {
  name: 'Pushkar Goel',
  firstName: 'Pushkar',
  lastName: 'Goel',
  role: 'Computer Science Engineering',
  tagline: ['AI/ML', 'Full-Stack Development', 'Creative Technology'],
  degree: 'B.Tech, Computer Science Engineering',
  location: 'India',
  email: 'pushkar.goel@example.com', // TODO: replace with real email
  resumeUrl: '#', // TODO: link to resume PDF
  // TODO: replace with a real portrait image, e.g. '/portrait.jpg'
  portraitUrl: null,
  socials: {
    github: 'https://github.com/Pushkar-goyal',
    linkedin: 'https://linkedin.com/in/pushkar-goel', // TODO: verify handle
    email: 'mailto:pushkar.goel@example.com',
  },
}

export const about = {
  paragraphs: [
    "I'm a Computer Science Engineering student who builds things at the intersection of intelligence and interface — systems that reason, and products people actually enjoy using.",
    'My focus splits between AI/ML — models, pipelines, applied research — and full-stack engineering, turning ideas into shipped, usable software.',
    "I'm drawn to problems with real-world weight: civic systems, public infrastructure, and tools that make information easier to access.",
  ],
  interests: [
    'Artificial Intelligence',
    'Machine Learning',
    'Full-Stack Development',
    'Software Engineering',
    'Building Practical Technology',
  ],
}

// Edit these numbers as they become real — nothing here is invented.
export const stats = [
  { label: 'Projects', value: 3, suffix: '+' },
  { label: 'Technologies', value: 10, suffix: '+' },
  { label: 'Hackathons', value: 0, suffix: '' },
  { label: 'Always', value: 100, suffix: '%', overrideLabel: 'Learning' },
]

export const skills = [
  { name: 'C++', category: 'Language' },
  { name: 'JavaScript', category: 'Language' },
  { name: 'Python', category: 'Language' },
  { name: 'React', category: 'Frontend' },
  { name: 'Node.js', category: 'Backend' },
  { name: 'MongoDB', category: 'Database' },
  { name: 'Tailwind CSS', category: 'Frontend' },
  { name: 'Git', category: 'Tooling' },
  { name: 'GitHub', category: 'Tooling' },
  { name: 'AI / ML', category: 'Discipline' },
]

export const projects = [
  {
    id: 'digital-citizen-assistant',
    title: 'Digital Citizen Assistant',
    short: 'AI-powered multilingual platform',
    description:
      'An AI-powered multilingual platform that helps people discover the right government services and the documents required to access them.',
    tech: ['AI/ML', 'React', 'Node.js', 'NLP'],
    githubUrl: 'https://github.com/Pushkar-goyal', // TODO: link exact repo
    liveUrl: '#', // TODO: add live demo link
    // TODO: replace with a real project screenshot
    imageUrl: null,
  },
  {
    id: 'disaster-response-intelligence',
    title: 'Disaster Response Intelligence Platform',
    short: 'Prediction & emergency planning',
    description:
      'A technology-focused platform for disaster prediction, emergency planning, and response intelligence — built to help teams act faster with better data.',
    tech: ['Python', 'Data Modeling', 'React', 'MongoDB'],
    githubUrl: 'https://github.com/Pushkar-goyal',
    liveUrl: '#',
    imageUrl: null,
  },
  {
    id: 'locality-issue-reporting',
    title: 'Locality Issue Reporting Portal',
    short: 'Civic-tech, map-based reporting',
    description:
      'A civic-tech platform for reporting local issues, with location and map-based functionality so problems reach the right people faster.',
    tech: ['React', 'Node.js', 'MongoDB', 'Maps API'],
    githubUrl: 'https://github.com/Pushkar-goyal',
    liveUrl: '#',
    imageUrl: null,
  },
]

export const journey = [
  {
    id: 'learning',
    label: 'Learning',
    title: 'Foundations',
    description: 'Core CS fundamentals — data structures, algorithms, and the first lines of real code.',
  },
  {
    id: 'building',
    label: 'Building',
    title: 'Building Projects',
    description: 'Turning coursework into shipped projects — full-stack apps built end to end.',
  },
  {
    id: 'hackathons',
    label: 'Hackathons',
    title: 'Hackathons',
    description: 'Building fast, under pressure, alongside people who care about the same problems.',
  },
  {
    id: 'aiml',
    label: 'AI/ML',
    title: 'AI / ML',
    description: 'Going deeper into models, data, and applied machine learning.',
  },
  {
    id: 'fullstack',
    label: 'Full Stack',
    title: 'Full-Stack Engineering',
    description: 'Designing and shipping complete products — frontend, backend, and everything between.',
  },
  {
    id: 'future',
    label: 'Future',
    title: 'Future Goals',
    description: 'Building AI-native products that are genuinely useful — and shipping them at scale.',
  },
]

export const github = {
  username: 'Pushkar-goyal',
  profileUrl: 'https://github.com/Pushkar-goyal',
  // Live stats intentionally omitted — connect the GitHub API here
  // (e.g. GET https://api.github.com/users/Pushkar-goyal) to populate
  // real repo counts, stars, and contribution data.
  featuredRepoNote:
    'Live repository data isn\u2019t wired up yet — this section is structured so the GitHub API can be connected later.',
}

export const nav = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Journey', href: '#journey' },
  { label: 'Contact', href: '#contact' },
]
