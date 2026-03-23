import { useState, useRef, useEffect } from "react";
import { services } from "../../../mocks/portfolio";

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll(".reveal").forEach((el, i) => {
              setTimeout(() => el.classList.add("visible"), i * 120);
            });
          }
        });
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative py-24 sm:py-28 lg:py-36 overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #0A0A0F 0%, #0D0D14 50%, #0A0A0F 100%)",
      }}
    >
      {/* Grid pattern */}
      <div className="absolute inset-0 grid-pattern opacity-25" />

      {/* Accent glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(139,92,246,0.07) 0%, transparent 70%)" }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        {/* Header */}
        <div className="mb-12 sm:mb-16">
          <div className="reveal flex items-center gap-3 mb-4">
            <span className="font-mono text-xs tracking-[0.2em] uppercase text-[#8B5CF6]">What I Do</span>
            <div className="h-px w-12" style={{ background: "rgba(139,92,246,0.4)" }} />
          </div>
          <div className="reveal flex flex-wrap items-end justify-between gap-6">
            <h2 className="font-display font-700 leading-tight" style={{ fontSize: "clamp(32px, 4.5vw, 52px)" }}>
              <span className="text-white">Services &amp; </span>
              <span className="text-gradient-violet">Capabilities</span>
            </h2>
            <p className="text-white/45 font-body text-sm max-w-md leading-relaxed">
              From pixel-perfect UI to production-grade backends — I deliver complete, polished solutions that teams trust.
            </p>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((service, i) => (
            <ServiceCard key={service.id} service={service} index={i} />
          ))}
        </div>

      </div>
    </section>
  );
}

interface ServiceCardProps {
  service: typeof services[0];
  index: number;
}

function ServiceCard({ service, index }: ServiceCardProps) {
  const [hovered, setHovered] = useState(false);

  // Extract gradient start color for glow
  const glowColor = index === 0 ? "rgba(0,240,255,0.15)" : index === 1 ? "rgba(139,92,246,0.15)" : index === 2 ? "rgba(255,167,38,0.15)" : "rgba(0,240,255,0.1)";

  return (
    <div
      className="reveal rounded-2xl p-6 sm:p-7 transition-all duration-400 cursor-default"
      style={{
        background: hovered ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.03)",
        border: hovered ? `1px solid ${glowColor.replace("0.15", "0.4")}` : "1px solid rgba(255,255,255,0.06)",
        transform: hovered ? "translateY(-6px)" : "translateY(0)",
        boxShadow: hovered ? `0 20px 60px rgba(0,0,0,0.4), 0 0 30px ${glowColor}` : "none",
        backdropFilter: "blur(20px)",
        transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Icon */}
      <div
        className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-transform duration-300"
        style={{
          background: `linear-gradient(135deg, ${glowColor.replace("0.15", "0.25")}, ${glowColor.replace("0.15", "0.1")})`,
          border: `1px solid ${glowColor.replace("0.15", "0.3")}`,
          transform: hovered ? "rotate(5deg) scale(1.05)" : "rotate(0deg) scale(1)",
        }}
      >
        <i
          className={`${service.icon} text-2xl`}
          style={{ color: index === 0 ? "#00F0FF" : index === 1 ? "#8B5CF6" : index === 2 ? "#FFA726" : index === 3 ? "#00F0FF" : index === 4 ? "#8B5CF6" : "#EC4899" }}
        />
      </div>

      {/* Title */}
      <h3 className="font-display font-700 text-white text-lg mb-3">{service.title}</h3>

      {/* Description */}
      <p className="text-white/55 font-body text-sm leading-relaxed mb-5">{service.description}</p>

      {/* Feature list */}
      <ul className="flex flex-col gap-2.5">
        {service.features.map((feat) => (
          <li key={feat} className="flex items-center gap-2.5 text-xs font-body text-white/65">
            <div
              className="w-1.5 h-1.5 rounded-full shrink-0"
              style={{
                background: index === 0 ? "#00F0FF" : index === 1 ? "#8B5CF6" : index === 2 ? "#FFA726" : "#00F0FF",
              }}
            />
            {feat}
          </li>
        ))}
      </ul>
    </div>
  );
}
