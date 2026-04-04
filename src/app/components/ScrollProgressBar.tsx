import { useEffect, useRef } from "react";

export default function ScrollProgressBar() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const update = () => {
      const scrolled = window.scrollY;
      const total = document.body.scrollHeight - window.innerHeight;
      const pct = Math.round((scrolled / total) * 100);
      if (barRef.current) barRef.current.style.width = `${pct}%`;
    };
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <div style={{
      position: "fixed", top: 0, left: 0, right: 0,
      height: "2px", zIndex: 99999,
      background: "rgba(255,255,255,0.05)"
    }}>
      <div ref={barRef} style={{
        height: "100%", width: "0%",
        background: "linear-gradient(90deg, #00d4ff, #b000ff)",
        boxShadow: "0 0 8px #00d4ff",
        transition: "width 0.1s ease",
      }}/>
    </div>
  );
}
