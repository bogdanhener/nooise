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

          {/* HERO */}
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

            <div style={styles.eventCard}>

              <h2 style={styles.eventTitle}>
                NOOISE x Crama Thesaurus
              </h2>

              <p style={styles.eventSubtitle}>
                Winery Session
              </p>

              <p style={styles.eventDate}>
                sâmbătă, 9 mai 2026 · 16:00 – 23:00
              </p>

              <a
                href="https://www.livetickets.ro/bilete/nooise-x-crama-thesaurus-winery-session"
                target="_blank"
                rel="noopener noreferrer"
                style={styles.ticketBtn}
              >
                🎟 Tickets
              </a>

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
    width: "100vw",
    background: "#05050a",
    color: "white",
    fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif",
    overflowX: "hidden",
    margin: 0,
    padding: 0
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

  /* ⭐ ONLY LOGO IS HANDWRITING */
  logoIntro: {
    fontSize: 52,
    fontWeight: 600,
    letterSpacing: 4,
    color: "#ffcf6a",
    fontFamily: "cursive",
    textShadow:
      "0 0 15px rgba(255, 215, 120, 0.8), 0 0 40px rgba(255, 180, 60, 0.5)"
  },

  introGlow: {
    position: "absolute",
    width: 140,
    height: 140,
    borderRadius: "50%",
    background: "rgba(255, 210, 120, 0.7)",
    filter: "blur(60px)"
  },

  main: {
    width: "100%",
    minHeight: "100vh"
  },

  hero: {
    textAlign: "center",
    paddingTop: 80,
    marginBottom: 50
  },

  /* ⭐ ONLY LOGO IS HANDWRITING */
  logo: {
    fontSize: 40,
    fontWeight: 600,
    letterSpacing: 5,
    color: "#ffcf6a",
    fontFamily: "cursive",
    textShadow:
      "0 0 15px rgba(255, 215, 120, 0.8), 0 0 45px rgba(255, 180, 60, 0.4)"
  },

  /* NORMAL TEXT */
  tagline: {
    marginTop: 14,
    opacity: 0.7,
    fontSize: 14,
    color: "#f3e2b3",
    fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif"
  },

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

  linkFix: {
    textDecoration: "none",
    color: "inherit"
  },

  cardPrimary: {
    padding: 18,
    borderRadius: 16,
    background: "linear-gradient(135deg, #7c3aed, #ec4899, #f97316)",
    color: "white"
  },

  eventCard: {
    padding: 18,
    borderRadius: 16,
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255, 215, 120, 0.25)"
  },

  eventTitle: {
    fontSize: 16,
    fontWeight: 700,
    color: "#ffcf6a",
    marginBottom: 6
  },

  eventSubtitle: {
    fontSize: 13,
    opacity: 0.85
  },

  eventDate: {
    fontSize: 12,
    opacity: 0.7,
    marginTop: 6
  },

  ticketBtn: {
    display: "inline-block",
    marginTop: 10,
    fontSize: 12,
    color: "#ffcf6a",
    fontWeight: 600,
    textDecoration: "none"
  }
};