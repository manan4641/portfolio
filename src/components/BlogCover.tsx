import { COVERS, pad2 } from "@/data/site";

// Decorative article cover (grid, orb, rings, outlined number, category pill).
export default function BlogCover({ index, cat, variant }: { index: number; cat: string; variant: "lead" | "card" | "hero" }) {
  const [cover, orb] = COVERS[index % 3];
  const cls = variant === "card" ? "cover cover--card" : variant === "hero" ? "cover cover--hero" : "cover";
  return (
    <div className={cls} style={{ background: cover }} aria-hidden="true">
      <span className="cover__grid" />
      <span className="cover__orb" style={{ background: orb }} />
      <span className="cover__ring1" />
      <span className="cover__ring2" />
      <span className="cover__num">{pad2(index + 1)}</span>
      <span className="cover__cat">{cat}</span>
    </div>
  );
}
