import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { Zap } from "lucide-react";
import NavLabel from "./NavLabel";

const navLinks = [
  { label: "Home", href: "home" },
  { label: "About", href: "about" },
  { label: "Projects", href: "projects" },
  { label: "Skills", href: "skills" },
  { label: "Contact", href: "contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [introComplete, setIntroComplete] = useState(() => {
    return !!sessionStorage.getItem("introShown");
  });
  const pillNavRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleIntroComplete = () => setIntroComplete(true);
    window.addEventListener("introComplete", handleIntroComplete);
    return () => window.removeEventListener("introComplete", handleIntroComplete);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY + 140;
      let current = "home";
      navLinks.forEach(({ href }) => {
        const section = document.getElementById(href);
        if (section && section.offsetTop <= scrollY) {
          current = href;
        }
      });
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = window.innerWidth < 768 ? 130 : 80;
      const top = element.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  if (!introComplete) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {/* Top Bar */}
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-40 transition-all duration-500"
        style={{
          background: scrolled
            ? "rgba(10, 14, 39, 0.85)"
            : "rgba(10, 14, 39, 0.3)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderBottom: scrolled
            ? "1px solid rgba(0, 212, 255, 0.2)"
            : "1px solid transparent",
          boxShadow: scrolled ? "0 4px 30px rgba(0, 212, 255, 0.08)" : "none",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <button onClick={() => scrollTo("home")} className="flex items-center gap-2 group">
            <div
              className="w-8 h-8 rounded flex items-center justify-center"
              style={{
                background: "linear-gradient(135deg, #00d4ff, #b000ff)",
                boxShadow: "0 0 15px rgba(0,212,255,0.5)",
              }}
            >
              <Zap className="w-4 h-4 text-white" />
            </div>
            <span
              className="text-xl"
              style={{
                fontFamily: "Orbitron, sans-serif",
                fontWeight: 700,
                color: "#f8f9fa",
                letterSpacing: "0.1em",
              }}
            >
              PREETHAM<span style={{ color: "#00d4ff" }}>.</span>B
            </span>
          </button>

          {/* Desktop Links - hidden on mobile */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className="relative group"
                style={{
                  fontFamily: "Cabin, sans-serif",
                  fontSize: "0.875rem",
                  fontWeight: 500,
                  color: activeSection === link.href ? "#00d4ff" : "#f8f9fa",
                  letterSpacing: "0.05em",
                  transition: "color 0.3s",
                }}
              >
                <NavLabel label={link.label} />
                {/* Underline */}
                <span
                  className="absolute -bottom-1 left-0 h-px transition-all duration-300"
                  style={{
                    width: activeSection === link.href ? "100%" : "0%",
                    background: "linear-gradient(to right, #00d4ff, #b000ff)",
                    boxShadow: "0 0 6px #00d4ff",
                  }}
                />
                <span
                  className="absolute -bottom-1 left-0 h-px w-0 group-hover:w-full transition-all duration-300"
                  style={{
                    background: "linear-gradient(to right, #00d4ff, #b000ff)",
                    opacity: activeSection === link.href ? 0 : 1,
                  }}
                />
              </button>
            ))}
            <button
              onClick={() => scrollTo("contact")}
              className="px-5 py-2 rounded-full text-sm transition-all duration-300 hover:scale-105"
              style={{
                fontFamily: "Cabin, sans-serif",
                fontWeight: 600,
                background: "linear-gradient(135deg, #00d4ff, #b000ff)",
                color: "#fff",
                boxShadow: "0 0 20px rgba(0,212,255,0.3)",
                letterSpacing: "0.05em",
              }}
            >
              Hire Me
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Pill Nav - only visible on mobile */}
      <div 
        ref={pillNavRef}
        className="md:hidden fixed left-0 right-0 z-[100]"
        style={{
          top: "68px",
          background: "#0a0e27",
          padding: "12px 16px",
          borderBottom: "2px solid rgba(0,212,255,0.3)",
          boxShadow: "0 4px 20px rgba(0,0,0,0.5)",
        }}
      >
        <div 
          className="flex"
          style={{
            background: "rgba(255,255,255,0.08)",
            border: "1px solid rgba(255,255,255,0.15)",
            borderRadius: "24px",
            padding: "4px",
            gap: "4px",
          }}
        >
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => scrollTo(link.href)}
              data-target={link.href}
              className="flex-1 text-center cursor-pointer transition-all duration-200"
              style={{
                fontFamily: "Cabin, sans-serif",
                fontSize: "12px",
                fontWeight: 600,
                padding: "8px 6px",
                borderRadius: "20px",
                background: activeSection === link.href 
                  ? "linear-gradient(135deg, #00d4ff, #b000ff)" 
                  : "transparent",
                color: activeSection === link.href ? "#fff" : "#9ca3af",
                boxShadow: activeSection === link.href 
                  ? "0 0 15px rgba(0,212,255,0.4)" 
                  : "none",
              }}
            >
              <NavLabel label={link.label} />
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
