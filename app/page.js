"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [enter, setEnter] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setEnter(true), 1100);
    return () => clearTimeout(t);
  }, []);

  return (
    <div style={styles.page}>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes logoIn {
          from { opacity: 0; transform: scale(0.96); }
          to   { opacity: 1; transform: scale(1); }
        }
        @keyframes logoOut {
          from { opacity: 1; transform: scale(1); }
          to   { opacity: 0; transform: scale(1.02); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50%       { opacity: 1; transform: scale(1.15); }
        }
        @keyframes lineGrow {
          from { transform: scaleX(0); }
          to   { transform: scaleX(1); }
        }
        .stagger > * { opacity: 0; animation: fadeUp 0.7s cubic-bezier(0.22, 1, 0.36, 1) forwards; }
        .stagger > *:nth-child(1) { animation-delay: 0.05s; }
        .stagger > *:nth-child(2) { animation-delay: 0.18s; }
        .stagger > *:nth-child(3) { animation-delay: 0.32s; }
        .stagger > *:nth-child(4) { animation-delay: 0.46s; }
        .stagger > *:nth-child(5) { animation-delay: 0.60s; }
        .card { transition: opacity 0.3s cubic-bezier(0.22, 1, 0.36, 1), transform 0.3s cubic-bezier(0.22, 1, 0.36, 1); }
        .card:active { opacity: 0.65; transform: scale(0.995); }
        .arrow-shift { transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1); }
        .card:hover .arrow-shift { transform: translateX(3px); }
      `}</style>

      {/* INTRO */}
      {!enter && (
        <div style={styles.intro}>
          <img src="/nooise.jpg" alt="nooise" style={styles.logoImgIntro} />
        </div>
      )}

      {/* MAIN */}
      {enter && (
        <div style={styles.main} className="stagger">

          {/* TOP BAR */}
          <div style={styles.topBar}>
            <span style={styles.locationTag}>TIMIȘOARA</span>
            <a
              href="https://www.instagram.com/nooise___/"
              target="_blank"
              rel="noopener noreferrer"
              style={styles.instaLink}
            >
              <span style={styles.instaLabel}>@nooise___</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <circle cx="12" cy="12" r="4"/>
                <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none"/>
              </svg>
            </a>
          </div>

          {/* HERO */}
          <div style={styles.hero}>
            <img src="/nooise.jpg" alt="nooise" style={styles.logoImg} />
          </div>

          {/* DIVIDER */}
          <div style={styles.dividerWrap}>
            <div style={styles.divider} />
          </div>

          {/* CARDS */}
          <div style={styles.container}>

            {/* FIND PHOTOS */}
            <Link href="/photos" style={styles.linkFix}>
              <div className="card" style={styles.cardPrimary}>
                <div style={styles.cardRow}>
                  <div>
                    <h2 style={styles.cardTitle}>
                      <span style={styles.serif}>Find</span> your photos
                    </h2>
                    <p style={styles.cardText}>Relive every moment from past nights</p>
                  </div>
                  <div style={styles.cardArrow}>
                    <svg className="arrow-shift" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </div>
                </div>
              </div>
            </Link>

            {/* NEXT EVENT */}
            <Link href="/events/crama-thesaurus" style={styles.linkFix}>
              <div className="card" style={styles.eventCard}>

                <div style={styles.cardLabelRow}>
                  <span style={styles.cardEyebrowAccent}>
                    <span style={styles.pulseDot} />
                    Next Event
                  </span>
                  <a
                    href="https://www.livetickets.ro/bilete/nooise-x-crama-thesaurus-winery-session"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={styles.ticketLink}
                    onClick={(e) => e.stopPropagation()}
                  >
                    Tickets ↗
                  </a>
                </div>

                <h3 style={styles.eventName}>
                  <span style={styles.serif}>nooise</span> × Crama Thesaurus
                </h3>
                <p style={styles.eventSubtitle}>Winery Session</p>

                <div style={styles.eventMeta}>
                  <div style={styles.metaCol}>
                    <span style={styles.metaLabel}>Date</span>
                    <span style={styles.metaValue}>9 May 2026</span>
                  </div>
                  <div style={styles.metaCol}>
                    <span style={styles.metaLabel}>Time</span>
                    <span style={styles.metaValue}>16:00 — 23:00</span>
                  </div>
                </div>

              </div>
            </Link>

          </div>

          {/* FOOTER */}
          <div style={styles.footer}>
            <div style={styles.footerLine} />
            <div style={styles.footerRow}>
              <span style={styles.footerYear}>2026 © nooise</span>
              <a
                href="https://www.instagram.com/bogdanhener/"
                target="_blank"
                rel="noopener noreferrer"
                style={styles.footerCredit}
              >
                Site by bogdanhener
              </a>
            </div>
          </div>

        </div>
      )}

    </div>
  );
}

const styles = {
  page: {
    minHeight: "100dvh",
    background: "var(--paper)",
    color: "var(--ink)",
    fontFamily: "var(--sans)",
    overflowX: "hidden",
    margin: 0,
    padding: 0
  },

  /* INTRO */
  intro: {
    position: "fixed",
    top: 0, left: 0, right: 0, bottom: 0,
    background: "var(--paper)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 999,
    animation: "logoOut 0.4s cubic-bezier(0.22, 1, 0.36, 1) forwards",
    animationDelay: "0.85s"
  },
  logoImgIntro: {
    width: 140,
    animation: "logoIn 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards"
  },

  /* MAIN */
  main: {
    width: "100%",
    minHeight: "100dvh",
    display: "flex",
    flexDirection: "column"
  },

  /* TOP BAR */
  topBar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px 22px 0"
  },
  locationTag: {
    fontSize: 10,
    fontWeight: 500,
    letterSpacing: "0.18em",
    textTransform: "uppercase",
    color: "var(--ink-soft)"
  },
  instaLink: {
    display: "flex",
    alignItems: "center",
    gap: 6,
    textDecoration: "none",
    color: "var(--ink-soft)"
  },
  instaLabel: {
    fontSize: 11,
    fontWeight: 500,
    letterSpacing: "0.04em"
  },

  /* HERO */
  hero: {
    flex: 1,
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 24,
    paddingBottom: 32,
    minHeight: "38vh"
  },
  logoImg: {
    width: 160,
    display: "block",
    margin: "0 auto"
  },
  tagline: {
    marginTop: 28,
    fontSize: 13,
    color: "var(--ink-soft)",
    letterSpacing: "0.04em",
    fontWeight: 400
  },
  serif: {
    fontFamily: "var(--serif)",
    fontWeight: 400,
    letterSpacing: "-0.01em",
    fontStyle: "italic"
  },

  /* DIVIDER */
  dividerWrap: {
    width: "100%",
    maxWidth: 420,
    margin: "0 auto",
    padding: "0 22px",
    boxSizing: "border-box"
  },
  divider: {
    height: 1,
    background: "var(--line)",
    transformOrigin: "center",
    animation: "lineGrow 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards"
  },

  /* CONTAINER */
  container: {
    width: "100%",
    maxWidth: 420,
    margin: "0 auto",
    padding: "32px 22px 0",
    display: "flex",
    flexDirection: "column",
    gap: 14,
    boxSizing: "border-box"
  },
  linkFix: {
    textDecoration: "none",
    width: "100%",
    color: "inherit"
  },

  /* PHOTOS CARD */
  cardPrimary: {
    padding: "20px 22px 22px",
    borderRadius: 14,
    background: "transparent",
    border: "1px solid var(--line)",
    cursor: "pointer"
  },
  cardLabelRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14
  },
  cardEyebrow: {
    fontSize: 10,
    fontWeight: 500,
    letterSpacing: "0.18em",
    textTransform: "uppercase",
    color: "var(--ink-mute)"
  },
  cardEyebrowAccent: {
    fontSize: 10,
    fontWeight: 500,
    letterSpacing: "0.18em",
    textTransform: "uppercase",
    color: "var(--ink)",
    display: "flex",
    alignItems: "center",
    gap: 8
  },
  cardRow: {
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "space-between",
    gap: 16
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: 500,
    margin: 0,
    color: "var(--ink)",
    letterSpacing: "-0.02em",
    lineHeight: 1.1
  },
  cardText: {
    fontSize: 12,
    color: "var(--ink-mute)",
    marginTop: 6,
    margin: "6px 0 0"
  },
  cardArrow: {
    width: 36,
    height: 36,
    borderRadius: "50%",
    border: "1px solid var(--line)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    color: "var(--ink)"
  },

  /* EVENT CARD */
  eventCard: {
    padding: "20px 22px 22px",
    borderRadius: 14,
    background: "var(--soft-dark)",
    color: "var(--soft-dark-text)",
    cursor: "pointer"
  },
  pulseDot: {
    display: "inline-block",
    width: 6,
    height: 6,
    borderRadius: "50%",
    background: "var(--accent)",
    animation: "pulse 2s ease-in-out infinite"
  },
  ticketLink: {
    fontSize: 11,
    color: "rgba(245,243,239,0.7)",
    fontWeight: 500,
    letterSpacing: "0.04em",
    textDecoration: "none",
    zIndex: 10
  },
  eventName: {
    fontSize: 22,
    fontWeight: 500,
    color: "var(--soft-dark-text)",
    margin: 0,
    letterSpacing: "-0.02em",
    lineHeight: 1.15
  },
  eventSubtitle: {
    fontSize: 13,
    color: "rgba(245,243,239,0.55)",
    marginTop: 4,
    margin: "4px 0 0",
    fontStyle: "italic",
    fontFamily: "var(--serif)"
  },
  eventMeta: {
    display: "flex",
    gap: 28,
    marginTop: 18,
    paddingTop: 14,
    borderTop: "1px solid rgba(245,243,239,0.12)"
  },
  metaCol: {
    display: "flex",
    flexDirection: "column",
    gap: 3
  },
  metaLabel: {
    fontSize: 9,
    fontWeight: 500,
    letterSpacing: "0.18em",
    textTransform: "uppercase",
    color: "rgba(245,243,239,0.4)"
  },
  metaValue: {
    fontSize: 13,
    color: "rgba(245,243,239,0.9)",
    letterSpacing: "0.01em"
  },

  /* FOOTER */
  footer: {
    marginTop: 48,
    paddingBottom: 32
  },
  footerLine: {
    width: "100%",
    maxWidth: 420,
    height: 1,
    background: "var(--line)",
    margin: "0 auto"
  },
  footerRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    maxWidth: 420,
    margin: "0 auto",
    padding: "16px 22px 0"
  },
  footerYear: {
    fontSize: 10,
    fontWeight: 500,
    letterSpacing: "0.18em",
    textTransform: "uppercase",
    color: "var(--ink-mute)"
  },
  footerCredit: {
    fontSize: 10,
    fontWeight: 500,
    letterSpacing: "0.18em",
    textTransform: "uppercase",
    color: "var(--ink-mute)",
    textDecoration: "none"
  }
};