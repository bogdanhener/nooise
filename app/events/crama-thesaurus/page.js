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

      {/* POSTER — capped height so content peeks below */}
      <div style={styles.posterWrap}>
        <img
          src="/img/nooise_crama.jpg"
          alt="NOOISE x Crama Thesaurus"
          style={styles.poster}
        />
        <div style={styles.posterFade} />
        <div style={styles.posterGlow} />
      </div>

      {/* CONTENT */}
      <div style={styles.content}>

        {/* BADGE */}
        <span style={styles.badge}>Upcoming Event</span>

        {/* TITLE */}
        <h1 style={styles.title}>NOOISE: Winery Session 🍷</h1>

        {/* DIVIDER */}
        <div style={styles.divider} />

        {/* DESCRIPTION */}
        <p style={styles.description}>
          We're not stopping. We're just taking it somewhere else.
        </p>
        <p style={styles.description}>
          On May 9, we leave the city behind and head to Crama Thesaurus — a place you already know.
          Same idea. Different setting. Even better energy.
        </p>
        <p style={styles.description}>
          Sunset, music and a different kind of experience. This one will be special.
        </p>

        {/* DIVIDER */}
        <div style={styles.divider} />

        {/* QUICK DETAILS */}
        <div style={styles.details}>

          <div style={styles.detailRow}>
            <span style={styles.detailIcon}>📍</span>
            <p style={styles.detailText}>Crama Thesaurus Wines</p>
          </div>

          <div style={styles.detailRow}>
            <span style={styles.detailIcon}>📅</span>
            <p style={styles.detailText}>May 9, 2026</p>
          </div>

          <div style={styles.detailRow}>
            <span style={styles.detailIcon}>🕑</span>
            <p style={styles.detailText}>Starting at 16:00</p>
          </div>

          <div style={styles.detailRow}>
            <span style={styles.detailIcon}>📞</span>
            <p style={styles.detailText}>0750 232 421</p>
          </div>

        </div>

        {/* DIVIDER */}
        <div style={styles.divider} />

        {/* TICKETS INFO */}
        <div style={styles.infoBox}>
          <p style={styles.infoTitle}>🎟 First 50 tickets — FREE</p>
          <p style={styles.infoText}>
            After that, tickets will be available for purchase at livetickets.ro
          </p>
        </div>

        {/* TRANSPORT */}
        <div style={styles.infoBox}>
          <p style={styles.infoTitle}>🚌 Transport available</p>
          <p style={styles.infoText}>Timișoara → Buziaș → return · Details soon</p>
        </div>

        {/* AGE */}
        <div style={styles.infoBox}>
          <p style={styles.infoTitle}>🔞 18+ event</p>
          <p style={styles.infoText}>The door reserves the right to select guests.</p>
        </div>

        {/* DIVIDER */}
        <div style={styles.divider} />

        {/* TABLES */}
        <div style={styles.tablesBox}>
          <p style={styles.tablesTitle}>🎟️ Reservations: 0750 232 421</p>
          <p style={styles.tablesText}>We have a limited number of tables available:</p>
          <div style={styles.tableTypes}>
            <span style={styles.tableTag}>Backstage Tables</span>
            <span style={styles.tableTag}>Regular Tables</span>
          </div>
          <p style={styles.tablesNote}>Tables are limited and available by prior reservation.</p>
        </div>

        {/* DIVIDER */}
        <div style={styles.divider} />

        {/* CTA */}
        <p style={styles.cta}>
          Get your ticket, bring your crew, and let's make NOOISE.
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
    overflow: "hidden",
    maxHeight: "62vh"
  },
  poster: {
    width: "100%",
    display: "block",
    borderRadius: 20,
    objectFit: "cover",
    objectPosition: "top"
  },
  /* fade at the bottom of the poster so content below feels connected */
  posterFade: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 80,
    background: "linear-gradient(to bottom, transparent, #05050a)"
  },
  posterGlow: {
    position: "absolute",
    width: 200,
    height: 200,
    bottom: -60,
    right: -40,
    background: "rgba(255,200,100,0.15)",
    filter: "blur(60px)",
    pointerEvents: "none"
  },
  content: {
    padding: "20px 16px 0"
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
    fontSize: 24,
    fontWeight: 800,
    color: "white",
    margin: 0,
    lineHeight: 1.3
  },
  divider: {
    height: 1,
    background: "rgba(255,215,120,0.1)",
    margin: "20px 0"
  },
  description: {
    fontSize: 14,
    lineHeight: 1.75,
    opacity: 0.75,
    color: "white",
    margin: "0 0 10px"
  },
  details: {
    display: "flex",
    flexDirection: "column",
    gap: 12
  },
  detailRow: {
    display: "flex",
    alignItems: "center",
    gap: 10
  },
  detailIcon: {
    fontSize: 16,
    flexShrink: 0
  },
  detailText: {
    fontSize: 14,
    fontWeight: 600,
    color: "white",
    margin: 0
  },
  infoBox: {
    marginBottom: 12,
    padding: "12px 14px",
    background: "rgba(255,255,255,0.03)",
    borderRadius: 12,
    border: "1px solid rgba(255,215,120,0.08)"
  },
  infoTitle: {
    fontSize: 14,
    fontWeight: 700,
    color: "white",
    margin: "0 0 4px"
  },
  infoText: {
    fontSize: 13,
    opacity: 0.6,
    margin: 0,
    lineHeight: 1.5
  },
  tablesBox: {
    padding: "14px 16px",
    background: "rgba(255,207,106,0.05)",
    borderRadius: 14,
    border: "1px solid rgba(255,207,106,0.15)"
  },
  tablesTitle: {
    fontSize: 14,
    fontWeight: 700,
    color: "#ffcf6a",
    margin: "0 0 6px"
  },
  tablesText: {
    fontSize: 13,
    opacity: 0.7,
    margin: "0 0 10px"
  },
  tableTypes: {
    display: "flex",
    gap: 8,
    marginBottom: 10
  },
  tableTag: {
    fontSize: 12,
    fontWeight: 600,
    color: "#ffcf6a",
    background: "rgba(255,207,106,0.1)",
    border: "1px solid rgba(255,207,106,0.25)",
    borderRadius: 8,
    padding: "4px 10px"
  },
  tablesNote: {
    fontSize: 12,
    opacity: 0.5,
    margin: 0
  },
  cta: {
    fontSize: 15,
    fontWeight: 700,
    color: "white",
    textAlign: "center",
    marginBottom: 20,
    lineHeight: 1.5
  },
  ticketBtn: {
    display: "block",
    textAlign: "center",
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