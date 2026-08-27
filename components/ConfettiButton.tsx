"use client";

import { type ComponentPropsWithoutRef, type MouseEvent } from "react";

const COLORS = ["#2dd4bf", "#5eead4", "#99f6e4", "#e8edf5"];

function burst(x: number, y: number) {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const count = 10;
  for (let i = 0; i < count; i++) {
    const el = document.createElement("span");
    const angle = (Math.PI * 2 * i) / count + Math.random() * 0.5;
    const distance = 40 + Math.random() * 40;
    const dx = Math.cos(angle) * distance;
    const dy = Math.sin(angle) * distance;
    const size = 4 + Math.random() * 4;

    Object.assign(el.style, {
      position: "fixed",
      left: `${x}px`,
      top: `${y}px`,
      width: `${size}px`,
      height: `${size}px`,
      borderRadius: "9999px",
      background: COLORS[i % COLORS.length],
      pointerEvents: "none",
      zIndex: "9999",
      opacity: "1",
      transition: "transform 700ms ease-out, opacity 700ms ease-out",
    });

    document.body.appendChild(el);
    requestAnimationFrame(() => {
      el.style.transform = `translate(${dx}px, ${dy}px)`;
      el.style.opacity = "0";
    });
    setTimeout(() => el.remove(), 750);
  }
}

export default function ConfettiButton({
  onClick,
  ...rest
}: ComponentPropsWithoutRef<"a">) {
  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    burst(e.clientX, e.clientY);
    onClick?.(e);
  };

  return <a onClick={handleClick} {...rest} />;
}
