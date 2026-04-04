import { useScramble } from "../hooks/useScramble";

function NavLabel({ label }: { label: string }) {
  const { text, scramble } = useScramble(label.toUpperCase());
  return <span onMouseEnter={scramble} style={{fontFamily:"monospace"}}>{text}</span>;
}

export default NavLabel;
