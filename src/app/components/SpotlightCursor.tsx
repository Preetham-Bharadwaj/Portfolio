import { useEffect, useRef } from "react";

export default function SpotlightCursor() {
  const spotRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const move = (e: MouseEvent) => {
      if (spotRef.current) {
        spotRef.current.style.background = `radial-gradient(600px circle at ${e.clientX}px ${e.clientY}px, rgba(0,212,255,0.06) 0%, transparent 60%)`;
      }
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);
  return (
    <div ref={spotRef} style={{
      position:"fixed",inset:0,pointerEvents:"none",zIndex:1,
      transition:"background 0.1s ease"
    }}/>
  );
}
