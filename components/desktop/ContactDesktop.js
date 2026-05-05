"use client";

import Link from "next/link";

export default function ContactDesktop() {
  return (
    <div className="cd-page">
      <style>{`
        .cd-page {
          padding-top: var(--nav-height);
          background: var(--paper);
          color: var(--ink);
          min-height: 100vh;
        }
        @keyframes cdtFadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .cdt-shell {
          max-width: var(--container-max);
          margin: 0 auto;
          padding: 96px var(--container-pad) 96px;
        }

        .cdt-head {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 64px;
          align-items: end;
          padding-bottom: 64px;
          border-bottom: 1px solid var(--line);
          margin-bottom: 80px;
        }
        .cdt-head-eyebrow {
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 0.32em;
          text-transform: uppercase;
          color: var(--ink-mute);
          margin-bottom: 24px;
        }
        .cdt-head-title {
          font-size: clamp(64px, 7vw, 120px);
          font-weight: 500;
          letter-spacing: -0.04em;
          line-height: 0.92;
          margin: 0;
        }
        .cdt-head-title .it {
          font-family: var(--serif);
          font-style: italic;
          font-weight: 400;
        }
        .cdt-head-meta {
          text-align: right;
          font-family: var(--serif);
          font-style: italic;
          font-size: 18px;
          color: var(--ink-mute);
          line-height: 1.6;
          max-width: 320px;
          margin-left: auto;
        }

        /* GRID OF METHODS */
        .cdt-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
          margin-bottom: 80px;
        }
        .cdt-card {
          display: grid;
          grid-template-columns: 1fr auto;
          align-items: end;
          gap: 24px;
          padding: 40px;
          border-radius: 16px;
          border: 1px solid var(--line);
          color: var(--ink);
          text-decoration: none;
          min-height: 240px;
          transition: border-color 0.4s var(--ease), transform 0.4s var(--ease);
          position: relative;
          overflow: hidden;
        }
        .cdt-card:hover { border-color: var(--ink); transform: translateY(-2px); }
        .cdt-card.dark {
          background: var(--soft-dark);
          color: var(--soft-dark-text);
          border-color: var(--soft-dark);
        }
        .cdt-card-eyebrow {
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 0.32em;
          text-transform: uppercase;
          color: var(--ink-mute);
          margin-bottom: 16px;
        }
        .cdt-card.dark .cdt-card-eyebrow {
          color: rgba(245,243,239,0.5);
        }
        .cdt-card-value {
          font-size: clamp(28px, 2.5vw, 38px);
          font-weight: 500;
          letter-spacing: -0.02em;
          line-height: 1.05;
          margin: 0;
          font-variant-numeric: tabular-nums;
        }
        .cdt-card.dark .cdt-card-value { color: var(--soft-dark-text); }
        .cdt-card-value .it {
          font-family: var(--serif);
          font-style: italic;
          font-weight: 400;
        }
        .cdt-card-arrow {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          border: 1px solid var(--line-strong);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--ink);
          transition: border-color 0.3s var(--ease), background 0.3s var(--ease), color 0.3s var(--ease);
          flex-shrink: 0;
        }
        .cdt-card.dark .cdt-card-arrow {
          border-color: rgba(245,243,239,0.18);
          color: var(--soft-dark-text);
        }
        .cdt-card:hover .cdt-card-arrow {
          background: var(--ink);
          color: var(--paper);
          border-color: var(--ink);
        }
        .cdt-card.dark:hover .cdt-card-arrow {
          background: var(--paper);
          color: var(--ink);
          border-color: var(--paper);
        }
        .cdt-card-static .cdt-card-arrow { display: none; }

        /* HOURS / NOTE */
        .cdt-note-row {
          display: grid;
          grid-template-columns: 1fr 2fr;
          gap: 64px;
          padding: 56px 0;
          border-top: 1px solid var(--line);
          border-bottom: 1px solid var(--line);
          margin-bottom: 80px;
        }
        .cdt-note-label {
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 0.32em;
          text-transform: uppercase;
          color: var(--ink-mute);
        }
        .cdt-note-text {
          font-family: var(--serif);
          font-style: italic;
          font-size: clamp(22px, 2vw, 28px);
          font-weight: 400;
          line-height: 1.5;
          color: var(--ink);
          letter-spacing: -0.01em;
          margin: 0;
        }

        /* FINAL */
        .cdt-final {
          text-align: center;
          padding: 64px 0;
        }
        .cdt-final-eyebrow {
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 0.32em;
          text-transform: uppercase;
          color: var(--ink-mute);
          margin-bottom: 24px;
        }
        .cdt-final-text {
          font-size: clamp(20px, 2vw, 28px);
          color: var(--ink-soft);
          margin: 0;
        }
        .cdt-final-text a {
          color: var(--ink);
          text-decoration: none;
          border-bottom: 1px solid var(--line-strong);
          transition: border-color 0.3s var(--ease);
        }
        .cdt-final-text a:hover { border-color: var(--ink); }
      `}</style>

      <div className="cdt-shell">
        <header className="cdt-head" style={{ animation: "cdtFadeUp 0.8s var(--ease)" }}>
          <div>
            <div className="cdt-head-eyebrow">Contact</div>
            <h1 className="cdt-head-title">
              Get in <span className="it">touch</span>
            </h1>
          </div>
          <div className="cdt-head-meta">
            Booking, press, partnerships, or just hi — we read everything.
          </div>
        </header>

        <div className="cdt-grid">
          <a href="mailto:hello@nooise.ro" className="cdt-card dark">
            <div>
              <div className="cdt-card-eyebrow">Email</div>
              <p className="cdt-card-value"><span className="it">hello</span>@nooise.ro</p>
            </div>
            <span className="cdt-card-arrow">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </span>
          </a>

          <a href="tel:0750232421" className="cdt-card">
            <div>
              <div className="cdt-card-eyebrow">Phone</div>
              <p className="cdt-card-value">0750 232 421</p>
            </div>
            <span className="cdt-card-arrow">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </span>
          </a>

          <a href="https://www.instagram.com/nooise___/" target="_blank" rel="noopener noreferrer" className="cdt-card">
            <div>
              <div className="cdt-card-eyebrow">Instagram</div>
              <p className="cdt-card-value">@nooise___</p>
            </div>
            <span className="cdt-card-arrow">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </span>
          </a>

          <div className="cdt-card cdt-card-static">
            <div>
              <div className="cdt-card-eyebrow">Based</div>
              <p className="cdt-card-value"><span className="it">Timișoara</span><br />Romania</p>
            </div>
          </div>
        </div>

        <div className="cdt-note-row">
          <span className="cdt-note-label">Response</span>
          <p className="cdt-note-text">
            We reply to everything that isn't a press release we didn't ask for. Allow up to 48 hours — we're usually in a venue.
          </p>
        </div>

        <div className="cdt-final">
          <div className="cdt-final-eyebrow">Or</div>
          <p className="cdt-final-text">
            Want to know what's next? <Link href="/events">See the calendar</Link>.
          </p>
        </div>
      </div>
    </div>
  );
}
