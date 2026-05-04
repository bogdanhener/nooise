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

      <style>{`
        @keyframes pulse { 0%, 100% { opacity: 0.4; } 50% { opacity: 1; } }
        @keyframes fadeIn { from { opacity:0; transform: translateY(8px); } to { opacity:1; transform: translateY(0); } }
      `}</style>

      {/* TOP BAR */}
      <div style={styles.topBar}>
        <Link href="/" style={styles.backLink}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 5l-7 7 7 7"/>
          </svg>
          <span style={styles.backLabel}>nooise</span>
        </Link>
      </div>

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
        <div style={styles.badgeRow}>
          <span style={styles.badge}>
            <span style={styles.pulseDot} />
            Upcoming Event
          </span>
        </div>

        {/* TITLE */}
        <h1 style={styles.title}>NOOISE: Winery Session 🍷</h1>

        {/* DIVIDER */}
        <div style={styles.divider} />

        {/* DESCRIPTION */}
        <p style={styles.description}>We're not stopping. We're just taking it somewhere else.</p>
        <p style={styles.description}>
          On May 9, we leave the city behind and head to Crama Thesaurus — a place you already know.
          Same idea. Different setting. Even better energy.
        </p>
        <p style={styles.description}>Sunset, music and a different kind of experience. This one will be special.</p>

        {/* DIVIDER */}
        <div style={styles.divider} />

        {/* DETAILS */}
        <div style={styles.details}>

          <div style={styles.detailRow}>
            <div style={styles.detailIconWrap}>
              <span>📍</span>
            </div>
            <div style={styles.detailTextWrap}>
              <p style={styles.detailLabel}>Location</p>
              <p style={styles.detailValue}>Crama Thesaurus Wines</p>
              <a
                href="https://maps.google.com/?q=Crama+Thesaurus+Recas+Romania"
                target="_blank"
                rel="noopener noreferrer"
                style={styles.mapLink}
              >
                Open in Maps →
              </a>
            </div>
          </div>

          <div style={styles.detailRow}>
            <div style={styles.detailIconWrap}><span>📅</span></div>
            <div style={styles.detailTextWrap}>
              <p style={styles.detailLabel}>Date</p>
              <p style={styles.detailValue}>May 9, 2026 · Saturday</p>
            </div>
          </div>

          <div style={styles.detailRow}>
            <div style={styles.detailIconWrap}><span>🕑</span></div>
            <div style={styles.detailTextWrap}>
              <p style={styles.detailLabel}>Time</p>
              <p style={styles.detailValue}>Starting at 16:00</p>
            </div>
          </div>

          <div style={styles.detailRow}>
            <div style={styles.detailIconWrap}><span>📞</span></div>
            <div style={styles.detailTextWrap}>
              <p style={styles.detailLabel}>Contact</p>
              <a href="tel:0750232421" style={styles.phoneLink}>0750 232 421</a>
            </div>
          </div>

        </div>

        {/* DIVIDER */}
        <div style={styles.divider} />

        {/* TICKETS — highlighted */}
        <div style={styles.ticketsHighlight}>
          <div style={styles.ticketsLeft}>
            <p style={styles.ticketsTitle}>🎟 First 50 tickets</p>
            <p style={styles.ticketsFree}>FREE</p>
            <p style={styles.ticketsAfter}>After that — available at livetickets.ro</p>
          </div>
        </div>

        {/* INFO BOXES */}
        <div style={styles.infoGrid}>

          <div style={styles.infoBox}>
            <p style={styles.infoTitle}>🚌 Transport</p>
            <p style={styles.infoText}>Timișoara → Buziaș → return · Details soon</p>
          </div>

          <div style={styles.infoBox}>
            <p style={styles.infoTitle}>🔞 18+ only</p>
            <p style={styles.infoText}>Door reserves the right to select guests</p>
          </div>

        </div>

        {/* DIVIDER */}
        <div style={styles.divider} />

        {/* TABLES */}
        <div style={styles.tablesBox}>
          <p style={styles.tablesTitle}>🎟️ Table Reservations</p>
          <p style={styles.tablesText}>Limited tables available by prior reservation only:</p>
          <div style={styles.tableTypes}>
            <span style={styles.tableTag}>Backstage Tables</span>
            <span style={styles.tableTag}>Regular Tables</span>
          </div>
          <a href="tel:0750232421" style={styles.reserveBtn}>
            Call to Reserve · 0750 232 421
          </a>
        </div>

        {/* DIVIDER */}
        <div style={styles.divider} />

        {/* CTA */}
        <p style={styles.cta}>Get your ticket, bring your crew, and let's make NOOISE.</p>

        {/* BUY TICKETS */}
        <a
          href="https://www.livetickets.ro/bilete/nooise-x-crama-thesaurus-winery-session"
          target="_blank"
          rel="noopener noreferrer"
          style={styles.ticketBtn}
        >
          🎟 Buy Tickets · livetickets.ro
        </a>

        <p style={styles.ticketNote}>Limited capacity · Grab yours before it sells out</p>

        {/* INSTAGRAM */}
        <div style={styles.instaWrap}>
          <a
            href="https://www.instagram.com/nooise___/"
            target="_blank"
            rel="noopener noreferrer"
            style={styles.instaLink}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
              <circle cx="12" cy="12" r="4"/>
              <circle cx="17.5" cy="6.5" r="0.8" fill="#aaa" stroke="none"/>
            </svg>
            <span>Follow @nooise___</span>
          </a>
        </div>

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
  topBar: {
    display: "flex",
    alignItems: "center",
    padding: "16px 20px 0"
  },
  backLink: {
    display: "flex",
    alignItems: "center",
    gap: 6,
    textDecoration: "none",
    color: "#111"
  },
  backLabel: {
    fontSize: 13,
    fontWeight: 600,
    opacity: 0.5
  },
  posterWrap: {
    position: "relative",
    margin: "14px 16px 0",
    borderRadius: 20,
    overflow: "hidden",
    maxHeight: "62vh",
    boxShadow: "0 4px 30px rgba(0,0,0,0.12)"
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
    padding: "16px 20px 0",
    animation: "fadeIn 0.4s ease"
  },
  badgeRow: {
    marginBottom: 12
  },
  badge: {
    fontSize: 11,
    letterSpacing: 1.5,
    textTransform: "uppercase",
    color: "#111",
    fontWeight: 600,
    background: "#f5f5f5",
    padding: "4px 10px",
    borderRadius: 20,
    border: "1px solid rgba(0,0,0,0.08)",
    display: "inline-flex",
    alignItems: "center",
    gap: 6
  },
  pulseDot: {
    display: "inline-block",
    width: 6,
    height: 6,
    borderRadius: "50%",
    background: "#4ade80",
    animation: "pulse 2s ease-in-out infinite"
  },
  title: {
    fontSize: 26,
    fontWeight: 800,
    color: "#111",
    margin: 0,
    lineHeight: 1.25,
    letterSpacing: -0.5
  },
  divider: {
    height: 1,
    background: "rgba(0,0,0,0.06)",
    margin: "20px 0"
  },
  description: {
    fontSize: 14,
    lineHeight: 1.75,
    color: "#666",
    margin: "0 0 10px"
  },
  details: {
    display: "flex",
    flexDirection: "column",
    gap: 16
  },
  detailRow: {
    display: "flex",
    alignItems: "flex-start",
    gap: 12
  },
  detailIconWrap: {
    width: 36,
    height: 36,
    background: "#f5f5f5",
    borderRadius: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 16,
    flexShrink: 0
  },
  detailTextWrap: {
    flex: 1
  },
  detailLabel: {
    fontSize: 11,
    color: "#aaa",
    textTransform: "uppercase",
    letterSpacing: 1,
    margin: "0 0 2px"
  },
  detailValue: {
    fontSize: 15,
    fontWeight: 600,
    color: "#111",
    margin: 0
  },
  mapLink: {
    fontSize: 12,
    color: "#555",
    textDecoration: "none",
    fontWeight: 600,
    display: "inline-block",
    marginTop: 4,
    borderBottom: "1px solid rgba(0,0,0,0.15)"
  },
  phoneLink: {
    fontSize: 15,
    fontWeight: 600,
    color: "#111",
    textDecoration: "none"
  },

  /* TICKETS HIGHLIGHT */
  ticketsHighlight: {
    background: "#111",
    borderRadius: 18,
    padding: "18px 20px",
    marginBottom: 12
  },
  ticketsLeft: {},
  ticketsTitle: {
    fontSize: 13,
    color: "rgba(255,255,255,0.6)",
    margin: "0 0 4px"
  },
  ticketsFree: {
    fontSize: 32,
    fontWeight: 800,
    color: "#ffffff",
    margin: "0 0 4px",
    letterSpacing: -1
  },
  ticketsAfter: {
    fontSize: 12,
    color: "rgba(255,255,255,0.4)",
    margin: 0
  },

  /* INFO GRID */
  infoGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 10
  },
  infoBox: {
    padding: "12px 14px",
    background: "#f7f7f7",
    borderRadius: 14,
    border: "1px solid rgba(0,0,0,0.05)"
  },
  infoTitle: {
    fontSize: 13,
    fontWeight: 700,
    color: "#111",
    margin: "0 0 4px"
  },
  infoText: {
    fontSize: 12,
    color: "#999",
    margin: 0,
    lineHeight: 1.5
  },

  /* TABLES */
  tablesBox: {
    padding: "16px 18px",
    background: "#f7f7f7",
    borderRadius: 16,
    border: "1px solid rgba(0,0,0,0.05)"
  },
  tablesTitle: {
    fontSize: 15,
    fontWeight: 700,
    color: "#111",
    margin: "0 0 6px"
  },
  tablesText: {
    fontSize: 13,
    color: "#888",
    margin: "0 0 12px"
  },
  tableTypes: {
    display: "flex",
    gap: 8,
    marginBottom: 14
  },
  tableTag: {
    fontSize: 12,
    fontWeight: 600,
    color: "#111",
    background: "#ffffff",
    border: "1px solid rgba(0,0,0,0.1)",
    borderRadius: 20,
    padding: "4px 12px"
  },
  reserveBtn: {
    display: "block",
    textAlign: "center",
    padding: "12px",
    borderRadius: 12,
    background: "white",
    border: "1px solid rgba(0,0,0,0.1)",
    color: "#111",
    fontWeight: 700,
    fontSize: 13,
    textDecoration: "none"
  },

  cta: {
    fontSize: 15,
    fontWeight: 700,
    color: "#111",
    textAlign: "center",
    marginBottom: 16,
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
    color: "#ccc",
    marginTop: 10
  },
  instaWrap: {
    display: "flex",
    justifyContent: "center",
    marginTop: 24
  },
  instaLink: {
    display: "flex",
    alignItems: "center",
    gap: 6,
    textDecoration: "none",
    color: "#aaa",
    fontSize: 13
  }
};