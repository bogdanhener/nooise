"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, useRef } from "react";

const NAV_LINKS = [
  { href: "/about", label: "About" },
  { href: "/events", label: "Events" },
  { href: "/photos", label: "Photos" },
  { href: "/contact", label: "Contact" }
];

export default function TopNav() {
  const pathname = usePathname();
  const [shrunk, setShrunk] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      // Shrink past 80px
      setShrunk(y > 80);
      // Hide on scroll-down past 200, show on scroll-up
      if (y > 200 && y > lastScrollY.current) {
        setHidden(true);
      } else {
        setHidden(false);
      }
      lastScrollY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <nav
      className="desktop-only top-nav"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: shrunk ? "var(--nav-height-shrunk)" : "var(--nav-height)",
        zIndex: 100,
        backdropFilter: "blur(14px) saturate(1.4)",
        WebkitBackdropFilter: "blur(14px) saturate(1.4)",
        background: shrunk ? "rgba(255,255,255,0.78)" : "rgba(255,255,255,0.6)",
        borderBottom: shrunk ? "1px solid var(--line)" : "1px solid transparent",
        transform: hidden ? "translateY(-100%)" : "translateY(0)",
        transition:
          "height 0.4s var(--ease), background 0.3s var(--ease), border-color 0.3s var(--ease), transform 0.4s var(--ease)"
      }}
    >
      <style>{`
        .nav-inner {
          height: 100%;
          max-width: var(--container-max);
          margin: 0 auto;
          padding: 0 var(--container-pad);
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          align-items: center;
          gap: 32px;
        }
        .nav-logo {
          display: flex;
          align-items: center;
          gap: 8px;
          text-decoration: none;
          color: var(--ink);
          font-size: 14px;
          font-weight: 500;
          letter-spacing: -0.01em;
          font-family: var(--serif);
          font-style: italic;
        }
        .nav-logo img {
          height: 38px;
          width: auto;
          display: block;
          transition: height 0.4s var(--ease);
        }
        .nav-links {
          display: flex;
          gap: 36px;
          justify-content: center;
        }
        .nav-link {
          position: relative;
          font-size: 12px;
          font-weight: 500;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: var(--ink-soft);
          text-decoration: none;
          padding: 6px 0;
          transition: color 0.3s var(--ease);
        }
        .nav-link:hover {
          color: var(--ink);
        }
        .nav-link::after {
          content: "";
          position: absolute;
          left: 0;
          bottom: 0;
          height: 1px;
          width: 100%;
          background: var(--ink);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.4s var(--ease);
        }
        .nav-link:hover::after,
        .nav-link.active::after {
          transform: scaleX(1);
        }
        .nav-link.active {
          color: var(--ink);
        }
        .nav-link.active::before {
          content: "";
          position: absolute;
          left: -10px;
          top: 50%;
          transform: translateY(-50%);
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: var(--ink);
        }
        .nav-right {
          display: flex;
          justify-content: flex-end;
          align-items: center;
          gap: 16px;
        }
        .nav-insta {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.04em;
          color: var(--ink-soft);
          text-decoration: none;
          transition: color 0.3s var(--ease);
        }
        .nav-insta:hover { color: var(--ink); }
      `}</style>

      <div className="nav-inner">
        <Link href="/" className="nav-logo">
          <img src="/nooise.svg" alt="nooise" style={{ height: shrunk ? 30 : 38 }} />
        </Link>

        <div className="nav-links">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`nav-link ${isActive(link.href) ? "active" : ""}`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="nav-right">
          <a
            href="https://www.instagram.com/nooise___/"
            target="_blank"
            rel="noopener noreferrer"
            className="nav-insta"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
              <circle cx="12" cy="12" r="4"/>
              <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none"/>
            </svg>
            <span>@nooise___</span>
          </a>
        </div>
      </div>
    </nav>
  );
}