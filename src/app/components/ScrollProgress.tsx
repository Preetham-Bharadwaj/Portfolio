import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);
  const [activeSection, setActiveSection] = useState(0);

  const sections = ["home", "about", "projects", "skills", "experience", "contact"];

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollProgress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setProgress(scrollProgress);

      // Determine active section
      const sectionEls = sections.map((id) => document.getElementById(id));
      let current = 0;
      sectionEls.forEach((el, i) => {
        if (el && el.getBoundingClientRect().top <= window.innerHeight / 2) {
          current = i;
        }
      });
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 flex flex-col items-center gap-3">
      {/* Vertical line */}
      <div className="relative w-0.5 h-48 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.1)" }}>
        <motion.div
          className="absolute top-0 left-0 w-full rounded-full"
          style={{
            height: `${progress}%`,
            background: "linear-gradient(to bottom, #00d4ff, #b000ff)",
            boxShadow: "0 0 8px #00d4ff",
          }}
        />
      </div>
      {/* Section dots */}
      {sections.map((section, i) => (
        <button
          key={section}
          onClick={() => {
            document.getElementById(section)?.scrollIntoView({ behavior: "smooth" });
          }}
          className="group relative flex items-center justify-center"
          title={section.charAt(0).toUpperCase() + section.slice(1)}
        >
          <motion.div
            animate={{
              scale: activeSection === i ? 1.4 : 1,
              boxShadow: activeSection === i ? "0 0 10px #00d4ff, 0 0 20px #00d4ff" : "none",
            }}
            transition={{ duration: 0.3 }}
            className="w-2 h-2 rounded-full transition-all"
            style={{
              background: activeSection === i ? "#00d4ff" : "rgba(255,255,255,0.3)",
            }}
          />
          {/* Tooltip */}
          <span
            className="absolute right-6 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap px-2 py-1 rounded text-xs pointer-events-none"
            style={{
              background: "rgba(10,14,39,0.9)",
              border: "1px solid rgba(0,212,255,0.3)",
              color: "#f8f9fa",
              fontFamily: "Cabin, sans-serif",
            }}
          >
            {section.charAt(0).toUpperCase() + section.slice(1)}
          </span>
        </button>
      ))}
    </div>
  );
}
