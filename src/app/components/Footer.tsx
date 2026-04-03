import { motion } from "framer-motion";
import { Github, Linkedin, Twitter, Mail, Zap, ArrowUp, Instagram } from "lucide-react";

const links = {
  Navigation: ["Home", "About", "Projects", "Skills", "Experience", "Contact"],
  Projects: ["AI Healthcare Triage", "Health Ecosystem", "Agrio Platform", "Banking System"],
  Connect: ["GitHub", "LinkedIn", "Instagram", "Email"],
};

const socials = [
  { Icon: Github, href: "https://github.com/Preetham-Bharadwaj", label: "GitHub" },
  { Icon: Linkedin, href: "https://www.linkedin.com/in/preetham-bharadwaj-br-036077334", label: "LinkedIn" },
  { Icon: Instagram, href: "https://www.instagram.com/preetham_bharadwaj4?igsh=cXBhOW1iY2dldHBi", label: "Instagram" },
  { Icon: Mail, href: "mailto:preethambharadwajbr@gmail.com", label: "Email" },
];

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      className="relative pt-16 pb-8 px-6 overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #0a0e27 0%, #060919 100%)",
        borderTop: "1px solid rgba(0,212,255,0.1)",
      }}
    >
      {/* Top glow */}
      <div
        className="absolute top-0 left-0 right-0 h-px pointer-events-none"
        style={{ background: "linear-gradient(to right, transparent, #00d4ff44, #b000ff44, transparent)" }}
      />

      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div
                className="w-8 h-8 rounded flex items-center justify-center"
                style={{ background: "linear-gradient(135deg, #00d4ff, #b000ff)", boxShadow: "0 0 15px rgba(0,212,255,0.4)" }}
              >
                <Zap className="w-4 h-4 text-white" />
              </div>
              <span
                style={{
                  fontFamily: "Orbitron, sans-serif",
                  fontWeight: 700,
                  color: "#f8f9fa",
                  fontSize: "1.1rem",
                  letterSpacing: "0.1em",
                }}
              >
                PREETHAM<span style={{ color: "#00d4ff" }}>.</span>B
              </span>
            </div>
            <p
              style={{
                fontFamily: "Cabin, sans-serif",
                fontSize: "0.85rem",
                color: "rgba(248,249,250,0.45)",
                lineHeight: 1.7,
                marginBottom: "16px",
              }}
            >
              Software Developer & IoT Innovator. Building impactful solutions that solve real-world problems.
            </p>
            <div className="flex gap-3">
              {socials.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-300"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    color: "rgba(248,249,250,0.45)",
                  }}
                  aria-label={label}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = "#00d4ff44";
                    (e.currentTarget as HTMLElement).style.color = "#00d4ff";
                    (e.currentTarget as HTMLElement).style.background = "rgba(0,212,255,0.08)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.08)";
                    (e.currentTarget as HTMLElement).style.color = "rgba(248,249,250,0.45)";
                    (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.04)";
                  }}
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(links).map(([section, items]) => (
            <div key={section}>
              <h4
                style={{
                  fontFamily: "Orbitron, sans-serif",
                  fontSize: "0.7rem",
                  fontWeight: 700,
                  color: "#00d4ff",
                  letterSpacing: "0.2em",
                  marginBottom: "16px",
                }}
              >
                {section.toUpperCase()}
              </h4>
              <ul className="space-y-2">
                {items.map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="group relative inline-flex items-center"
                      style={{
                        fontFamily: "Cabin, sans-serif",
                        fontSize: "0.85rem",
                        color: "rgba(248,249,250,0.45)",
                        transition: "color 0.25s",
                        textDecoration: "none",
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.color = "#f8f9fa";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.color = "rgba(248,249,250,0.45)";
                      }}
                    >
                      <span
                        className="absolute -bottom-0.5 left-0 h-px w-0 group-hover:w-full transition-all duration-300"
                        style={{ background: "linear-gradient(to right, #00d4ff, #b000ff)" }}
                      />
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div
          className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8"
          style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
        >
          <p
            style={{
              fontFamily: "Cabin, sans-serif",
              fontSize: "0.8rem",
              color: "rgba(248,249,250,0.3)",
            }}
          >
            © 2026 Preetham Bharadwaj B. Building the future with code.
          </p>
          <div className="flex items-center gap-6">
            <span style={{ fontFamily: "Cabin, sans-serif", fontSize: "0.75rem", color: "rgba(248,249,250,0.25)" }}>
              Built with React + TypeScript
            </span>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all duration-300 hover:scale-105"
              style={{
                fontFamily: "Cabin, sans-serif",
                fontSize: "0.75rem",
                background: "rgba(0,212,255,0.08)",
                border: "1px solid rgba(0,212,255,0.2)",
                color: "#00d4ff",
                letterSpacing: "0.08em",
              }}
            >
              <ArrowUp className="w-3.5 h-3.5" />
              TOP
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
