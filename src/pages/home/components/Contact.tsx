import { useState, useRef, useEffect } from "react";

const SOCIAL_LINKS = [
  { icon: "ri-github-line", label: "GitHub", href: "https://github.com/Spec077", color: "#ffffff" },
  { icon: "ri-linkedin-box-line", label: "LinkedIn", href: "https://linkedin.com/boluwatifeobasa830", color: "#0A66C2" },
  { icon: "ri-twitter-x-line", label: "Twitter", href: "https://twitter.com/0xt1fe", color: "#ffffff" },
  { icon: "ri-mail-line", label: "Email", href: "mailto:boluwatifeog23@gmail.com", color: "#00F0FF" },
];

const NAV_LINKS = [
  { label: "Work", href: "#projects" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Stack", href: "#stack" },
];

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const [formState, setFormState] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [formStartedAt] = useState(() => Date.now());

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
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) {
      setError("Please fill in all required fields.");
      return;
    }
    if (formState.message.length > 500) {
      setError("Message must be 500 characters or less.");
      return;
    }
    setError("");
    setSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formState.name,
          email: formState.email,
          subject: formState.subject,
          message: formState.message,
          company: "",
          formStartedAt,
        }),
      });

      const data = await res.json().catch(() => null);

      if (res.ok) {
        setSubmitted(true);
        setFormState({ name: "", email: "", subject: "", message: "" });
      } else {
        setError(data?.error || "Something went wrong. Please try again.");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative pt-24 sm:pt-28 lg:pt-36 pb-0 overflow-hidden"
      style={{ background: "#0A0A0F" }}
    >
      {/* Glow accent */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(0,240,255,0.05) 0%, transparent 70%)" }}
      />
      <div
        className="absolute top-0 right-0 w-[600px] h-[400px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(139,92,246,0.05) 0%, transparent 70%)" }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="reveal flex items-center justify-center gap-4 mb-4">
            <div className="h-px w-16" style={{ background: "linear-gradient(to right, transparent, rgba(0,240,255,0.4))" }} />
            <span className="font-mono text-xs tracking-[0.2em] uppercase text-[#00F0FF]">Get In Touch</span>
            <div className="h-px w-16" style={{ background: "linear-gradient(to left, transparent, rgba(0,240,255,0.4))" }} />
          </div>
          <h2 className="reveal font-display font-700 leading-tight mb-4" style={{ fontSize: "clamp(36px, 5vw, 64px)" }}>
            <span className="text-white">Let&apos;s Build</span>
            <br />
            <span className="text-gradient-hero">Something Amazing</span>
          </h2>
          <p className="reveal text-white/45 font-body text-sm max-w-md mx-auto leading-relaxed">
            Whether you have a project idea, a question, or just want to connect — I&apos;m always open to a conversation.
          </p>
        </div>

        {/* Content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 sm:gap-12">
          {/* Left: CTA + Socials */}
          <div className="lg:col-span-2 flex flex-col gap-8">
            {/* Email Card */}
            <div className="reveal">
              <div
              className="p-5 sm:p-6 rounded-2xl"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(0,240,255,0.12)",
              }}
              >
              <div className="flex items-center gap-3 mb-4">
                <div
                className="w-10 h-10 flex items-center justify-center rounded-xl"
                style={{ background: "rgba(37,211,102,0.15)", border: "1px solid rgba(37,211,102,0.3)" }}
                >
                <i className="ri-whatsapp-line text-white text-base" />
                </div>
                <div>
                <p className="text-white/40 text-xs font-mono">WhatsApp</p>
                <p className="text-white text-sm font-display font-600">+234 818 595 3415</p>
                </div>
              </div>
              <a
                href="https://wa.me/2348185953415?text=Hi,%20I%20saw%20your%20portfolio%20and%20would%20like%20to%20discuss%20a%20project%20 "
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-[#25D366] text-sm font-display font-500 hover:opacity-75 transition-opacity cursor-pointer"
              >
                Send a message <i className="ri-arrow-right-line" />
              </a>
              </div>
            </div>

            {/* Response time */}
            <div className="reveal">
              <div
                className="p-5 sm:p-6 rounded-2xl"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(139,92,246,0.12)",
                }}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-2 h-2 rounded-full bg-green-400" style={{ boxShadow: "0 0 6px rgba(74,222,128,0.8)" }} />
                  <span className="text-green-400 text-xs font-mono">Available for projects</span>
                </div>
                <p className="text-white/70 text-sm font-body mt-1">Usually responds within <strong className="text-white">24 hours.</strong></p>
                <p className="text-white/40 text-xs font-mono mt-2">Based in Lagos, Nigeria</p>
              </div>
            </div>

            {/* Social Links */}
            <div className="reveal">
              <p className="text-white/40 text-xs font-mono tracking-widest uppercase mb-4">Find Me Online</p>
              <div className="flex gap-3 flex-wrap">
                {SOCIAL_LINKS.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="nofollow noopener noreferrer"
                    title={social.label}
                    className="w-12 h-12 flex items-center justify-center rounded-xl cursor-pointer transition-all duration-300 hover:scale-110 hover:-translate-y-1"
                    style={{
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      color: "rgba(255,255,255,0.5)",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.color = social.color;
                      (e.currentTarget as HTMLElement).style.borderColor = `${social.color}40`;
                      (e.currentTarget as HTMLElement).style.background = `${social.color}10`;
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.5)";
                      (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.08)";
                      (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.04)";
                    }}
                  >
                    <i className={`${social.icon} text-lg`} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div className="lg:col-span-3 reveal">
            <div
              className="rounded-2xl p-5 sm:p-6 lg:p-8"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.07)",
                backdropFilter: "blur(20px)",
              }}
            >
              {submitted ? (
                <div className="flex flex-col items-center justify-center gap-4 py-16 text-center">
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center"
                    style={{ background: "rgba(0,240,255,0.15)", border: "1px solid rgba(0,240,255,0.3)" }}
                  >
                    <i className="ri-check-line text-[#00F0FF] text-2xl" />
                  </div>
                  <h3 className="font-display font-700 text-white text-xl">Message Sent!</h3>
                  <p className="text-white/50 text-sm font-body max-w-xs">
                    Thanks for reaching out. I&apos;ll get back to you within 24 hours.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-2 text-[#00F0FF] text-sm font-display font-500 hover:opacity-75 transition-opacity cursor-pointer"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form
                  id="contact-form"
                  onSubmit={handleSubmit}
                  className="flex flex-col gap-5"
                >
                  <input
                    type="text"
                    name="company"
                    tabIndex={-1}
                    autoComplete="off"
                    className="hidden"
                    aria-hidden="true"
                  />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-white/50 text-xs font-mono mb-2">Name *</label>
                      <input
                        type="text"
                        name="name"
                        value={formState.name}
                        onChange={handleChange}
                        placeholder="Your name"
                        required
                        className="w-full px-4 py-3 rounded-xl text-sm font-body text-white placeholder-white/25 outline-none transition-all duration-200 focus:border-[#00F0FF]/40"
                        style={{
                          background: "rgba(255,255,255,0.04)",
                          border: "1px solid rgba(255,255,255,0.1)",
                        }}
                        onFocus={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(0,240,255,0.4)"; }}
                        onBlur={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.1)"; }}
                      />
                    </div>
                    <div>
                      <label className="block text-white/50 text-xs font-mono mb-2">Email *</label>
                      <input
                        type="email"
                        name="email"
                        value={formState.email}
                        onChange={handleChange}
                        placeholder="hello@example.com"
                        required
                        className="w-full px-4 py-3 rounded-xl text-sm font-body text-white placeholder-white/25 outline-none transition-all duration-200"
                        style={{
                          background: "rgba(255,255,255,0.04)",
                          border: "1px solid rgba(255,255,255,0.1)",
                        }}
                        onFocus={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(0,240,255,0.4)"; }}
                        onBlur={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.1)"; }}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-white/50 text-xs font-mono mb-2">Project Type</label>
                    <select
                      name="subject"
                      value={formState.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl text-sm font-body text-white/80 outline-none transition-all duration-200 cursor-pointer"
                      style={{
                        background: "rgba(255,255,255,0.04)",
                        border: "1px solid rgba(255,255,255,0.1)",
                      }}
                      onFocus={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(0,240,255,0.4)"; }}
                      onBlur={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.1)"; }}
                    >
                      <option value="" style={{ background: "#0F1117" }}>Select project type</option>
                      <option value="Full-Stack App" style={{ background: "#0F1117" }}>Full-Stack Web App</option>
                      <option value="Frontend Project" style={{ background: "#0F1117" }}>Frontend Project</option>
                      <option value="Backend / API" style={{ background: "#0F1117" }}>Backend</option>
                      <option value="MVP Build" style={{ background: "#0F1117" }}>MVP Build</option>
                      <option value="Consulting" style={{ background: "#0F1117" }}>Consulting</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-white/50 text-xs font-mono mb-2">
                      Message * <span className="text-white/25">({formState.message.length}/500)</span>
                    </label>
                    <textarea
                      name="message"
                      value={formState.message}
                      onChange={handleChange}
                      placeholder="Tell me about your project..."
                      required
                      maxLength={500}
                      rows={5}
                      className="w-full px-4 py-3 rounded-xl text-sm font-body text-white placeholder-white/25 outline-none resize-none transition-all duration-200"
                      style={{
                        background: "rgba(255,255,255,0.04)",
                        border: "1px solid rgba(255,255,255,0.1)",
                      }}
                      onFocus={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(0,240,255,0.4)"; }}
                      onBlur={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.1)"; }}
                    />
                    {formState.message.length > 500 && (
                      <p className="text-red-400 text-xs mt-1 font-mono">Message exceeds 500 character limit.</p>
                    )}
                  </div>

                  {error && (
                    <p className="text-red-400 text-xs font-mono">{error}</p>
                  )}

                  <button
                    type="submit"
                    disabled={submitting || formState.message.length > 500}
                    className="w-full py-4 rounded-xl font-display font-600 text-sm text-[#0A0A0F] transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer whitespace-nowrap"
                    style={{
                      background: "linear-gradient(135deg, #00F0FF, #8B5CF6)",
                      boxShadow: "0 8px 32px rgba(0,240,255,0.2)",
                    }}
                  >
                    {submitting ? (
                      <span className="flex items-center justify-center gap-2">
                        <i className="ri-loader-4-line animate-spin" />
                        Sending...
                      </span>
                    ) : (
                      <span className="flex items-center justify-center gap-2">
                        Send Message
                        <i className="ri-send-plane-line" />
                      </span>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-24" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
            {/* Logo & Copyright */}
            <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 border border-[#00F0FF]/50 rounded-lg rotate-45 flex items-center justify-center">
                </div>
                <span className="font-display font-600 text-white/60 text-sm">Boluwatife Obasa</span>
              </div>
              <span className="text-white/25 text-xs font-mono">© 2026 — All rights reserved</span>
            </div>

            {/* Nav Links */}
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
              {NAV_LINKS.map((link) => (
                <button
                  key={link.href}
                  onClick={() => document.querySelector(link.href)?.scrollIntoView({ behavior: "smooth" })}
                  className="text-white/35 text-xs font-body hover:text-white/70 transition-colors cursor-pointer whitespace-nowrap"
                >
                  {link.label}
                </button>
              ))}
            </div>

            {/* Built with */}
            <p className="text-white/25 text-xs font-mono">
              Designed &amp; Built by <span className="text-[#00F0FF]/60">Boluwatife Obasa</span>
            </p>
          </div>
        </div>
      </footer>
    </section>
  );
}
