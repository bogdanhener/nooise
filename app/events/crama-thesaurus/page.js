"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function CramaThesaurusPage() {

  useEffect(() => {
    document.body.style.margin = "0";
    document.body.style.padding = "0";
    document.body.style.background = "#ffffff";
  }, []);

  return (
    <div style={styles.page}>

      <style>{`@keyframes pulse { 0%, 100% { opacity: 0.5; } 50% { opacity: 1; } }`}</style>

      {/* BACK */}
      <Link href="/" style={styles.backLink}>← nooise</Link>

      {/* POSTER */}
      <div style={styles.posterWrap}>
        <img
          src="/img/nooise_crama.jpg"
          alt="NOOISE x Crama Thesaurus"
          style={styles.poster}
        />
        <div style={styles.posterFade} />
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

        {/* INFO BOXES */}
        <div style={styles.infoBox}>
          <p style={styles.infoTitle}>🎟 First 50 tickets — FREE</p>
          <p style={styles.infoText}>
            After that, tickets will be available for purchase at livetickets.ro
          </p>
        </div>

        <div style={styles.infoBox}>
          <p style={styles.infoTitle}>🚌 Transport available</p>
          <p style={styles.infoText}>Timișoara → Buziaș → return · Details soon</p>
        </div>

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
    background: "#ffffff",
    minHeight: "100dvh",
    color: "#111",
    fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif",
    margin: 0,
    paddingBottom: 60
  },
  backLink: {
    color: "#111",
    textDecoration: "none",
    fontSize: 13,
    fontWeight: 600,
    opacity: 0.5,
    display: "inline-block",
    padding: "16px 16px 0"
  },
  posterWrap: {
    position: "relative",
    margin: "16px 16px 0",
    borderRadius: 20,
    overflow: "hidden",
    maxHeight: "62vh",
    boxShadow: "0 4px 24px rgba(0,0,0,0.1)"
  },
  poster: {
    width: "100%",
    display: "block",
    borderRadius: 20,
    objectFit: "cover",
    objectPosition: "top"
  },
  posterFade: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 80,
    background: "linear-gradient(to bottom, transparent, #ffffff)"
  },
  content: {
    padding: "20px 16px 0"
  },
  badge: {
    fontSize: 11,
    letterSpacing: 2,
    textTransform: "uppercase",
    color: "#111",
    fontWeight: 600,
    background: "rgba(0,0,0,0.05)",
    padding: "3px 10px",
    borderRadius: 6,
    border: "1px solid rgba(0,0,0,0.1)",
    display: "inline-block",
    marginBottom: 14,
    animation: "pulse 2.5s ease-in-out infinite"
  },
  title: {
    fontSize: 24,
    fontWeight: 800,
    color: "#111",
    margin: 0,
    lineHeight: 1.3
  },
  divider: {
    height: 1,
    background: "rgba(0,0,0,0.07)",
    margin: "20px 0"
  },
  description: {
    fontSize: 14,
    lineHeight: 1.75,
    color: "#555",
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
    color: "#111",
    margin: 0
  },
  infoBox: {
    marginBottom: 12,
    padding: "12px 14px",
    background: "#f9f9f9",
    borderRadius: 12,
    border: "1px solid rgba(0,0,0,0.06)"
  },
  infoTitle: {
    fontSize: 14,
    fontWeight: 700,
    color: "#111",
    margin: "0 0 4px"
  },
  infoText: {
    fontSize: 13,
    color: "#888",
    margin: 0,
    lineHeight: 1.5
  },
  tablesBox: {
    padding: "14px 16px",
    background: "#f9f9f9",
    borderRadius: 14,
    border: "1px solid rgba(0,0,0,0.06)"
  },
  tablesTitle: {
    fontSize: 14,
    fontWeight: 700,
    color: "#111",
    margin: "0 0 6px"
  },
  tablesText: {
    fontSize: 13,
    color: "#888",
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
    color: "#111",
    background: "rgba(0,0,0,0.05)",
    border: "1px solid rgba(0,0,0,0.1)",
    borderRadius: 8,
    padding: "4px 10px"
  },
  tablesNote: {
    fontSize: 12,
    color: "#aaa",
    margin: 0
  },
  cta: {
    fontSize: 15,
    fontWeight: 700,
    color: "#111",
    textAlign: "center",
    marginBottom: 20,
    lineHeight: 1.5
  },
  ticketBtn: {
    display: "block",
    textAlign: "center",
    padding: "16px 20px",
    borderRadius: 16,
    background: "#111",
    color: "#ffffff",
    fontWeight: 700,
    fontSize: 15,
    textDecoration: "none",
    boxShadow: "0 4px 20px rgba(0,0,0,0.15)"
  },
  ticketNote: {
    textAlign: "center",
    fontSize: 12,
    color: "#bbb",
    marginTop: 10
  }
};