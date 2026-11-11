"use client";

import { useState, type ReactNode } from "react";

/**
 * Pembungkus bentuk di hero: lapisan luar = parallax pointer, tengah = animasi masuk,
 * dalam = reaksi hover/klik. Dipisah supaya transform tiap lapisan tidak saling menimpa.
 */
export default function Toy({
  children,
  depth = 12,
  delay = 0,
  className = "",
  label,
}: {
  children: ReactNode;
  depth?: number;
  delay?: number;
  className?: string;
  label?: string;
}) {
  const [spin, setSpin] = useState(0);
  return (
    <span
      aria-hidden
      className={`inline-block align-middle ${className}`}
      style={{ translate: `calc(var(--px, 0) * ${depth}px) calc(var(--py, 0) * ${depth}px)` }}
      title={label}
    >
      <span className="pop-in block" style={{ animationDelay: `calc(var(--intro-delay, 0s) + ${delay}ms)` }}>
        <span
          onClick={() => setSpin((s) => s + 1)}
          className="block cursor-pointer hover:scale-[1.12] active:scale-95"
          style={{ rotate: `${spin * 180}deg`, transition: "rotate 900ms var(--ease-spring), scale 500ms var(--ease-spring)" }}
        >
          {children}
        </span>
      </span>
    </span>
  );
}
