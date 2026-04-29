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
          <div style={styles.glow} />
        </div>
      )}

      {/* MAIN CONTENT (FORCED VISIBILITY) */}
      <div style={{
        ...styles.main,
        display: enter ? "block" : "none"
      }}>

        <div style={styles.hero}>
          <h1 style={styles.logo}>NOOISE</h1>
          <p style={styles.tagline}>
            Events. Energy. Moments.
          </p>
        </div>

        <div style={styles.container}>

          <Link href="/photos" style={{ textDecoration: "none" }}>
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
    </div>
  );
}

/* ================= STYLES ================= */

const styles = {
  page: {
    minHeight: "100vh",
    background: "#05050a",
    color: "white",
    fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif"
  },

  /* INTRO */
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
    color: "white",
    animation: "cinematicLogo 2.2s ease-in-out forwards",
    zIndex: 2
  },

  glow: {
    position: "absolute",
    width: 10,
    height: 10,
    borderRadius: "50%",
    background: "rgba(255, 210, 120, 0.9)",
    filter: "blur(40px)",
    animation: "glowBurst 2.2s ease-in-out forwards"
  },

  /* MAIN */
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
      "0 0 20px rgba(255, 215, 120, 0.8), 0 0 50px rgba(255, 180, 60, 0.4)"
  },

  tagline: {
    marginTop: 14,
    opacity: 0.7,
    fontSize: 14,
    color: "#f3e2b3"
  },

  container: {
    width: "100%",
    maxWidth: 420,
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
    gap: 12,
    padding: "0 20px"
  },

  cardPrimary: {
    padding: 18,
    borderRadius: 16,
    background: "linear-gradient(135deg, #7c3aed, #ec4899, #f97316)",
    boxShadow: "0 0 25px rgba(255, 200, 100, 0.15)",
    color: "white"
  },

  cardSecondary: {
    padding: 18,
    borderRadius: 16,
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.08)"
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