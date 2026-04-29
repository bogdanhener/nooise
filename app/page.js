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

          {/* ACTIONS */}
          <div style={styles.container}>

            {/* FIND PHOTOS */}
            <Link href="/photos" style={styles.linkFix}>
              <div style={styles.cardPrimary}>
                <h2 style={styles.cardTitle}>Find Your Photos</h2>
                <p style={styles.cardText}>Relive your event moments</p>
              </div>
            </Link>

            {/* NEXT EVENT */}
            <a
              href="https://www.livetickets.ro/bilete/nooise-x-crama-thesaurus-winery-session"
              target="_blank"
              rel="noopener noreferrer"
              style={styles.linkFix}
            >
              <div style={styles.eventCard}>

                <div style={styles.eventGlow} />

                {/* ⭐ FIXED TITLE */}
                <h2 style={styles.eventTitle}>
                  Next Event
                </h2>

                <h3 style={styles.cardTitle}>
                  NOOISE x Crama Thesaurus
                </h3>

                <p style={styles.eventSubtitle}>
                  Winery Session
                </p>

                <p style={styles.eventDate}>
                  sâmbătă, 9 mai 2026 · 16:00 – 23:00
                </p>

                <p style={styles.ticket}>
                  Tickets → livetickets.ro
                </p>

              </div>
            </a>

          </div>

          {/* FOOTER */}
          <div style={styles.footer}>
            <p style={styles.footerText}>
              2026 © Nooise ·{" "}
              <a
                href="https://www.instagram.com/bogdanhener/"
                target="_blank"
                rel="noopener noreferrer"
                style={styles.footerLink}
              >
                designed by bogdanhener
              </a>
            </p>
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
    overflowX: "hidden"
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
    color: "#ffcf6a",
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
      "0 0 15px rgba(255, 215, 120, 0.8), 0 0 45px rgba(255, 180, 60, 0.4)"
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
    padding: "0 16px",
    display: "flex",
    flexDirection: "column",
    gap: 12,
    boxSizing: "border-box"
  },

  linkFix: {
    textDecoration: "none",
    width: "100%",
    color: "inherit"
  },

  /* PRIMARY CARD */
  cardPrimary: {
    padding: 18,
    borderRadius: 16,
    background: "linear-gradient(135deg, #7c3aed, #ec4899, #f97316)",
    color: "white",
    boxShadow: "0 0 25px rgba(255, 200, 100, 0.15)"
  },

  /* EVENT CARD */
  eventCard: {
    padding: 18,
    borderRadius: 16,
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255, 215, 120, 0.25)",
    position: "relative",
    overflow: "hidden",
    boxShadow: "0 0 30px rgba(255, 200, 80, 0.08)",
    color: "white"
  },

  eventGlow: {
    position: "absolute",
    width: 160,
    height: 160,
    top: -40,
    right: -40,
    background: "rgba(255, 200, 100, 0.25)",
    filter: "blur(50px)"
  },

  /* ⭐ FIXED MISSING TITLE */
  eventTitle: {
    fontSize: 12,
    letterSpacing: 2,
    textTransform: "uppercase",
    opacity: 0.7,
    marginBottom: 10,
    color: "#ffcf6a",
    position: "relative"
  },

  cardTitle: {
    fontSize: 16,
    fontWeight: 700,
    position: "relative",
    color: "white"
  },

  eventSubtitle: {
    fontSize: 13,
    marginTop: 4,
    opacity: 0.85,
    position: "relative",
    color: "white"
  },

  eventDate: {
    fontSize: 12,
    marginTop: 8,
    opacity: 0.7,
    position: "relative",
    color: "white"
  },

  ticket: {
    fontSize: 12,
    marginTop: 10,
    color: "#ffcf6a",
    fontWeight: 600,
    position: "relative"
  },

  /* FOOTER */
  footer: {
    marginTop: 50,
    textAlign: "center",
    paddingBottom: 30
  },

  footerText: {
    fontSize: 12,
    opacity: 0.6
  },

  footerLink: {
    color: "#ffcf6a",
    textDecoration: "none",
    fontWeight: 600
  }
};