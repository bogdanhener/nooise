"use client";

import Link from "next/link";

export default function AboutMobile() {
  return (
    <div style={styles.page}>
      <style>{`
        @keyframes abFadeUp { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes abLineGrow { from { transform: scaleX(0); } to { transform: scaleX(1); } }
        .ab-stagger > * { opacity: 0; animation: abFadeUp 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards; }
        .ab-stagger > *:nth-child(1) { animation-delay: 0.1s; }
        .ab-stagger > *:nth-child(2) { animation-delay: 0.22s; }
        .ab-stagger > *:nth-child(3) { animation-delay: 0.34s; }
        .ab-stagger > *:nth-child(4) { animation-delay: 0.46s; }
        .ab-stagger > *:nth-child(5) { animation-delay: 0.58s; }
      `}</style>

      <div style={styles.topBar}>
        <Link href="/" style={styles.backLink}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 5l-7 7 7 7"/>
          </svg>
          <span>nooise</span>
        </Link>
      </div>

      <div style={styles.content} className="ab-stagger">
        <div>
          <span style={styles.eyebrow}>About</span>
          <h1 style={styles.title}>
            We make <span style={styles.serif}>moments</span>
          </h1>
          <div style={styles.headerLine} />
        </div>

        <p style={styles.lead}>
          nooise is a small events project from Timișoara, building nights that feel less like parties and more like punctuation marks.
        </p>

        <p style={styles.body}>
          We started in 2024 with one rule — make the kind of evening we actually wanted to go to. No flashing logos. No filler. Just music, the right people, and a setting that earns its place.
        </p>

        <p style={styles.body}>
          Each event is its own thing. A mall takeover. A winery session. Whatever the venue, the brief is the same: take it seriously, but don't take it too seriously.
        </p>

        <div style={styles.divider} />

        <span style={styles.eyebrow}>Credits</span>
        <div style={styles.credits}>
          <div style={styles.creditRow}>
            <span style={styles.creditLabel}>Direction</span>
            <span style={styles.creditValue}>nooise</span>
          </div>
          <div style={styles.creditRow}>
            <span style={styles.creditLabel}>Site</span>
            <a href="https://www.instagram.com/bogdanhener/" target="_blank" rel="noopener noreferrer" style={styles.creditLink}>Bogdan Hener</a>
          </div>
          <div style={styles.creditRow}>
            <span style={styles.creditLabel}>Based</span>
            <span style={styles.creditValue}>Timișoara, RO</span>
          </div>
        </div>
      </div>

      <div style={styles.footer}>
        <div style={styles.footerLine} />
        <a href="https://www.instagram.com/nooise___/" target="_blank" rel="noopener noreferrer" style={styles.footerInsta}>@nooise___</a>
      </div>
    </div>
  );
}

const styles = {
  page: { background: "var(--paper)", minHeight: "100dvh", color: "var(--ink)", fontFamily: "var(--sans)", margin: 0 },
  topBar: { display: "flex", padding: "20px 24px 0" },
  backLink: { display: "flex", alignItems: "center", gap: 8, textDecoration: "none", color: "var(--ink-soft)", fontSize: 11, fontWeight: 500, letterSpacing: "0.04em" },
  content: { padding: "40px 24px 0", maxWidth: 480, margin: "0 auto", boxSizing: "border-box", display: "flex", flexDirection: "column", gap: 28 },
  eyebrow: { display: "block", fontSize: 10, fontWeight: 500, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--ink-soft)", marginBottom: 12 },
  title: { fontSize: 44, fontWeight: 500, color: "var(--ink)", margin: 0, lineHeight: 1, letterSpacing: "-0.03em" },
  serif: { fontFamily: "var(--serif)", fontStyle: "italic", fontWeight: 400 },
  headerLine: { width: 40, height: 1, background: "var(--ink)", marginTop: 24, transformOrigin: "left", animation: "abLineGrow 0.7s cubic-bezier(0.22, 1, 0.36, 1) 0.2s both" },
  lead: { fontFamily: "var(--serif)", fontStyle: "italic", fontSize: 19, color: "var(--ink)", lineHeight: 1.5, margin: 0, letterSpacing: "-0.01em" },
  body: { fontSize: 14, lineHeight: 1.75, color: "var(--ink-soft)", margin: 0 },
  divider: { height: 1, background: "var(--line)", margin: "12px 0" },
  credits: { display: "flex", flexDirection: "column" },
  creditRow: { display: "flex", justifyContent: "space-between", padding: "14px 0", borderBottom: "1px solid var(--line)" },
  creditLabel: { fontSize: 10, fontWeight: 500, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--ink-mute)" },
  creditValue: { fontSize: 14, fontWeight: 500, color: "var(--ink)" },
  creditLink: { fontSize: 14, fontWeight: 500, color: "var(--ink)", textDecoration: "none", borderBottom: "1px solid var(--line-strong)" },
  footer: { marginTop: 64, paddingBottom: 40 },
  footerLine: { width: "100%", maxWidth: 480, height: 1, background: "var(--line)", margin: "0 auto" },
  footerInsta: { display: "block", textAlign: "center", paddingTop: 18, textDecoration: "none", color: "var(--ink-mute)", fontSize: 11, fontWeight: 500, letterSpacing: "0.04em" }
};
