import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Experience from "./components/Experience";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import ScrollProgress from "./components/ScrollProgress";
import ContactCTA from "./components/ContactCTA";
import AuroraBackground from "./components/AuroraBackground";
import CustomCursor from "./components/CustomCursor";
import SpotlightCursor from "./components/SpotlightCursor";
import ParticleBurst from "./components/ParticleBurst";
import ScrollProgressBar from "./components/ScrollProgressBar";

const isDesktop = typeof window !== "undefined" && !("ontouchstart" in window) && window.innerWidth >= 768;

export default function App() {
  return (
    <div
      style={{
        backgroundColor: "#0a0e27",
        color: "#f8f9fa",
        fontFamily: "Cabin, sans-serif",
        minHeight: "100vh",
        overflowX: "hidden",
      }}
    >
      {/* Visual Effects */}
      <AuroraBackground />
      {isDesktop && <CustomCursor />}
      {isDesktop && <SpotlightCursor />}
      <ParticleBurst />
      <ScrollProgressBar />

      {/* Right-edge scroll progress */}
      <ScrollProgress />

      {/* Sticky Navbar */}
      <Navbar />

      {/* Sections */}
      <Hero />
      <About />
      <Projects />
      <Skills />
      <Experience />
      <Contact />
      <Footer />

      {/* Floating contact button */}
      <ContactCTA />
    </div>
  );
}
