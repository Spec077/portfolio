import { useRef, useEffect } from "react";
import { techStack } from "../../../mocks/portfolio";

export default function TechMarquee() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll(".reveal").forEach((el, i) => {
              setTimeout(() => el.classList.add("visible"), i * 100);
            });
          }
        });
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Duplicate for seamless loop
  const doubledStack = [...techStack, ...techStack];

  return (
    <section
      id="stack"
      ref={sectionRef}
      className="relative py-20 sm:py-24 lg:py-28 overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #0A0A0F 0%, #0F1117 50%, #0A0A0F 100%)",
        borderTop: "1px solid rgba(255,255,255,0.03)",
        borderBottom: "1px solid rgba(255,255,255,0.03)",
      }}
    >
      {/* Gradient accent */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 50% 50%, rgba(139,92,246,0.06) 0%, transparent 70%)" }}
      />

      {/* Fade edges on marquee */}
      <div
        className="absolute left-0 top-0 bottom-0 w-32 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to right, #0A0A0F, transparent)" }}
      />
      <div
        className="absolute right-0 top-0 bottom-0 w-32 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to left, #0A0A0F, transparent)" }}
      />

      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-12 mb-10 sm:mb-14 text-center">
        {/* Section label */}
        <div className="reveal flex items-center justify-center gap-4 mb-4">
          <div className="h-px w-16" style={{ background: "linear-gradient(to right, transparent, rgba(0,240,255,0.4))" }} />
          <span className="font-mono text-xs tracking-[0.2em] uppercase text-[#00F0FF]">Tech Ecosystem</span>
          <div className="h-px w-16" style={{ background: "linear-gradient(to left, transparent, rgba(0,240,255,0.4))" }} />
        </div>
        <h2 className="reveal font-display font-700 text-white" style={{ fontSize: "clamp(28px, 3.5vw, 40px)" }}>
          The Stack I Build With
        </h2>
        <p className="reveal text-white/45 font-body text-sm mt-3 max-w-lg mx-auto leading-relaxed">
          Battle-tested tools across the full stack — from pixel-perfect frontends to scalable backend infrastructure.
        </p>
      </div>

      {/* Marquee */}
      <div className="relative overflow-hidden">
        <div
          className="marquee-track flex gap-6 w-max"
          style={{ willChange: "transform" }}
        >
          {doubledStack.map((tech, i) => (
            <TechCard key={`${tech.name}-${i}`} tech={tech} />
          ))}
        </div>
      </div>
    </section>
  );
}

interface TechCardProps {
  tech: { name: string; image: string; color: string };
}

function TechCard({ tech }: TechCardProps) {
  return (
    <div
      className="flex flex-col items-center gap-3 shrink-0 group cursor-pointer"
      style={{ width: "88px" }}
    >
      <div
        className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:-translate-y-2"
        style={{
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.07)",
          backdropFilter: "blur(20px)",
        }}
        onMouseEnter={(e) => {
          const el = e.currentTarget as HTMLElement;
          el.style.background = `${tech.color}15`;
          el.style.borderColor = `${tech.color}40`;
          el.style.boxShadow = `0 12px 40px rgba(0,0,0,0.5), 0 0 20px ${tech.color}20`;
        }}
        onMouseLeave={(e) => {
          const el = e.currentTarget as HTMLElement;
          el.style.background = "rgba(255,255,255,0.04)";
          el.style.borderColor = "rgba(255,255,255,0.07)";
          el.style.boxShadow = "none";
        }}
      >
        <img
          src={tech.image}
          alt={tech.name}
          className="w-8 h-8 sm:w-10 sm:h-10 object-contain transition-all duration-300 grayscale group-hover:grayscale-0"
          style={{ filter: "brightness(0.9)" }}
        />
      </div>
      <span
        className="font-mono text-[10px] text-white/30 group-hover:text-white/70 transition-colors duration-300 tracking-wide text-center"
      >
        {tech.name}
      </span>
    </div>
  );
}
