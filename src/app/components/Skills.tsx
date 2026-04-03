import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const categories = ["All", "Frontend", "Backend", "DevOps", "AI/ML", "Tools"];

const skills = [
  // Frontend
  { name: "HTML", level: 75, category: "Frontend", color: "#00d4ff" },
  { name: "CSS", level: 70, category: "Frontend", color: "#00d4ff" },
  { name: "JavaScript", level: 70, category: "Frontend", color: "#00d4ff" },
  { name: "React.js (Learning)", level: 65, category: "Frontend", color: "#00d4ff" },
  { name: "Tailwind CSS", level: 75, category: "Frontend", color: "#00d4ff" },
  // Backend
  { name: "Node.js (Learning)", level: 60, category: "Backend", color: "#b000ff" },
  { name: "Express.js (Learning)", level: 60, category: "Backend", color: "#b000ff" },
  { name: "Spring Boot", level: 70, category: "Backend", color: "#b000ff" },
  { name: "MongoDB (Learning)", level: 55, category: "Backend", color: "#b000ff" },
  // DevOps
  { name: "Git", level: 80, category: "DevOps", color: "#f0d000" },
  { name: "GitHub", level: 85, category: "DevOps", color: "#f0d000" },
  { name: "Docker", level: 50, category: "DevOps", color: "#f0d000" },
  { name: "Vercel", level: 70, category: "DevOps", color: "#f0d000" },
  // AI/ML
  { name: "AI Integration", level: 70, category: "AI/ML", color: "#b000ff" },
  { name: "API Handling", level: 80, category: "AI/ML", color: "#b000ff" },
  { name: "Problem Solving", level: 85, category: "AI/ML", color: "#b000ff" },
  { name: "Not Started Yet", level: 0, category: "AI/ML", color: "#b000ff" },
  // Tools
  { name: "VS Code", level: 90, category: "Tools", color: "#00d4ff" },
  { name: "Linux Basics", level: 60, category: "Tools", color: "#00d4ff" },
];

function SkillBar({ skill, index }: { skill: (typeof skills)[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="mb-5"
    >
      <div className="flex justify-between mb-2">
        <span
          style={{
            fontFamily: "Cabin, sans-serif",
            fontSize: "0.875rem",
            fontWeight: 500,
            color: "#f8f9fa",
          }}
        >
          {skill.name}
        </span>
        <span
          style={{
            fontFamily: "Orbitron, sans-serif",
            fontSize: "0.75rem",
            fontWeight: 600,
            color: skill.color,
          }}
        >
          {skill.level}%
        </span>
      </div>
      <div
        className="relative h-2 rounded-full overflow-hidden"
        style={{ background: "rgba(255,255,255,0.06)" }}
      >
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${skill.level}%` }}
          transition={{ duration: 1, delay: index * 0.05 + 0.2, ease: "easeOut" }}
          className="absolute top-0 left-0 h-full rounded-full"
          style={{
            background:
              skill.color === "#00d4ff"
                ? "linear-gradient(to right, #0080ff, #00d4ff)"
                : skill.color === "#b000ff"
                ? "linear-gradient(to right, #6600cc, #b000ff)"
                : "linear-gradient(to right, #cc9900, #f0d000)",
            boxShadow: `0 0 10px ${skill.color}66`,
          }}
        />
        {/* Shimmer */}
        <motion.div
          animate={{ x: ["-100%", "200%"] }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 3, ease: "easeInOut" }}
          className="absolute top-0 h-full w-1/3 rounded-full"
          style={{
            background: "linear-gradient(to right, transparent, rgba(255,255,255,0.3), transparent)",
            left: 0,
          }}
        />
      </div>
    </motion.div>
  );
}

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered =
    activeCategory === "All"
      ? skills
      : skills.filter((s) => s.category === activeCategory);

  return (
    <section
      id="skills"
      className="relative py-24 px-6 overflow-hidden"
      style={{ background: "#0a0e27" }}
    >
      {/* Background accent */}
      <div
        className="absolute bottom-0 right-0 w-96 h-96 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at bottom right, rgba(0,212,255,0.05) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
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
            // TECHNICAL ARSENAL
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
            Skills &{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #00d4ff, #b000ff)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Technologies
            </span>
          </h2>
        </motion.div>

        {/* Category Pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((cat) => (
            <motion.button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              className="px-5 py-2 rounded-full"
              style={{
                fontFamily: "Cabin, sans-serif",
                fontSize: "0.85rem",
                fontWeight: 600,
                letterSpacing: "0.06em",
                background:
                  activeCategory === cat
                    ? "linear-gradient(135deg, #00d4ff, #b000ff)"
                    : "rgba(255,255,255,0.04)",
                border:
                  activeCategory === cat
                    ? "1px solid transparent"
                    : "1px solid rgba(255,255,255,0.1)",
                color: activeCategory === cat ? "#fff" : "rgba(248,249,250,0.6)",
                boxShadow:
                  activeCategory === cat ? "0 0 20px rgba(0,212,255,0.3)" : "none",
                cursor: "pointer",
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              }}
            >
              {cat}
            </motion.button>
          ))}
        </motion.div>

        {/* Skill Bars Grid */}
        <div className="grid md:grid-cols-2 gap-x-16">
          <AnimatePresence mode="wait">
            {filtered.map((skill, i) => (
              <SkillBar key={`${activeCategory}-${skill.name}`} skill={skill} index={i} />
            ))}
          </AnimatePresence>
        </div>

        {/* Proficiency Legend */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false }}
          transition={{ delay: 0.5 }}
          className="flex flex-wrap justify-center gap-6 mt-10 pt-8"
          style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
        >
          {[
            { label: "Expert (90–100%)", color: "#00d4ff" },
            { label: "Advanced (75–89%)", color: "#b000ff" },
            { label: "Intermediate (60–74%)", color: "#f0d000" },
          ].map(({ label, color }) => (
            <div key={label} className="flex items-center gap-2">
              <div
                className="w-4 h-1.5 rounded-full"
                style={{ background: color, boxShadow: `0 0 6px ${color}` }}
              />
              <span
                style={{
                  fontFamily: "Cabin, sans-serif",
                  fontSize: "0.75rem",
                  color: "rgba(248,249,250,0.45)",
                }}
              >
                {label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
