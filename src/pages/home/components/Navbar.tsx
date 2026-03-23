import { useState, useEffect, useCallback } from "react";

const NAV_LINKS = [
  { label: "Work", href: "#projects" },
  { label: "About", href: "#about" },
  { label: "Stack", href: "#stack" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 40);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const scrollTo = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setActiveSection(href);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "glass shadow-2xl shadow-black/40"
            : "bg-transparent border-none shadow-none"
        }`}
        style={{
          borderBottom: "none",
          outline: "none",
          boxShadow: scrolled ? undefined : "none",
          backdropFilter: scrolled ? undefined : "none",
          background: scrolled
            ? undefined
            : "linear-gradient(180deg, rgba(10, 10, 15, 0.92) 0%, rgba(10, 10, 15, 0.45) 68%, rgba(10, 10, 15, 0) 100%)",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12 h-20 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
            className="flex items-center gap-3 group cursor-pointer"
          >
            <div className="w-9 h-9 relative">
              <div className="w-full h-full border-2 border-[#00F0FF] rounded-lg rotate-45 group-hover:rotate-[135deg] transition-transform duration-700 opacity-80" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-display font-800 text-sm text-[#00F0FF] select-none">BO</span>
              </div>
            </div>
            <span className="font-display font-700 text-white text-sm sm:text-lg tracking-tight block max-w-[180px] sm:max-w-none truncate">
              Boluwatife Obasa<span className="text-[#00F0FF]">.</span>
            </span>
          </a>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-10">
            {NAV_LINKS.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className={`text-sm font-body font-500 transition-all duration-300 relative group cursor-pointer whitespace-nowrap ${
                  activeSection === link.href
                    ? "text-[#00F0FF]"
                    : "text-white/60 hover:text-white"
                }`}
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#00F0FF] group-hover:w-full transition-all duration-300" />
              </button>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden lg:flex items-center gap-4">
            <button
              onClick={() => scrollTo("#contact")}
              className="relative px-6 py-2.5 rounded-full text-sm font-display font-600 text-white overflow-hidden group cursor-pointer whitespace-nowrap"
              style={{ background: "linear-gradient(135deg, rgba(0,240,255,0.15), rgba(139,92,246,0.15))", border: "1px solid rgba(0,240,255,0.3)" }}
            >
              <span className="relative z-10 flex items-center gap-2">
                Let&apos;s Talk
                <i className="ri-arrow-right-up-line" />
              </span>
              <div className="absolute inset-0 bg-cyan-violet opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: "linear-gradient(135deg, rgba(0,240,255,0.25), rgba(139,92,246,0.25))" }} />
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden w-10 h-10 flex items-center justify-center text-white/80 hover:text-white cursor-pointer"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <i className={`text-xl ${mobileOpen ? "ri-close-line" : "ri-menu-line"}`} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 transition-all duration-500 lg:hidden ${
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        style={{ background: "rgba(10,10,15,0.97)", backdropFilter: "blur(60px)" }}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8">
          {NAV_LINKS.map((link, i) => (
            <button
              key={link.href}
              onClick={() => scrollTo(link.href)}
              className="text-2xl font-display font-600 text-white/80 hover:text-[#00F0FF] transition-colors duration-300 cursor-pointer whitespace-nowrap"
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => scrollTo("#contact")}
            className="mt-4 px-8 py-3.5 rounded-full font-display font-600 text-white cursor-pointer whitespace-nowrap"
            style={{ background: "linear-gradient(135deg, #00F0FF, #8B5CF6)" }}
          >
            Let&apos;s Talk
          </button>
        </div>
      </div>
    </>
  );
}
