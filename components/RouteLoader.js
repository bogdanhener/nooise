"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState, useRef } from "react";

export default function RouteLoader() {
  const pathname = usePathname();
  const [active, setActive] = useState(false);
  const [progress, setProgress] = useState(0);
  const firstRender = useRef(true);
  const timeoutRef = useRef(null);

  useEffect(() => {
    // Skip on first mount (initial page load)
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }

    // Reset and start animation on route change
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    setActive(true);
    setProgress(0);

    // Quickly animate to ~80% to simulate loading
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setProgress(80);
      });
    });

    // Complete to 100% after a short delay
    const completeTimer = setTimeout(() => setProgress(100), 350);
    // Fade out
    const hideTimer = setTimeout(() => {
      setActive(false);
      setProgress(0);
    }, 650);

    return () => {
      clearTimeout(completeTimer);
      clearTimeout(hideTimer);
    };
  }, [pathname]);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: 2,
        zIndex: 9999,
        pointerEvents: "none",
        opacity: active ? 1 : 0,
        transition: "opacity 0.3s cubic-bezier(0.22, 1, 0.36, 1)"
      }}
    >
      <div
        style={{
          height: "100%",
          width: `${progress}%`,
          background: "var(--soft-dark)",
          transition: progress === 0
            ? "none"
            : "width 0.4s cubic-bezier(0.22, 1, 0.36, 1)",
          transformOrigin: "left"
        }}
      />
    </div>
  );
}
