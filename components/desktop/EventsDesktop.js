"use client";

import Link from "next/link";

const EVENTS = [
  {
    id: "crama-thesaurus",
    title: "Winery Session",
    subtitle: "nooise × Crama Thesaurus",
    date: "9 May 2026",
    dateShort: "09.05.2026",
    location: "Crama Thesaurus, Recaș",
    description: "Sunset, music and a different kind of experience. We leave the city behind for one night.",
    poster: "/img/nooise_crama.jpg",
    status: "upcoming"
  }
];

export default function EventsDesktop() {
  const upcoming = EVENTS.filter((e) => e.status === "upcoming");
  const past = EVENTS.filter((e) => e.status === "past");

  return (
    <div className="ed-page">
      <style>{`
        .ed-page {
          padding-top: var(--nav-height);
          background: var(--paper);
          color: var(--ink);
          min-height: 100vh;
        }
        @keyframes edFadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .ed-shell {
          max-width: var(--container-max);
          margin: 0 auto;
          padding: 64px var(--container-pad) 96px;
        }

        /* HEADER */
        .ed-head {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 64px;
          align-items: end;
          padding-bottom: 56px;
          border-bottom: 1px solid var(--line);
          margin-bottom: 80px;
        }
        .ed-head-eyebrow {
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 0.32em;
          text-transform: uppercase;
          color: var(--ink-mute);
          margin-bottom: 24px;
        }
        .ed-head-title {
          font-size: clamp(72px, 8vw, 140px);
          font-weight: 500;
          letter-spacing: -0.04em;
          line-height: 0.92;
          margin: 0;
          font-family: var(--serif);
          font-style: italic;
          font-weight: 400;
        }
        .ed-head-meta {
          text-align: right;
          font-size: 13px;
          color: var(--ink-mute);
          line-height: 1.6;
          max-width: 280px;
          margin-left: auto;
        }

        /* SECTION */
        .ed-section {
          margin-bottom: 96px;
        }
        .ed-section-head {
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          margin-bottom: 32px;
        }
        .ed-section-title {
          font-size: 14px;
          font-weight: 500;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--ink);
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .ed-section-title .dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--accent);
        }
        .ed-section-count {
          font-size: 11px;
          color: var(--ink-mute);
          letter-spacing: 0.18em;
          text-transform: uppercase;
          font-variant-numeric: tabular-nums;
        }

        /* FEATURED CARD (upcoming) */
        .ed-feature {
          display: grid;
          grid-template-columns: 1.05fr 1fr;
          gap: 64px;
          align-items: stretch;
          text-decoration: none;
          color: inherit;
          padding: 32px 0;
        }
        .ed-feature-poster {
          aspect-ratio: 9 / 13;
          max-height: 640px;
          border-radius: 16px;
          overflow: hidden;
          position: relative;
          border: 1px solid var(--line);
          background: #ececea;
        }
        .ed-feature-poster img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 1.2s var(--ease);
        }
        .ed-feature:hover .ed-feature-poster img { transform: scale(1.03); }
        .ed-feature-content {
          display: flex;
          flex-direction: column;
          gap: 32px;
          padding: 16px 0;
        }
        .ed-feature-num {
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 0.32em;
          text-transform: uppercase;
          color: var(--ink-mute);
          font-variant-numeric: tabular-nums;
        }
        .ed-feature-title {
          font-size: clamp(56px, 6vw, 96px);
          font-weight: 500;
          letter-spacing: -0.04em;
          line-height: 0.95;
          margin: 0;
        }
        .ed-feature-title .it {
          font-family: var(--serif);
          font-style: italic;
          font-weight: 400;
        }
        .ed-feature-subtitle {
          font-family: var(--serif);
          font-style: italic;
          font-size: 22px;
          color: var(--ink-mute);
          margin: 0;
        }
        .ed-feature-info {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          border-top: 1px solid var(--line);
          border-bottom: 1px solid var(--line);
        }
        .ed-feature-info-cell {
          padding: 20px 0;
          border-right: 1px solid var(--line);
          padding-right: 24px;
        }
        .ed-feature-info-cell:last-child {
          border-right: none;
          padding-left: 24px;
          padding-right: 0;
        }
        .ed-feature-info-label {
          font-size: 9px;
          font-weight: 500;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--ink-mute);
        }
        .ed-feature-info-value {
          font-size: 16px;
          font-weight: 500;
          color: var(--ink);
          margin-top: 8px;
          font-variant-numeric: tabular-nums;
        }
        .ed-feature-desc {
          font-size: 16px;
          line-height: 1.7;
          color: var(--ink-soft);
          margin: 0;
        }
        .ed-feature-cta {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          font-size: 12px;
          font-weight: 500;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: var(--ink);
          padding-bottom: 8px;
          border-bottom: 1px solid var(--ink);
          align-self: flex-start;
          transition: padding 0.3s var(--ease);
        }
        .ed-feature:hover .ed-feature-cta { padding-right: 12px; }
        .ed-feature-cta svg { transition: transform 0.3s var(--ease); }
        .ed-feature:hover .ed-feature-cta svg { transform: translateX(4px); }

        /* PAST */
        .ed-past-list {
          border-top: 1px solid var(--line);
        }
        .ed-past-row {
          display: grid;
          grid-template-columns: 80px 1fr 200px auto;
          gap: 32px;
          align-items: baseline;
          padding: 24px 0;
          border-bottom: 1px solid var(--line);
          color: var(--ink);
          text-decoration: none;
          transition: padding 0.3s var(--ease);
        }
        .ed-past-row:hover { padding-left: 8px; }
        .ed-past-num {
          font-size: 12px;
          color: var(--ink-mute);
          letter-spacing: 0.18em;
          font-variant-numeric: tabular-nums;
        }
        .ed-past-title {
          font-size: 22px;
          font-weight: 500;
          letter-spacing: -0.01em;
        }
        .ed-past-title .it {
          font-family: var(--serif);
          font-style: italic;
          font-weight: 400;
          color: var(--ink-soft);
        }
        .ed-past-date {
          font-size: 13px;
          color: var(--ink-mute);
          font-variant-numeric: tabular-nums;
        }
        .ed-past-arrow {
          font-size: 14px;
          color: var(--ink-mute);
          transition: transform 0.3s var(--ease), color 0.3s var(--ease);
        }
        .ed-past-row:hover .ed-past-arrow {
          transform: translateX(4px);
          color: var(--ink);
        }
        .ed-past-empty {
          padding: 48px 0;
          text-align: center;
          color: var(--ink-mute);
          font-size: 14px;
          font-family: var(--serif);
          font-style: italic;
        }
      `}</style>

      <div className="ed-shell">
        <header className="ed-head">
          <div>
            <div className="ed-head-eyebrow">The Calendar · 2026</div>
            <h1 className="ed-head-title">Events</h1>
          </div>
          <div className="ed-head-meta">
            A working calendar of nooise nights. Past, upcoming, and the kind we don't announce until the week of.
          </div>
        </header>

        {/* UPCOMING */}
        <section className="ed-section" style={{ animation: "edFadeUp 0.7s var(--ease)" }}>
          <div className="ed-section-head">
            <h2 className="ed-section-title">
              <span className="dot" />
              Upcoming
            </h2>
            <span className="ed-section-count">{String(upcoming.length).padStart(2, "0")} scheduled</span>
          </div>

          {upcoming.length === 0 && (
            <p className="ed-past-empty">Nothing on the calendar right now. Watch this space.</p>
          )}

          {upcoming.map((event, i) => (
            <Link key={event.id} href={`/events/${event.id}`} className="ed-feature">
              <div className="ed-feature-poster">
                <img src={event.poster} alt={event.title} />
              </div>
              <div className="ed-feature-content">
                <span className="ed-feature-num">No. {String(i + 1).padStart(2, "0")} · {event.dateShort}</span>
                <div>
                  <h3 className="ed-feature-title">
                    <span className="it">Winery</span><br />Session
                  </h3>
                  <p className="ed-feature-subtitle" style={{ marginTop: 16 }}>{event.subtitle}</p>
                </div>
                <p className="ed-feature-desc">{event.description}</p>
                <div className="ed-feature-info">
                  <div className="ed-feature-info-cell">
                    <div className="ed-feature-info-label">Date</div>
                    <div className="ed-feature-info-value">{event.date}</div>
                  </div>
                  <div className="ed-feature-info-cell">
                    <div className="ed-feature-info-label">Location</div>
                    <div className="ed-feature-info-value" style={{ fontFamily: "var(--sans)" }}>{event.location}</div>
                  </div>
                </div>
                <span className="ed-feature-cta">
                  Open event
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </span>
              </div>
            </Link>
          ))}
        </section>

        {/* PAST */}
        <section className="ed-section">
          <div className="ed-section-head">
            <h2 className="ed-section-title" style={{ color: "var(--ink-mute)" }}>
              Past
            </h2>
            <span className="ed-section-count">archive</span>
          </div>

          {past.length === 0 ? (
            <p className="ed-past-empty">The archive is quiet. New entries get added here as they happen.</p>
          ) : (
            <div className="ed-past-list">
              {past.map((event, i) => (
                <Link key={event.id} href={`/events/${event.id}`} className="ed-past-row">
                  <span className="ed-past-num">{String(i + 1).padStart(2, "0")}</span>
                  <span className="ed-past-title">{event.title}</span>
                  <span className="ed-past-date">{event.date}</span>
                  <span className="ed-past-arrow">→</span>
                </Link>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
