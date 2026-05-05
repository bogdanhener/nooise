"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const EVENT_DATE = new Date("2026-05-09T16:00:00+03:00");

function pad(n) { return String(n).padStart(2, "0"); }

function getRemaining() {
  const now = new Date();
  const diff = EVENT_DATE.getTime() - now.getTime();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, expired: true };
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
    expired: false
  };
}

export default function CramaDesktop() {
  const [time, setTime] = useState(getRemaining());

  useEffect(() => {
    const id = setInterval(() => setTime(getRemaining()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="cd-page">
      <style>{`
        .cd-page {
          padding-top: var(--nav-height);
          background: var(--paper);
          color: var(--ink);
          min-height: 100vh;
        }

        @keyframes cdFadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes cdPulse {
          0%, 100% { opacity: 0.4; }
          50%      { opacity: 1; }
        }

        .cd-shell {
          max-width: var(--container-max);
          margin: 0 auto;
          padding: 32px var(--container-pad) 0;
        }

        /* CRUMB */
        .cd-crumb {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: var(--ink-mute);
          margin-bottom: 32px;
        }
        .cd-crumb a {
          color: var(--ink-mute);
          text-decoration: none;
          transition: color 0.3s var(--ease);
        }
        .cd-crumb a:hover { color: var(--ink); }
        .cd-crumb-sep { opacity: 0.4; }

        /* TWO-COL LAYOUT */
        .cd-grid {
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(0, 1.05fr);
          gap: 64px;
          align-items: start;
          padding-bottom: 96px;
        }

        /* LEFT — sticky poster column */
        .cd-poster-col {
          position: sticky;
          top: calc(var(--nav-height) + 32px);
          align-self: start;
        }
        .cd-poster-frame {
          position: relative;
          border-radius: 16px;
          overflow: hidden;
          aspect-ratio: 9 / 13;
          border: 1px solid var(--line);
          box-shadow: 0 30px 60px -30px rgba(10,10,10,0.18);
        }
        .cd-poster-frame img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
        .cd-poster-meta {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 20px;
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--ink-mute);
        }

        /* RIGHT — content column */
        .cd-content {
          display: flex;
          flex-direction: column;
          gap: 56px;
          opacity: 0;
          animation: cdFadeUp 0.8s var(--ease) 0.2s forwards;
        }

        /* HEADER BLOCK */
        .cd-header { display: flex; flex-direction: column; gap: 24px; }
        .cd-tag-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
        }
        .cd-tag {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--ink);
        }
        .cd-tag .dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--accent);
          animation: cdPulse 2s ease-in-out infinite;
        }
        .cd-tag-date {
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--ink-mute);
          font-variant-numeric: tabular-nums;
        }
        .cd-title {
          font-size: clamp(56px, 6vw, 96px);
          font-weight: 500;
          letter-spacing: -0.04em;
          line-height: 0.95;
          margin: 0;
        }
        .cd-title .it {
          font-family: var(--serif);
          font-style: italic;
          font-weight: 400;
        }
        .cd-subtitle {
          font-family: var(--serif);
          font-style: italic;
          font-size: 22px;
          color: var(--ink-mute);
          margin: 0;
        }

        /* COUNTDOWN */
        .cd-countdown {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          border-top: 1px solid var(--line);
          border-bottom: 1px solid var(--line);
        }
        .cd-count-cell {
          padding: 28px 0 24px;
          border-right: 1px solid var(--line);
        }
        .cd-count-cell:last-child { border-right: none; }
        .cd-count-num {
          font-family: var(--serif);
          font-size: clamp(40px, 5vw, 64px);
          font-weight: 400;
          letter-spacing: -0.04em;
          color: var(--ink);
          font-variant-numeric: tabular-nums;
          font-feature-settings: 'tnum';
          line-height: 1;
        }
        .cd-count-label {
          font-size: 9px;
          font-weight: 500;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--ink-mute);
          margin-top: 14px;
        }

        /* DESCRIPTION */
        .cd-desc-lead {
          font-family: var(--serif);
          font-style: italic;
          font-size: clamp(22px, 2vw, 28px);
          font-weight: 400;
          line-height: 1.4;
          letter-spacing: -0.01em;
          color: var(--ink);
          margin: 0;
        }
        .cd-desc-body {
          font-size: 15px;
          line-height: 1.75;
          color: var(--ink-soft);
          margin: 0;
          max-width: 560px;
        }
        .cd-desc-body + .cd-desc-body { margin-top: 14px; }

        /* INFO TABLE */
        .cd-info {
          border-top: 1px solid var(--line);
        }
        .cd-info-row {
          display: grid;
          grid-template-columns: 140px 1fr;
          gap: 32px;
          padding: 20px 0;
          border-bottom: 1px solid var(--line);
          align-items: baseline;
        }
        .cd-info-label {
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--ink-mute);
        }
        .cd-info-value {
          font-size: 16px;
          color: var(--ink);
          font-weight: 500;
          font-variant-numeric: tabular-nums;
        }
        .cd-info-value a {
          color: var(--ink);
          text-decoration: none;
          border-bottom: 1px solid var(--line-strong);
          transition: border-color 0.3s var(--ease);
        }
        .cd-info-value a:hover { border-color: var(--ink); }
        .cd-info-sub {
          font-size: 12px;
          color: var(--ink-mute);
          margin-top: 4px;
        }
        .cd-info-sub a {
          color: var(--ink-mute);
          text-decoration: none;
          transition: color 0.3s var(--ease);
        }
        .cd-info-sub a:hover { color: var(--ink); }

        /* TICKETS BLOCK — dark feature */
        .cd-tickets {
          padding: 48px;
          background: var(--soft-dark);
          color: var(--soft-dark-text);
          border-radius: 16px;
          position: relative;
          overflow: hidden;
        }
        .cd-tickets-accent {
          position: absolute;
          right: -20px;
          bottom: -60px;
          font-family: var(--serif);
          font-style: italic;
          font-size: 320px;
          color: rgba(245,243,239,0.05);
          font-weight: 400;
          line-height: 1;
          letter-spacing: -0.05em;
          pointer-events: none;
          font-variant-numeric: tabular-nums;
        }
        .cd-tickets-inner {
          position: relative;
          z-index: 2;
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 48px;
          align-items: end;
        }
        .cd-tickets-eyebrow {
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: rgba(245,243,239,0.5);
          margin-bottom: 12px;
        }
        .cd-tickets-price {
          font-family: var(--serif);
          font-style: italic;
          font-size: clamp(56px, 5vw, 80px);
          font-weight: 400;
          letter-spacing: -0.03em;
          color: var(--soft-dark-text);
          line-height: 1;
        }
        .cd-tickets-after {
          font-size: 13px;
          color: rgba(245,243,239,0.5);
          margin-top: 12px;
        }
        .cd-tickets-cta {
          display: inline-flex;
          align-items: center;
          gap: 14px;
          padding: 18px 28px;
          background: var(--paper);
          color: var(--ink);
          border-radius: 999px;
          font-size: 13px;
          font-weight: 500;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          text-decoration: none;
          transition: padding 0.3s var(--ease);
          white-space: nowrap;
        }
        .cd-tickets-cta:hover { padding-right: 36px; }
        .cd-tickets-cta svg { transition: transform 0.3s var(--ease); }
        .cd-tickets-cta:hover svg { transform: translateX(4px); }
        .cd-tickets-note {
          margin-top: 24px;
          padding-top: 24px;
          border-top: 1px solid rgba(245,243,239,0.14);
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: rgba(245,243,239,0.4);
          position: relative;
          z-index: 2;
        }

        /* TRANSPORT */
        .cd-transport {
          padding: 32px;
          border: 1px solid var(--line);
          border-radius: 16px;
        }
        .cd-transport-head {
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          margin-bottom: 16px;
        }
        .cd-transport-eyebrow {
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--ink-mute);
        }
        .cd-transport-price {
          display: flex;
          align-items: baseline;
          gap: 8px;
          font-family: var(--serif);
          font-style: italic;
          font-size: 40px;
          font-weight: 400;
          letter-spacing: -0.02em;
          color: var(--ink);
          font-variant-numeric: tabular-nums;
        }
        .cd-transport-currency {
          font-family: var(--sans);
          font-style: normal;
          font-size: 12px;
          font-weight: 500;
          letter-spacing: 0.18em;
          color: var(--ink-mute);
        }
        .cd-transport-lead {
          font-size: 14px;
          color: var(--ink-soft);
          line-height: 1.6;
          margin: 0 0 24px;
        }
        .cd-transport-points {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0;
          border-top: 1px solid var(--line);
          border-bottom: 1px solid var(--line);
        }
        .cd-transport-point {
          padding: 20px 24px 20px 0;
          border-right: 1px solid var(--line);
        }
        .cd-transport-point:last-child {
          padding-left: 24px;
          padding-right: 0;
          border-right: none;
        }
        .cd-transport-pt-label {
          font-size: 9px;
          font-weight: 500;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--ink-mute);
        }
        .cd-transport-pt-value {
          font-size: 15px;
          font-weight: 500;
          color: var(--ink);
          margin: 6px 0 6px;
        }
        .cd-transport-pt-link {
          font-size: 11px;
          color: var(--ink-soft);
          text-decoration: none;
          letter-spacing: 0.04em;
          font-weight: 500;
          border-bottom: 1px solid var(--line-strong);
          padding-bottom: 1px;
          transition: border-color 0.3s var(--ease);
        }
        .cd-transport-pt-link:hover { border-color: var(--ink); }
        .cd-transport-foot {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 20px;
          margin-bottom: 20px;
        }
        .cd-transport-foot-label {
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--ink-mute);
        }
        .cd-transport-foot-value {
          font-size: 14px;
          font-weight: 500;
          color: var(--ink);
          font-family: var(--serif);
          font-style: italic;
          font-variant-numeric: tabular-nums;
        }
        .cd-transport-cta {
          display: inline-flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          padding: 16px 24px;
          background: var(--soft-dark);
          color: var(--soft-dark-text);
          border-radius: 12px;
          font-size: 13px;
          font-weight: 500;
          letter-spacing: 0.04em;
          text-decoration: none;
          transition: opacity 0.3s var(--ease);
        }
        .cd-transport-cta:hover { opacity: 0.85; }

        /* META — entry side block */
        .cd-meta-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }
        .cd-meta-card {
          padding: 24px;
          border: 1px solid var(--line);
          border-radius: 12px;
        }
        .cd-meta-card-label {
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--ink-mute);
        }
        .cd-meta-card-text {
          font-size: 13px;
          color: var(--ink-soft);
          margin: 12px 0 0;
          line-height: 1.6;
        }

        /* TABLES */
        .cd-tables {
          padding: 32px;
          border: 1px solid var(--line);
          border-radius: 16px;
        }
        .cd-tables-head {
          margin-bottom: 16px;
        }
        .cd-tables-eyebrow {
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--ink-mute);
        }
        .cd-tables-title {
          font-size: 36px;
          font-weight: 500;
          letter-spacing: -0.02em;
          color: var(--ink);
          margin: 12px 0 0;
          line-height: 1;
        }
        .cd-tables-title .it {
          font-family: var(--serif);
          font-style: italic;
          font-weight: 400;
        }
        .cd-tables-text {
          font-size: 14px;
          color: var(--ink-soft);
          line-height: 1.6;
          margin: 16px 0 20px;
        }
        .cd-tables-tags {
          display: flex;
          gap: 8px;
          margin-bottom: 24px;
        }
        .cd-tables-tag {
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.04em;
          color: var(--ink);
          background: transparent;
          border: 1px solid var(--line-strong);
          border-radius: 999px;
          padding: 6px 14px;
        }
        .cd-tables-cta {
          display: inline-flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          padding: 16px 24px;
          background: var(--soft-dark);
          color: var(--soft-dark-text);
          border-radius: 12px;
          font-size: 13px;
          font-weight: 500;
          letter-spacing: 0.04em;
          text-decoration: none;
          transition: opacity 0.3s var(--ease);
        }
        .cd-tables-cta:hover { opacity: 0.85; }
        .cd-tables-phone {
          font-family: var(--serif);
          font-style: italic;
          font-variant-numeric: tabular-nums;
        }

        /* CTA */
        .cd-final {
          padding-top: 48px;
          border-top: 1px solid var(--line);
          text-align: center;
        }
        .cd-final-line {
          font-size: 16px;
          color: var(--ink-soft);
          margin: 0 0 8px;
        }
        .cd-final-headline {
          font-size: clamp(28px, 3vw, 40px);
          font-weight: 500;
          letter-spacing: -0.02em;
          color: var(--ink);
          line-height: 1.2;
          margin: 0;
        }
        .cd-final-headline .it {
          font-family: var(--serif);
          font-style: italic;
          font-weight: 400;
        }
      `}</style>

      <div className="cd-shell">
        <div className="cd-crumb">
          <Link href="/">nooise</Link>
          <span className="cd-crumb-sep">/</span>
          <Link href="/events">Events</Link>
          <span className="cd-crumb-sep">/</span>
          <span>Winery Session</span>
        </div>

        <div className="cd-grid">
          {/* LEFT — sticky poster */}
          <div className="cd-poster-col">
            <div className="cd-poster-frame">
              <img src="/img/nooise_crama.jpg" alt="NOOISE x Crama Thesaurus" />
            </div>
            <div className="cd-poster-meta">
              <span>Issue 02</span>
              <span>Spring · 2026</span>
            </div>
          </div>

          {/* RIGHT — content */}
          <div className="cd-content">
            <header className="cd-header">
              <div className="cd-tag-row">
                <span className="cd-tag">
                  <span className="dot" />
                  Upcoming
                </span>
                <span className="cd-tag-date">09.05.2026</span>
              </div>
              <h1 className="cd-title">
                <span className="it">Winery</span><br />Session
              </h1>
              <p className="cd-subtitle">nooise × Crama Thesaurus</p>
            </header>

            <div className="cd-countdown">
              {[
                { val: pad(time.days), label: "Days" },
                { val: pad(time.hours), label: "Hours" },
                { val: pad(time.minutes), label: "Minutes" },
                { val: pad(time.seconds), label: "Seconds" }
              ].map((c) => (
                <div key={c.label} className="cd-count-cell">
                  <div className="cd-count-num">{c.val}</div>
                  <div className="cd-count-label">{c.label}</div>
                </div>
              ))}
            </div>

            <div>
              <p className="cd-desc-lead">
                We're not stopping. We're just taking it somewhere else.
              </p>
              <p className="cd-desc-body" style={{ marginTop: 24 }}>
                On May 9, we leave the city behind and head to Crama Thesaurus — a place you already know.
                Same idea. Different setting. Even better energy.
              </p>
              <p className="cd-desc-body">
                Sunset, music and a different kind of experience. This one will be special.
              </p>
            </div>

            <div className="cd-info">
              <div className="cd-info-row">
                <span className="cd-info-label">Location</span>
                <div>
                  <div className="cd-info-value">Crama Thesaurus Wines</div>
                  <div className="cd-info-sub">
                    <a href="https://maps.google.com/?q=Crama+Thesaurus+Recas+Romania" target="_blank" rel="noopener noreferrer">Open in Maps ↗</a>
                  </div>
                </div>
              </div>
              <div className="cd-info-row">
                <span className="cd-info-label">Date</span>
                <span className="cd-info-value">Saturday · 9 May 2026</span>
              </div>
              <div className="cd-info-row">
                <span className="cd-info-label">Doors</span>
                <span className="cd-info-value">16:00 — 23:00</span>
              </div>
              <div className="cd-info-row">
                <span className="cd-info-label">Contact</span>
                <span className="cd-info-value"><a href="tel:0750232421">0750 232 421</a></span>
              </div>
            </div>

            {/* TICKETS */}
            <section className="cd-tickets">
              <div className="cd-tickets-accent">50</div>
              <div className="cd-tickets-inner">
                <div>
                  <div className="cd-tickets-eyebrow">First 50 tickets</div>
                  <div className="cd-tickets-price">Free</div>
                  <div className="cd-tickets-after">then via livetickets.ro</div>
                </div>
                <a
                  href="https://www.livetickets.ro/bilete/nooise-x-crama-thesaurus-winery-session"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cd-tickets-cta"
                >
                  Buy tickets
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </a>
              </div>
              <div className="cd-tickets-note">Limited capacity</div>
            </section>

            {/* TRANSPORT */}
            <section className="cd-transport">
              <div className="cd-transport-head">
                <span className="cd-transport-eyebrow">Transport</span>
                <span className="cd-transport-price">
                  30
                  <span className="cd-transport-currency">RON</span>
                </span>
              </div>
              <p className="cd-transport-lead">
                We've got you covered. Bus to Crama Thesaurus and back.
              </p>
              <div className="cd-transport-points">
                <div className="cd-transport-point">
                  <div className="cd-transport-pt-label">Departure</div>
                  <div className="cd-transport-pt-value">Punctele Cardinale</div>
                  <a href="https://maps.google.com/?q=Punctele+Cardinale+Timisoara" target="_blank" rel="noopener noreferrer" className="cd-transport-pt-link">Open in Maps ↗</a>
                </div>
                <div className="cd-transport-point">
                  <div className="cd-transport-pt-label">Departure</div>
                  <div className="cd-transport-pt-value">AEM Roundabout</div>
                  <a href="https://maps.google.com/?q=Sens+giratoriu+AEM+Timisoara" target="_blank" rel="noopener noreferrer" className="cd-transport-pt-link">Open in Maps ↗</a>
                </div>
              </div>
              <div className="cd-transport-foot">
                <span className="cd-transport-foot-label">Ticketing window</span>
                <span className="cd-transport-foot-value">04.05 — 07.05</span>
              </div>
              <a
                href="https://www.livetickets.ro/bilete/nooise-x-crama-thesaurus-winery-session"
                target="_blank"
                rel="noopener noreferrer"
                className="cd-transport-cta"
              >
                <span>Buy transport ticket</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </a>
            </section>

            {/* META GRID */}
            <div className="cd-meta-grid">
              <div className="cd-meta-card">
                <span className="cd-meta-card-label">Entry</span>
                <p className="cd-meta-card-text">18+ only. Door reserves the right to select guests.</p>
              </div>
              <div className="cd-meta-card">
                <span className="cd-meta-card-label">Dress</span>
                <p className="cd-meta-card-text">Outdoor, sunset to night. Layers recommended.</p>
              </div>
            </div>

            {/* TABLES */}
            <section className="cd-tables">
              <div className="cd-tables-head">
                <span className="cd-tables-eyebrow">Reservations</span>
                <h3 className="cd-tables-title"><span className="it">Tables</span></h3>
              </div>
              <p className="cd-tables-text">
                Limited tables available by prior reservation only.
              </p>
              <div className="cd-tables-tags">
                <span className="cd-tables-tag">Backstage</span>
                <span className="cd-tables-tag">Regular</span>
              </div>
              <a href="tel:0750232421" className="cd-tables-cta">
                <span>Call to reserve</span>
                <span className="cd-tables-phone">0750 232 421</span>
              </a>
            </section>

            {/* FINAL */}
            <div className="cd-final">
              <p className="cd-final-line">Get your ticket, bring your crew,</p>
              <h2 className="cd-final-headline"><span className="it">and let's make</span> nooise.</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
