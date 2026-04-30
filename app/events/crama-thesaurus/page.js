"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function CramaThesaurusPage() {

  useEffect(() => {
    document.body.style.margin = "0";
    document.body.style.padding = "0";
    document.body.style.background = "#05050a";
  }, []);

  return (
    <div style={styles.page}>

      <style>{`@keyframes pulse { 0%, 100% { opacity: 0.6; } 50% { opacity: 1; } }`}</style>

      {/* BACK */}
      <Link href="/" style={styles.backLink}>← nooise</Link>

      {/* POSTER */}
      <div style={styles.posterWrap}>
        <div style={styles.posterPlaceholder}>
          <p style={styles.posterLabel}>Event Poster</p>
        </div>
        <div style={styles.posterGlow} />
      </div>

      {/* CONTENT */}
      <div style={styles.content}>

        {/* BADGE */}
        <span style={styles.badge}>Upcoming Event</span>

        {/* TITLE */}
        <h1 style={styles.title}>NOOISE x Crama Thesaurus</h1>
        <p style={styles.subtitle}>Winery Session</p>

        {/* DIVIDER */}
        <div style={styles.divider} />

        {/* DETAILS */}
        <div style={styles.details}>

          <div style={styles.detailRow}>
            <span style={styles.detailIcon}>📅</span>
            <div>
              <p style={styles.detailLabel}>Date</p>
              <p style={styles.detailValue}>Sâmbătă, 9 Mai 2026</p>
            </div>
          </div>

          <div style={styles.detailRow}>
            <span style={styles.detailIcon}>🕓</span>
            <div>
              <p style={styles.detailLabel}>Time</p>
              <p style={styles.detailValue}>16:00 – 23:00</p>
            </div>
          </div>

          <div style={styles.detailRow}>
            <span style={styles.detailIcon}>📍</span>
            <div>
              <p style={styles.detailLabel}>Location</p>
              <p style={styles.detailValue}>Crama Thesaurus</p>
              <p style={styles.detailSub}>Recaș, Timiș, Romania</p>
            </div>
          </div>

          <div style={styles.detailRow}>
            <span style={styles.detailIcon}>🎵</span>
            <div>
              <p style={styles.detailLabel}>Vibe</p>
              <p style={styles.detailValue}>Afro · Deep House · Sunset Experience</p>
            </div>
          </div>

        </div>

        {/* DIVIDER */}
        <div style={styles.divider} />

        {/* DESCRIPTION */}
        <p style={styles.description}>
          A unique sunset experience in the heart of the Thesaurus winery. 
          Good music, good wine, good energy — surrounded by vineyards as the sun goes down.
        </p>

        {/* TICKETS BUTTON */}
        <a
          href="https://www.livetickets.ro/bilete/nooise-x-crama-thesaurus-winery-session"
          target="_blank"
          rel="noopener noreferrer"
          style={styles.ticketBtn}
        >
          🎟 Buy Tickets · livetickets.ro
        </a>

        {/* SECONDARY NOTE */}
        <p style={styles.ticketNote}>Limited capacity · Grab yours before it sells out</p>

      </div>

    </div>
  );
}

const styles = {
  page: {
    background: "#05050a",
    minHeight: "100dvh",
    color: "white",
    fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif",
    margin: 0,
    paddingBottom: 60
  },
  backLink: {
    color: "#ffcf6a",
    textDecoration: "none",
    fontSize: 13,
    opacity: 0.8,
    display: "inline-block",
    padding: "16px 16px 0"
  },
  posterWrap: {
    position: "relative",
    margin: "16px 16px 0",
    borderRadius: 20,
    overflow: "hidden"
  },
  posterPlaceholder: {
    width: "100%",
    aspectRatio: "3/4",
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,215,120,0.2)",
    borderRadius: 20,
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  posterLabel: {
    opacity: 0.2,
    fontSize: 13
  },
  posterGlow: {
    position: "absolute",
    width: 200,
    height: 200,
    bottom: -60,
    right: -40,
    background: "rgba(255,200,100,0.2)",
    filter: "blur(60px)",
    pointerEvents: "none"
  },
  content: {
    padding: "24px 16px 0"
  },
  badge: {
    fontSize: 11,
    letterSpacing: 2,
    textTransform: "uppercase",
    color: "#ffcf6a",
    fontWeight: 600,
    background: "rgba(255,207,106,0.12)",
    padding: "3px 10px",
    borderRadius: 6,
    border: "1px solid rgba(255,207,106,0.25)",
    display: "inline-block",
    marginBottom: 14,
    animation: "pulse 2.5s ease-in-out infinite"
  },
  title: {
    fontSize: 26,
    fontWeight: 800,
    color: "white",
    margin: 0,
    lineHeight: 1.2
  },
  subtitle: {
    fontSize: 15,
    opacity: 0.6,
    marginTop: 6,
    color: "white"
  },
  divider: {
    height: 1,
    background: "rgba(255,215,120,0.1)",
    margin: "20px 0"
  },
  details: {
    display: "flex",
    flexDirection: "column",
    gap: 18
  },
  detailRow: {
    display: "flex",
    alignItems: "flex-start",
    gap: 14
  },
  detailIcon: {
    fontSize: 20,
    marginTop: 2,
    flexShrink: 0
  },
  detailLabel: {
    fontSize: 11,
    letterSpacing: 1.5,
    textTransform: "uppercase",
    opacity: 0.4,
    margin: 0,
    marginBottom: 2
  },
  detailValue: {
    fontSize: 15,
    fontWeight: 600,
    color: "white",
    margin: 0
  },
  detailSub: {
    fontSize: 12,
    opacity: 0.5,
    margin: 0,
    marginTop: 2
  },
  description: {
    fontSize: 14,
    lineHeight: 1.7,
    opacity: 0.7,
    color: "white",
    margin: 0
  },
  ticketBtn: {
    display: "block",
    textAlign: "center",
    marginTop: 28,
    padding: "16px 20px",
    borderRadius: 16,
    background: "rgba(255,207,106,0.12)",
    border: "1px solid rgba(255,207,106,0.4)",
    color: "#ffcf6a",
    fontWeight: 700,
    fontSize: 15,
    textDecoration: "none",
    boxShadow: "0 0 30px rgba(255,200,80,0.1)"
  },
  ticketNote: {
    textAlign: "center",
    fontSize: 12,
    opacity: 0.35,
    marginTop: 10
  }
};