import { motion } from "framer-motion";
import {
  Code2,
  Database,
  Globe,
  Cpu,
  Rocket,
  Shield,
  BarChart2,
  GitBranch,
  Terminal,
  Layers,
  Cloud,
  Zap,
} from "lucide-react";

const stats = [
  { value: "4+", label: "Projects" },
  { value: "2+", label: "Hackathons" },
  { value: "12+", label: "Technologies" },
  { value: "100+", label: "Commits" },
];

const techIcons = [
  { Icon: Code2, label: "React.js", color: "#00d4ff" },
  { Icon: Database, label: "MongoDB", color: "#b000ff" },
  { Icon: Globe, label: "Node.js", color: "#00d4ff" },
  { Icon: Cpu, label: "Java (DSA)", color: "#f0d000" },
  { Icon: Rocket, label: "Express.js", color: "#b000ff" },
  { Icon: Shield, label: "Spring Boot", color: "#00d4ff" },
  { Icon: BarChart2, label: "MySQL", color: "#f0d000" },
  { Icon: GitBranch, label: "Git", color: "#b000ff" },
  { Icon: Terminal, label: "C/C++", color: "#00d4ff" },
  { Icon: Layers, label: "JavaScript", color: "#00d4ff" },
  { Icon: Cloud, label: "REST APIs", color: "#f0d000" },
  { Icon: Zap, label: "Learning", color: "#b000ff" },
];

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col items-start mb-12">
      <span
        style={{
          fontFamily: "Cabin, sans-serif",
          fontSize: "0.75rem",
          letterSpacing: "0.3em",
          color: "#00d4ff",
          fontWeight: 600,
          marginBottom: "0.5rem",
        }}
      >
        // ABOUT ME
      </span>
      <h2
        style={{
          fontFamily: "Orbitron, sans-serif",
          fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
          fontWeight: 800,
          color: "#f8f9fa",
          lineHeight: 1.2,
        }}
      >
        {children}
      </h2>
      <div
        className="mt-3 h-0.5 rounded-full"
        style={{ width: "60px", background: "linear-gradient(to right, #00d4ff, #b000ff)" }}
      />
    </div>
  );
}

export default function About() {
  return (
    <section
      id="about"
      className="relative py-24 px-6 overflow-hidden"
      style={{ background: "#0a0e27" }}
    >
      {/* Background accent */}
      <div
        className="absolute top-0 right-0 w-96 h-96 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at top right, rgba(176,0,255,0.06) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Text */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8 }}
          >
            <SectionTitle>
              Mission:{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, #00d4ff, #b000ff)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Build & Innovate
              </span>
            </SectionTitle>

            <div
              className="space-y-5"
              style={{
                fontFamily: "Cabin, sans-serif",
                color: "rgba(248,249,250,0.75)",
                lineHeight: 1.9,
                fontSize: "1rem",
              }}
            >
              <p>
                I'm a <strong style={{ color: "#00d4ff" }}>Computer Science Engineering student</strong> with
                strong skills in programming, system design, and problem-solving. I'm currently learning the MERN stack
                and have experience with Java, C/C++, and building real-world applications.
              </p>
              <p>
                I have developed projects in healthcare, agriculture, and system automation, focusing on solving
                practical problems. My work includes{" "}
                <strong style={{ color: "#b000ff" }}>AI-powered healthcare triage systems</strong>, farmer auction
                platforms, and secure digital ecosystems.
              </p>
              <p>
                I actively participate in hackathons and enjoy working in fast-paced environments where innovation
                and execution matter. I am passionate about{" "}
                <strong style={{ color: "#f0d000" }}>learning new technologies</strong> and building solutions that
                make a real impact.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 mt-10">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false }}
                  transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
                  whileHover={{ scale: 1.05, y: -4 }}
                  className="p-4 rounded-xl"
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(0,212,255,0.12)",
                    transition: "all 0.3s ease",
                    cursor: "default",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(0,212,255,0.3)";
                    (e.currentTarget as HTMLElement).style.boxShadow = "0 0 20px rgba(0,212,255,0.1)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(0,212,255,0.12)";
                    (e.currentTarget as HTMLElement).style.boxShadow = "none";
                  }}
                >
                  <div
                    style={{
                      fontFamily: "Orbitron, sans-serif",
                      fontSize: "2rem",
                      fontWeight: 800,
                      background: "linear-gradient(135deg, #00d4ff, #b000ff)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    {stat.value}
                  </div>
                  <div
                    style={{
                      fontFamily: "Cabin, sans-serif",
                      fontSize: "0.8rem",
                      color: "rgba(248,249,250,0.55)",
                      letterSpacing: "0.05em",
                      marginTop: "2px",
                    }}
                  >
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Download CV button */}
            <motion.a
              href="#"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: false }}
              transition={{ delay: 0.5 }}
              className="inline-flex items-center gap-3 mt-8 px-6 py-3 rounded-full transition-all duration-300 hover:scale-105"
              style={{
                fontFamily: "Cabin, sans-serif",
                fontWeight: 700,
                fontSize: "0.85rem",
                background: "rgba(240,208,0,0.1)",
                border: "1px solid rgba(240,208,0,0.5)",
                color: "#f0d000",
                letterSpacing: "0.1em",
                boxShadow: "0 0 20px rgba(240,208,0,0.1)",
              }}
            >
              ↓ DOWNLOAD RESUME
            </motion.a>
          </motion.div>

          {/* Right: Tech Icon Grid */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            {/* Glow background */}
            <div
              className="absolute inset-0 rounded-3xl pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse at center, rgba(0,212,255,0.05) 0%, transparent 70%)",
              }}
            />
            <div className="grid grid-cols-4 gap-4">
              {techIcons.map(({ Icon, label, color }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: false }}
                  whileHover={{ scale: 1.15, y: -6 }}
                  transition={{
                    duration: 0.4,
                    delay: i * 0.05,
                    type: "spring",
                    stiffness: 300,
                    damping: 20,
                  }}
                  className="flex flex-col items-center gap-2 p-4 rounded-xl cursor-pointer"
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    border: `1px solid ${color}22`,
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = color + "66";
                    (e.currentTarget as HTMLElement).style.boxShadow = `0 0 20px ${color}22`;
                    (e.currentTarget as HTMLElement).style.background = `${color}08`;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = color + "22";
                    (e.currentTarget as HTMLElement).style.boxShadow = "none";
                    (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.03)";
                  }}
                >
                  <Icon className="w-7 h-7" style={{ color }} />
                  <span
                    style={{
                      fontFamily: "Cabin, sans-serif",
                      fontSize: "0.65rem",
                      color: "rgba(248,249,250,0.55)",
                      letterSpacing: "0.05em",
                    }}
                  >
                    {label}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
