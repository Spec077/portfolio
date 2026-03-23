import neonDbMark from "../assets/neondb-mark.svg";
import firebaseMark from "../assets/firebase-mark.svg";
import otpixImage from "../assets/otpix.png";
import fixmatchImage from "../assets/fixmatch.png";
import richoloImage from "../assets/richolo.png";
import hisproImage from "../assets/hispro.png";

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  role: string;
  liveUrl: string;
  githubUrl: string;
  featured: boolean;
  accentColor: string;
}

export interface Service {
  id: string;
  icon: string;
  title: string;
  description: string;
  features: string[];
  gradient: string;
}

export interface TechItem {
  name: string;
  image: string;
  color: string;
}

export const projects: Project[] = [
  {
    id: "otpix",
    title: "OTPIX - SMS Verification Platform",
    description:
      "Full-stack OTP/SMS verification platform with NGN wallet funding, temporary number purchasing, live OTP delivery via webhook + polling, order history, and refunds.",
    image: otpixImage,
    tags: ["React", "Tailwind CSS", "JavaScript", "Node.js", "Prisma", "JWT Auth"],
    role: "Full-Stack Lead",
    liveUrl: "https://otpix.vercel.app",
    githubUrl: "#",
    featured: true,
    accentColor: "#F59E0B",
  },
  {
    id: "service-platform",
    title: "Fixmatch - Service Marketplace",
    description:
      "A location-based artisan discovery and booking platform that connects users with local service providers. It features real-time availability and a seamless booking experience.",
    image: fixmatchImage,
    tags: ["React", "Tailwind CSS", "Firebase", "Vercel", "JavaScript"],
    role: "Frontend Dev",
    liveUrl: "https://getfixmatch.vercel.app",
    githubUrl: "#",
    featured: false,
    accentColor: "#8B5CF6",
  },
  {
    id: "richolo",
    title: "Richolo",
    description:
      "Modern full-stack ecommerce platform with real-time product management, secure checkout, and admin order control.",
    image: richoloImage,
    tags: ["React", "Prisma", "Node.js", "Vercel"],
    role: "Frontend & Backend Engineer",
    liveUrl: "https://richolo.vercel.app",
    githubUrl: "#",
    featured: false,
    accentColor: "amber",
  },
  {
    id: "health information system",
    title: "HIS.pro",
    description:
      "Modern Hospital Information System that helps healthcare facilities manage patient records, appointments, clinical workflows, laboratory services, pharmacy, and billing through a unified digital platform.",
    image: hisproImage,
    tags: ["React", "Tailwind CSS", "Vercel"],
    role: "Frontend Dev",
    liveUrl: "https://hispro.vercel.app",
    githubUrl: "#",
    featured: false,
    accentColor: "cyan",
  },
];

export const services: Service[] = [
  {
    id: "frontend",
    icon: "ri-code-s-slash-line",
    title: "Frontend Development",
    description:
      "Responsive React interfaces built to feel clean, fast, and easy to use. I focus on turning ideas and designs into polished web experiences that work across devices.",
    features: [
      "React and Vite interfaces",
      "Responsive mobile-first layouts",
      "Clean UI implementation",
      "Interactive sections and components",
      "Performance-focused frontend structure",
    ],
    gradient: "from-cyan-500 to-[#0080FF]",
  },
  {
    id: "fullstack",
    icon: "ri-stack-line",
    title: "Full-Stack Web Apps",
    description:
      "I build complete web applications from frontend to backend, connecting interfaces to real data, authentication, and core business logic.",
    features: [
      "Frontend and backend integration",
      "Firebase and NeonDB workflows",
      "Authentication and protected routes",
      "Form handling and data flow",
      "Deployment-ready web apps",
    ],
    gradient: "from-violet-500 to-[#EC4899]",
  },
  {
    id: "backend",
    icon: "ri-server-line",
    title: "Backend & API Integration",
    description:
      "I connect applications to backend services, databases, and third-party tools so products do more than look good and actually work end to end.",
    features: [
      "REST API consumption",
      "Database connection setup",
      "Firebase services integration",
      "Third-party service integration",
      "Structured app data handling",
    ],
    gradient: "from-[#FFA726] to-[#FF6B35]",
  },
  {
    id: "mvp",
    icon: "ri-rocket-line",
    title: "MVP Builds",
    description:
      "For startups, founders, or personal brands that need to move quickly, I can help turn an idea into a functional first version ready to test and launch.",
    features: [
      "Fast prototype delivery",
      "Landing pages and product pages",
      "Core feature implementation",
      "Simple admin or dashboard views",
      "Launch-ready first version",
    ],
    gradient: "from-[#00F0FF] to-violet-500",
  },
  {
    id: "dashboard",
    icon: "ri-dashboard-line",
    title: "Admin Dashboards",
    description:
      "I build dashboard interfaces that make information easier to manage, whether it is for healthcare, products, content, or internal business operations.",
    features: [
      "Data display and management screens",
      "Search, filters, and navigation",
      "User-friendly dashboard layouts",
      "Responsive admin interfaces",
      "Practical workflow-focused design",
    ],
    gradient: "from-[#8B5CF6] to-[#00F0FF]",
  },
  {
    id: "consulting",
    icon: "ri-lightbulb-flash-line",
    title: "Website Revamps",
    description:
      "If a website feels outdated, unclear, or hard to use, I can redesign and rebuild it into something cleaner, more modern, and more effective.",
    features: [
      "UI cleanup and redesign",
      "Better structure and spacing",
      "Improved mobile responsiveness",
      "More modern visual presentation",
      "Conversion-focused improvements",
    ],
    gradient: "from-[#EC4899] to-[#FFA726]",
  },
];

export const techStack: TechItem[] = [
  { name: "React", image: "https://cdn.simpleicons.org/react/61DAFB", color: "#61DAFB" },
  { name: "Vite", image: "https://cdn.simpleicons.org/vite/646CFF", color: "#646CFF" },
  { name: "JavaScript", image: "https://cdn.simpleicons.org/javascript/F7DF1E", color: "#F7DF1E" },
  { name: "TypeScript", image: "https://cdn.simpleicons.org/typescript/3178C6", color: "#3178C6" },
  { name: "Node.js", image: "https://cdn.simpleicons.org/nodedotjs/68A063", color: "#68A063" },
  { name: "Firebase", image: firebaseMark, color: "#FFCA28" },
  { name: "MongoDB", image: "https://cdn.simpleicons.org/mongodb/4FAA41", color: "#4FAA41" },
  { name: "NeonDB", image: neonDbMark, color: "#34D59A" },
  { name: "PostgreSQL", image: "https://cdn.simpleicons.org/postgresql/336791", color: "#336791" },
  { name: "Express", image: "https://cdn.simpleicons.org/express/FFFFFF", color: "#ffffff" },
  { name: "Tailwind", image: "https://cdn.simpleicons.org/tailwindcss/06B6D4", color: "#06B6D4" },
  { name: "PostCss", image: "https://cdn.simpleicons.org/postcss/D2D2D2", color: "#D2D2D2" },
  { name: "Autoprefixer", image: "https://cdn.simpleicons.org/autoprefixer/F05032", color: "#F05032" },
  { name: "Prisma", image: "https://cdn.simpleicons.org/prisma/FFFFFF", color: "#2D3748" },
  { name: "Git", image: "https://cdn.simpleicons.org/git/F05032", color: "#F05032" },
  { name: "Vercel", image: "https://cdn.simpleicons.org/vercel/ffffff", color: "#ffffff" },
];
