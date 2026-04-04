import { useEffect, useState } from "react";
import { Zap } from "lucide-react";

export default function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!show) return null;
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      style={{
        position: "fixed", bottom: "24px", left: "24px",
        width: "44px", height: "44px", borderRadius: "50%",
        background: "linear-gradient(135deg, #00d4ff, #b000ff)",
        border: "none", cursor: "pointer", zIndex: 9999,
        display: "flex", alignItems: "center", justifyContent: "center",
        boxShadow: "0 0 20px rgba(0,212,255,0.4)",
        animation: "fadeInUp 0.3s ease",
      }}
      aria-label="Back to top"
    >
      <Zap className="w-5 h-5 text-white" />
    </button>
  );
}
