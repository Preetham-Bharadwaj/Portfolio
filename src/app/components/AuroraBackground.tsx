import { useEffect, useRef } from "react";

export default function AuroraBackground() {
  const blobRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const handleOrientation = (e: DeviceOrientationEvent) => {
      const x = (e.gamma ?? 0) / 30;
      const y = (e.beta ?? 0) / 30;
      blobRefs.current.forEach((blob, i) => {
        if (blob) {
          const factor = (i + 1) * 8;
          blob.style.transform = `translate(${x * factor}px, ${y * factor}px)`;
        }
      });
    };
    
    if (typeof window !== 'undefined' && 'DeviceOrientationEvent' in window) {
      window.addEventListener("deviceorientation", handleOrientation);
    }
    
    return () => {
      if (typeof window !== 'undefined' && 'DeviceOrientationEvent' in window) {
        window.removeEventListener("deviceorientation", handleOrientation);
      }
    };
  }, []);

  return (
    <div style={{position:"fixed",inset:0,pointerEvents:"none",zIndex:0,overflow:"hidden"}}>
      {[
        {color:"rgba(0,212,255,0.07)",size:600,top:"-10%",left:"-10%",duration:18},
        {color:"rgba(176,0,255,0.06)",size:500,top:"20%",right:"-15%",duration:22},
        {color:"rgba(129,140,248,0.05)",size:400,bottom:"-10%",left:"30%",duration:26},
        {color:"rgba(0,212,255,0.05)",size:350,top:"60%",left:"-5%",duration:20},
      ].map((blob, i) => (
        <div 
          key={i} 
          ref={el => { if(el) blobRefs.current[i] = el; }}
          style={{
            position:"absolute",
            width: blob.size, height: blob.size,
            borderRadius:"50%",
            background: blob.color,
            filter:"blur(80px)",
            top: blob.top, left: (blob as any).left,
            right: (blob as any).right, bottom: (blob as any).bottom,
            animation:`aurora${i} ${blob.duration}s ease-in-out infinite`,
          }}
        />
      ))}
      <style>{`
        @keyframes aurora0 { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(40px,30px) scale(1.1)} }
        @keyframes aurora1 { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(-30px,40px) scale(1.15)} }
        @keyframes aurora2 { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(20px,-30px) scale(1.05)} }
        @keyframes aurora3 { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(30px,20px) scale(1.1)} }
      `}</style>
    </div>
  );
}
