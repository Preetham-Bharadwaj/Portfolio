import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Github, Star, GitFork } from "lucide-react";
import TiltCard from "./TiltCard";
import { useReveal } from "../hooks/useReveal";

const projects = [
  {
    id: 1,
    title: "AI-Powered Healthcare Triage System",
    subtitle: "Intelligent Healthcare Platform",
    description:
      "Developed a full-stack healthcare platform that guides users from symptom input to hospital queue registration using AI. Integrated Claude AI for intelligent symptom analysis and OpenStreetMap API for real-time hospital discovery.",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    tags: ["React.js", "Node.js", "Express.js", "Claude AI", "OpenStreetMap API"],
    stars: 0,
    forks: 0,
    color: "#00d4ff",
    status: "Production",
    demo: "#",
    github: "https://github.com/Preetham-Bharadwaj",
  },
  {
    id: 2,
    title: "Secure Health Digital Ecosystem",
    subtitle: "Healthcare Data Management",
    description:
      "Designed a secure healthcare ecosystem for managing patient data, authentication, and hospital interactions. Focused on real-world problem solving with secure and scalable architecture.",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    tags: ["MERN Stack", "Spring Boot", "Java", "Security"],
    stars: 0,
    forks: 0,
    color: "#b000ff",
    status: "Beta",
    demo: "#",
    github: "https://github.com/Preetham-Bharadwaj",
  },
  {
    id: 3,
    title: "Agrio – Farmer Auction Platform",
    subtitle: "Agricultural Supply Chain Solution",
    description:
      "Built a platform connecting farmers, retailers, and consumers with auction features and real-time interaction. Designed for solving agricultural supply chain problems.",
    image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Zustand"],
    stars: 0,
    forks: 0,
    color: "#f0d000",
    status: "Production",
    demo: "#",
    github: "https://github.com/Preetham-Bharadwaj",
  },
  {
    id: 4,
    title: "Online Banking System",
    subtitle: "Database Management System",
    description:
      "Building a comprehensive banking system with account management, transactions, and authentication using DBMS concepts. Project currently in development phase.",
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    tags: ["C++", "DBMS", "Authentication", "Transactions"],
    stars: 0,
    forks: 0,
    color: "#b000ff",
    status: "In Progress",
    demo: "#",
    github: "https://github.com/Preetham-Bharadwaj",
  },
];

const statusColors: Record<string, string> = {
  Production: "#00d4ff",
  Research: "#b000ff",
  Beta: "#f0d000",
  Academic: "#00d4ff",
  "In Progress": "#f0d000",
};

function ProjectCard({ project, index }: { project: (typeof projects)[0]; index: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <TiltCard
      className="relative rounded-2xl overflow-hidden cursor-default"
      style={{
        background: "rgba(255,255,255,0.02)",
        border: `1px solid ${hovered ? project.color + "66" : "rgba(255,255,255,0.06)"}`,
        boxShadow: hovered ? `0 0 30px ${project.color}22, 0 20px 40px rgba(0,0,0,0.3)` : "none",
        transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
        whileHover={{ y: -8, transition: { duration: 0.3, ease: "easeOut" } }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="relative h-full"
      >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <motion.img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover"
          animate={{ scale: hovered ? 1.08 : 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
        {/* Overlay */}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to bottom, ${project.color}11 0%, rgba(10,14,39,0.85) 100%)`,
          }}
        />
        {/* Status badge */}
        <div
          className="absolute top-3 right-3 px-3 py-1 rounded-full text-xs"
          style={{
            background: `${statusColors[project.status]}18`,
            border: `1px solid ${statusColors[project.status]}55`,
            color: statusColors[project.status],
            fontFamily: "Cabin, sans-serif",
            fontWeight: 600,
            letterSpacing: "0.1em",
          }}
        >
          {project.status}
        </div>
        {/* Glow line */}
        <div
          className="absolute bottom-0 left-0 right-0 h-px"
          style={{ background: `linear-gradient(to right, transparent, ${project.color}, transparent)` }}
        />
      </div>

      {/* Content */}
      <div className="p-6">
        <h3
          style={{
            fontFamily: "Orbitron, sans-serif",
            fontSize: "1.1rem",
            fontWeight: 700,
            color: "#f8f9fa",
            letterSpacing: "0.05em",
            marginBottom: "4px",
          }}
        >
          {project.title}
        </h3>
        <p
          style={{
            fontFamily: "Cabin, sans-serif",
            fontSize: "0.8rem",
            color: project.color,
            marginBottom: "12px",
            letterSpacing: "0.05em",
          }}
        >
          {project.subtitle}
        </p>

        {/* Description - reveals on hover */}
        <AnimatePresence>
          {hovered && (
            <motion.p
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              style={{
                fontFamily: "Cabin, sans-serif",
                fontSize: "0.85rem",
                color: "rgba(248,249,250,0.65)",
                lineHeight: 1.7,
                marginBottom: "12px",
                overflow: "hidden",
              }}
            >
              {project.description}
            </motion.p>
          )}
        </AnimatePresence>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 rounded text-xs"
              style={{
                fontFamily: "Cabin, sans-serif",
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
                color: "rgba(248,249,250,0.6)",
                letterSpacing: "0.03em",
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between">
          {project.stars > 0 || project.forks > 0 ? (
            <div className="flex items-center gap-4">
              {project.stars > 0 && (
                <span className="flex items-center gap-1" style={{ color: "rgba(248,249,250,0.4)", fontFamily: "Cabin, sans-serif", fontSize: "0.8rem" }}>
                  <Star className="w-3.5 h-3.5" />
                  {project.stars >= 1000 ? `${(project.stars / 1000).toFixed(1)}k` : project.stars}
                </span>
              )}
              {project.forks > 0 && (
                <span className="flex items-center gap-1" style={{ color: "rgba(248,249,250,0.4)", fontFamily: "Cabin, sans-serif", fontSize: "0.8rem" }}>
                  <GitFork className="w-3.5 h-3.5" />
                  {project.forks}
                </span>
              )}
            </div>
          ) : (
            <div />
          )}
          <div className="flex items-center gap-3">
            <a
              href={project.github}
              className="transition-colors duration-200"
              style={{ color: "rgba(248,249,250,0.4)" }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#f8f9fa")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "rgba(248,249,250,0.4)")}
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href={project.demo}
              className="transition-colors duration-200"
              style={{ color: "rgba(248,249,250,0.4)" }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = project.color)}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "rgba(248,249,250,0.4)")}
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
      </motion.div>
    </TiltCard>
  );
}

export default function Projects() {
  const { ref, visible } = useReveal();
  return (
    <section
      id="projects"
      className="relative py-24 px-6 overflow-hidden"
      style={{ background: "linear-gradient(180deg, #0a0e27 0%, #0d1235 50%, #0a0e27 100%)" }}
      ref={ref}
    >
      {/* Background accents */}
      <div
        className="absolute top-20 left-0 w-80 h-80 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse, rgba(0,212,255,0.04) 0%, transparent 70%)",
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
            // FEATURED PROJECTS
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
            What I've{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #00d4ff, #b000ff)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Built
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
            From healthcare to agriculture — projects solving real-world problems with scalable solutions.
            Hover cards to explore details.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>

        {/* View All */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false }}
          transition={{ delay: 0.4 }}
          className="text-center mt-12"
        >
          <a
            href="#"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-full transition-all duration-300 hover:scale-105"
            style={{
              fontFamily: "Cabin, sans-serif",
              fontWeight: 600,
              fontSize: "0.85rem",
              background: "rgba(0,212,255,0.08)",
              border: "1px solid rgba(0,212,255,0.3)",
              color: "#00d4ff",
              letterSpacing: "0.1em",
            }}
          >
            VIEW ALL PROJECTS
            <ExternalLink className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
