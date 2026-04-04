import { useRef, ReactNode } from "react";

export default function TiltCard({ children, className, style }: {
  children: ReactNode; className?: string; style?: React.CSSProperties;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `perspective(600px) rotateY(${x * 16}deg) rotateX(${-y * 16}deg) scale(1.02)`;
    card.style.boxShadow = `${-x * 20}px ${-y * 20}px 40px rgba(0,212,255,0.15), 0 0 30px rgba(176,0,255,0.1)`;
  };

  const handleLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = "perspective(600px) rotateY(0deg) rotateX(0deg) scale(1)";
    card.style.boxShadow = "none";
  };

  return (
    <div ref={cardRef} className={className} style={{ ...style, transition:"transform 0.1s ease, box-shadow 0.1s ease", willChange:"transform" }}
      onMouseMove={handleMove} onMouseLeave={handleLeave}>
      {children}
    </div>
  );
}
