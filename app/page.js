"use client";

import Link from "next/link";

export default function Home() {
  return (
    <div style={styles.page}>

      {/* HERO CENTER LOGO */}
      <div style={styles.hero}>

        <div style={styles.glowWrapper}>
          <h1 style={styles.logo}>NOOISE</h1>
          <div style={styles.glowPulse} />
        </div>

        <p style={styles.tagline}>
          Events. Energy. Moments.
        </p>

      </div>

      {/* ACTION CARDS */}
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
  );
}

/* ================= STYLES ================= */

const styles = {
  page: {
    minHeight: "100vh",
    background: "#05050a",
    color: "white",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
    fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif"
  },

  /* HERO */
  hero: {
    textAlign: "center",
    marginBottom: 50
  },

  glowWrapper: {
    position: "relative",
    display: "inline-block"
  },

  logo: {
    fontSize: 44,
    fontWeight: 800,
    letterSpacing: 6,
    color: "white",
    position: "relative",
    zIndex: 2,
    animation: "fadeGold 2.5s ease-in-out forwards"
  },

  /* GOLD GLOW PULSE */
  glowPulse: {
    position: "absolute",
    top: "50%",
    left: "50%",
    width: 10,
    height: 10,
    transform: "translate(-50%, -50%)",
    borderRadius: "50%",
    background: "rgba(255, 215, 120, 0.9)",
    filter: "blur(20px)",
    animation: "pulseGlow 3s ease-in-out infinite"
  },

  tagline: {
    marginTop: 14,
    opacity: 0.6,
    fontSize: 14,
    letterSpacing: 1
  },

  /* CARDS */
  container: {
    width: "100%",
    maxWidth: 420,
    display: "flex",
    flexDirection: "column",
    gap: 12
  },

  cardPrimary: {
    padding: 18,
    borderRadius: 16,
    background: "linear-gradient(135deg, #7c3aed, #ec4899, #f97316)",
    color: "white",
    boxShadow: "0 0 20px rgba(255, 180, 80, 0.15)"
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