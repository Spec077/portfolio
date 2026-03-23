import { useEffect, useRef, useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import TechMarquee from "./components/TechMarquee";
import Projects from "./components/Projects";
import Services from "./components/Services";
import Contact from "./components/Contact";

function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = cursorRef.current;
    if (!el) return;

    let raf: number;
    let mx = -100, my = -100;
    let cx = -100, cy = -100;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
    };

    const tick = () => {
      cx += (mx - cx) * 0.15;
      cy += (my - cy) * 0.15;
      el.style.left = `${cx - 10}px`;
      el.style.top = `${cy - 10}px`;
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="custom-cursor pointer-events-none hidden lg:block"
    />
  );
}

export default function Home() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      className="min-h-screen"
      style={{
        opacity: loaded ? 1 : 0,
        transition: "opacity 0.5s ease",
        background: "#0A0A0F",
      }}
    >
      <CustomCursor />
      <Navbar />
      <main>
        <Hero />
        <About />
        <TechMarquee />
        <Projects />
        <Services />
        <Contact />
      </main>
    </div>
  );
}
