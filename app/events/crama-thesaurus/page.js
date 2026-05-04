"use client";

import Link from "next/link";

export default function CramaThesaurusPage() {
  return (
    <div style={styles.page}>

      <style>{`
        @keyframes pulse { 0%, 100% { opacity: 0.4; transform: scale(1); } 50% { opacity: 1; transform: scale(1.15); } }
        @keyframes fadeUp { from { opacity:0; transform: translateY(10px); } to { opacity:1; transform: translateY(0); } }
        @keyframes lineGrow { from { transform: scaleX(0); } to { transform: scaleX(1); } }
        .stagger > * { opacity: 0; animation: fadeUp 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards; }
        .stagger > *:nth-child(1) { animation-delay: 0.1s; }
        .stagger > *:nth-child(2) { animation-delay: 0.2s; }
        .stagger > *:nth-child(3) { animation-delay: 0.3s; }
        .stagger > *:nth-child(4) { animation-delay: 0.4s; }
        .stagger > *:nth-child(5) { animation-delay: 0.5s; }
        .press { transition: opacity 0.3s cubic-bezier(0.22, 1, 0.36, 1), transform 0.3s cubic-bezier(0.22, 1, 0.36, 1); }
        .press:active { opacity: 0.7; transform: scale(0.99); }
      `}</style>

      {/* TOP BAR */}
      <div style={styles.topBar}>
        <Link href="/" style={styles.backLink}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 5l-7 7 7 7"/>
          </svg>
          <span>nooise</span>
        </Link>
        <span style={styles.pageNumber}>Event 02</span>
      </div>

      {/* POSTER */}
      <div style={styles.posterWrap}>
        <img
          src="/img/nooise_crama.jpg"
          alt="NOOISE x Crama Thesaurus"
          style={styles.poster}
        />
      </div>

      {/* CONTENT */}
      <div style={styles.content} className="stagger">

        {/* HEADER BLOCK */}
        <header style={styles.headerBlock}>
          <div style={styles.badgeRow}>
            <span style={styles.badge}>
              <span style={styles.pulseDot} />
              Upcoming
            </span>
            <span style={styles.dateChip}>09.05.2026</span>
          </div>

          <h1 style={styles.title}>
            <span style={styles.serif}>Winery</span> Session
          </h1>
          <p style={styles.subtitle}>nooise × Crama Thesaurus</p>

          <div style={styles.titleLine} />
        </header>

        {/* DESCRIPTION */}
        <section style={styles.descBlock}>
          <p style={styles.descLead}>
            We're not stopping. We're just taking it somewhere else.
          </p>
          <p style={styles.descText}>
            On May 9, we leave the city behind and head to Crama Thesaurus — a place you already know.
            Same idea. Different setting. Even better energy.
          </p>
          <p style={styles.descText}>
            Sunset, music and a different kind of experience. This one will be special.
          </p>
        </section>

        {/* INFO TABLE — editorial style */}
        <section style={styles.infoTable}>
          <div style={styles.infoRow}>
            <span style={styles.infoLabel}>Location</span>
            <div style={styles.infoValueWrap}>
              <span style={styles.infoValue}>Crama Thesaurus Wines</span>
              <a
                href="https://maps.google.com/?q=Crama+Thesaurus+Recas+Romania"
                target="_blank"
                rel="noopener noreferrer"
                style={styles.subLink}
              >
                Open in Maps ↗
              </a>
            </div>
          </div>

          <div style={styles.infoRow}>
            <span style={styles.infoLabel}>Date</span>
            <span style={styles.infoValue}>Saturday · 9 May 2026</span>
          </div>

          <div style={styles.infoRow}>
            <span style={styles.infoLabel}>Doors</span>
            <span style={styles.infoValue}>16:00 — 23:00</span>
          </div>

          <div style={styles.infoRow}>
            <span style={styles.infoLabel}>Contact</span>
            <a href="tel:0750232421" style={styles.infoLink}>0750 232 421</a>
          </div>
        </section>

        {/* TICKETS — inverted block */}
        <section style={styles.ticketsBlock}>
          <div style={styles.ticketsRow}>
            <div>
              <p style={styles.ticketsEyebrow}>First 50 tickets</p>
              <p style={styles.ticketsPrice}>
                <span style={styles.priceFree}>Free</span>
                <span style={styles.priceAfter}>then via livetickets.ro</span>
              </p>
            </div>
            <div style={styles.ticketsAccent}>
              <span style={styles.serif}>50</span>
            </div>
          </div>
          <a
            href="https://www.livetickets.ro/bilete/nooise-x-crama-thesaurus-winery-session"
            target="_blank"
            rel="noopener noreferrer"
            style={styles.ticketBtn}
            className="press"
          >
            <span>Buy tickets</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </a>
          <p style={styles.ticketNote}>Limited capacity</p>
        </section>

        {/* META GRID */}
        <section style={styles.metaGrid}>
          <div style={styles.metaCard}>
            <span style={styles.metaCardLabel}>Transport</span>
            <p style={styles.metaCardText}>Timișoara → Buziaș → return. Details soon.</p>
          </div>
          <div style={styles.metaCard}>
            <span style={styles.metaCardLabel}>Entry</span>
            <p style={styles.metaCardText}>18+ only. Door reserves the right to select guests.</p>
          </div>
        </section>

        {/* TABLE RESERVATIONS */}
        <section style={styles.tablesBlock}>
          <div style={styles.tablesHeader}>
            <span style={styles.tablesEyebrow}>Reservations</span>
            <h3 style={styles.tablesTitle}>
              <span style={styles.serif}>Tables</span>
            </h3>
          </div>
          <p style={styles.tablesText}>
            Limited tables available by prior reservation only.
          </p>
          <div style={styles.tableTypes}>
            <span style={styles.tableTag}>Backstage</span>
            <span style={styles.tableTag}>Regular</span>
          </div>
          <a href="tel:0750232421" style={styles.reserveBtn} className="press">
            <span>Call to reserve</span>
            <span style={styles.reservePhone}>0750 232 421</span>
          </a>
        </section>

        {/* CTA */}
        <section style={styles.ctaBlock}>
          <p style={styles.ctaLine}>
            Get your ticket, bring your crew,
          </p>
          <p style={styles.ctaLineEmphasis}>
            <span style={styles.serif}>and let's make</span> nooise.
          </p>
        </section>

        {/* FOOTER */}
        <footer style={styles.footer}>
          <div style={styles.footerLine} />
          <a
            href="https://www.instagram.com/nooise___/"
            target="_blank"
            rel="noopener noreferrer"
            style={styles.footerInsta}
          >
            @nooise___
          </a>
        </footer>

      </div>

    </div>
  );
}

const styles = {
  page: {
    background: "var(--paper)",
    minHeight: "100dvh",
    color: "var(--ink)",
    fontFamily: "var(--sans)",
    margin: 0
  },

  /* TOP BAR */
  topBar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "20px 22px 0"
  },
  backLink: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    textDecoration: "none",
    color: "var(--ink-soft)",
    fontSize: 11,
    fontWeight: 500,
    letterSpacing: "0.04em"
  },
  pageNumber: {
    fontSize: 10,
    fontWeight: 500,
    letterSpacing: "0.18em",
    textTransform: "uppercase",
    color: "var(--ink-mute)"
  },

  /* POSTER */
  posterWrap: {
    position: "relative",
    margin: "20px 22px 0",
    borderRadius: 14,
    overflow: "hidden",
    aspectRatio: "9 / 13",
    maxHeight: "70vh",
    border: "1px solid var(--line)"
  },
  poster: {
    width: "100%",
    height: "100%",
    display: "block",
    objectFit: "cover",
    objectPosition: "center"
  },

  /* CONTENT */
  content: {
    padding: "0 22px",
    maxWidth: 520,
    margin: "0 auto",
    boxSizing: "border-box"
  },

  /* HEADER BLOCK */
  headerBlock: {
    paddingTop: 36
  },
  badgeRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 18
  },
  badge: {
    fontSize: 10,
    letterSpacing: "0.18em",
    textTransform: "uppercase",
    color: "var(--ink)",
    fontWeight: 500,
    display: "inline-flex",
    alignItems: "center",
    gap: 8
  },
  dateChip: {
    fontSize: 10,
    letterSpacing: "0.18em",
    textTransform: "uppercase",
    color: "var(--ink-mute)",
    fontWeight: 500
  },
  pulseDot: {
    display: "inline-block",
    width: 6,
    height: 6,
    borderRadius: "50%",
    background: "var(--accent)",
    animation: "pulse 2s ease-in-out infinite"
  },
  title: {
    fontSize: 48,
    fontWeight: 500,
    color: "var(--ink)",
    margin: 0,
    lineHeight: 0.95,
    letterSpacing: "-0.04em"
  },
  serif: {
    fontFamily: "var(--serif)",
    fontStyle: "italic",
    fontWeight: 400
  },
  subtitle: {
    fontSize: 14,
    color: "var(--ink-mute)",
    margin: "14px 0 0",
    letterSpacing: "0.01em"
  },
  titleLine: {
    width: 40,
    height: 1,
    background: "var(--ink)",
    marginTop: 24,
    transformOrigin: "left",
    animation: "lineGrow 0.7s cubic-bezier(0.22, 1, 0.36, 1) 0.4s both"
  },

  /* DESCRIPTION */
  descBlock: {
    paddingTop: 32
  },
  descLead: {
    fontFamily: "var(--serif)",
    fontStyle: "italic",
    fontSize: 19,
    fontWeight: 400,
    color: "var(--ink)",
    lineHeight: 1.4,
    margin: "0 0 18px",
    letterSpacing: "-0.01em"
  },
  descText: {
    fontSize: 14,
    lineHeight: 1.7,
    color: "var(--ink-soft)",
    margin: "0 0 12px"
  },

  /* INFO TABLE */
  infoTable: {
    marginTop: 36,
    borderTop: "1px solid var(--line)"
  },
  infoRow: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-between",
    padding: "16px 0",
    borderBottom: "1px solid var(--line)",
    gap: 20
  },
  infoLabel: {
    fontSize: 10,
    fontWeight: 500,
    letterSpacing: "0.18em",
    textTransform: "uppercase",
    color: "var(--ink-mute)",
    paddingTop: 2,
    flexShrink: 0,
    minWidth: 80
  },
  infoValueWrap: {
    display: "flex",
    flexDirection: "column",
    gap: 6,
    alignItems: "flex-end",
    textAlign: "right"
  },
  infoValue: {
    fontSize: 14,
    color: "var(--ink)",
    fontWeight: 500
  },
  infoLink: {
    fontSize: 14,
    color: "var(--ink)",
    fontWeight: 500,
    textDecoration: "none",
    borderBottom: "1px solid var(--line-strong)"
  },
  subLink: {
    fontSize: 11,
    color: "var(--ink-mute)",
    textDecoration: "none",
    letterSpacing: "0.04em",
    fontWeight: 500
  },

  /* TICKETS BLOCK */
  ticketsBlock: {
    marginTop: 32,
    padding: "24px 24px 22px",
    background: "var(--soft-dark)",
    color: "var(--soft-dark-text)",
    borderRadius: 14,
    position: "relative",
    overflow: "hidden"
  },
  ticketsRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 22
  },
  ticketsEyebrow: {
    fontSize: 10,
    fontWeight: 500,
    letterSpacing: "0.18em",
    textTransform: "uppercase",
    color: "rgba(245,243,239,0.5)",
    margin: "0 0 8px"
  },
  ticketsPrice: {
    margin: 0,
    display: "flex",
    flexDirection: "column",
    gap: 4
  },
  priceFree: {
    fontFamily: "var(--serif)",
    fontStyle: "italic",
    fontSize: 36,
    fontWeight: 400,
    letterSpacing: "-0.02em",
    color: "var(--soft-dark-text)",
    lineHeight: 1
  },
  priceAfter: {
    fontSize: 11,
    color: "rgba(245,243,239,0.4)",
    letterSpacing: "0.02em"
  },
  ticketsAccent: {
    fontFamily: "var(--serif)",
    fontStyle: "italic",
    fontSize: 72,
    color: "rgba(245,243,239,0.08)",
    fontWeight: 400,
    lineHeight: 1,
    letterSpacing: "-0.05em"
  },
  ticketBtn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "14px 18px",
    borderRadius: 10,
    background: "var(--paper)",
    color: "var(--ink)",
    fontWeight: 500,
    fontSize: 13,
    letterSpacing: "0.02em",
    textDecoration: "none"
  },
  ticketNote: {
    textAlign: "center",
    fontSize: 10,
    color: "rgba(245,243,239,0.4)",
    letterSpacing: "0.18em",
    textTransform: "uppercase",
    fontWeight: 500,
    marginTop: 14,
    margin: "14px 0 0"
  },

  /* META GRID */
  metaGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 12,
    marginTop: 28
  },
  metaCard: {
    padding: "16px 16px 18px",
    borderRadius: 12,
    border: "1px solid var(--line)"
  },
  metaCardLabel: {
    fontSize: 10,
    fontWeight: 500,
    letterSpacing: "0.18em",
    textTransform: "uppercase",
    color: "var(--ink-mute)"
  },
  metaCardText: {
    fontSize: 12,
    color: "var(--ink-soft)",
    margin: "8px 0 0",
    lineHeight: 1.55
  },

  /* TABLES BLOCK */
  tablesBlock: {
    marginTop: 28,
    padding: "22px 22px 22px",
    borderRadius: 14,
    border: "1px solid var(--line)"
  },
  tablesHeader: {
    marginBottom: 12
  },
  tablesEyebrow: {
    fontSize: 10,
    fontWeight: 500,
    letterSpacing: "0.18em",
    textTransform: "uppercase",
    color: "var(--ink-mute)"
  },
  tablesTitle: {
    fontSize: 28,
    fontWeight: 500,
    color: "var(--ink)",
    margin: "8px 0 0",
    letterSpacing: "-0.02em",
    lineHeight: 1
  },
  tablesText: {
    fontSize: 13,
    color: "var(--ink-soft)",
    margin: "14px 0 14px",
    lineHeight: 1.6
  },
  tableTypes: {
    display: "flex",
    gap: 8,
    marginBottom: 18
  },
  tableTag: {
    fontSize: 11,
    fontWeight: 500,
    letterSpacing: "0.04em",
    color: "var(--ink)",
    background: "transparent",
    border: "1px solid var(--line-strong)",
    borderRadius: 20,
    padding: "5px 12px"
  },
  reserveBtn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "13px 16px",
    borderRadius: 10,
    background: "var(--soft-dark)",
    color: "var(--soft-dark-text)",
    fontWeight: 500,
    fontSize: 13,
    textDecoration: "none",
    letterSpacing: "0.02em"
  },
  reservePhone: {
    fontFamily: "var(--serif)",
    fontStyle: "italic",
    fontSize: 14
  },

  /* CTA */
  ctaBlock: {
    marginTop: 48,
    paddingTop: 36,
    borderTop: "1px solid var(--line)",
    textAlign: "center"
  },
  ctaLine: {
    fontSize: 14,
    color: "var(--ink-soft)",
    margin: 0,
    letterSpacing: "0.01em"
  },
  ctaLineEmphasis: {
    fontSize: 22,
    color: "var(--ink)",
    margin: "8px 0 0",
    fontWeight: 500,
    letterSpacing: "-0.02em",
    lineHeight: 1.2
  },

  /* FOOTER */
  footer: {
    marginTop: 48,
    paddingBottom: 40
  },
  footerLine: {
    height: 1,
    background: "var(--line)",
    marginBottom: 20
  },
  footerInsta: {
    display: "block",
    textAlign: "center",
    textDecoration: "none",
    color: "var(--ink-mute)",
    fontSize: 11,
    fontWeight: 500,
    letterSpacing: "0.04em"
  }
};