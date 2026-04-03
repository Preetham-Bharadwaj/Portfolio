import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Mail, Github, Linkedin, Instagram } from "lucide-react";

export default function ContactCTA() {
  const [open, setOpen] = useState(false);

  const options = [
    { Icon: Mail, label: "Email Me", href: "mailto:preethambharadwajbr@gmail.com", color: "#00d4ff" },
    { Icon: Github, label: "GitHub", href: "https://github.com/Preetham-Bharadwaj", color: "#f8f9fa" },
    { Icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/preetham-bharadwaj-br-036077334", color: "#00d4ff" },
    { Icon: Instagram, label: "Instagram", href: "https://www.instagram.com/preetham_bharadwaj4?igsh=cXBhOW1iY2dldHBi", color: "#E4405F" },
  ];

  return (
    <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end gap-3">
      {/* Quick links */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            transition={{ duration: 0.25 }}
            className="flex flex-col gap-2"
          >
            {options.map(({ Icon, label, href, color }, i) => (
              <motion.a
                key={label}
                href={href}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ delay: i * 0.05 }}
                className="flex items-center gap-3 px-4 py-2.5 rounded-full ml-auto"
                style={{
                  background: "rgba(10,14,39,0.95)",
                  border: `1px solid ${color}44`,
                  color,
                  fontFamily: "Cabin, sans-serif",
                  fontSize: "0.82rem",
                  fontWeight: 600,
                  backdropFilter: "blur(10px)",
                  whiteSpace: "nowrap",
                  textDecoration: "none",
                  boxShadow: `0 0 15px ${color}22`,
                }}
              >
                {label}
                <Icon className="w-4 h-4" />
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main FAB */}
      <div className="relative">
        {/* Pulse rings */}
        {!open && (
          <>
            <div
              className="absolute inset-0 rounded-full animate-ping"
              style={{ background: "rgba(0,212,255,0.3)", animationDuration: "2s" }}
            />
            <div
              className="absolute inset-0 rounded-full animate-ping"
              style={{ background: "rgba(0,212,255,0.15)", animationDuration: "2s", animationDelay: "0.5s" }}
            />
          </>
        )}
        <motion.button
          onClick={() => setOpen(!open)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="relative w-14 h-14 rounded-full flex items-center justify-center"
          style={{
            background: open
              ? "rgba(10,14,39,0.95)"
              : "linear-gradient(135deg, #00d4ff, #b000ff)",
            border: open ? "1px solid rgba(0,212,255,0.4)" : "none",
            boxShadow: open
              ? "0 0 20px rgba(0,212,255,0.3)"
              : "0 0 30px rgba(0,212,255,0.5), 0 0 60px rgba(176,0,255,0.3)",
            color: "#fff",
          }}
          aria-label="Contact options"
        >
          <AnimatePresence mode="wait">
            {open ? (
              <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
                <X className="w-6 h-6" />
              </motion.div>
            ) : (
              <motion.div key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
                <MessageCircle className="w-6 h-6" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>
    </div>
  );
}
