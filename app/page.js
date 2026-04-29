"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [enter, setEnter] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setEnter(true), 2400);
    return () => clearTimeout(t);
  }, []);

  return (
    <div style={styles.page}>

      {/* INTRO */}
      {!enter && (
        <div style={styles.intro}>
          <h1 style={styles.logoIntro}>NOOISE</h1>
          <div style={styles.introGlow} />
        </div>
      )}

      {/* MAIN */}
      {enter && (
        <div style={styles.main}>

          <div style={styles.hero}>
            <h1 style={styles.logo}>NOOISE</h1>
            <p style={styles.tagline}>
              Events. Energy. Moments.
            </p>
          </div>

          <div style={styles.container}>

            <Link href="/photos" style={styles.linkFix}>
              <div style={styles.cardPrimary}>
                <h2 style={styles.cardTitle}>Find Your Photos</h2>
                <p style={styles.cardText}>Relive your event moments</p>
              </div>
            </Link>

            <div style={styles.cardSecondary}>
              <h2 style={styles.cardTitle}>Next Event</h2>
              <p style={styles.cardText}>Coming soon</p>
            </div>

          </div>

        </div>
      )}

    </div>
  );
}

/* ================= STYLES ================= */

const styles = {
  page: {
    minHeight: "100vh",
    background: "#05050a",
    color: "white",
    fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif",

    /* ✅ FIX SCROLL ISSUE */
    overflowX: "hidden"
  },

  /* ================= INTRO ================= */

  intro: {
    position: "fixed",
    inset: 0,
    background: "#05050a",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    zIndex: 999
  },

  logoIntro: {
    fontSize: 50,
    fontWeight: 800,
    letterSpacing: 8,
    color: "#ffcf6a",

    /* SAME GLOW AS MAIN LOGO */
    textShadow:
      "0 0 15px rgba(255, 215, 120, 0.8), 0 0 40px rgba(255, 180, 60, 0.5)",

    animation: "introPulse 2.2s ease-in-out"
  },

  introGlow: {
    position: "absolute",
    width: 140,
    height: 140,
    borderRadius: "50%",
    background: "rgba(255, 210, 120, 0.7)",
    filter: "blur(60px)",
    animation: "introGlowAnim 2.2s ease-in-out"
  },

  /* ================= MAIN ================= */

  main: {
    width: "100%",
    minHeight: "100vh"
  },

  hero: {
    textAlign: "center",
    paddingTop: 80,
    marginBottom: 50
  },

  logo: {
    fontSize: 44,
    fontWeight: 800,
    letterSpacing: 6,
    color: "#ffcf6a",
    textShadow:
      "0 0 15px rgba(255, 215, 120, 0.8), 0 0 45px rgba(255, 180, 60, 0.4)"
  },

  tagline: {
    marginTop: 14,
    opacity: 0.7,
    fontSize: 14,
    color: "#f3e2b3"
  },

  /* ✅ FIX HORIZONTAL OVERFLOW ROOT CAUSE */
  container: {
    width: "100%",
    maxWidth: 420,
    margin: "0 auto",
    padding: "0 16px",

    display: "flex",
    flexDirection: "column",
    gap: 12,

    boxSizing: "border-box"
  },

  /* FIX LINK BEHAVIOR */
  linkFix: {
    textDecoration: "none",
    width: "100%"
  },

  cardPrimary: {
    padding: 18,
    borderRadius: 16,
    background: "linear-gradient(135deg, #7c3aed, #ec4899, #f97316)",
    color: "white",
    boxShadow: "0 0 25px rgba(255, 200, 100, 0.15)",
    width: "100%",
    boxSizing: "border-box"
  },

  cardSecondary: {
    padding: 18,
    borderRadius: 16,
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.08)",
    width: "100%",
    boxSizing: "border-box"
  },

  cardTitle: {
    fontSize: 16,
    fontWeight: 700
  },

  cardText: {
    fontSize: 12,
    opacity: 0.7,
    marginTop: 4
  }
};