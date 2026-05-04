"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [enter, setEnter] = useState(false);
  const [pressedCard, setPressedCard] = useState(null);

  useEffect(() => {
    document.body.style.margin = "0";
    document.body.style.padding = "0";
    document.body.style.background = "#ffffff";
    const t = setTimeout(() => setEnter(true), 2000);
    return () => clearTimeout(t);
  }, []);

  return (
    <div style={styles.page}>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes logoIn {
          from { opacity: 0; transform: scale(0.92); }
          to   { opacity: 1; transform: scale(1); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.5; }
          50%       { opacity: 1; }
        }
        .card-press { transition: transform 0.12s ease, box-shadow 0.12s ease; }
        .card-press:active { transform: scale(0.97); box-shadow: 0 1px 6px rgba(0,0,0,0.06) !important; }
      `}</style>

      {/* INTRO */}
      {!enter && (
        <div style={styles.intro}>
          <img src="/nooise.jpg" alt="nooise" style={styles.logoImgIntro} />
        </div>
      )}

      {/* MAIN */}
      {enter && (
        <div style={styles.main}>

          {/* TOP BAR */}
          <div style={styles.topBar}>
            <a
              href="https://www.instagram.com/nooise___/"
              target="_blank"
              rel="noopener noreferrer"
              style={styles.instaLink}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <circle cx="12" cy="12" r="4"/>
                <circle cx="17.5" cy="6.5" r="0.8" fill="#111" stroke="none"/>
              </svg>
              <span style={styles.instaLabel}>@nooise___</span>
            </a>
          </div>

          {/* HERO */}
          <div style={styles.hero}>
            <img src="/nooise.jpg" alt="nooise" style={styles.logoImg} />
            <div style={styles.divider} />
          </div>

          {/* CARDS */}
          <div style={styles.container}>

            {/* FIND PHOTOS */}
            <Link href="/photos" style={styles.linkFix}>
              <div className="card-press" style={styles.cardPrimary}>
                <div style={styles.cardRow}>
                  <div>
                    <h2 style={styles.cardTitle}>Find Your Photos</h2>
                    <p style={styles.cardText}>Relive your event moments</p>
                  </div>
                  <div style={styles.cardIconWrap}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </div>
                </div>
              </div>
            </Link>

            {/* NEXT EVENT */}
            <Link href="/events/crama-thesaurus" style={styles.linkFix}>
              <div className="card-press" style={styles.eventCard}>

                <div style={styles.eventTopRow}>
                  <span style={styles.eventBadge}>
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
                    Tickets →
                  </a>
                </div>

                <h3 style={styles.eventName}>NOOISE x Crama Thesaurus</h3>
                <p style={styles.eventSubtitle}>Winery Session</p>

                <div style={styles.eventMeta}>
                  <span style={styles.eventMetaItem}>📅 9 mai 2026</span>
                  <span style={styles.eventMetaItem}>🕓 16:00 – 23:00</span>
                </div>

              </div>
            </Link>

          </div>

          {/* FOOTER */}
          <div style={styles.footer}>
            <div style={styles.footerRow}>
              <a
                href="https://www.instagram.com/nooise___/"
                target="_blank"
                rel="noopener noreferrer"
                style={styles.footerInsta}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <circle cx="12" cy="12" r="4"/>
                  <circle cx="17.5" cy="6.5" r="0.8" fill="#aaa" stroke="none"/>
                </svg>
                <span>nooise___</span>
              </a>
              <span style={styles.footerDot}>·</span>
              <a
                href="https://www.instagram.com/bogdanhener/"
                target="_blank"
                rel="noopener noreferrer"
                style={styles.footerCredit}
              >
                by bogdanhener
              </a>
            </div>
            <p style={styles.footerYear}>2026 © nooise</p>
          </div>

        </div>
      )}

    </div>
  );
}

const styles = {
  page: {
    minHeight: "100dvh",
    background: "#ffffff",
    color: "#111",
    fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif",
    overflowX: "hidden",
    margin: 0,
    padding: 0
  },

  /* INTRO */
  intro: {
    position: "fixed",
    top: 0, left: 0, right: 0, bottom: 0,
    background: "#ffffff",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 999
  },
  logoImgIntro: {
    width: 180,
    animation: "logoIn 0.6s ease forwards"
  },

  /* MAIN */
  main: {
    width: "100%",
    minHeight: "100dvh",
    display: "flex",
    flexDirection: "column",
    animation: "fadeIn 0.5s ease forwards"
  },

  /* TOP BAR */
  topBar: {
    display: "flex",
    justifyContent: "flex-end",
    padding: "16px 20px 0"
  },
  instaLink: {
    display: "flex",
    alignItems: "center",
    gap: 6,
    textDecoration: "none",
    color: "#111"
  },
  instaLabel: {
    fontSize: 12,
    fontWeight: 600,
    color: "#111",
    opacity: 0.5
  },

  /* HERO */
  hero: {
    flex: 1,
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "center",
    paddingBottom: 32
  },
  logoImg: {
    width: 155,
    display: "block",
    margin: "0 auto"
  },
  divider: {
    width: 40,
    height: 1,
    background: "rgba(0,0,0,0.1)",
    margin: "24px auto 0"
  },

  /* CONTAINER */
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
    background: "#f7f7f7",
    border: "1px solid rgba(0,0,0,0.06)",
    boxShadow: "0 2px 16px rgba(0,0,0,0.05)"
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
    color: "#111"
  },
  cardText: {
    fontSize: 13,
    color: "#999",
    marginTop: 3
  },
  cardIconWrap: {
    width: 34,
    height: 34,
    borderRadius: "50%",
    background: "rgba(0,0,0,0.06)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0
  },

  /* EVENT CARD */
  eventCard: {
    padding: "18px 20px",
    borderRadius: 18,
    background: "rgba(20,20,20,0.06)",
    border: "1px solid rgba(0,0,0,0.1)",
    boxShadow: "0 8px 32px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.8)",
    position: "relative",
    overflow: "hidden",
    backdropFilter: "blur(12px)"
  },
  eventTopRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12
  },
  eventBadge: {
    fontSize: 11,
    letterSpacing: 1.5,
    textTransform: "uppercase",
    color: "rgba(0,0,0,0.4)",
    fontWeight: 600,
    display: "flex",
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
  ticketLink: {
    fontSize: 12,
    color: "rgba(0,0,0,0.4)",
    fontWeight: 600,
    textDecoration: "none",
    zIndex: 10
  },
  eventName: {
    fontSize: 17,
    fontWeight: 700,
    color: "#111",
    margin: 0
  },
  eventSubtitle: {
    fontSize: 13,
    color: "rgba(0,0,0,0.45)",
    marginTop: 4
  },
  eventMeta: {
    display: "flex",
    gap: 14,
    marginTop: 12
  },
  eventMetaItem: {
    fontSize: 12,
    color: "rgba(0,0,0,0.4)"
  },

  /* FOOTER */
  footer: {
    marginTop: 24,
    textAlign: "center",
    paddingBottom: 40
  },
  footerRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8
  },
  footerInsta: {
    display: "flex",
    alignItems: "center",
    gap: 4,
    textDecoration: "none",
    color: "#aaa",
    fontSize: 12
  },
  footerDot: {
    color: "#ccc",
    fontSize: 12
  },
  footerCredit: {
    fontSize: 12,
    color: "#aaa",
    textDecoration: "none"
  },
  footerYear: {
    fontSize: 11,
    color: "#ddd",
    marginTop: 6
  }
};