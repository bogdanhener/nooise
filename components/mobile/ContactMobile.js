"use client";

import Link from "next/link";

export default function ContactMobile() {
  return (
    <div style={styles.page}>
      <style>{`
        @keyframes ctFadeUp { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes ctLineGrow { from { transform: scaleX(0); } to { transform: scaleX(1); } }
        .ct-stagger > * { opacity: 0; animation: ctFadeUp 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards; }
        .ct-stagger > *:nth-child(1) { animation-delay: 0.1s; }
        .ct-stagger > *:nth-child(2) { animation-delay: 0.22s; }
        .ct-stagger > *:nth-child(3) { animation-delay: 0.34s; }
        .ct-stagger > *:nth-child(4) { animation-delay: 0.46s; }
      `}</style>

      <div style={styles.topBar}>
        <Link href="/" style={styles.backLink}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 5l-7 7 7 7"/>
          </svg>
          <span>nooise</span>
        </Link>
      </div>

      <div style={styles.content} className="ct-stagger">
        <div>
          <span style={styles.eyebrow}>Contact</span>
          <h1 style={styles.title}>
            Get in <span style={styles.serif}>touch</span>
          </h1>
          <div style={styles.headerLine} />
        </div>

        <p style={styles.lead}>
          Booking, press, partnerships, or just hi — pick a channel.
        </p>

        <div style={styles.cards}>
          <a href="tel:0750232421" style={styles.card}>
            <div>
              <span style={styles.cardLabel}>Phone</span>
              <p style={styles.cardValue}>0750 232 421</p>
            </div>
            <span style={styles.cardArrow}>↗</span>
          </a>

          <a href="mailto:hello@nooise.ro" style={styles.card}>
            <div>
              <span style={styles.cardLabel}>Email</span>
              <p style={styles.cardValue}>hello@nooise.ro</p>
            </div>
            <span style={styles.cardArrow}>↗</span>
          </a>

          <a href="https://www.instagram.com/nooise___/" target="_blank" rel="noopener noreferrer" style={styles.card}>
            <div>
              <span style={styles.cardLabel}>Instagram</span>
              <p style={styles.cardValue}>@nooise___</p>
            </div>
            <span style={styles.cardArrow}>↗</span>
          </a>

          <div style={{ ...styles.card, cursor: "default" }}>
            <div>
              <span style={styles.cardLabel}>Based</span>
              <p style={styles.cardValue}>Timișoara, Romania</p>
            </div>
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
  headerLine: { width: 40, height: 1, background: "var(--ink)", marginTop: 24, transformOrigin: "left", animation: "ctLineGrow 0.7s cubic-bezier(0.22, 1, 0.36, 1) 0.2s both" },
  lead: { fontFamily: "var(--serif)", fontStyle: "italic", fontSize: 19, color: "var(--ink)", lineHeight: 1.5, margin: 0, letterSpacing: "-0.01em" },
  cards: { display: "flex", flexDirection: "column", gap: 12 },
  card: { display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 24px", borderRadius: 14, border: "1px solid var(--line)", textDecoration: "none", color: "var(--ink)" },
  cardLabel: { fontSize: 10, fontWeight: 500, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--ink-mute)" },
  cardValue: { fontSize: 16, fontWeight: 500, margin: "6px 0 0", fontVariantNumeric: "tabular-nums" },
  cardArrow: { fontSize: 16, color: "var(--ink-mute)" },
  footer: { marginTop: 64, paddingBottom: 40 },
  footerLine: { width: "100%", maxWidth: 480, height: 1, background: "var(--line)", margin: "0 auto" },
  footerInsta: { display: "block", textAlign: "center", paddingTop: 18, textDecoration: "none", color: "var(--ink-mute)", fontSize: 11, fontWeight: 500, letterSpacing: "0.04em" }
};
