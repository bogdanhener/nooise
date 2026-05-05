"use client";

import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { useParams } from "next/navigation";
import { supabase } from "../../lib/supabase";

const PAGE_SIZE = 30;

const EVENT_CONFIG = {
  "mall-takeover": { title: "Mall Takeover", story: "Energy takes over the space. Movement, sound, and crowd in sync." },
  "matchaty": { title: "MatchaTy", story: "A curated moment of rhythm, aesthetic and connection." },
  "sudplazza": { title: "SudPlazza", story: "Deeper sounds. Late energy. A different side of nooise." }
};

export default function EventGalleryDesktop() {
  const params = useParams();
  const config = EVENT_CONFIG[params?.id] || { title: params?.id, story: "nooise experience." };

  const [images, setImages] = useState([]);
  const [eventData, setEventData] = useState(null);
  const [visible, setVisible] = useState(PAGE_SIZE);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [index, setIndex] = useState(0);
  const [active, setActive] = useState(false);
  const [fade, setFade] = useState(true);

  const sentinelRef = useRef(null);

  useEffect(() => {
    if (params?.id) load();
  }, [params]);

  // Infinite scroll for the grid
  useEffect(() => {
    if (!sentinelRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => { if (entries[0].isIntersecting) setVisible((v) => Math.min(v + PAGE_SIZE, images.length)); },
      { threshold: 0.1 }
    );
    observer.observe(sentinelRef.current);
    return () => observer.disconnect();
  }, [images]);

  // Keyboard nav for the lightbox
  useEffect(() => {
    if (!active) return;
    const onKey = (e) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") next();
      else if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, index, images]);

  async function load() {
    setLoading(true);
    setError(null);
    setImages([]);
    setVisible(PAGE_SIZE);

    const { data: evData } = await supabase
      .from("events")
      .select("id, name, event_date, cover_image_url")
      .eq("id", params.id)
      .single();
    if (evData) setEventData(evData);

    const { data, error } = await supabase.storage
      .from("nooise-photos")
      .list(params.id, { limit: 1000, sortBy: { column: "name", order: "asc" } });

    if (error || !data) {
      setError("Could not load photos. Please try again.");
      setLoading(false);
      return;
    }

    const urls = data
      .filter((file) => file.name && !file.name.startsWith("."))
      .map((file) => {
        const { data: urlData } = supabase.storage.from("nooise-photos").getPublicUrl(`${params.id}/${file.name}`);
        return urlData.publicUrl;
      });

    setImages(urls);
    setLoading(false);
  }

  function open(i) {
    setIndex(i);
    setActive(true);
    document.body.style.overflow = "hidden";
  }
  function close() {
    setActive(false);
    document.body.style.overflow = "";
  }
  function changeImage(i) {
    setFade(false);
    setTimeout(() => { setIndex(i); setFade(true); }, 180);
  }
  function next() { changeImage((index + 1) % images.length); }
  function prev() { changeImage((index - 1 + images.length) % images.length); }

  function download(url, i) {
    fetch(url).then((r) => r.blob()).then((blob) => {
      const blobUrl = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = blobUrl;
      a.download = `nooise-${params.id}-${i + 1}.jpg`;
      a.click();
      URL.revokeObjectURL(blobUrl);
    });
  }

  const displayedImages = images.slice(0, visible);
  const hasMore = visible < images.length;
  const coverUrl = eventData?.cover_image_url || null;
  const displayName = eventData?.name || config.title;
  const displayDate = eventData?.event_date
    ? new Date(eventData.event_date).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })
    : null;

  return (
    <div className="gd-page">
      <style>{`
        .gd-page {
          padding-top: var(--nav-height);
          background: var(--paper);
          color: var(--ink);
          min-height: 100vh;
        }
        @keyframes gdSpin { to { transform: rotate(360deg); } }
        @keyframes gdFadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .gd-shell {
          max-width: var(--container-max);
          margin: 0 auto;
          padding: 32px var(--container-pad) 96px;
        }
        .gd-crumb {
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
        .gd-crumb a {
          color: var(--ink-mute);
          text-decoration: none;
          transition: color 0.3s var(--ease);
        }
        .gd-crumb a:hover { color: var(--ink); }
        .gd-crumb-sep { opacity: 0.4; }

        /* HERO */
        .gd-hero {
          position: relative;
          height: 60vh;
          min-height: 440px;
          max-height: 640px;
          border-radius: 16px;
          overflow: hidden;
          margin-bottom: 64px;
          border: 1px solid var(--line);
          background: #ececea;
        }
        .gd-hero-img {
          position: absolute;
          inset: 0;
          background-size: cover;
          background-position: center;
        }
        .gd-hero-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(10,10,10,0.0) 30%, rgba(10,10,10,0.7) 100%);
        }
        .gd-hero-text {
          position: absolute;
          left: 48px;
          right: 48px;
          bottom: 40px;
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 32px;
          align-items: end;
          color: var(--soft-dark-text);
        }
        .gd-hero-eyebrow {
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 0.32em;
          text-transform: uppercase;
          color: rgba(245,243,239,0.65);
          margin-bottom: 16px;
        }
        .gd-hero-title {
          font-size: clamp(48px, 5vw, 80px);
          font-weight: 500;
          letter-spacing: -0.03em;
          line-height: 1;
          margin: 0;
        }
        .gd-hero-meta {
          text-align: right;
          font-size: 13px;
          color: rgba(245,243,239,0.7);
          font-variant-numeric: tabular-nums;
          line-height: 1.6;
        }
        .gd-hero-meta strong {
          display: block;
          font-family: var(--serif);
          font-style: italic;
          font-size: 28px;
          color: var(--soft-dark-text);
          font-weight: 400;
          letter-spacing: -0.02em;
          font-variant-numeric: tabular-nums;
          margin-bottom: 4px;
        }

        /* GRID */
        .gd-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 8px;
        }
        @media (min-width: 1280px) {
          .gd-grid { grid-template-columns: repeat(5, 1fr); }
        }

        .gd-cell {
          position: relative;
          aspect-ratio: 1 / 1;
          overflow: hidden;
          border-radius: 6px;
          cursor: pointer;
          background: #ececea;
        }
        .gd-cell img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.7s var(--ease), filter 0.5s var(--ease);
        }
        .gd-cell:hover img { transform: scale(1.05); filter: brightness(0.92); }
        .gd-cell::after {
          content: "";
          position: absolute;
          inset: 0;
          border: 1px solid rgba(10,10,10,0.06);
          border-radius: 6px;
          pointer-events: none;
        }

        /* COUNT */
        .gd-count {
          font-size: 12px;
          color: var(--ink-mute);
          margin: 0 0 24px;
          letter-spacing: 0.02em;
          font-variant-numeric: tabular-nums;
        }

        /* SENTINEL & END */
        .gd-sentinel {
          display: flex;
          justify-content: center;
          padding: 40px 0 16px;
        }
        .gd-spinner {
          width: 22px;
          height: 22px;
          border: 1.5px solid var(--line-strong);
          border-top: 1.5px solid var(--ink);
          border-radius: 50%;
          animation: gdSpin 0.9s linear infinite;
        }
        .gd-end {
          text-align: center;
          font-size: 11px;
          color: var(--ink-mute);
          letter-spacing: 0.18em;
          text-transform: uppercase;
          padding: 32px 0 8px;
        }
        .gd-loading {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 16px;
          padding: 80px 0;
          color: var(--ink-mute);
          font-size: 13px;
        }
        .gd-error {
          padding: 24px;
          border: 1px solid var(--line-strong);
          border-radius: 12px;
          max-width: 480px;
          margin: 40px auto;
        }
        .gd-error p { font-size: 14px; color: var(--ink); margin: 0; }
        .gd-error button {
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

        /* LIGHTBOX */
        .gd-lightbox {
          position: fixed;
          inset: 0;
          background: rgba(10, 10, 10, 0.94);
          backdrop-filter: blur(8px);
          z-index: 200;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 80px 80px 100px;
        }
        .gd-lb-stage {
          position: relative;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .gd-lb-img {
          max-width: 100%;
          max-height: 100%;
          object-fit: contain;
          border-radius: 4px;
          transition: opacity 0.18s var(--ease);
          box-shadow: 0 30px 80px -20px rgba(0,0,0,0.6);
        }
        .gd-lb-close {
          position: fixed;
          top: 24px;
          right: 24px;
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: rgba(255,255,255,0.08);
          border: 1px solid rgba(255,255,255,0.15);
          color: rgba(255,255,255,0.9);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background 0.3s var(--ease), border-color 0.3s var(--ease);
        }
        .gd-lb-close:hover {
          background: rgba(255,255,255,0.16);
          border-color: rgba(255,255,255,0.3);
        }
        .gd-lb-arrow {
          position: fixed;
          top: 50%;
          transform: translateY(-50%);
          width: 56px;
          height: 56px;
          border-radius: 50%;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.12);
          color: rgba(255,255,255,0.9);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background 0.3s var(--ease), border-color 0.3s var(--ease), transform 0.3s var(--ease);
        }
        .gd-lb-arrow.prev { left: 24px; }
        .gd-lb-arrow.next { right: 24px; }
        .gd-lb-arrow:hover {
          background: rgba(255,255,255,0.14);
          border-color: rgba(255,255,255,0.3);
        }
        .gd-lb-arrow.prev:hover { transform: translateY(-50%) translateX(-3px); }
        .gd-lb-arrow.next:hover { transform: translateY(-50%) translateX(3px); }

        .gd-lb-bottom {
          position: fixed;
          left: 0;
          right: 0;
          bottom: 0;
          padding: 24px 32px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 24px;
        }
        .gd-lb-counter {
          font-size: 12px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.55);
          font-variant-numeric: tabular-nums;
          font-weight: 500;
        }
        .gd-lb-download {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 12px 20px;
          background: rgba(255,255,255,0.1);
          border: 1px solid rgba(255,255,255,0.18);
          border-radius: 999px;
          color: rgba(255,255,255,0.95);
          font-size: 12px;
          font-weight: 500;
          letter-spacing: 0.04em;
          cursor: pointer;
          font-family: var(--sans);
          transition: background 0.3s var(--ease);
        }
        .gd-lb-download:hover { background: rgba(255,255,255,0.18); }
        .gd-lb-shortcut-hint {
          font-size: 10px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.35);
          font-weight: 500;
        }
        .gd-lb-key {
          display: inline-block;
          padding: 2px 6px;
          border: 1px solid rgba(255,255,255,0.2);
          border-radius: 4px;
          margin: 0 2px;
          color: rgba(255,255,255,0.6);
          font-family: var(--sans);
          letter-spacing: 0;
          font-size: 9px;
        }
      `}</style>

      <div className="gd-shell">
        <div className="gd-crumb">
          <Link href="/">nooise</Link>
          <span className="gd-crumb-sep">/</span>
          <Link href="/photos">Photos</Link>
          <span className="gd-crumb-sep">/</span>
          <span>{displayName}</span>
        </div>

        {/* HERO */}
        {(coverUrl || displayName) && (
          <div className="gd-hero" style={{ animation: "gdFadeUp 0.7s var(--ease)" }}>
            {coverUrl ? (
              <div className="gd-hero-img" style={{ backgroundImage: `url(${coverUrl})` }} />
            ) : (
              <div className="gd-hero-img" style={{ background: "linear-gradient(135deg, #ddd, #f0f0ed)" }} />
            )}
            <div className="gd-hero-overlay" />
            <div className="gd-hero-text">
              <div>
                <div className="gd-hero-eyebrow">The Archive</div>
                <h1 className="gd-hero-title">{displayName}</h1>
              </div>
              <div className="gd-hero-meta">
                {!loading && images.length > 0 && <strong>{images.length}</strong>}
                {displayDate && <span>{displayDate}</span>}
                {!displayDate && images.length > 0 && <span>photos</span>}
              </div>
            </div>
          </div>
        )}

        {loading && (
          <div className="gd-loading">
            <div className="gd-spinner" />
            <span>Loading photos…</span>
          </div>
        )}

        {error && (
          <div className="gd-error">
            <p>{error}</p>
            <button onClick={load}>Try again</button>
          </div>
        )}

        {!loading && !error && images.length === 0 && (
          <p className="gd-loading">No photos uploaded yet for this event.</p>
        )}

        {!loading && !error && images.length > 0 && (
          <p className="gd-count">{images.length} photos · click any image to enter</p>
        )}

        {!loading && !error && displayedImages.length > 0 && (
          <div className="gd-grid">
            {displayedImages.map((url, i) => (
              <div key={i} className="gd-cell" onClick={() => open(i)}>
                <img src={url} loading="lazy" decoding="async" alt="" />
              </div>
            ))}
          </div>
        )}

        {!loading && hasMore && (
          <div ref={sentinelRef} className="gd-sentinel">
            <div className="gd-spinner" />
          </div>
        )}

        {!loading && !error && !hasMore && images.length > 0 && (
          <p className="gd-end">All {images.length} photos loaded</p>
        )}

        {/* LIGHTBOX */}
        {active && images.length > 0 && (
          <div className="gd-lightbox" onClick={close}>
            <button className="gd-lb-close" onClick={(e) => { e.stopPropagation(); close(); }} aria-label="Close">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>

            {images.length > 1 && (
              <>
                <button className="gd-lb-arrow prev" onClick={(e) => { e.stopPropagation(); prev(); }} aria-label="Previous">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M19 12H5M12 5l-7 7 7 7"/>
                  </svg>
                </button>
                <button className="gd-lb-arrow next" onClick={(e) => { e.stopPropagation(); next(); }} aria-label="Next">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </button>
              </>
            )}

            <div className="gd-lb-stage" onClick={(e) => e.stopPropagation()}>
              <img className="gd-lb-img" src={images[index]} style={{ opacity: fade ? 1 : 0 }} alt="" />
            </div>

            <div className="gd-lb-bottom" onClick={(e) => e.stopPropagation()}>
              <span className="gd-lb-counter">{String(index + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}</span>
              <span className="gd-lb-shortcut-hint">
                <span className="gd-lb-key">←</span> <span className="gd-lb-key">→</span> navigate · <span className="gd-lb-key">esc</span> close
              </span>
              <button className="gd-lb-download" onClick={() => download(images[index], index)}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                  <polyline points="7 10 12 15 17 10"/>
                  <line x1="12" y1="15" x2="12" y2="3"/>
                </svg>
                Download
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
