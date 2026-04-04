import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, MapPin, Send, Github, Linkedin, Twitter, Instagram } from "lucide-react";
import { useReveal } from "../hooks/useReveal";

const contactInfo = [
  { Icon: Mail, label: "Email", value: "preethambharadwajbr@gmail.com", href: "mailto:preethambharadwajbr@gmail.com", color: "#00d4ff" },
  { Icon: MapPin, label: "Location", value: "Karnataka, India", href: "#", color: "#b000ff" },
];

const socials = [
  { Icon: Github, label: "GitHub", href: "https://github.com/Preetham-Bharadwaj", color: "#f8f9fa" },
  { Icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/preetham-bharadwaj-br-036077334", color: "#00d4ff" },
  { Icon: Instagram, label: "Instagram", href: "https://www.instagram.com/preetham_bharadwaj4", color: "#E4405F" },
];

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState(false);
  const [highlighted, setHighlighted] = useState(false);
  const { ref, visible } = useReveal();

  // Listen for contact button click event
  useEffect(() => {
    const handleContactClick = () => {
      setHighlighted(true);
      // Remove highlight after 2 seconds
      setTimeout(() => setHighlighted(false), 2000);
    };

    window.addEventListener("contactButtonClicked", handleContactClick);
    return () => window.removeEventListener("contactButtonClicked", handleContactClick);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setError(false);

    try {
      const response = await fetch("https://formspree.io/f/xzdkjdok", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (response.ok) {
        setSent(true);
        setForm({ name: "", email: "", subject: "", message: "" });
        setTimeout(() => setSent(false), 4000);
      } else {
        setError(true);
        setTimeout(() => setError(false), 4000);
      }
    } catch (err) {
      setError(true);
      setTimeout(() => setError(false), 4000);
    } finally {
      setSending(false);
    }
  };

  const inputStyle = {
    fontFamily: "Cabin, sans-serif",
    fontSize: "1rem",
    color: "#f8f9fa",
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: "12px",
    padding: "14px 16px",
    width: "100%",
    outline: "none",
    transition: "all 0.3s",
    minHeight: "48px", // Better touch target for mobile
  };

  const focusStyle = {
    borderColor: "#00d4ff",
    boxShadow: "0 0 15px rgba(0,212,255,0.15)",
    background: "rgba(0,212,255,0.04)",
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    Object.assign(e.currentTarget.style, focusStyle);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
    e.currentTarget.style.boxShadow = "none";
    e.currentTarget.style.background = "rgba(255,255,255,0.04)";
  };

  return (
    <section
      id="contact"
      className={`relative py-24 px-6 overflow-hidden transition-all duration-500 ${highlighted ? 'ring-2 ring-[#00d4ff] ring-opacity-50' : ''}`}
      style={{ background: "#0a0e27" }}
      ref={ref}
    >
      {/* Background accents */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-64 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse, rgba(0,212,255,0.06) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute bottom-0 right-0 w-80 h-80 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at bottom right, rgba(176,0,255,0.06) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-7xl mx-auto" style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(40px)",
        transition: "opacity 0.7s ease, transform 0.7s ease"
      }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span
            style={{
              fontFamily: "Cabin, sans-serif",
              fontSize: "0.75rem",
              letterSpacing: "0.3em",
              color: "#00d4ff",
              fontWeight: 600,
            }}
          >
            // ESTABLISH CONTACT
          </span>
          <h2
            className="mt-2"
            style={{
              fontFamily: "Orbitron, sans-serif",
              fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
              fontWeight: 800,
              color: "#f8f9fa",
            }}
          >
            Let's{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #00d4ff, #b000ff)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Connect
            </span>
          </h2>
          <p
            className="max-w-xl mx-auto mt-4"
            style={{
              fontFamily: "Cabin, sans-serif",
              fontSize: "0.95rem",
              color: "rgba(248,249,250,0.55)",
              lineHeight: 1.7,
            }}
          >
            Open to internships, collaborations, and innovative project opportunities. Let's build something amazing together.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12 items-start">
          {/* Left: Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-2 space-y-8"
          >
            {/* Contact details */}
            <div className="space-y-4">
              {contactInfo.map(({ Icon, label, value, href, color }) => (
                <a
                  key={label}
                  href={href}
                  className="flex items-center gap-4 p-4 rounded-xl group transition-all duration-300"
                  style={{
                    background: "rgba(255,255,255,0.025)",
                    border: "1px solid rgba(255,255,255,0.06)",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = color + "44";
                    (e.currentTarget as HTMLElement).style.boxShadow = `0 0 20px ${color}15`;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.06)";
                    (e.currentTarget as HTMLElement).style.boxShadow = "none";
                  }}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: `${color}18`, border: `1px solid ${color}33` }}
                  >
                    <Icon className="w-5 h-5" style={{ color }} />
                  </div>
                  <div>
                    <div style={{ fontFamily: "Cabin, sans-serif", fontSize: "0.7rem", color: "rgba(248,249,250,0.4)", letterSpacing: "0.12em", fontWeight: 600 }}>
                      {label.toUpperCase()}
                    </div>
                    <div style={{ fontFamily: "Cabin, sans-serif", fontSize: "0.9rem", color: "#f8f9fa" }}>
                      {value}
                    </div>
                  </div>
                </a>
              ))}
            </div>

            {/* Availability banner */}
            <div
              className="p-4 rounded-xl"
              style={{
                background: "rgba(0,212,255,0.05)",
                border: "1px solid rgba(0,212,255,0.2)",
              }}
            >
              <div className="flex items-center gap-2 mb-2">
                <span
                  className="w-2 h-2 rounded-full animate-pulse"
                  style={{ background: "#00d4ff", boxShadow: "0 0 8px #00d4ff" }}
                />
                <span style={{ fontFamily: "Orbitron, sans-serif", fontSize: "0.7rem", color: "#00d4ff", fontWeight: 700, letterSpacing: "0.12em" }}>
                  OPEN TO WORK
                </span>
              </div>
              <p style={{ fontFamily: "Cabin, sans-serif", fontSize: "0.82rem", color: "rgba(248,249,250,0.6)", lineHeight: 1.6 }}>
                Currently open to internships, collaborations, and innovative project opportunities in software development, IoT, and AI-integrated applications.
              </p>
            </div>

            {/* Socials */}
            <div>
              <p style={{ fontFamily: "Cabin, sans-serif", fontSize: "0.75rem", color: "rgba(248,249,250,0.4)", letterSpacing: "0.15em", marginBottom: "12px" }}>
                FIND ME ONLINE
              </p>
              <div className="flex gap-3">
                {socials.map(({ Icon, label, href, color }) => (
                  <a
                    key={label}
                    href={href}
                    className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110"
                    style={{
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      color: "rgba(248,249,250,0.5)",
                    }}
                    aria-label={label}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor = color;
                      (e.currentTarget as HTMLElement).style.color = color;
                      (e.currentTarget as HTMLElement).style.boxShadow = `0 0 15px ${color}33`;
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.1)";
                      (e.currentTarget as HTMLElement).style.color = "rgba(248,249,250,0.5)";
                      (e.currentTarget as HTMLElement).style.boxShadow = "none";
                    }}
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-3"
          >
            <form
              onSubmit={handleSubmit}
              className="p-8 rounded-2xl space-y-5"
              style={{
                background: "rgba(255,255,255,0.025)",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label style={{ fontFamily: "Cabin, sans-serif", fontSize: "0.78rem", color: "rgba(248,249,250,0.5)", letterSpacing: "0.1em", display: "block", marginBottom: "6px" }}>
                    NAME
                  </label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    required
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label style={{ fontFamily: "Cabin, sans-serif", fontSize: "0.78rem", color: "rgba(248,249,250,0.5)", letterSpacing: "0.1em", display: "block", marginBottom: "6px" }}>
                    EMAIL
                  </label>
                  <input
                    type="email"
                    placeholder="you@company.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    required
                    style={inputStyle}
                  />
                </div>
              </div>

              <div>
                <label style={{ fontFamily: "Cabin, sans-serif", fontSize: "0.78rem", color: "rgba(248,249,250,0.5)", letterSpacing: "0.1em", display: "block", marginBottom: "6px" }}>
                  SUBJECT
                </label>
                <input
                  type="text"
                  placeholder="Project Collaboration / Job Opportunity / ..."
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  required
                  style={inputStyle}
                />
              </div>

              <div>
                <label style={{ fontFamily: "Cabin, sans-serif", fontSize: "0.78rem", color: "rgba(248,249,250,0.5)", letterSpacing: "0.1em", display: "block", marginBottom: "6px" }}>
                  MESSAGE
                </label>
                <textarea
                  rows={5}
                  placeholder="Tell me about your project, opportunity, or idea..."
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  onFocus={handleFocus as unknown as React.FocusEventHandler<HTMLTextAreaElement>}
                  onBlur={handleBlur as unknown as React.FocusEventHandler<HTMLTextAreaElement>}
                  required
                  style={{ ...inputStyle, resize: "none" }}
                />
              </div>

              <button
                type="submit"
                disabled={sending || sent}
                className="w-full py-4 rounded-xl flex items-center justify-center gap-3 transition-all duration-300 hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed"
                style={{
                  fontFamily: "Cabin, sans-serif",
                  fontWeight: 700,
                  fontSize: "0.9rem",
                  letterSpacing: "0.12em",
                  background: sent
                    ? "linear-gradient(135deg, #00cc66, #00aa44)"
                    : error
                    ? "linear-gradient(135deg, #ff4444, #cc0000)"
                    : "linear-gradient(135deg, #00d4ff, #b000ff)",
                  color: "#fff",
                  boxShadow: sent
                    ? "0 0 25px rgba(0,204,102,0.35)"
                    : error
                    ? "0 0 25px rgba(255,68,68,0.35)"
                    : "0 0 25px rgba(0,212,255,0.35)",
                }}
              >
                {sending ? (
                  <>
                    <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    SENDING...
                  </>
                ) : sent ? (
                  <>✓ MESSAGE SENT SUCCESSFULLY 🚀</>
                ) : error ? (
                  <>❌ FAILED TO SEND MESSAGE</>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    SEND MESSAGE
                  </>
                )}
              </button>

              {/* Success/Error Message */}
              {sent && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center mt-4"
                  style={{
                    fontFamily: "Cabin, sans-serif",
                    fontSize: "0.9rem",
                    color: "#00cc66",
                  }}
                >
                  Message sent successfully 🚀
                </motion.p>
              )}
              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center mt-4"
                  style={{
                    fontFamily: "Cabin, sans-serif",
                    fontSize: "0.9rem",
                    color: "#ff4444",
                  }}
                >
                  Failed to send message ❌
                </motion.p>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
