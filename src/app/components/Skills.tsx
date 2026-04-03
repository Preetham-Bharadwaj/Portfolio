import { motion } from "framer-motion";

// Skills organized by category with colors
const skillsData = {
  Frontend: {
    color: "#00d4ff",
    skills: [
      { name: "HTML", level: 75 },
      { name: "CSS", level: 70 },
      { name: "JavaScript", level: 70 },
      { name: "React.js", level: 65 },
      { name: "Tailwind CSS", level: 75 },
    ],
  },
  Backend: {
    color: "#b000ff",
    skills: [
      { name: "Node.js", level: 60 },
      { name: "Express.js", level: 60 },
      { name: "Spring Boot", level: 70 },
      { name: "MongoDB", level: 55 },
    ],
  },
  Tools: {
    color: "#f0d000",
    skills: [
      { name: "Git", level: 80 },
      { name: "GitHub", level: 85 },
      { name: "VS Code", level: 90 },
      { name: "Docker", level: 50 },
      { name: "Vercel", level: 70 },
    ],
  },
};

function SkillTag({ name, index, color }: { name: string; index: number; color: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: false }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      whileHover={{ scale: 1.05, y: -2 }}
      className="inline-flex items-center px-3 py-1.5 rounded-full cursor-default"
      style={{
        background: `${color}15`,
        border: `1px solid ${color}40`,
      }}
    >
      <span
        className="w-2 h-2 rounded-full mr-2"
        style={{ background: color }}
      />
      <span
        style={{
          fontFamily: "Cabin, sans-serif",
          fontSize: "0.85rem",
          fontWeight: 500,
          color: "#f8f9fa",
          letterSpacing: "0.02em",
        }}
      >
        {name}
      </span>
    </motion.div>
  );
}

function CategoryCard({
  title,
  skills,
  index,
  color,
}: {
  title: string;
  skills: { name: string; level: number }[];
  index: number;
  color: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="p-6 rounded-xl"
      style={{
        background: "rgba(255, 255, 255, 0.02)",
        border: "1px solid rgba(255, 255, 255, 0.06)",
      }}
    >
      <h3
        className="mb-4"
        style={{
          fontFamily: "Orbitron, sans-serif",
          fontSize: "0.85rem",
          fontWeight: 600,
          color: color,
          letterSpacing: "0.12em",
        }}
      >
        {title.toUpperCase()}
      </h3>
      <div className="flex flex-wrap gap-3">
        {skills.map((skill, i) => (
          <SkillTag key={skill.name} name={skill.name} index={i} color={color} />
        ))}
      </div>
    </motion.div>
  );
}

export default function Skills() {
  const categories = Object.entries(skillsData);

  return (
    <section
      id="skills"
      className="relative py-24 px-6 overflow-hidden"
      style={{ background: "#0d1117" }}
    >
      {/* Background gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at 50% 0%, rgba(0, 212, 255, 0.03) 0%, transparent 50%)",
        }}
      />

      <div className="max-w-5xl mx-auto relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
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

        {/* Category Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {categories.map(([title, data], index) => (
            <CategoryCard
              key={title}
              title={title}
              skills={data.skills}
              index={index}
              color={data.color}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
