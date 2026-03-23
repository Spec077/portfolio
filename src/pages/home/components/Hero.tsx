import { useEffect, useRef } from "react";

const PARTICLES = Array.from({ length: 30 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 3 + 1,
  opacity: Math.random() * 0.4 + 0.1,
  delay: Math.random() * 5,
  duration: Math.random() * 10 + 8,
}));

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const shapeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!shapeRef.current) return;
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 25;
      const y = (e.clientY / innerHeight - 0.5) * 20;
      shapeRef.current.style.transform = `translate(${x}px, ${y}px)`;
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const scrollToProjects = () => {
    document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" });
  };
  const scrollToContact = () => {
    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: "radial-gradient(ellipse at 65% 40%, rgba(0,240,255,0.07) 0%, transparent 55%), radial-gradient(ellipse at 20% 75%, rgba(139,92,246,0.07) 0%, transparent 50%), #0A0A0F" }}
    >
      {/* Grid pattern */}
      <div className="absolute inset-0 grid-pattern opacity-50" />

      {/* Particles */}
      {PARTICLES.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full pointer-events-none"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            background: p.id % 3 === 0 ? "#00F0FF" : p.id % 3 === 1 ? "#8B5CF6" : "#ffffff",
            opacity: p.opacity,
            animation: `float3 ${p.duration}s ease-in-out ${p.delay}s infinite`,
          }}
        />
      ))}

      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-12 w-full pt-28 sm:pt-24 pb-12 sm:pb-16 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-0 items-center">
        {/* Left Content */}
        <div className="flex flex-col items-start z-10">
          {/* Eyebrow */}
          <div
            className="flex flex-wrap items-center gap-2 mb-6 sm:mb-8 animate-fade-up"
            style={{ animationDelay: "0.1s", opacity: 0 }}
          >
            <div className="w-2 h-2 rounded-full bg-[#00F0FF] animate-pulse-glow" />
            <span className="font-mono text-xs tracking-[0.2em] uppercase text-[#00F0FF]">
              Full-Stack Developer
            </span>
            <div
              className="px-3 py-1 rounded-full text-xs font-mono text-[#00F0FF]/80 ml-2"
              style={{ background: "rgba(0,240,255,0.08)", border: "1px solid rgba(0,240,255,0.2)" }}
            >
              Available for Work
            </div>
          </div>

          {/* Headline */}
          <h1
            className="font-display font-800 leading-[1.05] tracking-tight mb-6 animate-fade-up"
            style={{ fontSize: "clamp(36px, 11vw, 76px)", animationDelay: "0.2s", opacity: 0 }}
          >
            <span className="block text-white">Crafting Digital</span>
            <span className="block text-white">Experiences</span>
            <span className="block text-gradient-hero">With Code.</span>
          </h1>

          {/* Subtitle */}
          <p
            className="text-white/60 font-body max-w-lg mb-10 animate-fade-up"
            style={{ fontSize: "clamp(15px, 4vw, 18px)", lineHeight: "1.7", animationDelay: "0.35s", opacity: 0 }}
          >
            React specialist &amp; full-stack developer building products that merge
            technical depth with exceptional user experience.
            <span className="text-white/80"> End-to-end, production-ready.</span>
          </p>

          {/* CTAs */}
          <div
            className="flex flex-col sm:flex-row w-full sm:w-auto gap-3 sm:gap-4 mb-10 sm:mb-12 animate-fade-up"
            style={{ animationDelay: "0.5s", opacity: 0 }}
          >
            <button
              onClick={scrollToProjects}
              className="flex items-center justify-center gap-2.5 px-8 py-4 rounded-full font-display font-600 text-[#0A0A0F] text-sm transition-all duration-300 hover:scale-105 cursor-pointer whitespace-nowrap"
              style={{
                background: "linear-gradient(135deg, #00F0FF, #0080FF)",
                boxShadow: "0 8px 32px rgba(0,240,255,0.35)",
              }}
            >
              View Projects
              <i className="ri-arrow-right-line text-base" />
            </button>
            <button
              onClick={scrollToContact}
              className="flex items-center justify-center gap-2.5 px-8 py-4 rounded-full font-display font-600 text-white text-sm transition-all duration-300 hover:bg-white/10 cursor-pointer whitespace-nowrap group"
              style={{ border: "1px solid rgba(255,255,255,0.2)" }}
            >
              Work With Me
              <i className="ri-mail-line text-base group-hover:text-[#00F0FF] transition-colors" />
            </button>
          </div>

          {/* Stats */}
          <div
            className="flex flex-wrap gap-x-8 gap-y-4 animate-fade-up"
            style={{ animationDelay: "0.65s", opacity: 0 }}
          >
            {[
              { num: "1+", label: "Years Experience" },
              { num: "7+", label: "Projects Shipped" },
              { num: "100%", label: "Full-Stack" },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col">
                <span className="font-display font-700 text-2xl text-[#00F0FF]">{stat.num}</span>
                <span className="text-white/40 text-xs font-mono tracking-wide">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right 3D Visual */}
        <div className="flex items-center justify-center relative h-[430px] sm:h-[500px] lg:h-[640px]">
          {/* Spotlight glow */}
          <div
            className="absolute w-[320px] h-[320px] sm:w-[500px] sm:h-[500px] rounded-full pointer-events-none"
            style={{
              background: "radial-gradient(ellipse, rgba(0,240,255,0.08) 0%, transparent 70%)",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          />

          {/* Main 3D Scene Container */}
          <div
            ref={shapeRef}
            className="relative w-56 h-56 sm:w-72 sm:h-72 lg:w-96 lg:h-96 transition-transform duration-100 ease-out"
            style={{ transformStyle: "preserve-3d" }}
          >
            {/* Outer rotating ring */}
            <div
              className="absolute inset-[-32px] sm:inset-[-60px] rounded-full animate-spin-slow pointer-events-none"
              style={{
                border: "1px solid rgba(0,240,255,0.12)",
                boxShadow: "inset 0 0 60px rgba(0,240,255,0.04)",
              }}
            />
            <div
              className="absolute inset-[-52px] sm:inset-[-100px] rounded-full animate-spin-reverse pointer-events-none"
              style={{
                border: "1px dashed rgba(139,92,246,0.12)",
              }}
            />
            <div
              className="absolute inset-[-72px] sm:inset-[-140px] rounded-full animate-spin-slow pointer-events-none"
              style={{
                border: "1px solid rgba(255,167,38,0.08)",
                animationDuration: "35s",
              }}
            />

            {/* Center orb */}
            <div
              className="absolute inset-0 rounded-full animate-pulse-glow"
              style={{
                background: "radial-gradient(ellipse at 35% 35%, rgba(0,240,255,0.3), rgba(0,128,255,0.15) 40%, rgba(139,92,246,0.1) 70%, transparent 100%)",
                boxShadow: "0 0 80px rgba(0,240,255,0.2), inset 0 0 60px rgba(0,240,255,0.05)",
                border: "1px solid rgba(0,240,255,0.25)",
                backdropFilter: "blur(20px)",
              }}
            >
              {/* Inner orb highlight */}
              <div
                className="absolute inset-[20%] rounded-full"
                style={{
                  background: "radial-gradient(ellipse at 30% 30%, rgba(255,255,255,0.15), transparent 70%)",
                }}
              />
              {/* Code symbol inside orb */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex flex-col items-center gap-1 opacity-60">
                  <div className="flex gap-2 items-center">
                    <span className="font-mono text-[#00F0FF] text-2xl lg:text-3xl font-300">&lt;</span>
                    <span className="font-mono text-white/50 text-xs lg:text-sm">/&gt;</span>
                  </div>
                  <span className="font-mono text-[#00F0FF]/60 text-[9px] tracking-widest uppercase">Full-Stack</span>
                </div>
              </div>
            </div>

            {/* Floating satellite orbs */}
            <div
              className="absolute animate-float"
              style={{ top: "-24px", right: "10%", animationDelay: "0s" }}
            >
              <div
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center"
                style={{
                  background: "rgba(0,240,255,0.1)",
                  border: "1px solid rgba(0,240,255,0.3)",
                  boxShadow: "0 0 20px rgba(0,240,255,0.2)",
                  backdropFilter: "blur(10px)",
                }}
              >
                <i className="ri-reactjs-line text-[#00F0FF] text-xl" />
              </div>
            </div>

            <div
              className="absolute animate-float2"
              style={{ bottom: "-16px", left: "5%", animationDelay: "1.5s" }}
            >
              <div
                className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center"
                style={{
                  background: "rgba(139,92,246,0.1)",
                  border: "1px solid rgba(139,92,246,0.3)",
                  boxShadow: "0 0 20px rgba(139,92,246,0.2)",
                  backdropFilter: "blur(10px)",
                }}
              >
                <i className="ri-server-line text-[#8B5CF6] text-lg" />
              </div>
            </div>

            <div
              className="absolute animate-float3"
              style={{ top: "20%", left: "-36px", animationDelay: "2.5s" }}
            >
              <div
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center"
                style={{
                  background: "rgba(255,167,38,0.1)",
                  border: "1px solid rgba(255,167,38,0.3)",
                  boxShadow: "0 0 16px rgba(255,167,38,0.15)",
                  backdropFilter: "blur(10px)",
                }}
              >
                <i className="ri-database-2-line text-[#FFA726] text-base" />
              </div>
            </div>

            <div
              className="absolute animate-float"
              style={{ bottom: "25%", right: "-32px", animationDelay: "3.5s" }}
            >
              <div
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center"
                style={{
                  background: "rgba(0,240,255,0.08)",
                  border: "1px solid rgba(0,240,255,0.2)",
                  boxShadow: "0 0 16px rgba(0,240,255,0.1)",
                  backdropFilter: "blur(10px)",
                }}
              >
                <i className="ri-code-s-slash-line text-[#00F0FF]/70 text-base" />
              </div>
            </div>

            {/* Geometric accent - top left */}
            <div
              className="absolute -top-8 -left-8 w-16 h-16 animate-spin-slow opacity-30 hidden sm:block"
              style={{ animationDuration: "30s" }}
            >
              <div
                className="w-full h-full rotate-45"
                style={{ border: "1px solid rgba(139,92,246,0.5)" }}
              />
            </div>

            {/* Dot grid accent */}
            <div
              className="absolute -bottom-10 -right-10 grid grid-cols-4 gap-2 opacity-20 hidden sm:grid"
            >
              {Array.from({ length: 16 }).map((_, i) => (
                <div
                  key={i}
                  className="w-1 h-1 rounded-full"
                  style={{ background: i % 2 === 0 ? "#00F0FF" : "#8B5CF6" }}
                />
              ))}
            </div>
          </div>

          {/* Floating code snippet cards */}
          <div
            className="absolute left-1/2 -translate-x-1/2 bottom-0 sm:top-8 sm:left-4 sm:translate-x-0 lg:left-0 animate-float"
            style={{ animationDelay: "0.8s" }}
          >
            <div
              className="glass px-3 py-2.5 sm:px-4 sm:py-3 rounded-xl max-w-[240px] sm:max-w-none"
              style={{ border: "1px solid rgba(0,240,255,0.1)" }}
            >
              <div className="flex items-center gap-1.5 mb-2">
                <div className="w-2 h-2 rounded-full bg-[#FF5F57]" />
                <div className="w-2 h-2 rounded-full bg-[#FFBD2E]" />
                <div className="w-2 h-2 rounded-full bg-[#28CA41]" />
              </div>
              <p className="font-mono text-[9px] sm:text-[10px] text-[#00F0FF]/80 leading-4 sm:leading-5">
                <span className="text-[#8B5CF6]">const</span> dev = {'{'}<br />
                &nbsp;&nbsp;name: <span className="text-[#FFA726]">&quot;Boluwatife Obasa&quot;</span>,<br />
                &nbsp;&nbsp;stack: <span className="text-[#00F0FF]">&quot;full&quot;</span><br />
                {'}'}
              </p>
            </div>
          </div>

          <div
            className="absolute bottom-20 right-2 sm:bottom-12 sm:right-4 lg:right-0 animate-float2 hidden sm:block"
            style={{ animationDelay: "2s" }}
          >
            <div
              className="glass px-4 py-3 rounded-xl"
              style={{ border: "1px solid rgba(139,92,246,0.1)" }}
            >
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-md flex items-center justify-center" style={{ background: "rgba(0,240,255,0.15)" }}>
                  <i className="ri-check-line text-[#00F0FF] text-xs" />
                </div>
                <div>
                  <p className="font-mono text-[10px] text-white/70">Build successful</p>
                  <p className="font-mono text-[9px] text-[#00F0FF]/60">0 errors, 0 warnings</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden sm:flex flex-col items-center gap-2 animate-fade-in" style={{ animationDelay: "1.2s", opacity: 0 }}>
        <span className="font-mono text-[10px] text-white/30 tracking-widest uppercase">Scroll</span>
        <div className="w-px h-10 overflow-hidden">
          <div className="w-px h-full animate-bounce-y" style={{ background: "linear-gradient(to bottom, transparent, #00F0FF, transparent)" }} />
        </div>
      </div>
    </section>
  );
}
