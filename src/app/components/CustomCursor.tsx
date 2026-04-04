import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const trailRefs = useRef<HTMLDivElement[]>([]);
  const positions = useRef<{x:number,y:number}[]>(Array(10).fill({x:0,y:0}));
  const mouse = useRef({x:0,y:0});

  useEffect(() => {
    const move = (e: MouseEvent) => { mouse.current = {x: e.clientX, y: e.clientY}; };
    window.addEventListener("mousemove", move);

    let frame: number;
    const animate = () => {
      positions.current = [mouse.current, ...positions.current.slice(0, 9)];
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${mouse.current.x - 8}px, ${mouse.current.y - 8}px)`;
      }
      trailRefs.current.forEach((dot, i) => {
        if (dot) {
          const p = positions.current[i];
          const size = Math.max(3, 10 - i * 0.8);
          dot.style.transform = `translate(${p.x - size/2}px, ${p.y - size/2}px)`;
          dot.style.opacity = `${1 - i * 0.09}`;
          dot.style.width = `${size}px`;
          dot.style.height = `${size}px`;
        }
      });
      frame = requestAnimationFrame(animate);
    };
    animate();

    const onEnter = () => cursorRef.current && (cursorRef.current.style.transform += " scale(2)");
    const onLeave = () => cursorRef.current && (cursorRef.current.style.transform = cursorRef.current.style.transform.replace(" scale(2)", ""));
    document.querySelectorAll("a,button").forEach(el => {
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
    });

    return () => { window.removeEventListener("mousemove", move); cancelAnimationFrame(frame); };
  }, []);

  return (
    <>
      <div ref={cursorRef} style={{
        position:"fixed",width:"16px",height:"16px",borderRadius:"50%",
        background:"rgba(0,212,255,0.9)",boxShadow:"0 0 12px #00d4ff, 0 0 24px rgba(0,212,255,0.4)",
        pointerEvents:"none",zIndex:99999,transition:"width 0.2s,height 0.2s",
        mixBlendMode:"screen",top:0,left:0,willChange:"transform"
      }}/>
      {Array.from({length:10}).map((_,i) => (
        <div key={i} ref={el => { if(el) trailRefs.current[i] = el; }} style={{
          position:"fixed",borderRadius:"50%",
          background: i < 5 ? "rgba(0,212,255,0.6)" : "rgba(176,0,255,0.5)",
          pointerEvents:"none",zIndex:99998,top:0,left:0,willChange:"transform",
          transition:"opacity 0.1s"
        }}/>
      ))}
    </>
  );
}
