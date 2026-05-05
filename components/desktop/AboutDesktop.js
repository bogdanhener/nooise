"use client";

import Link from "next/link";

export default function AboutDesktop() {
  return (
    <div className="ad-page">
      <style>{`
        .ad-page {
          padding-top: var(--nav-height);
          background: var(--paper);
          color: var(--ink);
          min-height: 100vh;
        }
        @keyframes adFadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes adLineGrow {
          from { transform: scaleX(0); }
          to   { transform: scaleX(1); }
        }

        .ad-shell {
          max-width: var(--container-max);
          margin: 0 auto;
          padding: 96px var(--container-pad) 96px;
        }

        .ad-head {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 64px;
          align-items: end;
          padding-bottom: 64px;
          border-bottom: 1px solid var(--line);
          margin-bottom: 96px;
        }
        .ad-head-eyebrow {
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 0.32em;
          text-transform: uppercase;
          color: var(--ink-mute);
          margin-bottom: 24px;
        }
        .ad-head-title {
          font-size: clamp(64px, 7vw, 120px);
          font-weight: 500;
          letter-spacing: -0.04em;
          line-height: 0.92;
          margin: 0;
        }
        .ad-head-title .it {
          font-family: var(--serif);
          font-style: italic;
          font-weight: 400;
        }
        .ad-head-meta {
          text-align: right;
          font-family: var(--serif);
          font-style: italic;
          font-size: 18px;
          color: var(--ink-mute);
          line-height: 1.6;
          max-width: 280px;
          margin-left: auto;
        }

        /* MANIFESTO BLOCK */
        .ad-manifesto {
          display: grid;
          grid-template-columns: 1fr 1.4fr;
          gap: 96px;
          align-items: start;
          margin-bottom: 96px;
        }
        .ad-manifesto-label {
          position: sticky;
          top: calc(var(--nav-height) + 32px);
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 0.32em;
          text-transform: uppercase;
          color: var(--ink-mute);
        }
        .ad-manifesto-text {
          display: flex;
          flex-direction: column;
          gap: 32px;
        }
        .ad-lead {
          font-family: var(--serif);
          font-style: italic;
          font-size: clamp(28px, 2.6vw, 40px);
          font-weight: 400;
          line-height: 1.35;
          letter-spacing: -0.02em;
          color: var(--ink);
          margin: 0;
        }
        .ad-body {
          font-size: 17px;
          line-height: 1.75;
          color: var(--ink-soft);
          margin: 0;
          max-width: 640px;
        }

        /* PILLARS GRID */
        .ad-pillars {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 32px;
          padding: 56px 0;
          border-top: 1px solid var(--line);
          border-bottom: 1px solid var(--line);
          margin-bottom: 96px;
        }
        .ad-pillar-num {
          font-family: var(--serif);
          font-style: italic;
          font-size: 56px;
          color: var(--ink-mute);
          letter-spacing: -0.03em;
          margin-bottom: 16px;
          font-variant-numeric: tabular-nums;
        }
        .ad-pillar-title {
          font-size: 22px;
          font-weight: 500;
          letter-spacing: -0.01em;
          margin: 0 0 12px;
        }
        .ad-pillar-text {
          font-size: 14px;
          color: var(--ink-soft);
          line-height: 1.65;
          margin: 0;
        }

        /* CREDITS */
        .ad-section-label {
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 0.32em;
          text-transform: uppercase;
          color: var(--ink-mute);
          margin-bottom: 32px;
          display: block;
        }
        .ad-credits {
          border-top: 1px solid var(--line);
        }
        .ad-credit-row {
          display: grid;
          grid-template-columns: 200px 1fr;
          gap: 32px;
          padding: 24px 0;
          border-bottom: 1px solid var(--line);
          align-items: baseline;
        }
        .ad-credit-label {
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--ink-mute);
        }
        .ad-credit-value {
          font-size: 18px;
          font-weight: 500;
          color: var(--ink);
        }
        .ad-credit-value a {
          color: var(--ink);
          text-decoration: none;
          border-bottom: 1px solid var(--line-strong);
          transition: border-color 0.3s var(--ease);
        }
        .ad-credit-value a:hover { border-color: var(--ink); }

        /* CTA */
        .ad-cta {
          margin-top: 96px;
          padding: 64px 0;
          border-top: 1px solid var(--line);
          text-align: center;
        }
        .ad-cta-eyebrow {
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 0.32em;
          text-transform: uppercase;
          color: var(--ink-mute);
          margin-bottom: 24px;
        }
        .ad-cta-text {
          font-family: var(--serif);
          font-style: italic;
          font-size: clamp(32px, 4vw, 56px);
          font-weight: 400;
          letter-spacing: -0.02em;
          line-height: 1.2;
          margin: 0 0 32px;
        }
        .ad-cta-link {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          padding: 16px 28px;
          background: var(--soft-dark);
          color: var(--soft-dark-text);
          border-radius: 999px;
          font-size: 12px;
          font-weight: 500;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          text-decoration: none;
          transition: padding 0.3s var(--ease);
        }
        .ad-cta-link:hover { padding-right: 36px; }
        .ad-cta-link svg { transition: transform 0.3s var(--ease); }
        .ad-cta-link:hover svg { transform: translateX(4px); }
      `}</style>

      <div className="ad-shell">
        <header className="ad-head" style={{ animation: "adFadeUp 0.8s var(--ease)" }}>
          <div>
            <div className="ad-head-eyebrow">About · Issue 02</div>
            <h1 className="ad-head-title">
              We make <span className="it">moments</span>
            </h1>
          </div>
          <div className="ad-head-meta">
            A small events project from Timișoara, building nights that don't fit on a flyer.
          </div>
        </header>

        <section className="ad-manifesto">
          <div className="ad-manifesto-label">— A note</div>
          <div className="ad-manifesto-text">
            <p className="ad-lead">
              nooise started in 2024 with one rule — make the kind of evening we actually wanted to go to.
            </p>
            <p className="ad-body">
              No flashing logos. No filler. Just music, the right people, and a setting that earns its place. Each event is its own thing. A mall takeover. A winery session. Whatever the venue, the brief is the same: take it seriously, but don't take it too seriously.
            </p>
            <p className="ad-body">
              We're a small team. We pick the rooms, the sound, the timing — and then we get out of the way. Most of what makes a nooise night work isn't visible on the flyer. It's in the choice not to overbook the floor. The decision to start later than people expect. The lineup we know but don't need to print.
            </p>
            <p className="ad-body">
              If something we put on lands for you — that's the whole thing. Come back. Bring people who'd care.
            </p>
          </div>
        </section>

        <div className="ad-pillars">
          <div>
            <div className="ad-pillar-num">01</div>
            <h3 className="ad-pillar-title">The room first</h3>
            <p className="ad-pillar-text">Venue chosen before the lineup. The space sets the night, not the other way around.</p>
          </div>
          <div>
            <div className="ad-pillar-num">02</div>
            <h3 className="ad-pillar-title">Sound, then everything else</h3>
            <p className="ad-pillar-text">If the system is wrong the rest doesn't matter. We rig before we promote.</p>
          </div>
          <div>
            <div className="ad-pillar-num">03</div>
            <h3 className="ad-pillar-title">Less than you'd think</h3>
            <p className="ad-pillar-text">No filler bookings. No padding the schedule. The night is exactly what it needs to be.</p>
          </div>
        </div>

        <section>
          <span className="ad-section-label">Credits</span>
          <div className="ad-credits">
            <div className="ad-credit-row">
              <span className="ad-credit-label">Direction</span>
              <span className="ad-credit-value">nooise</span>
            </div>
            <div className="ad-credit-row">
              <span className="ad-credit-label">Site & Identity</span>
              <span className="ad-credit-value">
                <a href="https://www.instagram.com/bogdanhener/" target="_blank" rel="noopener noreferrer">Bogdan Hener</a>
              </span>
            </div>
            <div className="ad-credit-row">
              <span className="ad-credit-label">Based</span>
              <span className="ad-credit-value">Timișoara, Romania</span>
            </div>
            <div className="ad-credit-row">
              <span className="ad-credit-label">Active</span>
              <span className="ad-credit-value">2024 — present</span>
            </div>
          </div>
        </section>

        <section className="ad-cta">
          <div className="ad-cta-eyebrow">What's next</div>
          <h2 className="ad-cta-text">
            We're cooking the next <br />one.
          </h2>
          <Link href="/events" className="ad-cta-link">
            See the calendar
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </Link>
        </section>
      </div>
    </div>
  );
}
