"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

export default function PhotosDesktop() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => { loadEvents(); }, []);

  async function loadEvents() {
    setLoading(true);
    setError(null);
    const { data, error } = await supabase
      .from("events")
      .select("id, name, event_date, cover_image_url")
      .order("event_date", { ascending: false });

    if (error) {
      setError("Could not load events. Please try again.");
      setLoading(false);
      return;
    }

    const enriched = await Promise.all(
      (data || []).map(async (event) => {
        if (event.cover_image_url) return event;
        const { data: files } = await supabase.storage
          .from("nooise-photos")
          .list(event.id, { limit: 1, sortBy: { column: "name", order: "asc" } });
        if (files && files.length > 0 && !files[0].name.startsWith(".")) {
          const { data: urlData } = supabase.storage
            .from("nooise-photos")
            .getPublicUrl(`${event.id}/${files[0].name}`);
          return { ...event, cover_image_url: urlData.publicUrl };
        }
        return event;
      })
    );

    setEvents(enriched);
    setLoading(false);
  }

  return (
    <div className="pd-page">
      <style>{`
        .pd-page {
          padding-top: var(--nav-height);
          background: var(--paper);
          color: var(--ink);
          min-height: 100vh;
        }

        @keyframes pdFadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes pdSpin { to { transform: rotate(360deg); } }
        @keyframes pdLine {
          from { transform: scaleX(0); }
          to   { transform: scaleX(1); }
        }

        .pd-shell {
          max-width: var(--container-max);
          margin: 0 auto;
          padding: 64px var(--container-pad) 96px;
        }

        /* HEADER */
        .pd-head {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 64px;
          align-items: end;
          padding-bottom: 56px;
          border-bottom: 1px solid var(--line);
          margin-bottom: 48px;
        }
        .pd-head-eyebrow {
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 0.32em;
          text-transform: uppercase;
          color: var(--ink-mute);
          margin-bottom: 24px;
        }
        .pd-head-title {
          font-size: clamp(64px, 7vw, 120px);
          font-weight: 500;
          letter-spacing: -0.04em;
          line-height: 0.92;
          margin: 0;
        }
        .pd-head-title .it {
          font-family: var(--serif);
          font-style: italic;
          font-weight: 400;
        }
        .pd-head-meta {
          text-align: right;
          font-size: 13px;
          color: var(--ink-mute);
          line-height: 1.6;
        }
        .pd-head-meta strong {
          display: block;
          color: var(--ink);
          font-weight: 500;
          font-size: 32px;
          font-family: var(--serif);
          font-style: italic;
          letter-spacing: -0.02em;
          margin-bottom: 8px;
          font-variant-numeric: tabular-nums;
        }

        /* GRID */
        .pd-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 32px 24px;
        }

        .pd-card {
          text-decoration: none;
          color: inherit;
          opacity: 0;
        }

        .pd-frame {
          position: relative;
          width: 100%;
          aspect-ratio: 4 / 5;
          overflow: hidden;
          border-radius: 8px;
          background: #ececea;
          margin-bottom: 16px;
        }
        .pd-frame .img {
          position: absolute;
          inset: 0;
          background-size: cover;
          background-position: center;
          transition: transform 1s var(--ease), filter 0.6s var(--ease);
        }
        .pd-frame .border {
          position: absolute;
          inset: 0;
          border: 1px solid var(--line);
          border-radius: 8px;
          pointer-events: none;
        }
        .pd-frame .scrim {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(10,10,10,0) 60%, rgba(10,10,10,0.45) 100%);
          opacity: 0;
          transition: opacity 0.5s var(--ease);
          pointer-events: none;
        }
        .pd-frame .open-cue {
          position: absolute;
          bottom: 16px;
          right: 16px;
          width: 40px;
          height: 40px;
          border-radius: 999px;
          background: var(--paper);
          color: var(--ink);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transform: translateY(8px);
          transition: opacity 0.4s var(--ease), transform 0.4s var(--ease);
        }
        .pd-card:hover .pd-frame .img { transform: scale(1.04); filter: brightness(0.95); }
        .pd-card:hover .pd-frame .scrim { opacity: 1; }
        .pd-card:hover .pd-frame .open-cue { opacity: 1; transform: translateY(0); }

        .pd-caption {
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 16px;
          align-items: baseline;
        }
        .pd-cap-title {
          font-size: 17px;
          font-weight: 500;
          letter-spacing: -0.01em;
          margin: 0;
          line-height: 1.3;
        }
        .pd-cap-date {
          font-size: 12px;
          color: var(--ink-mute);
          margin: 4px 0 0;
          font-variant-numeric: tabular-nums;
        }
        .pd-cap-num {
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 0.22em;
          color: var(--ink-mute);
          padding-top: 4px;
          font-variant-numeric: tabular-nums;
        }
        .pd-cap-line {
          grid-column: 1 / -1;
          height: 1px;
          background: var(--line);
          transform: scaleX(0);
          transform-origin: left;
          margin-top: 14px;
          transition: transform 0.5s var(--ease);
        }
        .pd-card:hover .pd-cap-line { transform: scaleX(1); }

        /* STATES */
        .pd-loading {
          display: flex;
          justify-content: center;
          padding: 80px 0;
        }
        .pd-spinner {
          width: 22px;
          height: 22px;
          border: 1.5px solid var(--line-strong);
          border-top: 1.5px solid var(--ink);
          border-radius: 50%;
          animation: pdSpin 0.9s linear infinite;
        }
        .pd-empty {
          padding: 80px 0;
          text-align: center;
          color: var(--ink-mute);
          font-size: 14px;
        }
        .pd-error {
          padding: 24px;
          border: 1px solid var(--line-strong);
          border-radius: 12px;
          max-width: 480px;
          margin: 40px auto;
        }
        .pd-error p { font-size: 14px; color: var(--ink); margin: 0; }
        .pd-error button {
          margin-top: 12px;
          background: transparent;
          border: 1px solid var(--line-strong);
          color: var(--ink);
          border-radius: 8px;
          padding: 8px 16px;
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.04em;
          cursor: pointer;
          font-family: var(--sans);
        }
      `}</style>

      <div className="pd-shell">
        {/* HEADER */}
        <header className="pd-head">
          <div>
            <div className="pd-head-eyebrow">The Archive · 01</div>
            <h1 className="pd-head-title">
              Your <span className="it">photos</span>
            </h1>
          </div>
          <div className="pd-head-meta">
            <strong>{loading ? "—" : events.length}</strong>
            <span>events documented<br />select one to browse</span>
          </div>
        </header>

        {loading && (
          <div className="pd-loading"><div className="pd-spinner" /></div>
        )}

        {error && (
          <div className="pd-error">
            <p>{error}</p>
            <button onClick={loadEvents}>Try again</button>
          </div>
        )}

        {!loading && !error && events.length === 0 && (
          <p className="pd-empty">No events yet. Check back soon.</p>
        )}

        {!loading && !error && events.length > 0 && (
          <div className="pd-grid">
            {events.map((event, i) => (
              <Link
                key={event.id}
                href={`/photos/${event.id}`}
                className="pd-card"
                style={{ animation: `pdFadeUp 0.7s cubic-bezier(0.22, 1, 0.36, 1) ${i * 0.06}s forwards` }}
              >
                <div className="pd-frame">
                  {event.cover_image_url && (
                    <div className="img" style={{ backgroundImage: `url(${event.cover_image_url})` }} />
                  )}
                  <div className="border" />
                  <div className="scrim" />
                  <div className="open-cue">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </div>
                </div>
                <div className="pd-caption">
                  <div>
                    <h2 className="pd-cap-title">{event.name}</h2>
                    <p className="pd-cap-date">
                      {event.event_date
                        ? new Date(event.event_date).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })
                        : ""}
                    </p>
                  </div>
                  <span className="pd-cap-num">{String(i + 1).padStart(2, "0")}</span>
                  <div className="pd-cap-line" />
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
