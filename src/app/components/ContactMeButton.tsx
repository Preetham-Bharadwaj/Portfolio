import { motion } from "framer-motion";

interface ContactMeButtonProps {
  variant?: "outline" | "solid";
  className?: string;
}

export default function ContactMeButton({ variant = "outline", className = "" }: ContactMeButtonProps) {
  const scrollToContact = () => {
    console.log("Button clicked!");
    setTimeout(() => {
      const element = document.getElementById("contact");
      console.log("Contact element found:", element);
      if (element) {
        // Dispatch event for highlight effect
        window.dispatchEvent(new CustomEvent("contactButtonClicked"));
        
        const navbarHeight = 80;
        const rect = element.getBoundingClientRect();
        const scrollTop = window.scrollY + rect.top - navbarHeight;
        
        console.log("Current scrollY:", window.scrollY);
        console.log("Element rect.top:", rect.top);
        console.log("Calculated scrollTop:", scrollTop);
        
        window.scrollTo({
          top: scrollTop,
          behavior: "smooth"
        });
      } else {
        console.error("Contact element not found!");
      }
    }, 100);
  };

  const isOutline = variant === "outline";

  return (
    <motion.button
      onClick={scrollToContact}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      className={`px-8 py-3 rounded-full ${className}`}
      style={{
        fontFamily: "Cabin, sans-serif",
        fontWeight: 700,
        fontSize: "0.95rem",
        background: isOutline ? "transparent" : "linear-gradient(135deg, #00d4ff, #b000ff)",
        color: isOutline ? "#f8f9fa" : "#fff",
        border: isOutline ? "1px solid rgba(240,208,0,0.6)" : "none",
        boxShadow: isOutline
          ? "0 0 15px rgba(240,208,0,0.15)"
          : "0 0 30px rgba(0,212,255,0.4), 0 0 60px rgba(176,0,255,0.2)",
        letterSpacing: "0.08em",
        cursor: "pointer",
      }}
      onMouseEnter={(e) => {
        if (isOutline) {
          (e.currentTarget as HTMLElement).style.borderColor = "rgba(240,208,0,0.9)";
          (e.currentTarget as HTMLElement).style.boxShadow = "0 0 25px rgba(240,208,0,0.3)";
        } else {
          (e.currentTarget as HTMLElement).style.boxShadow = "0 0 40px rgba(0,212,255,0.6), 0 0 80px rgba(176,0,255,0.3)";
        }
      }}
      onMouseLeave={(e) => {
        if (isOutline) {
          (e.currentTarget as HTMLElement).style.borderColor = "rgba(240,208,0,0.6)";
          (e.currentTarget as HTMLElement).style.boxShadow = "0 0 15px rgba(240,208,0,0.15)";
        } else {
          (e.currentTarget as HTMLElement).style.boxShadow = "0 0 30px rgba(0,212,255,0.4), 0 0 60px rgba(176,0,255,0.2)";
        }
      }}
    >
      LET'S BUILD TOGETHER
    </motion.button>
  );
}
