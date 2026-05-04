"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Comfortaa } from "next/font/google";

const comfortaa = Comfortaa({
  subsets: ["latin"],
  weight: ["300"],
  display: "swap"
});

export default function Home() {
  const [enter, setEnter] = useState(false);

  useEffect(() => {
    document.body.style.margin = "0";
    document.body.style.padding = "0";
    document.body.style.background = "#ffffff";
    const t = setTimeout(() => setEnter(true), 2400);
    return () => clearTimeout(t);
  }, []);

  return (
    <div style={styles.page}>

      {/* INTRO */}
      {!enter && (
        <div style={styles.intro}>
          <img src="/nooise.jpg" alt="nooise" style={styles.logoImgIntro} />
        </div>
      )}

      {/* MAIN */}
      {enter && (
        <div style={styles.main}>

          {/* HERO */}
          <div style={styles.hero}>
            <img src="/nooise.jpg" alt="nooise" style={styles.logoImg} />
            <p style={styles.tagline}>Events. Energy. Moments.</p>
          </div>

          {/* CARDS */}
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
            <Link href="/events/crama-thesaurus" style={styles.linkFix}>
              <div style={styles.eventCard}>

                <div style={styles.eventTopRow}>
                  <span style={styles.eventBadge}>Next Event</span>
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
            <p style={styles.footerText}>
              2026 © nooise ·{" "}
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
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "#ffffff",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 999
  },
  logoImgIntro: {
    width: 180,
    opacity: 1
  },

  /* MAIN */
  main: {
    width: "100%",
    minHeight: "100dvh",
    display: "flex",
    flexDirection: "column"
  },

  /* HERO */
  hero: {
    flex: 1,
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "center",
    paddingBottom: 36
  },
  logoImg: {
    width: 160,
    display: "block",
    margin: "0 auto"
  },
  tagline: {
    marginTop: 10,
    fontSize: 13,
    color: "#888",
    letterSpacing: 1
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
    background: "white",
    border: "1px solid rgba(0,0,0,0.08)",
    boxShadow: "0 2px 16px rgba(0,0,0,0.06)"
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
    color: "#888",
    marginTop: 3
  },
  cardArrow: {
    fontSize: 20,
    color: "#111",
    opacity: 0.4
  },

  /* EVENT CARD */
  eventCard: {
    padding: "18px 20px",
    borderRadius: 18,
    background: "white",
    border: "1px solid rgba(0,0,0,0.08)",
    boxShadow: "0 2px 16px rgba(0,0,0,0.06)",
    position: "relative",
    overflow: "hidden"
  },
  eventTopRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12
  },
  eventBadge: {
    fontSize: 11,
    letterSpacing: 2,
    textTransform: "uppercase",
    color: "#111",
    fontWeight: 600,
    background: "rgba(0,0,0,0.05)",
    padding: "3px 8px",
    borderRadius: 6,
    border: "1px solid rgba(0,0,0,0.08)"
  },
  ticketLink: {
    fontSize: 12,
    color: "#111",
    fontWeight: 600,
    textDecoration: "none",
    opacity: 0.5,
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
    color: "#888",
    marginTop: 4
  },
  eventMeta: {
    display: "flex",
    gap: 14,
    marginTop: 12
  },
  eventMetaItem: {
    fontSize: 12,
    color: "#888"
  },

  /* FOOTER */
  footer: {
    marginTop: 20,
    textAlign: "center",
    paddingBottom: 40
  },
  footerText: {
    fontSize: 12,
    color: "#bbb"
  },
  footerLink: {
    color: "#111",
    textDecoration: "none",
    fontWeight: 600
  }
};