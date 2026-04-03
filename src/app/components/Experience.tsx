import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Briefcase, ChevronDown, MapPin, Calendar } from "lucide-react";

const experiences = [
  {
    id: 1,
    role: "Hackathon Participant",
    company: "Hack2Skill",
    location: "Karnataka, India",
    period: "2024",
    color: "#00d4ff",
    type: "Hackathon",
    description:
      "Built real-world solutions under time constraints. Collaborated with teams on innovative projects and presented technical solutions effectively.",
    highlights: [
      "Built real-world solutions under time constraints",
      "Collaborated with teams on innovative projects",
      "Presented technical solutions effectively",
      "Gained experience in rapid prototyping and agile development",
    ],
    tech: ["React.js", "Node.js", "Express.js", "MongoDB", "AI APIs"],
  },
];

function ExperienceCard({
  exp,
  index,
  isLeft,
}: {
  exp: (typeof experiences)[0];
  index: number;
  isLeft: boolean;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className={`relative flex ${isLeft ? "justify-end pr-8 md:pr-16" : "justify-start pl-8 md:pl-16"} w-full md:w-1/2 ${isLeft ? "md:self-start" : "md:self-start"}`}>
      {/* Timeline dot */}
      <div
        className="absolute top-6 z-10 w-4 h-4 rounded-full border-2"
        style={{
          left: isLeft ? "auto" : "-8px",
          right: isLeft ? "-8px" : "auto",
          background: exp.color,
          borderColor: "#0a0e27",
          boxShadow: `0 0 12px ${exp.color}, 0 0 24px ${exp.color}44`,
          [isLeft ? "right" : "left"]: "calc(100% - 8px)",
        }}
      />

      {/* For alternating layout on desktop */}
      <motion.div
        initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 0.6, delay: index * 0.1 }}
        className="w-full max-w-lg rounded-2xl overflow-hidden cursor-pointer"
        style={{
          background: "rgba(255,255,255,0.025)",
          border: `1px solid ${expanded ? exp.color + "44" : "rgba(255,255,255,0.06)"}`,
          boxShadow: expanded ? `0 0 30px ${exp.color}15` : "none",
          transition: "all 0.3s ease",
        }}
        onClick={() => setExpanded(!expanded)}
      >
        <div className="p-6">
          {/* Header */}
          <div className="flex items-start justify-between gap-4 mb-3">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span
                  className="px-2 py-0.5 rounded text-xs"
                  style={{
                    fontFamily: "Cabin, sans-serif",
                    background: `${exp.color}18`,
                    border: `1px solid ${exp.color}44`,
                    color: exp.color,
                    fontWeight: 600,
                    letterSpacing: "0.08em",
                  }}
                >
                  {exp.type}
                </span>
              </div>
              <h3
                style={{
                  fontFamily: "Orbitron, sans-serif",
                  fontSize: "1rem",
                  fontWeight: 700,
                  color: "#f8f9fa",
                  letterSpacing: "0.04em",
                  marginBottom: "2px",
                }}
              >
                {exp.role}
              </h3>
              <div
                style={{
                  fontFamily: "Cabin, sans-serif",
                  fontSize: "0.9rem",
                  fontWeight: 600,
                  color: exp.color,
                }}
              >
                {exp.company}
              </div>
            </div>
            <div className="flex flex-col items-end gap-1 shrink-0">
              <div className="flex items-center gap-1" style={{ color: "rgba(248,249,250,0.45)", fontFamily: "Cabin, sans-serif", fontSize: "0.75rem" }}>
                <Calendar className="w-3 h-3" />
                {exp.period}
              </div>
              <div className="flex items-center gap-1" style={{ color: "rgba(248,249,250,0.35)", fontFamily: "Cabin, sans-serif", fontSize: "0.7rem" }}>
                <MapPin className="w-3 h-3" />
                {exp.location}
              </div>
            </div>
          </div>

          <p
            style={{
              fontFamily: "Cabin, sans-serif",
              fontSize: "0.85rem",
              color: "rgba(248,249,250,0.6)",
              lineHeight: 1.7,
              marginBottom: "12px",
            }}
          >
            {exp.description}
          </p>

          {/* Expand button */}
          <div className="flex items-center gap-2" style={{ color: exp.color, fontFamily: "Cabin, sans-serif", fontSize: "0.75rem", fontWeight: 600 }}>
            <span>{expanded ? "SHOW LESS" : "VIEW HIGHLIGHTS"}</span>
            <motion.div animate={{ rotate: expanded ? 180 : 0 }} transition={{ duration: 0.3 }}>
              <ChevronDown className="w-4 h-4" />
            </motion.div>
          </div>

          {/* Expandable details */}
          <AnimatePresence>
            {expanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.35 }}
                className="overflow-hidden"
              >
                <div
                  className="mt-4 pt-4"
                  style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
                >
                  <ul className="space-y-2 mb-4">
                    {exp.highlights.map((h, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2"
                        style={{ fontFamily: "Cabin, sans-serif", fontSize: "0.83rem", color: "rgba(248,249,250,0.7)", lineHeight: 1.6 }}
                      >
                        <span style={{ color: exp.color, marginTop: "4px", flexShrink: 0 }}>▸</span>
                        {h}
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {exp.tech.map((t) => (
                      <span
                        key={t}
                        className="px-2 py-0.5 rounded text-xs"
                        style={{
                          fontFamily: "Cabin, sans-serif",
                          background: `${exp.color}10`,
                          border: `1px solid ${exp.color}30`,
                          color: exp.color,
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}

export default function Experience() {
  return (
    <section
      id="experience"
      className="relative py-24 px-6 overflow-hidden"
      style={{ background: "linear-gradient(180deg, #0a0e27 0%, #0d1235 50%, #0a0e27 100%)" }}
    >
      {/* Background accent */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse, rgba(176,0,255,0.04) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-7xl mx-auto">
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
            // CAREER TRAJECTORY
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
            Work{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #00d4ff, #b000ff)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Experience
            </span>
          </h2>
          <p
            className="max-w-md mx-auto mt-3"
            style={{
              fontFamily: "Cabin, sans-serif",
              fontSize: "0.9rem",
              color: "rgba(248,249,250,0.5)",
            }}
          >
            Click any card to explore highlights & tech stack.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Center line - desktop only */}
          <div
            className="hidden md:block absolute left-1/2 -translate-x-px top-0 bottom-0 w-px"
            style={{ background: "linear-gradient(to bottom, #00d4ff33, #b000ff33, #00d4ff33)" }}
          />

          <div className="flex flex-col gap-8">
            {experiences.map((exp, i) => (
              <div
                key={exp.id}
                className={`flex flex-col md:flex-row ${i % 2 === 0 ? "md:justify-start" : "md:justify-end"}`}
              >
                {/* Mobile layout */}
                <div className="md:hidden pl-8 relative">
                  <div
                    className="absolute left-0 top-6 w-3 h-3 rounded-full"
                    style={{
                      background: exp.color,
                      boxShadow: `0 0 10px ${exp.color}`,
                      left: "2px",
                    }}
                  />
                  <div
                    className="absolute left-4 top-0 bottom-0 w-px"
                    style={{ background: `${exp.color}22`, left: "7px" }}
                  />
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: false }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="rounded-2xl overflow-hidden cursor-pointer mb-2"
                    style={{
                      background: "rgba(255,255,255,0.025)",
                      border: `1px solid rgba(255,255,255,0.06)`,
                    }}
                  >
                    <div className="p-5">
                      <span
                        className="px-2 py-0.5 rounded text-xs mb-2 inline-block"
                        style={{
                          background: `${exp.color}18`,
                          border: `1px solid ${exp.color}44`,
                          color: exp.color,
                          fontFamily: "Cabin, sans-serif",
                          fontWeight: 600,
                        }}
                      >
                        {exp.type}
                      </span>
                      <h3 style={{ fontFamily: "Orbitron, sans-serif", fontSize: "0.95rem", fontWeight: 700, color: "#f8f9fa" }}>
                        {exp.role}
                      </h3>
                      <div style={{ fontFamily: "Cabin, sans-serif", fontSize: "0.85rem", color: exp.color, marginBottom: "8px" }}>
                        {exp.company} · {exp.period}
                      </div>
                      <p style={{ fontFamily: "Cabin, sans-serif", fontSize: "0.82rem", color: "rgba(248,249,250,0.6)", lineHeight: 1.7 }}>
                        {exp.description}
                      </p>
                    </div>
                  </motion.div>
                </div>

                {/* Desktop alternating layout */}
                <div className={`hidden md:flex w-full ${i % 2 === 0 ? "justify-start" : "justify-end"}`}>
                  <div className={`w-1/2 ${i % 2 === 0 ? "pr-12" : "pl-12"} relative`}>
                    {/* Timeline dot */}
                    <div
                      className="absolute top-6 w-4 h-4 rounded-full z-10"
                      style={{
                        [i % 2 === 0 ? "right" : "left"]: "-8px",
                        background: exp.color,
                        border: "3px solid #0a0e27",
                        boxShadow: `0 0 12px ${exp.color}, 0 0 24px ${exp.color}44`,
                      }}
                    />
                    <ExperienceCardDesktop exp={exp} index={i} isLeft={i % 2 === 0} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ExperienceCardDesktop({
  exp,
  index,
  isLeft,
}: {
  exp: (typeof experiences)[0];
  index: number;
  isLeft: boolean;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: false, amount: 0.3 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="rounded-2xl overflow-hidden cursor-pointer"
      style={{
        background: "rgba(255,255,255,0.025)",
        border: `1px solid ${expanded ? exp.color + "44" : "rgba(255,255,255,0.06)"}`,
        boxShadow: expanded ? `0 0 30px ${exp.color}15` : "none",
        transition: "all 0.3s ease",
      }}
      onClick={() => setExpanded(!expanded)}
    >
      <div className="p-6">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div>
            <span
              className="px-2 py-0.5 rounded text-xs mb-2 inline-block"
              style={{
                fontFamily: "Cabin, sans-serif",
                background: `${exp.color}18`,
                border: `1px solid ${exp.color}44`,
                color: exp.color,
                fontWeight: 600,
                letterSpacing: "0.08em",
              }}
            >
              {exp.type}
            </span>
            <h3
              style={{
                fontFamily: "Orbitron, sans-serif",
                fontSize: "1rem",
                fontWeight: 700,
                color: "#f8f9fa",
                letterSpacing: "0.04em",
                display: "block",
                marginBottom: "2px",
              }}
            >
              {exp.role}
            </h3>
            <div style={{ fontFamily: "Cabin, sans-serif", fontSize: "0.9rem", fontWeight: 600, color: exp.color }}>
              {exp.company}
            </div>
          </div>
          <div className="text-right shrink-0">
            <div style={{ color: "rgba(248,249,250,0.45)", fontFamily: "Cabin, sans-serif", fontSize: "0.75rem" }}>
              {exp.period}
            </div>
            <div style={{ color: "rgba(248,249,250,0.35)", fontFamily: "Cabin, sans-serif", fontSize: "0.7rem" }}>
              {exp.location}
            </div>
          </div>
        </div>

        <p style={{ fontFamily: "Cabin, sans-serif", fontSize: "0.85rem", color: "rgba(248,249,250,0.6)", lineHeight: 1.7, marginBottom: "12px" }}>
          {exp.description}
        </p>

        <div className="flex items-center gap-2" style={{ color: exp.color, fontFamily: "Cabin, sans-serif", fontSize: "0.75rem", fontWeight: 600 }}>
          <span>{expanded ? "SHOW LESS" : "VIEW HIGHLIGHTS"}</span>
          <motion.div animate={{ rotate: expanded ? 180 : 0 }} transition={{ duration: 0.3 }}>
            <ChevronDown className="w-4 h-4" />
          </motion.div>
        </div>

        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.35 }}
              className="overflow-hidden"
            >
              <div className="mt-4 pt-4" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                <ul className="space-y-2 mb-4">
                  {exp.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-2" style={{ fontFamily: "Cabin, sans-serif", fontSize: "0.83rem", color: "rgba(248,249,250,0.7)", lineHeight: 1.6 }}>
                      <span style={{ color: exp.color, marginTop: "4px", flexShrink: 0 }}>▸</span>
                      {h}
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-2">
                  {exp.tech.map((t) => (
                    <span
                      key={t}
                      className="px-2 py-0.5 rounded text-xs"
                      style={{
                        fontFamily: "Cabin, sans-serif",
                        background: `${exp.color}10`,
                        border: `1px solid ${exp.color}30`,
                        color: exp.color,
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
