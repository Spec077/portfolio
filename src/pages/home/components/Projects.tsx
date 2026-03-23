import { useState, useRef, useEffect } from "react";
import { projects } from "../../../mocks/portfolio";
import type { Project } from "../../../mocks/portfolio";

const TAG_COLORS: Record<string, string> = {
  React: "#61DAFB",
  Firebase: "#FFCA28",
  "Tailwind CSS": "#06B6D4",
  Vercel: "#ffffff",
  JavaScript: "#F7DF1E",
  TypeScript: "#3178C6",
  "Node.js": "#68A063",
  "Next.js": "#ffffff",
  MongoDB: "#4FAA41",
  PostgreSQL: "#336791",
  Express: "#ffffff",
  Tailwind: "#06B6D4",
  Docker: "#2496ED",
  Redis: "#DC382D",
  GraphQL: "#E535AB",
  Stripe: "#635BFF",
  OpenAI: "#00A67E",
  Python: "#3776AB",
  "Socket.io": "#ffffff",
};

function ProjectCard({ project, large = false }: { project: Project; large?: boolean }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="relative rounded-2xl overflow-hidden group cursor-pointer transition-all duration-500"
      style={{
        background: "rgba(255,255,255,0.03)",
        border: hovered
          ? `1px solid rgba(0,240,255,0.25)`
          : "1px solid rgba(255,255,255,0.06)",
        boxShadow: hovered
          ? "0 24px 80px rgba(0,0,0,0.7), 0 0 40px rgba(0,240,255,0.1)"
          : "0 8px 30px rgba(0,0,0,0.3)",
        transform: hovered ? "translateY(-10px)" : "translateY(0)",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image area */}
      <div
        className="relative overflow-hidden"
        style={{ height: large ? "380px" : "280px" }}
      >
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover object-top transition-transform duration-700"
          style={{ transform: hovered ? "scale(1.06)" : "scale(1)" }}
        />
        {/* Gradient overlay */}
        <div
          className="absolute inset-0 transition-opacity duration-300"
          style={{
            background: "linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(10,10,15,0.95) 100%)",
            opacity: hovered ? 0.85 : 0.7,
          }}
        />

        {/* Featured badge */}
        {project.featured && (
          <div
            className="absolute top-4 left-4 px-3 py-1 rounded-full text-[10px] font-mono tracking-wide uppercase"
            style={{
              background: "rgba(0,240,255,0.12)",
              border: "1px solid rgba(0,240,255,0.3)",
              color: "#00F0FF",
            }}
          >
            Featured
          </div>
        )}

        {/* Action buttons on hover */}
      <div
        className="absolute top-4 right-4 flex gap-2 transition-all duration-300"
        style={{
          opacity: hovered ? 1 : 1,
          transform: hovered ? "translateY(0)" : "translateY(0)",
        }}
      >
          <a
            href={project.liveUrl}
            className="w-9 h-9 flex items-center justify-center rounded-xl cursor-pointer transition-all duration-200 hover:scale-110"
            style={{
              background: "rgba(0,240,255,0.15)",
              border: "1px solid rgba(0,240,255,0.3)",
              color: "#00F0FF",
            }}
            title="Live Demo"
          >
            <i className="ri-external-link-line text-sm" />
          </a>
          <a
            href={project.githubUrl}
            className="w-9 h-9 flex items-center justify-center rounded-xl cursor-pointer transition-all duration-200 hover:scale-110"
            style={{
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.15)",
              color: "white",
            }}
            title="GitHub"
          >
            <i className="ri-github-line text-sm" />
          </a>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 sm:p-6 transition-all duration-300" style={{ transform: hovered ? "translateY(-4px)" : "translateY(0)" }}>
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.slice(0, 4).map((tag) => (
            <span
              key={tag}
              className="text-[10px] font-mono px-2.5 py-1 rounded-md"
              style={{
                background: `${TAG_COLORS[tag] || "#ffffff"}12`,
                border: `1px solid ${TAG_COLORS[tag] || "#ffffff"}25`,
                color: TAG_COLORS[tag] || "rgba(255,255,255,0.6)",
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Title */}
        <h3
          className="font-display font-700 text-white mb-2 transition-colors duration-300"
          style={{ fontSize: large ? "24px" : "20px" }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#00F0FF"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "white"; }}
        >
          {project.title}
        </h3>

        {/* Description */}
        <p className="text-white/55 font-body text-sm leading-relaxed mb-4">
          {project.description}
        </p>

        {/* Footer row */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-4" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          <div
            className="px-3 py-1 rounded-full text-[10px] font-mono"
            style={{
              background: "rgba(139,92,246,0.1)",
              border: "1px solid rgba(139,92,246,0.2)",
              color: "#8B5CF6",
            }}
          >
            {project.role}
          </div>
          <div className="flex flex-wrap gap-3">
            <a
              href={project.liveUrl}
              className="flex items-center gap-1.5 text-xs font-display font-500 text-[#00F0FF] hover:text-white transition-colors cursor-pointer whitespace-nowrap"
            >
              Live Demo <i className="ri-external-link-line text-xs" />
            </a>
            <a
              href={project.githubUrl}
              className="flex items-center gap-1.5 text-xs font-display font-500 text-white/40 hover:text-white transition-colors cursor-pointer whitespace-nowrap"
            >
              GitHub <i className="ri-github-line text-xs" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll(".reveal").forEach((el, i) => {
              setTimeout(() => el.classList.add("visible"), i * 150);
            });
          }
        });
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const [featured, ...rest] = projects;

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative py-24 sm:py-28 lg:py-36 overflow-hidden"
      style={{ background: "#0A0A0F" }}
    >
      {/* Accent */}
      <div
        className="absolute bottom-0 left-0 w-[700px] h-[700px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(0,240,255,0.04) 0%, transparent 70%)" }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        {/* Header */}
        <div className="mb-12 sm:mb-16">
          <div className="reveal flex items-center gap-3 mb-4">
            <span className="font-mono text-xs tracking-[0.2em] uppercase text-[#00F0FF]">Selected Work</span>
            <div className="h-px w-12" style={{ background: "rgba(0,240,255,0.3)" }} />
          </div>
          <div className="reveal flex flex-wrap items-end justify-between gap-6">
            <h2 className="font-display font-700 leading-tight" style={{ fontSize: "clamp(32px, 4.5vw, 56px)" }}>
              <span className="text-white">Projects That</span>
              <span className="text-gradient-violet"> Ship Real Value</span>
            </h2>
            <p className="text-white/45 font-body text-sm max-w-sm leading-relaxed">
              Real-world products built with performance, scalability, and user experience as core priorities.
            </p>
          </div>
        </div>

        {/* Featured project - full width */}
        <div className="reveal mb-6">
          <ProjectCard project={featured} large />
        </div>

        {/* Rest - 3-column grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-14">
          {rest.map((project) => (
            <div key={project.id} className="reveal">
              <ProjectCard project={project} />
            </div>
          ))}
        </div>

        {/* View All */}
        <div className="reveal flex justify-center">
          <a
            href="#"
            className="flex items-center gap-3 px-8 py-4 rounded-full font-display font-600 text-sm text-white/60 hover:text-white cursor-pointer whitespace-nowrap transition-all duration-300 hover:border-[#00F0FF]/40 group"
            style={{ border: "1px solid rgba(255,255,255,0.12)" }}
          >
            View All Projects
            <i className="ri-arrow-right-line group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
}
