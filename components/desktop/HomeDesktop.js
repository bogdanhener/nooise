"use client";

import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { supabase } from "../../lib/supabase";

const EVENT_DATE = new Date("2026-05-09T16:00:00+03:00");

function pad(n) {
  return String(n).padStart(2, "0");
}

function getRemaining() {
  const now = new Date();
  const diff = EVENT_DATE.getTime() - now.getTime();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, expired: true };
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  return { days, hours, minutes, seconds, expired: false };
}

export default function HomeDesktop() {
  const [mounted, setMounted] = useState(false);
  const [time, setTime] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0, expired: false });
  const [previewPhotos, setPreviewPhotos] = useState([]);

  // Refs for scroll-driven visualizer
  const heroPinRef = useRef(null);
  const logoRef = useRef(null);
  const vizRef = useRef(null);
  const eyebrowRef = useRef(null);
  const taglineRef = useRef(null);
  const metaRef = useRef(null);
  const scrollProgressRef = useRef(0);
  const rafRef = useRef(null);

  // Mark mounted after first client render
  useEffect(() => {
    setMounted(true);
    setTime(getRemaining());
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const id = setInterval(() => setTime(getRemaining()), 1000);
    return () => clearInterval(id);
  }, [mounted]);

  // Track scroll progress through the pin section
  useEffect(() => {
    if (!mounted) return;
    const onScroll = () => {
      if (!heroPinRef.current) return;
      const rect = heroPinRef.current.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      if (total <= 0) return;
      const p = Math.max(0, Math.min(1, -rect.top / total));
      scrollProgressRef.current = p;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [mounted]);

  // RAF loop — applies scroll-driven transforms smoothly
  useEffect(() => {
    if (!mounted) return;
    const startTime = performance.now();

    const tick = (now) => {
      const t = (now - startTime) / 1000;
      const p = scrollProgressRef.current;

      // Visualizer emergence:
      // 0% — hidden behind logo (scale ~0.45, opacity 0)
      // 10–60% — grows and fades in
      // 60%+ — at full size (scale 1, fully visible), continuing gentle rotation
      const emergeStart = 0.10;
      const emergeEnd = 0.60;
      const emergeRaw =
        p < emergeStart ? 0 :
        p > emergeEnd ? 1 :
        (p - emergeStart) / (emergeEnd - emergeStart);
      // Smoothstep easing
      const emerge = emergeRaw * emergeRaw * (3 - 2 * emergeRaw);

      // Logo: subtle scale-down + gentle float
      if (logoRef.current) {
        const scaleAmt = 1 - p * 0.04;
        const floatY = Math.sin(t * 0.4) * 4;
        logoRef.current.style.transform = `translateY(${floatY}px) scale(${scaleAmt})`;
      }

      // Visualizer: scale from 0.45 (hidden behind logo) to 1.0 (encircling),
      // opacity from 0 to 1, slow continuous rotation
      if (vizRef.current) {
        const vizScale = 0.45 + emerge * 0.55;
        const rotation = t * 1.2; // very slow, ~1.2°/s
        vizRef.current.style.transform = `translate(-50%, -50%) scale(${vizScale}) rotate(${rotation}deg)`;
        vizRef.current.style.opacity = String(emerge);
      }

      // Surrounding text fades out as visualizer emerges
      const textFade = Math.max(0, 1 - Math.max(0, (p - 0.05) / 0.30));
      if (eyebrowRef.current) eyebrowRef.current.style.opacity = String(textFade);
      if (taglineRef.current) taglineRef.current.style.opacity = String(textFade);
      if (metaRef.current) metaRef.current.style.opacity = String(textFade);

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [mounted]);

  // Fetch 6 real photos from the most recent event for the preview grid
  useEffect(() => {
    let cancelled = false;
    async function loadPreview() {
      try {
        const { data: events } = await supabase
          .from("events")
          .select("id")
          .order("event_date", { ascending: false })
          .limit(1);

        if (!events || events.length === 0) return;
        const eventId = events[0].id;

        const { data: files } = await supabase.storage
          .from("nooise-photos")
          .list(eventId, { limit: 30, sortBy: { column: "name", order: "asc" } });

        if (!files) return;

        const urls = files
          .filter((f) => f.name && !f.name.startsWith("."))
          .slice(0, 6)
          .map((f) => {
            const { data } = supabase.storage
              .from("nooise-photos")
              .getPublicUrl(`${eventId}/${f.name}`);
            return data.publicUrl;
          });

        if (!cancelled) setPreviewPhotos(urls);
      } catch (e) {
        // silently fail — placeholders will remain
      }
    }
    loadPreview();
    return () => { cancelled = true; };
  }, []);

  return (
    <div className="hd-page">
      <style>{`
        .hd-page {
          padding-top: var(--nav-height);
          background: var(--paper);
          color: var(--ink);
          min-height: 100vh;
        }

        @keyframes hdFadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes hdMarquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @keyframes hdPulse {
          0%, 100% { opacity: 0.4; }
          50%      { opacity: 1; }
        }

        /* HERO — scroll-driven pinned section with visualizer */
        .hd-hero-pin {
          position: relative;
          height: 150vh;
        }
        .hd-hero {
          position: sticky;
          top: 0;
          height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 0 var(--container-pad);
          overflow: hidden;
        }
        @keyframes hdElementIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        .hd-hero-eyebrow {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, calc(-50% - 220px));
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 0.32em;
          text-transform: uppercase;
          color: var(--ink-mute);
          opacity: 0;
          animation: hdElementIn 0.9s var(--ease) 0.1s forwards;
          z-index: 3;
          white-space: nowrap;
        }
        .hd-hero-stage {
          position: relative;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .hd-hero-viz {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 720px;
          height: 720px;
          pointer-events: none;
          z-index: 1;
          opacity: 0;
          transform: translate(-50%, -50%) scale(0.45);
          will-change: transform, opacity;
        }
        .hd-hero-viz img {
          width: 100%;
          height: 100%;
          display: block;
          /* Drop the black background via invert+hue-rotate, multiply against white keeps only the colored bars visible */
          filter: invert(1) hue-rotate(180deg);
          mix-blend-mode: multiply;
        }
        @keyframes hdLogoIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        .hd-hero-logo {
          position: relative;
          z-index: 2;
          width: clamp(280px, 32vw, 480px);
          opacity: 0;
          animation: hdLogoIn 1.1s var(--ease) 0.25s forwards;
          will-change: transform;
        }
        .hd-hero-tagline {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, calc(-50% + 200px));
          font-family: var(--serif);
          font-style: italic;
          font-size: clamp(20px, 2vw, 28px);
          color: var(--ink-soft);
          letter-spacing: -0.01em;
          opacity: 0;
          animation: hdElementIn 1.1s var(--ease) 0.45s forwards;
          z-index: 3;
          margin: 0;
          white-space: nowrap;
        }
        .hd-hero-meta {
          position: absolute;
          bottom: 40px;
          left: var(--container-pad);
          right: var(--container-pad);
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--ink-mute);
          opacity: 0;
          animation: hdFadeUp 1s var(--ease) 0.7s forwards;
          z-index: 3;
        }
        .hd-hero-meta .scroll-cue {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .hd-hero-meta .scroll-line {
          width: 24px;
          height: 1px;
          background: var(--ink-mute);
        }

        /* MARQUEE */
        .hd-marquee-wrap {
          border-top: 1px solid var(--line);
          border-bottom: 1px solid var(--line);
          overflow: hidden;
          padding: 28px 0;
          background: var(--paper);
        }
        .hd-marquee-track {
          display: flex;
          gap: 64px;
          width: fit-content;
          animation: hdMarquee 40s linear infinite;
          font-family: var(--serif);
          font-style: italic;
          font-size: clamp(28px, 4vw, 56px);
          font-weight: 400;
          letter-spacing: -0.02em;
          color: var(--ink);
          white-space: nowrap;
        }
        .hd-marquee-track:hover { animation-play-state: paused; }
        .hd-marquee-dot {
          display: inline-block;
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: var(--accent);
          margin: auto 0;
          align-self: center;
        }

        /* SPLIT PANELS — next event + photos */
        .hd-split {
          display: grid;
          grid-template-columns: 1fr 1fr;
          min-height: 80vh;
          border-bottom: 1px solid var(--line);
        }
        .hd-half {
          padding: 80px var(--container-pad);
          position: relative;
          overflow: hidden;
          transition: background 0.6s var(--ease);
          cursor: pointer;
          text-decoration: none;
          color: inherit;
          display: flex;
          flex-direction: column;
        }

        /* LEFT — NEXT EVENT (dark) */
        .hd-event {
          background: var(--soft-dark);
          color: var(--soft-dark-text);
          border-right: 1px solid var(--line);
        }
        .hd-event-bg {
          position: absolute;
          inset: 0;
          background-image: url('/img/nooise_crama.jpg');
          background-size: cover;
          background-position: center;
          opacity: 0.55;
          transform: scale(1);
          transition: opacity 0.8s var(--ease), transform 1.4s var(--ease);
          pointer-events: none;
          filter: grayscale(0.2);
        }
        .hd-event:hover .hd-event-bg {
          opacity: 0.85;
          transform: scale(1.04);
          filter: grayscale(0);
        }
        .hd-event-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(42,39,36,0.55) 0%, rgba(42,39,36,0.92) 100%);
          opacity: 1;
          transition: opacity 0.6s var(--ease);
          pointer-events: none;
        }
        .hd-event:hover .hd-event-overlay {
          background: linear-gradient(180deg, rgba(42,39,36,0.4) 0%, rgba(42,39,36,0.85) 100%);
        }

        .hd-event-content {
          position: relative;
          z-index: 2;
          display: flex;
          flex-direction: column;
          height: 100%;
          gap: 32px;
        }
        .hd-event-eyebrow {
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(245,243,239,0.55);
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .hd-event-pulse {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--accent);
          animation: hdPulse 2s ease-in-out infinite;
        }
        .hd-event-title {
          font-size: clamp(40px, 4.5vw, 68px);
          font-weight: 500;
          letter-spacing: -0.03em;
          line-height: 1;
          margin: 0;
          color: var(--soft-dark-text);
        }
        .hd-event-title .it {
          font-family: var(--serif);
          font-style: italic;
          font-weight: 400;
        }
        .hd-event-subtitle {
          font-family: var(--serif);
          font-style: italic;
          font-size: 18px;
          color: rgba(245,243,239,0.5);
          margin: -16px 0 0;
        }
        .hd-event-spacer { flex: 1; }

        .hd-countdown {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 0;
          border-top: 1px solid rgba(245,243,239,0.14);
          border-bottom: 1px solid rgba(245,243,239,0.14);
        }
        .hd-count-cell {
          padding: 24px 0;
          text-align: left;
          border-right: 1px solid rgba(245,243,239,0.14);
        }
        .hd-count-cell:last-child { border-right: none; }
        .hd-count-num {
          font-family: var(--serif);
          font-size: clamp(32px, 4vw, 56px);
          font-weight: 400;
          letter-spacing: -0.04em;
          color: var(--soft-dark-text);
          font-variant-numeric: tabular-nums;
          font-feature-settings: 'tnum';
          line-height: 1;
        }
        .hd-count-label {
          font-size: 9px;
          font-weight: 500;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: rgba(245,243,239,0.4);
          margin-top: 12px;
        }

        .hd-event-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .hd-event-meta {
          display: flex;
          gap: 32px;
          font-size: 12px;
          color: rgba(245,243,239,0.7);
          font-variant-numeric: tabular-nums;
        }
        .hd-event-cta {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          padding: 14px 24px;
          background: var(--paper);
          color: var(--ink);
          border-radius: 999px;
          font-size: 12px;
          font-weight: 500;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          text-decoration: none;
          transition: transform 0.3s var(--ease), padding 0.3s var(--ease);
        }
        .hd-event-cta:hover {
          padding-right: 32px;
        }
        .hd-event-cta svg {
          transition: transform 0.3s var(--ease);
        }
        .hd-event-cta:hover svg { transform: translateX(4px); }

        /* RIGHT — PHOTOS */
        .hd-photos {
          background: var(--paper);
          color: var(--ink);
        }
        .hd-photos-content {
          display: flex;
          flex-direction: column;
          height: 100%;
          gap: 32px;
          position: relative;
          z-index: 2;
        }
        .hd-photos-header {
          display: flex;
          flex-direction: column;
          gap: 32px;
        }
        .hd-photos-title {
          font-size: clamp(40px, 4.5vw, 68px);
          font-weight: 500;
          letter-spacing: -0.03em;
          line-height: 1;
          margin: 0;
        }
        .hd-photos-title .it {
          font-family: var(--serif);
          font-style: italic;
          font-weight: 400;
        }
        .hd-photos-grid {
          flex: 1;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          grid-template-rows: repeat(2, 1fr);
          gap: 8px;
          min-height: 280px;
        }
        .hd-photo-cell {
          background: linear-gradient(135deg, #ddd, #f0f0ed);
          background-size: cover;
          background-position: center;
          border-radius: 6px;
          opacity: 0.35;
          filter: grayscale(0.4);
          transition: opacity 0.6s var(--ease), filter 0.6s var(--ease), transform 0.8s var(--ease);
        }
        .hd-photos:hover .hd-photo-cell {
          opacity: 1;
          filter: grayscale(0);
        }
        .hd-photos:hover .hd-photo-cell:nth-child(1) { transition-delay: 0s; }
        .hd-photos:hover .hd-photo-cell:nth-child(2) { transition-delay: 0.05s; }
        .hd-photos:hover .hd-photo-cell:nth-child(3) { transition-delay: 0.1s; }
        .hd-photos:hover .hd-photo-cell:nth-child(4) { transition-delay: 0.15s; }
        .hd-photos:hover .hd-photo-cell:nth-child(5) { transition-delay: 0.2s; }
        .hd-photos:hover .hd-photo-cell:nth-child(6) { transition-delay: 0.25s; }
        .hd-photos:hover .hd-photo-cell.hero { transform: scale(1.02); }

        .hd-photos-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .hd-photos-meta {
          font-size: 12px;
          color: var(--ink-mute);
        }
        .hd-photos-cta {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          padding: 14px 24px;
          background: var(--ink);
          color: var(--paper);
          border-radius: 999px;
          font-size: 12px;
          font-weight: 500;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          text-decoration: none;
          transition: transform 0.3s var(--ease), padding 0.3s var(--ease);
        }
        .hd-photos-cta:hover {
          padding-right: 32px;
        }
        .hd-photos-cta svg {
          transition: transform 0.3s var(--ease);
        }
        .hd-photos-cta:hover svg { transform: translateX(4px); }

        /* MANIFESTO */
        .hd-manifesto {
          padding: 160px var(--container-pad);
          text-align: center;
          max-width: 1100px;
          margin: 0 auto;
        }
        .hd-manifesto-eyebrow {
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 0.32em;
          text-transform: uppercase;
          color: var(--ink-mute);
          margin-bottom: 32px;
        }
        .hd-manifesto-text {
          font-family: var(--serif);
          font-style: italic;
          font-size: clamp(28px, 3.5vw, 48px);
          font-weight: 400;
          letter-spacing: -0.02em;
          line-height: 1.3;
          color: var(--ink);
          margin: 0;
        }
        .hd-manifesto-text .accent {
          color: var(--ink-mute);
        }

        /* FOOTER */
        .hd-footer {
          border-top: 1px solid var(--line);
          padding: 64px var(--container-pad) 32px;
        }
        .hd-footer-inner {
          max-width: var(--container-max);
          margin: 0 auto;
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1fr;
          gap: 48px;
          padding-bottom: 64px;
          border-bottom: 1px solid var(--line);
        }
        .hd-footer-brand img {
          width: 110px;
          display: block;
          margin-bottom: 16px;
        }
        .hd-footer-tag {
          font-family: var(--serif);
          font-style: italic;
          font-size: 16px;
          color: var(--ink-soft);
          line-height: 1.5;
          max-width: 280px;
          margin: 0;
        }
        .hd-footer-col h4 {
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--ink-mute);
          margin: 0 0 20px;
        }
        .hd-footer-col a, .hd-footer-col span {
          display: block;
          font-size: 13px;
          color: var(--ink);
          text-decoration: none;
          margin-bottom: 10px;
          transition: color 0.3s var(--ease);
        }
        .hd-footer-col a:hover { color: var(--ink-mute); }
        .hd-footer-bottom {
          max-width: var(--container-max);
          margin: 0 auto;
          padding-top: 24px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--ink-mute);
        }
        .hd-footer-bottom a {
          color: var(--ink-mute);
          text-decoration: none;
          letter-spacing: 0.04em;
          text-transform: none;
          font-weight: 500;
        }
      `}</style>

      {/* HERO — pinned with scroll-driven visualizer */}
      <div className="hd-hero-pin" ref={heroPinRef}>
        <section className="hd-hero">
          <span className="hd-hero-eyebrow" ref={eyebrowRef}>Timișoara · 2026</span>

          <div className="hd-hero-stage">
            {mounted && (
              <div ref={vizRef} className="hd-hero-viz">
                <img src="/music_wave.png" alt="" />
              </div>
            )}

            <img
              ref={logoRef}
              src="/nooise.svg"
              alt="nooise"
              className="hd-hero-logo"
            />
          </div>

          <p className="hd-hero-tagline" ref={taglineRef}>Events. Energy. Moments.</p>
          <div className="hd-hero-meta" ref={metaRef}>
            <span>Issue 02 — Spring</span>
            <div className="scroll-cue">
              <span>Scroll</span>
              <span className="scroll-line" />
            </div>
          </div>
        </section>
      </div>

      {/* SPLIT PANELS */}
      <div className="hd-split">
        {/* LEFT — Next event */}
        <Link href="/events/crama-thesaurus" className="hd-half hd-event">
          <div className="hd-event-bg" />
          <div className="hd-event-overlay" />
          <div className="hd-event-content">
            <span className="hd-event-eyebrow">
              <span className="hd-event-pulse" />
              Next Event
            </span>

            <div>
              <h2 className="hd-event-title">
                <span className="it">Winery</span><br />Session
              </h2>
              <p className="hd-event-subtitle">nooise × Crama Thesaurus</p>
            </div>

            <div className="hd-event-spacer" />

            <div className="hd-countdown">
              {[
                { val: mounted ? pad(time.days) : "—", label: "Days" },
                { val: mounted ? pad(time.hours) : "—", label: "Hours" },
                { val: mounted ? pad(time.minutes) : "—", label: "Minutes" },
                { val: mounted ? pad(time.seconds) : "—", label: "Seconds" }
              ].map((c) => (
                <div key={c.label} className="hd-count-cell">
                  <div className="hd-count-num">{c.val}</div>
                  <div className="hd-count-label">{c.label}</div>
                </div>
              ))}
            </div>

            <div className="hd-event-footer">
              <div className="hd-event-meta">
                <span>09.05.2026</span>
                <span>16:00 — 23:00</span>
              </div>
              <span className="hd-event-cta">
                Open
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </span>
            </div>
          </div>
        </Link>

        {/* RIGHT — Photos */}
        <Link href="/photos" className="hd-half hd-photos">
          <div className="hd-photos-content">
            <div className="hd-photos-header">
              <span className="hd-event-eyebrow" style={{ color: "var(--ink-mute)" }}>
                The Archive
              </span>
              <h2 className="hd-photos-title">
                Your <span className="it">photos</span>
              </h2>
            </div>

            <div className="hd-photos-grid">
              {Array.from({ length: 6 }).map((_, i) => {
                const photo = previewPhotos[i];
                return (
                  <div
                    key={i}
                    className={`hd-photo-cell ${i === 0 ? "hero" : ""}`}
                    style={{
                      backgroundImage: photo
                        ? `url(${photo})`
                        : `linear-gradient(${135 + i * 20}deg, hsl(${30 + i * 8}, 8%, ${78 - i * 4}%), hsl(${20 + i * 6}, 6%, ${88 - i * 3}%))`
                    }}
                  />
                );
              })}
            </div>

            <div className="hd-photos-footer">
              <span className="hd-photos-meta">Browse every event</span>
              <span className="hd-photos-cta">
                Enter archive
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </span>
            </div>
          </div>
        </Link>
      </div>

      {/* MANIFESTO */}
      <section className="hd-manifesto">
        <div className="hd-manifesto-eyebrow">A Note</div>
        <p className="hd-manifesto-text">
          We make moments <span className="accent">that don't fit</span> on a flyer.
        </p>
      </section>

      {/* FOOTER */}
      <footer className="hd-footer">
        <div className="hd-footer-inner">
          <div className="hd-footer-brand">
            <img src="/nooise.svg" alt="nooise" />
            <p className="hd-footer-tag">
              An events brand from Timișoara. Built around energy, music, and the moments in between.
            </p>
          </div>
          <div className="hd-footer-col">
            <h4>Navigate</h4>
            <Link href="/about">About</Link>
            <Link href="/events">Events</Link>
            <Link href="/photos">Photos</Link>
            <Link href="/contact">Contact</Link>
          </div>
          <div className="hd-footer-col">
            <h4>Follow</h4>
            <a href="https://www.instagram.com/nooise___/" target="_blank" rel="noopener noreferrer">Instagram</a>
            <a href="mailto:hello@nooise.ro">Email</a>
          </div>
          <div className="hd-footer-col">
            <h4>Next</h4>
            <Link href="/events/crama-thesaurus">Winery Session</Link>
            <span style={{ color: "var(--ink-mute)" }}>9 May 2026</span>
          </div>
        </div>
        <div className="hd-footer-bottom">
          <span>2026 © nooise</span>
          <a href="https://www.instagram.com/bogdanhener/" target="_blank" rel="noopener noreferrer">
            designed by bogdanhener
          </a>
        </div>
      </footer>
    </div>
  );
}