import { useEffect, useRef } from "react";

const SKILLS = [
  { label: "React", icon: "ri-reactjs-line", color: "#61DAFB" },
  { label: "TypeScript / JavaScript", icon: "ri-code-s-slash-line", color: "#3178C6" },
  { label: "Node.js", icon: "ri-server-line", color: "#68A063" },
  { label: "Database Design", icon: "ri-database-2-line", color: "#8B5CF6" },
  { label: "REST APIs", icon: "ri-api-line", color: "#00F0FF" },
  { label: "UI/UX Craft", icon: "ri-palette-line", color: "#FFA726" },
];

export default function About() {
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
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-24 sm:py-28 lg:py-36 overflow-hidden"
      style={{ background: "#0A0A0F" }}
    >
      {/* Background grid */}
      <div className="absolute inset-0 grid-pattern opacity-30" />

      {/* Accent glow */}
      <div
        className="absolute top-0 right-0 w-[600px] h-[600px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(139,92,246,0.06) 0%, transparent 70%)" }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          {/* Left — Image Card */}
          <div className="reveal flex justify-center lg:justify-start">
            <div className="relative w-full max-w-[420px]">
              {/* Main image card */}
              <div
                className="relative rounded-2xl overflow-hidden"
                style={{
                  border: "1px solid rgba(0,240,255,0.12)",
                  boxShadow: "0 30px 80px rgba(0,0,0,0.5)",
                }}
              >
                <div className="h-[360px] sm:h-[440px] lg:h-[480px] w-full relative">
                  <img
                    src="https://readdy.ai/api/search-image?query=professional%20young%20developer%20at%20workstation%20dark%20moody%20office%20setup%20dual%20monitors%20code%20on%20screens%20cinematic%20portrait%20photography%20dark%20background%20with%20subtle%20blue%20teal%20ambient%20light&width=420&height=480&seq=about1&orientation=portrait"
                    alt="Boluwatife Obasa - Full-Stack Developer"
                    className="w-full h-full object-cover object-top"
                  />
                  {/* Gradient overlay */}
                  <div
                    className="absolute inset-0"
                    style={{ background: "linear-gradient(to bottom, transparent 50%, rgba(10,10,15,0.9) 100%)" }}
                  />
                  {/* Cyan tint overlay */}
                  <div
                    className="absolute inset-0 opacity-20"
                    style={{ background: "linear-gradient(135deg, rgba(0,240,255,0.1), transparent 60%)" }}
                  />
                </div>
              </div>

              {/* Available badge */}
              <div
                className="absolute top-4 right-4 hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full"
                style={{
                  background: "rgba(10,10,15,0.85)",
                  border: "1px solid rgba(0,240,255,0.2)",
                  backdropFilter: "blur(12px)",
                }}
              >
                <div className="w-2 h-2 rounded-full bg-green-400" style={{ boxShadow: "0 0 6px rgba(74,222,128,0.8)" }} />
                <span className="text-green-400 text-xs font-mono">Available for Work</span>
              </div>

              {/* Floating skill card */}
              <div
                className="absolute -right-6 bottom-16 p-4 rounded-xl animate-float hidden md:block"
                style={{
                  background: "rgba(10,10,15,0.9)",
                  border: "1px solid rgba(139,92,246,0.25)",
                  backdropFilter: "blur(20px)",
                  boxShadow: "0 20px 60px rgba(0,0,0,0.4)",
                  animationDelay: "1s",
                }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ background: "linear-gradient(135deg, rgba(0,240,255,0.2), rgba(139,92,246,0.2))" }}
                  >
                    <i className="ri-code-s-slash-line text-[#00F0FF] text-lg" />
                  </div>
                  <div>
                    <p className="text-white text-xs font-display font-600">Full-Stack</p>
                    <p className="text-white/50 text-[10px] font-mono">React + Node.js</p>
                  </div>
                </div>
              </div>

              {/* Years badge */}
              <div
                className="absolute -left-6 top-16 p-4 rounded-xl hidden md:block"
                style={{
                  background: "rgba(10,10,15,0.9)",
                  border: "1px solid rgba(0,240,255,0.2)",
                  backdropFilter: "blur(20px)",
                }}
              >
                <p className="font-display font-700 text-3xl text-[#00F0FF] text-center">1+</p>
                <p className="text-white/50 text-[10px] font-mono text-center">Years</p>
              </div>
            </div>
          </div>

          {/* Right — Content */}
          <div className="flex flex-col gap-6">
            {/* Label */}
            <div className="reveal flex items-center gap-3">
              <span className="font-mono text-xs tracking-[0.2em] uppercase text-[#8B5CF6]">About Me</span>
              <div className="flex-1 h-px" style={{ background: "linear-gradient(to right, rgba(139,92,246,0.4), transparent)" }} />
            </div>

            {/* Headline */}
            <div className="reveal">
              <h2 className="font-display font-700 leading-tight" style={{ fontSize: "clamp(32px, 4vw, 48px)" }}>
                <span className="text-white">Building Products</span>
                <br />
                <span className="text-gradient-cyan">That Solve Real</span>
                <br />
                <span className="text-white">Problems.</span>
              </h2>
            </div>

            {/* Body */}
            <div className="reveal flex flex-col gap-5">
              <p className="text-white/65 font-body leading-relaxed" style={{ fontSize: "16px" }}>
                I&apos;m a React specialist and full-stack developer with a deep obsession for crafting 
                interfaces that feel <strong className="text-white/90">alive</strong> and systems that 
                scale. I don&apos;t just write code — I think in products.
              </p>
              <p className="text-white/65 font-body leading-relaxed" style={{ fontSize: "16px" }}>
                On the backend, I design APIs and database architectures that are clean, 
                efficient, and built for longevity. Whether it&apos;s a startup MVP or an 
                enterprise system, I&apos;ve shipped <strong className="text-white/90">end-to-end solutions</strong> across industries.
              </p>
            </div>

            {/* Skills grid */}
            <div className="reveal grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
              {SKILLS.map((skill) => (
                <div
                  key={skill.label}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group"
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.06)",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = `${skill.color}30`;
                    (e.currentTarget as HTMLElement).style.background = `${skill.color}08`;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.06)";
                    (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.03)";
                  }}
                >
                  <div
                    className="w-8 h-8 flex items-center justify-center rounded-lg shrink-0"
                    style={{ background: `${skill.color}15`, color: skill.color }}
                  >
                    <i className={`${skill.icon} text-sm`} />
                  </div>
                  <span className="text-white/70 text-xs font-body font-500 leading-tight">{skill.label}</span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="reveal flex flex-col sm:flex-row gap-4 mt-2">
              <button
                onClick={() => document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" })}
                className="flex items-center justify-center gap-2 px-6 py-3 rounded-full font-display font-600 text-sm cursor-pointer whitespace-nowrap transition-all duration-300 hover:scale-105"
                style={{
                  background: "linear-gradient(135deg, rgba(0,240,255,0.15), rgba(139,92,246,0.15))",
                  border: "1px solid rgba(0,240,255,0.3)",
                  color: "#00F0FF",
                }}
              >
                See My Work
                <i className="ri-arrow-right-line" />
              </button>
              <a
                href="#"
                className="flex items-center justify-center gap-2 px-6 py-3 rounded-full font-display font-600 text-sm cursor-pointer whitespace-nowrap text-white/60 hover:text-white transition-colors duration-300"
                style={{ border: "1px solid rgba(255,255,255,0.1)" }}
              >
                <i className="ri-download-line" />
                Resume
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
