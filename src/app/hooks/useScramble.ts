import { useState, useCallback } from "react";
const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&";

export function useScramble(original: string) {
  const [text, setText] = useState(original);
  const scramble = useCallback(() => {
    let iter = 0;
    const interval = setInterval(() => {
      setText(original.split("").map((c, i) =>
        i < iter ? original[i] : CHARS[Math.floor(Math.random() * CHARS.length)]
      ).join(""));
      iter += 0.5;
      if (iter >= original.length) { setText(original); clearInterval(interval); }
    }, 40);
  }, [original]);
  return { text, scramble };
}
