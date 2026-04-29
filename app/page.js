"use client";

import Link from "next/link";

export default function Home() {
  return (
    <div style={styles.page}>

      {/* HERO */}
      <div style={styles.hero}>

        <h1 style={styles.logo}>NOOISE</h1>

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
    padding: "20px"
  },

  hero: {
    textAlign: "center",
    marginBottom: 50
  },

  /* 🔥 FIXED GOLD LOGO (VISIBLE + ANIMATED) */
  logo: {
    fontSize: 46,
    fontWeight: 800,
    letterSpacing: 6,

    color: "#ffd98a", // base gold (VISIBLE immediately)

    textShadow: `
      0 0 10px rgba(255, 215, 120, 0.8),
      0 0 25px rgba(255, 200, 80, 0.6),
      0 0 45px rgba(255, 180, 60, 0.3)
    `,

    animation: "goldPulse 2.8s ease-in-out infinite"
  },

  tagline: {
    marginTop: 14,
    opacity: 0.7,
    fontSize: 14,
    letterSpacing: 1,
    color: "#f3e2b3"
  },

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
    boxShadow: "0 0 25px rgba(255, 200, 100, 0.15)"
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