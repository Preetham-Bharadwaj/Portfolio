import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Zap } from "lucide-react";

const navLinks = [
  { label: "Home", href: "home" },
  { label: "About", href: "about" },
  { label: "Projects", href: "projects" },
  { label: "Skills", href: "skills" },
  { label: "Experience", href: "experience" },
  { label: "Contact", href: "contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sectionEls = navLinks.map((l) => document.getElementById(l.href));
      let current = "home";
      sectionEls.forEach((el, i) => {
        if (el && el.getBoundingClientRect().top <= window.innerHeight / 2) {
          current = navLinks[i].href;
        }
      });
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const navbarHeight = 80; // Approximate navbar height
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - navbarHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
      setMobileOpen(false);
    }
  };

  return (
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

        {/* Desktop Links */}
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
              {link.label}
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

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden"
          style={{ color: "#00d4ff" }}
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden"
            style={{ background: "rgba(10,14,39,0.95)", borderTop: "1px solid rgba(0,212,255,0.1)" }}
          >
            <div className="px-6 py-4 flex flex-col gap-4">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => scrollTo(link.href)}
                  className="text-left py-2"
                  style={{
                    fontFamily: "Cabin, sans-serif",
                    color: activeSection === link.href ? "#00d4ff" : "#f8f9fa",
                    borderBottom: "1px solid rgba(255,255,255,0.05)",
                  }}
                >
                  {link.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
