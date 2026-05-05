"use client";

import Link from "next/link";

const EVENTS = [
  {
    id: "crama-thesaurus",
    title: "Winery Session",
    subtitle: "nooise × Crama Thesaurus",
    date: "9 May 2026",
    location: "Crama Thesaurus, Recaș",
    poster: "/img/nooise_crama.jpg",
    status: "upcoming"
  }
];

export default function EventsMobile() {
  const upcoming = EVENTS.filter((e) => e.status === "upcoming");
  const past = EVENTS.filter((e) => e.status === "past");

  return (
    <div style={styles.page}>
      <style>{`
        @keyframes evFadeUp { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes evLineGrow { from { transform: scaleX(0); } to { transform: scaleX(1); } }
      `}</style>

      <div style={styles.topBar}>
        <Link href="/" style={styles.backLink}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 5l-7 7 7 7"/>
          </svg>
          <span>nooise</span>
        </Link>
      </div>

      <div style={styles.header}>
        <span style={styles.eyebrow}>The Calendar</span>
        <h1 style={styles.title}>
          <span style={styles.serif}>Events</span>
        </h1>
        <p style={styles.subtitle}>Upcoming & past nights</p>
        <div style={styles.headerLine} />
      </div>

      {upcoming.length > 0 && (
        <div style={styles.section}>
          <span style={styles.sectionLabel}>Upcoming</span>
          {upcoming.map((event, i) => (
            <Link
              key={event.id}
              href={`/events/${event.id}`}
              style={{ ...styles.cardLink, animation: `evFadeUp 0.5s cubic-bezier(0.22, 1, 0.36, 1) ${i * 0.06}s both` }}
            >
              <article style={styles.card}>
                <div style={{ ...styles.cardImage, backgroundImage: `url(${event.poster})` }} />
                <div style={styles.cardOverlay} />
                <div style={styles.cardContent}>
                  <span style={styles.cardDate}>{event.date}</span>
                  <h2 style={styles.cardTitle}>{event.title}</h2>
                  <p style={styles.cardSubtitle}>{event.subtitle}</p>
                </div>
              </article>
            </Link>
          ))}
        </div>
      )}

      {past.length > 0 && (
        <div style={styles.section}>
          <span style={styles.sectionLabel}>Past</span>
          {past.map((event) => (
            <div key={event.id} style={styles.pastRow}>
              <span style={styles.pastDate}>{event.date}</span>
              <span style={styles.pastTitle}>{event.title}</span>
            </div>
          ))}
        </div>
      )}

      <div style={styles.footer}>
        <div style={styles.footerLine} />
        <a href="https://www.instagram.com/nooise___/" target="_blank" rel="noopener noreferrer" style={styles.footerInsta}>@nooise___</a>
      </div>
    </div>
  );
}

const styles = {
  page: { background: "var(--paper)", minHeight: "100dvh", color: "var(--ink)", fontFamily: "var(--sans)", margin: 0 },
  topBar: { display: "flex", alignItems: "center", padding: "20px 24px 0" },
  backLink: { display: "flex", alignItems: "center", gap: 8, textDecoration: "none", color: "var(--ink-soft)", fontSize: 11, fontWeight: 500, letterSpacing: "0.04em" },
  header: { padding: "40px 24px 24px", maxWidth: 480, margin: "0 auto", boxSizing: "border-box" },
  eyebrow: { fontSize: 10, fontWeight: 500, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--ink-soft)" },
  title: { fontSize: 48, fontWeight: 500, margin: "10px 0 0", color: "var(--ink)", letterSpacing: "-0.03em", lineHeight: 1 },
  serif: { fontFamily: "var(--serif)", fontStyle: "italic", fontWeight: 400 },
  subtitle: { color: "var(--ink-mute)", fontSize: 13, margin: "14px 0 0" },
  headerLine: { width: 40, height: 1, background: "var(--ink)", marginTop: 24, transformOrigin: "left", animation: "evLineGrow 0.7s cubic-bezier(0.22, 1, 0.36, 1) 0.2s both" },
  section: { padding: "16px 24px 0", maxWidth: 480, margin: "0 auto", boxSizing: "border-box" },
  sectionLabel: { display: "block", fontSize: 10, fontWeight: 500, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--ink-mute)", marginBottom: 16, marginTop: 16 },
  cardLink: { display: "block", textDecoration: "none", color: "inherit", marginBottom: 16 },
  card: { position: "relative", aspectRatio: "9/13", maxHeight: 460, borderRadius: 14, overflow: "hidden", border: "1px solid var(--line)" },
  cardImage: { position: "absolute", inset: 0, backgroundSize: "cover", backgroundPosition: "center" },
  cardOverlay: { position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(0,0,0,0) 40%, rgba(0,0,0,0.75) 100%)" },
  cardContent: { position: "absolute", bottom: 20, left: 20, right: 20, color: "white" },
  cardDate: { fontSize: 10, fontWeight: 500, letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(255,255,255,0.7)" },
  cardTitle: { fontSize: 28, fontWeight: 500, letterSpacing: "-0.02em", margin: "8px 0 4px", color: "white", fontFamily: "var(--serif)", fontStyle: "italic" },
  cardSubtitle: { fontSize: 13, color: "rgba(255,255,255,0.6)", margin: 0 },
  pastRow: { display: "flex", justifyContent: "space-between", padding: "16px 0", borderBottom: "1px solid var(--line)", fontSize: 14 },
  pastDate: { color: "var(--ink-mute)", fontVariantNumeric: "tabular-nums" },
  pastTitle: { color: "var(--ink)", fontWeight: 500 },
  footer: { marginTop: 48, paddingBottom: 40 },
  footerLine: { width: "100%", maxWidth: 480, height: 1, background: "var(--line)", margin: "0 auto" },
  footerInsta: { display: "block", textAlign: "center", paddingTop: 18, textDecoration: "none", color: "var(--ink-mute)", fontSize: 11, fontWeight: 500, letterSpacing: "0.04em" }
};
