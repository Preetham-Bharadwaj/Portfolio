import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Github, Linkedin, Mail, Instagram } from "lucide-react";
import StarCanvas from "./StarCanvas";
import ContactMeButton from "./ContactMeButton";
import MagneticButton from "./MagneticButton";
import { useScramble } from "../hooks/useScramble";

const titles = [
  "Software Developer",
  "Problem Solver",
  "MERN Stack Learner",
  "Tech Enthusiast",
];

export default function Hero() {
  const [titleIndex, setTitleIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [typing, setTyping] = useState(true);
  const [showIntro, setShowIntro] = useState(true);
  const [introComplete, setIntroComplete] = useState(false);

  // Scramble hooks for name
  const { text: firstNameText, scramble: scrambleFirstName } = useScramble("PREETHAM");
  const { text: lastNameText, scramble: scrambleLastName } = useScramble("BHARADWAJ");

  useEffect(() => {
    // Check if intro has been shown in this session
    const hasSeenIntro = sessionStorage.getItem('introShown');
    if (hasSeenIntro) {
      setShowIntro(false);
      setIntroComplete(true);
    } else {
      // Mark intro as shown
      sessionStorage.setItem('introShown', 'true');
      // Auto-complete intro after 3 seconds
      const timer = setTimeout(() => {
        setShowIntro(false);
        setTimeout(() => {
          setIntroComplete(true);
          window.dispatchEvent(new CustomEvent("introComplete"));
        }, 500);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    if (!introComplete) return;
    
    // Trigger scramble effect after intro completes
    setTimeout(() => {
      scrambleFirstName();
      setTimeout(scrambleLastName, 200);
    }, 500);
  }, [introComplete, scrambleFirstName, scrambleLastName]);

  useEffect(() => {
    if (!introComplete) return;
    
    const current = titles[titleIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (typing) {
      if (displayed.length < current.length) {
        timeout = setTimeout(() => {
          setDisplayed(current.slice(0, displayed.length + 1));
        }, 80);
      } else {
        timeout = setTimeout(() => setTyping(false), 2000);
      }
    } else {
      if (displayed.length > 0) {
        timeout = setTimeout(() => {
          setDisplayed(displayed.slice(0, -1));
        }, 40);
      } else {
        setTitleIndex((prev) => (prev + 1) % titles.length);
        setTyping(true);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayed, typing, titleIndex, introComplete]);

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = window.innerWidth < 768 ? 130 : 80;
      const top = element.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  // Split name into letters for animation
  const firstName = "PREETHAM";
  const lastName = "BHARADWAJ";
  const tagline = "Building Real-World Solutions with Code";

  return (
    <>
      {/* Cinematic Intro */}
      <AnimatePresence>
        {showIntro && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-50 flex items-center justify-center"
            style={{
              background: "linear-gradient(135deg, #020617 0%, #0a0e27 50%, #020617 100%)",
              overflow: "hidden",
            }}
          >
            {/* Animated background particles */}
            <div className="absolute inset-0 overflow-hidden">
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 rounded-full"
                  style={{
                    background: i % 2 === 0 ? "#00d4ff" : "#b000ff",
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    y: [0, -30, 0],
                    opacity: [0.2, 0.5, 0.2],
                    scale: [1, 1.5, 1],
                  }}
                  transition={{
                    duration: 3 + Math.random() * 2,
                    repeat: Infinity,
                    delay: Math.random() * 2,
                  }}
                />
              ))}
            </div>

            {/* Radial gradient glow */}
            <motion.div
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
              style={{
                background: "radial-gradient(ellipse at center, rgba(0,212,255,0.1) 0%, transparent 70%)",
              }}
            />

            {/* Name Animation */}
            <div className="relative z-10 text-center px-6">
              {/* First Name */}
              <div className="mb-2">
                {firstName.split("").map((letter, i) => (
                  <motion.span
                    key={`first-${i}`}
                    initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{
                      duration: 0.5,
                      delay: i * 0.05,
                      ease: "easeOut",
                    }}
                    style={{
                      display: "inline-block",
                      fontFamily: "Orbitron, sans-serif",
                      fontSize: "clamp(2rem, 8vw, 4rem)",
                      fontWeight: 900,
                      color: "#f8f9fa",
                      letterSpacing: "0.1em",
                      textShadow: "0 0 20px rgba(0,212,255,0.3)",
                    }}
                  >
                    {letter}
                  </motion.span>
                ))}
              </div>

              {/* Last Name with gradient */}
              <div className="mb-6">
                {lastName.split("").map((letter, i) => (
                  <motion.span
                    key={`last-${i}`}
                    initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{
                      duration: 0.5,
                      delay: 0.4 + i * 0.05,
                      ease: "easeOut",
                    }}
                    style={{
                      display: "inline-block",
                      fontFamily: "Orbitron, sans-serif",
                      fontSize: "clamp(2rem, 8vw, 4rem)",
                      fontWeight: 900,
                      background: "linear-gradient(135deg, #00d4ff, #b000ff)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      letterSpacing: "0.1em",
                      filter: "drop-shadow(0 0 30px rgba(0,212,255,0.5))",
                    }}
                  >
                    {letter}
                  </motion.span>
                ))}
              </div>

              {/* Tagline */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.5, ease: "easeOut" }}
                style={{
                  fontFamily: "Cabin, sans-serif",
                  fontSize: "clamp(0.9rem, 2vw, 1.2rem)",
                  color: "rgba(248,249,250,0.7)",
                  letterSpacing: "0.05em",
                  fontWeight: 500,
                }}
              >
                {tagline}
              </motion.div>

              {/* Glow effect */}
              <motion.div
                className="absolute inset-0 -z-10"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
                style={{
                  background: "radial-gradient(ellipse at center, rgba(0,212,255,0.15) 0%, transparent 60%)",
                  filter: "blur(40px)",
                }}
              />
            </div>

            {/* Skip button */}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              whileHover={{ opacity: 1 }}
              transition={{ delay: 1 }}
              onClick={() => {
                setShowIntro(false);
                setTimeout(() => {
                  setIntroComplete(true);
                  window.dispatchEvent(new CustomEvent("introComplete"));
                }, 500);
              }}
              className="absolute bottom-8 right-8 px-4 py-2 rounded-full text-sm"
              style={{
                fontFamily: "Cabin, sans-serif",
                color: "rgba(248,249,250,0.6)",
                border: "1px solid rgba(248,249,250,0.2)",
                background: "rgba(255,255,255,0.05)",
                cursor: "pointer",
              }}
            >
              Skip
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Hero Section */}
      <motion.section
        id="home"
        initial={{ opacity: 0 }}
        animate={{ opacity: introComplete ? 1 : 0 }}
        transition={{ duration: 0.5 }}
        className="relative w-full min-h-screen flex items-center justify-center overflow-hidden pt-40 md:pt-16"
        style={{ background: "#0a0e27" }}
      >
      <StarCanvas />

      {/* Radial gradient overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(0,212,255,0.04) 0%, transparent 70%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto mt-8 md:mt-0">
        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          style={{
            fontFamily: "Orbitron, sans-serif",
            fontSize: "clamp(2.5rem, 8vw, 5.5rem)",
            fontWeight: 900,
            color: "#f8f9fa",
            letterSpacing: "0.08em",
            lineHeight: 1.1,
            marginBottom: "0.5rem",
          }}
        >
          {firstNameText}{" "}
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            style={{
              background: "linear-gradient(135deg, #00d4ff, #b000ff)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              filter: "drop-shadow(0 0 30px rgba(0,212,255,0.4))",
            }}
          >
            {lastNameText}
          </motion.span>
        </motion.h1>

        {/* Typing Effect */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-6"
          style={{ height: "2.5rem", display: "flex", alignItems: "center", justifyContent: "center" }}
        >
          <span
            style={{
              fontFamily: "Orbitron, sans-serif",
              fontSize: "clamp(1rem, 3vw, 1.6rem)",
              fontWeight: 500,
              color: "#00d4ff",
              letterSpacing: "0.05em",
            }}
          >
            {displayed}
            <span
              className="inline-block w-0.5 h-6 ml-1 animate-pulse"
              style={{ background: "#00d4ff", verticalAlign: "middle" }}
            />
          </span>
        </motion.div>

        {/* Bio */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
          className="max-w-2xl mx-auto mb-10"
          style={{
            fontFamily: "Cabin, sans-serif",
            fontSize: "clamp(0.95rem, 2vw, 1.1rem)",
            color: "rgba(248,249,250,0.7)",
            lineHeight: 1.8,
          }}
        >
          I build software with purpose—focusing on real-world problems and practical impact. From{" "}
          <span style={{ color: "#00d4ff", fontWeight: 600 }}>AI-driven healthcare systems</span> to{" "}
          <span style={{ color: "#b000ff", fontWeight: 600 }}>agricultural platforms</span>, I design and develop solutions that are both scalable and user-centric. I'm driven by curiosity, continuous learning, and the goal of creating technology that genuinely makes a difference.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0, ease: "easeOut" }}
          className="flex flex-wrap items-center justify-center gap-4 mb-12"
        >
          <MagneticButton
            onClick={() => scrollTo("projects")}
            className="px-8 py-3 rounded-full"
            style={{
              fontFamily: "Cabin, sans-serif",
              fontWeight: 700,
              fontSize: "0.95rem",
              background: "linear-gradient(135deg, #00d4ff, #b000ff)",
              color: "#fff",
              boxShadow: "0 0 30px rgba(0,212,255,0.4), 0 0 60px rgba(176,0,255,0.2)",
              letterSpacing: "0.08em",
              border: "none",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.boxShadow = "0 0 40px rgba(0,212,255,0.6), 0 0 80px rgba(176,0,255,0.3)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.boxShadow = "0 0 30px rgba(0,212,255,0.4), 0 0 60px rgba(176,0,255,0.2)";
            }}
          >
            VIEW MY WORK
          </MagneticButton>
          <ContactMeButton />
        </motion.div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.2, ease: "easeOut" }}
          className="flex items-center justify-center gap-5 mb-16"
        >
          {[
            { Icon: Github, href: "https://github.com/Preetham-Bharadwaj", label: "GitHub" },
            { Icon: Linkedin, href: "https://www.linkedin.com/in/preetham-bharadwaj-br-036077334", label: "LinkedIn" },
            { Icon: Instagram, href: "https://www.instagram.com/preetham_bharadwaj4?igsh=cXBhOW1iY2dldHBi", label: "Instagram" },
            { Icon: Mail, href: "mailto:preethambharadwajbr@gmail.com", label: "Email" },
          ].map(({ Icon, href, label }, index) => (
            <motion.a
              key={label}
              href={href}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.3 + index * 0.1, ease: "easeOut" }}
              whileHover={{ scale: 1.15, y: -3 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center justify-center w-10 h-10 rounded-full"
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
                color: "rgba(248,249,250,0.7)",
                transition: "all 0.3s ease",
              }}
              aria-label={label}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "#00d4ff";
                (e.currentTarget as HTMLElement).style.color = "#00d4ff";
                (e.currentTarget as HTMLElement).style.boxShadow = "0 0 15px rgba(0,212,255,0.3)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.1)";
                (e.currentTarget as HTMLElement).style.color = "rgba(248,249,250,0.7)";
                (e.currentTarget as HTMLElement).style.boxShadow = "none";
              }}
            >
              <Icon className="w-5 h-5" />
            </motion.a>
          ))}
        </motion.div>

        {/* Scroll Down */}
        <motion.button
          onClick={() => scrollTo("about")}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 8, 0] }}
          transition={{
            opacity: { delay: 1.4, duration: 0.5 },
            y: { repeat: Infinity, duration: 2, ease: "easeInOut" },
          }}
          className="flex flex-col items-center gap-2 mx-auto"
          style={{ color: "rgba(248,249,250,0.4)" }}
        >
          <span style={{ fontFamily: "Cabin, sans-serif", fontSize: "0.7rem", letterSpacing: "0.2em" }}>
            SCROLL
          </span>
          <ChevronDown className="w-5 h-5" />
        </motion.button>
      </div>
    </motion.section>
    </>
  );
}
