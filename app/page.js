"use client";

import Link from "next/link";

export default function Home() {
  return (
    <div style={styles.page}>

      {/* HERO */}
      <div style={styles.hero}>
        <h1 style={styles.title}>NOOISE</h1>
        <p style={styles.subtitle}>
          Events. Energy. Moments.
        </p>
      </div>

      {/* NAV CARDS */}
      <div style={styles.grid}>

        <Link href="/photos" style={styles.card}>
          <h2 style={styles.cardTitle}>Find Your Photos</h2>
          <p style={styles.cardText}>Relive your event moments</p>
        </Link>

        <div style={styles.card}>
          <h2 style={styles.cardTitle}>Next Event</h2>
          <p style={styles.cardText}>LiveTickets coming soon</p>
        </div>

      </div>

    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#05050a",
    color: "white",
    padding: "20px"
  },

  hero: {
    marginBottom: 30
  },

  title: {
    fontSize: 34,
    fontWeight: 800,
    letterSpacing: 2
  },

  subtitle: {
    opacity: 0.6,
    marginTop: 6
  },

  grid: {
    display: "flex",
    flexDirection: "column",
    gap: 12
  },

  card: {
    padding: 18,
    borderRadius: 16,
    background: "linear-gradient(135deg,#7c3aed,#ec4899,#f97316)",
    textDecoration: "none",
    color: "white"
  },

  cardTitle: {
    fontSize: 18,
    fontWeight: 700
  },

  cardText: {
    fontSize: 12,
    opacity: 0.8,
    marginTop: 4
  }
};