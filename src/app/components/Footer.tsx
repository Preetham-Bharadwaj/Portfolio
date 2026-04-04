import React from "react";
import { Github, Linkedin, Instagram, Mail } from "lucide-react";

export default function Footer() {
  const socials = [
    { href: "https://github.com/Preetham-Bharadwaj", label: "GitHub", Icon: Github },
    { href: "https://www.linkedin.com/in/preetham-bharadwaj-br-036077334", label: "LinkedIn", Icon: Linkedin },
    { href: "https://www.instagram.com/preetham_bharadwaj4", label: "Instagram", Icon: Instagram },
    { href: "mailto:preethambharadwajbr@gmail.com", label: "Email", Icon: Mail },
  ];

  return (
    <footer style={{
      background: "#060a18",
      borderTop: "1px solid rgba(0,212,255,0.1)",
      padding: "40px 24px 24px",
    }}>
      <div style={{
        maxWidth: "1200px",
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "24px",
      }}>

        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "1px" }}>
            <span style={{
              fontFamily: "monospace",
              fontSize: "1.4rem",
              fontWeight: 900,
              color: "#00d4ff",
              lineHeight: 1,
              textShadow: "0 0 10px rgba(0,212,255,0.6)",
            }}>&lt;</span>
            <span style={{
              fontFamily: "monospace",
              fontSize: "0.85rem",
              fontWeight: 900,
              color: "#ffffff",
              padding: "0 2px",
              letterSpacing: "0.05em",
            }}>PB</span>
            <span style={{
              fontFamily: "monospace",
              fontSize: "1.4rem",
              fontWeight: 900,
              color: "#b000ff",
              lineHeight: 1,
              textShadow: "0 0 10px rgba(176,0,255,0.6)",
            }}>/&gt;</span>
          </div>
          <span style={{
            fontFamily: "Orbitron, sans-serif",
            fontSize: "1rem",
            fontWeight: 700,
            color: "#f8f9fa",
            letterSpacing: "0.1em",
          }}>
            PREETHAM<span style={{ color: "#00d4ff" }}>.</span>B
          </span>
        </div>

        {/* Tagline */}
        <p style={{
          fontFamily: "Cabin, sans-serif",
          fontSize: "0.85rem",
          color: "rgba(248,249,250,0.4)",
          textAlign: "center",
          maxWidth: "320px",
          lineHeight: 1.6,
        }}>
          Building real-world solutions with code.
        </p>

        {/* Social Icons */}
        <div style={{ display: "flex", gap: "12px" }}>
          {socials.map(({ href, label, Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                border: "1px solid rgba(255,255,255,0.1)",
                background: "rgba(255,255,255,0.04)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "rgba(248,249,250,0.5)",
                transition: "all 0.3s ease",
                textDecoration: "none",
              }}
              onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => {
                (e.currentTarget as HTMLElement).style.borderColor = "#00d4ff";
                (e.currentTarget as HTMLElement).style.color = "#00d4ff";
                (e.currentTarget as HTMLElement).style.boxShadow = "0 0 12px rgba(0,212,255,0.3)";
              }}
              onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => {
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.1)";
                (e.currentTarget as HTMLElement).style.color = "rgba(248,249,250,0.5)";
                (e.currentTarget as HTMLElement).style.boxShadow = "none";
              }}
            >
              <Icon size={16} strokeWidth={2} />
            </a>
          ))}
        </div>

        {/* Divider */}
        <div style={{
          width: "100%",
          height: "1px",
          background: "rgba(255,255,255,0.05)",
        }} />

        {/* Copyright */}
        <p style={{
          fontFamily: "Cabin, sans-serif",
          fontSize: "0.75rem",
          color: "rgba(248,249,250,0.25)",
          textAlign: "center",
        }}>
          © 2026 Preetham Bharadwaj B. Building the future with code.
        </p>

      </div>
    </footer>
  );
}
