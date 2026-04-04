import { useEffect, useRef, useState } from "react";

interface Particle { id:number; x:number; y:number; dx:number; dy:number; color:string; }

export default function ParticleBurst() {
  const [particles, setParticles] = useState<Particle[]>([]);
  const counter = useRef(0);

  const triggerBurst = (x: number, y: number) => {
    const colors = ["#00d4ff","#b000ff","#818cf8","#00d4ff","#ffffff"];
    const burst: Particle[] = Array.from({length: 12}, (_, i) => {
      const angle = (i / 12) * Math.PI * 2;
      const speed = 40 + Math.random() * 60;
      return {
        id: counter.current++,
        x, y,
        dx: Math.cos(angle) * speed,
        dy: Math.sin(angle) * speed,
        color: colors[Math.floor(Math.random() * colors.length)]
      };
    });
    setParticles(p => [...p, ...burst]);
    setTimeout(() => setParticles(p => p.filter(pt => !burst.find(b => b.id === pt.id))), 800);
  };

  useEffect(() => {
    const click = (e: MouseEvent) => {
      triggerBurst(e.clientX, e.clientY);
    };
    
    const handleTouch = (e: TouchEvent) => {
      const touch = e.touches[0];
      triggerBurst(touch.clientX, touch.clientY);
    };
    
    window.addEventListener("click", click);
    window.addEventListener("touchstart", handleTouch);
    
    return () => {
      window.removeEventListener("click", click);
      window.removeEventListener("touchstart", handleTouch);
    };
  }, []);

  return (
    <div style={{position:"fixed",inset:0,pointerEvents:"none",zIndex:99997,overflow:"hidden"}}>
      {particles.map(p => (
        <div key={p.id} style={{
          position:"absolute",width:"5px",height:"5px",borderRadius:"50%",
          background: p.color, boxShadow:`0 0 6px ${p.color}`,
          left: p.x, top: p.y,
          animation:"burst 0.8s ease-out forwards",
          "--dx": `${p.dx}px`, "--dy": `${p.dy}px`,
        } as React.CSSProperties}/>
      ))}
    </div>
  );
}
