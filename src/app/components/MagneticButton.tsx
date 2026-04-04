import { useRef, ReactNode } from "react";

export default function MagneticButton({ children, className, style, onClick, onMouseEnter, onMouseLeave }: {
  children: ReactNode; className?: string; style?: React.CSSProperties; onClick?: () => void; onMouseEnter?: (e: React.MouseEvent<HTMLButtonElement>) => void; onMouseLeave?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}) {
  const btnRef = useRef<HTMLButtonElement>(null);

  const handleMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const btn = btnRef.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) * 0.35;
    const dy = (e.clientY - cy) * 0.35;
    btn.style.transform = `translate(${dx}px, ${dy}px) scale(1.05)`;
  };

  const handleLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (btnRef.current) btnRef.current.style.transform = "translate(0,0) scale(1)";
    if (onMouseLeave) onMouseLeave(e);
  };

  return (
    <button 
      ref={btnRef} 
      className={className} 
      style={{...style, transition:"transform 0.2s cubic-bezier(0.23,1,0.32,1)", willChange:"transform"}}
      onMouseMove={handleMove} 
      onMouseEnter={onMouseEnter}
      onMouseLeave={handleLeave} 
      onClick={onClick}
    >
      {children}
    </button>
  );
}
