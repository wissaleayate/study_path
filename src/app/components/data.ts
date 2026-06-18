export type Opportunity = {
  id: string;
  title: string;
  organization: string;
  location: string;
  type: "internship" | "scholarship" | "workshop" | "course";
  tags: string[];
  deadline: string;
  stipend?: string;
  amount?: string;
  duration?: string;
  description: string;
  logo: string;
  featured?: boolean;
  remote?: boolean;
  bookmarked?: boolean;
};

export const opportunities: Opportunity[] = [
  {
    id: "i1",
    title: "Software Engineering Intern",
    organization: "Google",
    location: "Mountain View, CA",
    type: "internship",
    tags: ["Engineering", "Full-Stack", "Paid"],
    deadline: "2026-07-15",
    stipend: "$9,000/mo",
    duration: "12 weeks",
    description: "Join Google's engineering team to work on large-scale distributed systems, machine learning infrastructure, or mobile products.",
    logo: "G",
    featured: true,
    remote: false,
  },
  {
    id: "i2",
    title: "Data Science Intern",
    organization: "Microsoft",
    location: "Redmond, WA",
    type: "internship",
    tags: ["Data Science", "Python", "Paid"],
    deadline: "2026-07-20",
    stipend: "$8,500/mo",
    duration: "10 weeks",
    description: "Work with Microsoft's AI & Research team on cutting-edge data science problems, building models that impact millions of users.",
    logo: "M",
    featured: true,
    remote: true,
  },
  {
    id: "i3",
    title: "UX Design Intern",
    organization: "Figma",
    location: "San Francisco, CA",
    type: "internship",
    tags: ["Design", "UX", "Figma", "Paid"],
    deadline: "2026-08-01",
    stipend: "$7,800/mo",
    duration: "12 weeks",
    description: "Design intuitive experiences for Figma's product suite, working alongside world-class designers and engineers.",
    logo: "F",
    remote: true,
  },
  {
    id: "i4",
    title: "Product Management Intern",
    organization: "Meta",
    location: "Menlo Park, CA",
    type: "internship",
    tags: ["Product", "Strategy", "Paid"],
    deadline: "2026-07-30",
    stipend: "$8,200/mo",
    duration: "12 weeks",
    description: "Drive product strategy and work with engineering, design, and data teams to ship impactful features at scale.",
    logo: "M",
    remote: false,
  },
  {
    id: "i5",
    title: "Marketing Analytics Intern",
    organization: "Spotify",
    location: "New York, NY",
    type: "internship",
    tags: ["Marketing", "Analytics", "Music"],
    deadline: "2026-08-10",
    stipend: "$6,500/mo",
    duration: "10 weeks",
    description: "Analyze campaign performance and audience data to drive Spotify's growth marketing initiatives.",
    logo: "S",
    remote: true,
  },
  {
    id: "i6",
    title: "Finance Intern",
    organization: "Goldman Sachs",
    location: "New York, NY",
    type: "internship",
    tags: ["Finance", "Banking", "Paid"],
    deadline: "2026-09-01",
    stipend: "$10,000/mo",
    duration: "10 weeks",
    description: "Work in investment banking, asset management, or consumer & wealth management divisions.",
    logo: "GS",
    remote: false,
  },
  {
    id: "s1",
    title: "Gates Millennium Scholarship",
    organization: "Bill & Melinda Gates Foundation",
    location: "USA",
    type: "scholarship",
    tags: ["STEM", "Leadership", "Full Ride"],
    deadline: "2026-09-15",
    amount: "Full tuition + living expenses",
    description: "Awarded to outstanding minority students with exceptional academic records and demonstrated leadership.",
    logo: "G",
    featured: true,
  },
  {
    id: "s2",
    title: "Chevening Scholarship",
    organization: "UK Government",
    location: "United Kingdom",
    type: "scholarship",
    tags: ["Graduate", "International", "Leadership"],
    deadline: "2026-11-01",
    amount: "Full tuition + stipend",
    description: "Fully funded UK government scholarship for future leaders, influencers, and decision-makers.",
    logo: "C",
    featured: true,
  },
  {
    id: "s3",
    title: "Rhodes Scholarship",
    organization: "Rhodes Trust",
    location: "Oxford, UK",
    type: "scholarship",
    tags: ["Graduate", "Prestigious", "Full Ride"],
    deadline: "2026-10-01",
    amount: "$75,000/year",
    description: "The world's oldest and most celebrated international fellowship for postgraduate study at Oxford University.",
    logo: "R",
  },
  {
    id: "s4",
    title: "Fulbright Student Program",
    organization: "U.S. Department of State",
    location: "International",
    type: "scholarship",
    tags: ["Research", "International", "Graduate"],
    deadline: "2026-10-10",
    amount: "Full funding",
    description: "Study, research, or teach English abroad with full funding from the U.S. government.",
    logo: "F",
  },
  {
    id: "s5",
    title: "STEM Excellence Award",
    organization: "National Science Foundation",
    location: "USA",
    type: "scholarship",
    tags: ["STEM", "Research", "Undergraduate"],
    deadline: "2026-08-31",
    amount: "$25,000",
    description: "For outstanding undergraduate students pursuing research in STEM fields with demonstrated academic excellence.",
    logo: "N",
  },
  {
    id: "w1",
    title: "Machine Learning Bootcamp",
    organization: "Coursera / deeplearning.ai",
    location: "Online",
    type: "course",
    tags: ["AI/ML", "Python", "Beginner-Friendly"],
    deadline: "Rolling",
    duration: "3 months",
    description: "Master machine learning fundamentals with Andrew Ng. Hands-on projects with real datasets.",
    logo: "C",
    featured: true,
    remote: true,
  },
  {
    id: "w2",
    title: "Full-Stack Web Development",
    organization: "The Odin Project",
    location: "Online",
    type: "course",
    tags: ["Web Dev", "JavaScript", "Free"],
    deadline: "Rolling",
    duration: "Self-paced",
    description: "A free, open-source curriculum to learn full-stack web development from scratch to job-ready.",
    logo: "O",
    remote: true,
  },
  {
    id: "w3",
    title: "Design Thinking Workshop",
    organization: "IDEO U",
    location: "Online",
    type: "workshop",
    tags: ["Design", "Innovation", "Certificate"],
    deadline: "2026-08-20",
    duration: "6 weeks",
    description: "Learn human-centered design methods from IDEO practitioners. Get a certificate upon completion.",
    logo: "I",
    remote: true,
  },
  {
    id: "w4",
    title: "Entrepreneurship Masterclass",
    organization: "Harvard Online",
    location: "Online",
    type: "workshop",
    tags: ["Business", "Startup", "Leadership"],
    deadline: "2026-09-01",
    duration: "8 weeks",
    description: "Harvard faculty teach key principles of entrepreneurship, from ideation to pitching investors.",
    logo: "H",
    featured: true,
    remote: true,
  },
  {
    id: "w5",
    title: "Cybersecurity Fundamentals",
    organization: "IBM SkillsBuild",
    location: "Online",
    type: "course",
    tags: ["Cybersecurity", "Tech", "Free", "Certificate"],
    deadline: "Rolling",
    duration: "4 weeks",
    description: "IBM-certified course covering network security, ethical hacking, and security best practices.",
    logo: "I",
    remote: true,
  },
];

export type StudyGoal = {
  id: string;
  subject: string;
  targetHours: number;
  completedHours: number;
  color: string;
  deadline: string;
};

export const studyGoals: StudyGoal[] = [
  { id: "g1", subject: "Algorithms & Data Structures", targetHours: 40, completedHours: 28, color: "#4f46e5", deadline: "2026-07-01" },
  { id: "g2", subject: "Machine Learning", targetHours: 60, completedHours: 18, color: "#7c3aed", deadline: "2026-08-15" },
  { id: "g3", subject: "System Design", targetHours: 30, completedHours: 22, color: "#0891b2", deadline: "2026-07-20" },
  { id: "g4", subject: "Behavioral Interview Prep", targetHours: 20, completedHours: 10, color: "#059669", deadline: "2026-07-10" },
];

export type StudySession = {
  day: string;
  hours: number;
};

export const weeklyStudy: StudySession[] = [
  { day: "Mon", hours: 3.5 },
  { day: "Tue", hours: 2 },
  { day: "Wed", hours: 4 },
  { day: "Thu", hours: 1.5 },
  { day: "Fri", hours: 3 },
  { day: "Sat", hours: 5 },
  { day: "Sun", hours: 2.5 },
];

export const notifications = [
  { id: "n1", type: "deadline", message: "Gates Millennium Scholarship deadline in 7 days", time: "2 hours ago", read: false },
  { id: "n2", type: "new", message: "New internship posted: AI Engineer at OpenAI", time: "5 hours ago", read: false },
  { id: "n3", type: "reminder", message: "Study goal reminder: Machine Learning — 42 hours remaining", time: "1 day ago", read: true },
  { id: "n4", type: "deadline", message: "Google SWE Intern application closes in 2 weeks", time: "2 days ago", read: true },
  { id: "n5", type: "new", message: "New scholarship: NSF Graduate Research Fellowship", time: "3 days ago", read: true },
];
