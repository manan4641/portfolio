"use client";

import { tiltLeave, tiltMove, tiltSoft } from "@/lib/motion";

type Props = React.HTMLAttributes<HTMLDivElement> & { soft?: boolean; as?: "div" | "article" };

// Wrapper whose first child rotates toward the pointer (the design's tilt/tiltSoft handlers).
export default function Tilt({ soft, as = "div", children, ...rest }: Props) {
  const Tag = as;
  return (
    <Tag {...rest} onMouseMove={soft ? tiltSoft : tiltMove} onMouseLeave={tiltLeave}>
      {children}
    </Tag>
  );
}
