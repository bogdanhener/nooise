"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [enter, setEnter] = useState(false);

  useEffect(() => {
    document.body.style.margin = "0";
    document.body.style.padding = "0";
    document.body.style.background = "#05050a";
    const t = setTimeout(() => setEnter(true), 2400);
    return () => clearTimeout(t);
  }, []);

  return (
    <div style={styles.page}>

      {/* INTRO */}
      {!enter && (
        <div style={styles.intro}>
          <h1 style={styles.logoIntro}>nooise</h1>
          <div style={styles.introGlow} />
        </div>
      )}

      {/* MAIN */}
      {enter && (
        <div style={styles.main}>

          {/* HERO */}
          <div style={styles.hero}>
            <h1 style={styles.logo}>nooise</h1>
            <p style={styles.tagline}>Events. Energy. Moments.</p>
          </div>

          {/* ACTIONS */}
          <div style={styles.container}>

            {/* FIND PHOTOS */}
            <Link href="/photos" style={styles.linkFix}>
              <div style={styles.cardPrimary}>
                <div style={styles.cardRow}>
                  <div>
                    <h2 style={styles.cardTitle}>Find Your Photos</h2>
                    <p style={styles.cardText}>Relive your event moments</p>
                  </div>
                  <span style={styles.cardArrow}>→</span>
                </div>
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

                <div style={styles.eventTopRow}>
                  <span style={styles.eventBadge}>Next Event</span>
                  <span style={styles.ticket}>Tickets →</span>
                </div>

                <h3 style={styles.eventName}>NOOISE x Crama Thesaurus</h3>
                <p style={styles.eventSubtitle}>Winery Session</p>

                <div style={styles.eventMeta}>
                  <span style={styles.eventMetaItem}>📅 9 mai 2026</span>
                  <span style={styles.eventMetaItem}>🕓 16:00 – 23:00</span>
                </div>
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

const styles = {
  page: {
    minHeight: "100dvh",
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
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
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
    margin: 0,
    textShadow: "0 0 15px rgba(255,215,120,0.8), 0 0 40px rgba(255,180,60,0.5)"
  },

  introGlow: {
    position: "absolute",
    width: 140,
    height: 140,
    borderRadius: "50%",
    background: "rgba(255,210,120,0.7)",
    filter: "blur(60px)",
    zIndex: -1
  },

  /* MAIN */
  main: {
    width: "100%",
    minHeight: "100dvh"
  },

  hero: {
    textAlign: "center",
    paddingTop: 80,
    marginBottom: 40
  },

  logo: {
    fontSize: 44,
    fontWeight: 800,
    letterSpacing: 6,
    color: "#ffcf6a",
    margin: 0,
    textShadow: "0 0 15px rgba(255,215,120,0.8), 0 0 45px rgba(255,180,60,0.4)"
  },

  tagline: {
    marginTop: 12,
    opacity: 0.6,
    fontSize: 13,
    color: "#f3e2b3",
    letterSpacing: 1
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

  /* PHOTOS CARD */
  cardPrimary: {
    padding: "18px 20px",
    borderRadius: 18,
    background: "linear-gradient(135deg, #7c3aed, #ec4899, #f97316)",
    color: "white",
    boxShadow: "0 8px 32px rgba(236,72,153,0.25)"
  },

  cardRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between"
  },

  cardTitle: {
    fontSize: 17,
    fontWeight: 700,
    margin: 0,
    color: "white"
  },

  cardText: {
    fontSize: 13,
    opacity: 0.85,
    marginTop: 3,
    color: "white"
  },

  cardArrow: {
    fontSize: 20,
    opacity: 0.8
  },

  /* EVENT CARD */
  eventCard: {
    padding: "18px 20px",
    borderRadius: 18,
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,215,120,0.2)",
    position: "relative",
    overflow: "hidden",
    boxShadow: "0 8px 32px rgba(0,0,0,0.3)"
  },

  eventGlow: {
    position: "absolute",
    width: 180,
    height: 180,
    top: -60,
    right: -60,
    background: "rgba(255,200,100,0.2)",
    filter: "blur(50px)",
    pointerEvents: "none"
  },

  eventTopRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
    position: "relative"
  },

  eventBadge: {
    fontSize: 11,
    letterSpacing: 2,
    textTransform: "uppercase",
    color: "#ffcf6a",
    fontWeight: 600,
    background: "rgba(255,207,106,0.12)",
    padding: "3px 8px",
    borderRadius: 6,
    border: "1px solid rgba(255,207,106,0.25)"
  },

  ticket: {
    fontSize: 12,
    color: "#ffcf6a",
    fontWeight: 600,
    position: "relative"
  },

  eventName: {
    fontSize: 17,
    fontWeight: 700,
    color: "white",
    margin: 0,
    position: "relative"
  },

  eventSubtitle: {
    fontSize: 13,
    marginTop: 4,
    opacity: 0.7,
    color: "white",
    position: "relative"
  },

  eventMeta: {
    display: "flex",
    gap: 14,
    marginTop: 12,
    position: "relative"
  },

  eventMetaItem: {
    fontSize: 12,
    opacity: 0.6,
    color: "white"
  },

  /* FOOTER */
  footer: {
    marginTop: 50,
    textAlign: "center",
    paddingBottom: 40
  },

  footerText: {
    fontSize: 12,
    opacity: 0.4
  },

  footerLink: {
    color: "#ffcf6a",
    textDecoration: "none",
    fontWeight: 600,
    opacity: 1
  }
};