"use client";

import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { useParams } from "next/navigation";
import { supabase } from "../../../lib/supabase";

const PAGE_SIZE = 30;

const EVENT_CONFIG = {
  "mall-takeover": {
    title: "Mall Takeover",
    story: "Energy takes over the space. Movement, sound, and crowd in sync."
  },
  "matchaty": {
    title: "MatchaTy",
    story: "A curated moment of rhythm, aesthetic and connection."
  },
  "sudplazza": {
    title: "SudPlazza",
    story: "Deeper sounds. Late energy. A different side of Nooise."
  }
};

export default function EventGallery() {
  const params = useParams();
  const config = EVENT_CONFIG[params?.id] || {
    title: params?.id,
    story: "Nooise experience."
  };

  const [images, setImages] = useState([]);
  const [eventData, setEventData] = useState(null);
  const [visible, setVisible] = useState(PAGE_SIZE);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [index, setIndex] = useState(0);
  const [active, setActive] = useState(false);
  const [fade, setFade] = useState(true);

  const startY = useRef(0);
  const endY = useRef(0);
  const sentinelRef = useRef(null);

  useEffect(() => {
    document.body.style.margin = "0";
    document.body.style.padding = "0";
    document.body.style.background = "#ffffff";
    if (params?.id) load();
  }, [params]);

  useEffect(() => {
    if (!sentinelRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisible((v) => Math.min(v + PAGE_SIZE, images.length));
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(sentinelRef.current);
    return () => observer.disconnect();
  }, [images]);

  async function load() {
    setLoading(true);
    setError(null);
    setImages([]);
    setVisible(PAGE_SIZE);

    const [eventRes, photosRes] = await Promise.all([
      supabase
        .from("events")
        .select("id, name, event_date, cover_image_url")
        .eq("id", params.id)
        .single(),
      supabase.storage
        .from("nooise-photos")
        .list(params.id, { limit: 1000, sortBy: { column: "name", order: "asc" } })
    ]);

    if (eventRes.data) setEventData(eventRes.data);

    if (photosRes.error || !photosRes.data) {
      setError("Could not load photos. Please try again.");
      setLoading(false);
      return;
    }

    const urls = photosRes.data
      .filter((file) => file.name && !file.name.startsWith("."))
      .map((file) => {
        const { data: urlData } = supabase.storage
          .from("nooise-photos")
          .getPublicUrl(`${params.id}/${file.name}`);
        return urlData.publicUrl;
      });

    setImages(urls);
    setLoading(false);
  }

  function open(i) { setIndex(i); setActive(true); }
  function close() { setActive(false); }

  function changeImage(i) {
    setFade(false);
    setTimeout(() => { setIndex(i); setFade(true); }, 180);
  }

  function next() { changeImage((index + 1) % images.length); }
  function prev() { changeImage((index - 1 + images.length) % images.length); }

  function onTouchStart(e) { startY.current = e.touches[0].clientY; }
  function onTouchMove(e) { endY.current = e.touches[0].clientY; }
  function onTouchEnd() {
    const diff = startY.current - endY.current;
    if (Math.abs(diff) < 40) return;
    diff > 0 ? next() : prev();
  }

  function download(url, i) {
    fetch(url)
      .then((r) => r.blob())
      .then((blob) => {
        const blobUrl = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = blobUrl;
        a.download = `nooise-${params.id}-${i + 1}.jpg`;
        a.click();
        URL.revokeObjectURL(blobUrl);
      });
  }

  const coverUrl = eventData?.cover_image_url || null;
  const displayName = eventData?.name || config.title;
  const displayDate = eventData?.event_date
    ? new Date(eventData.event_date).toLocaleDateString("ro-RO", {
        day: "numeric", month: "long", year: "numeric"
      })
    : null;

  const displayedImages = images.slice(0, visible);
  const hasMore = visible < images.length;

  return (
    <div style={styles.page}>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes fadeIn { from { opacity:0; } to { opacity:1; } }
        .img-press { transition: transform 0.1s ease; cursor: pointer; }
        .img-press:active { transform: scale(0.96); }
      `}</style>

      {/* TOP BAR */}
      <div style={styles.topBar}>
        <Link href="/photos" style={styles.backLink}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 5l-7 7 7 7"/>
          </svg>
          <span style={styles.backLabel}>All Events</span>
        </Link>
      </div>

      {/* HERO COVER */}
      {coverUrl && (
        <div style={styles.coverWrap}>
          <div style={{ ...styles.coverImg, backgroundImage: `url(${coverUrl})` }} />
          <div style={styles.coverOverlay} />
          <div style={styles.coverText}>
            <h1 style={styles.coverTitle}>{displayName}</h1>
            {displayDate && <p style={styles.coverDate}>{displayDate}</p>}
          </div>
        </div>
      )}

      {/* FALLBACK HEADER (no cover image) */}
      {!coverUrl && (
        <div style={styles.header}>
          <h1 style={styles.title}>{displayName}</h1>
          <p style={styles.story}>{config.story}</p>
        </div>
      )}

      {/* LOADING */}
      {loading && (
        <div style={styles.loadingWrap}>
          <div style={styles.spinner} />
        </div>
      )}

      {/* ERROR */}
      {error && (
        <div style={styles.errorBox}>
          <p style={styles.errorText}>{error}</p>
          <button style={styles.retryBtn} onClick={load}>Try again</button>
        </div>
      )}

      {/* EMPTY */}
      {!loading && !error && images.length === 0 && (
        <p style={styles.message}>No photos uploaded yet.</p>
      )}

      {/* COUNT */}
      {!loading && !error && images.length > 0 && (
        <p style={styles.count}>{images.length} photos</p>
      )}

      {/* GRID */}
      {!loading && !error && displayedImages.length > 0 && (
        <div style={styles.grid}>
          {displayedImages.map((url, i) => (
            <div key={i} className="img-press" style={styles.card} onClick={() => open(i)}>
              <img
                src={url}
                style={styles.image}
                loading="lazy"
                decoding="async"
              />
            </div>
          ))}
        </div>
      )}

      {/* SENTINEL */}
      {!loading && hasMore && (
        <div ref={sentinelRef} style={styles.sentinel}>
          <div style={styles.spinner} />
        </div>
      )}

      {/* END */}
      {!loading && !error && !hasMore && images.length > 0 && (
        <p style={styles.endMessage}>All {images.length} photos loaded</p>
      )}

      {/* MODAL — stays dark */}
      {active && (
        <div
          style={styles.modal}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          <div style={{ ...styles.bgGlow, backgroundImage: `url(${images[index]})` }} />

          <button style={styles.close} onClick={close}>✕</button>

          <img
            src={images[index]}
            style={{ ...styles.fullImage, opacity: fade ? 1 : 0 }}
          />

          <div style={styles.modalBottom}>
            <p style={styles.modalCounter}>{index + 1} / {images.length}</p>
            <button
              style={styles.downloadBtn}
              onClick={() => download(images[index], index)}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="7 10 12 15 17 10"/>
                <line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
              Save Photo
            </button>
          </div>
        </div>
      )}

    </div>
  );
}

const styles = {
  page: {
    background: "#ffffff",
    color: "#111",
    minHeight: "100dvh",
    margin: 0,
    fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif",
    paddingBottom: 40
  },
  topBar: {
    display: "flex",
    alignItems: "center",
    padding: "16px 20px 0"
  },
  backLink: {
    display: "flex",
    alignItems: "center",
    gap: 6,
    textDecoration: "none",
    color: "#111"
  },
  backLabel: {
    fontSize: 13,
    fontWeight: 600,
    opacity: 0.5
  },

  /* COVER HERO */
  coverWrap: {
    position: "relative",
    margin: "14px 16px 0",
    height: 200,
    borderRadius: 20,
    overflow: "hidden",
    boxShadow: "0 4px 24px rgba(0,0,0,0.12)"
  },
  coverImg: {
    position: "absolute",
    inset: 0,
    backgroundSize: "cover",
    backgroundPosition: "center"
  },
  coverOverlay: {
    position: "absolute",
    inset: 0,
    background: "linear-gradient(to top, rgba(0,0,0,0.7), rgba(0,0,0,0.1))"
  },
  coverText: {
    position: "absolute",
    bottom: 16,
    left: 16,
    right: 16
  },
  coverTitle: {
    fontSize: 22,
    fontWeight: 800,
    color: "white",
    margin: 0
  },
  coverDate: {
    fontSize: 12,
    color: "rgba(255,255,255,0.7)",
    marginTop: 4
  },

  /* FALLBACK HEADER */
  header: {
    padding: "20px 20px 8px"
  },
  title: {
    fontSize: 24,
    fontWeight: 800,
    margin: 0,
    color: "#111"
  },
  story: {
    fontSize: 13,
    color: "#aaa",
    marginTop: 6
  },

  count: {
    fontSize: 12,
    color: "#bbb",
    padding: "12px 20px 4px",
    margin: 0
  },
  loadingWrap: {
    display: "flex",
    justifyContent: "center",
    padding: "60px 0"
  },
  spinner: {
    width: 22,
    height: 22,
    border: "2px solid rgba(0,0,0,0.08)",
    borderTop: "2px solid #111",
    borderRadius: "50%",
    animation: "spin 0.8s linear infinite"
  },
  message: {
    color: "#aaa",
    fontSize: 14,
    padding: "0 20px"
  },
  errorBox: {
    margin: "0 20px",
    background: "rgba(255,60,60,0.06)",
    border: "1px solid rgba(255,60,60,0.15)",
    borderRadius: 12,
    padding: 16
  },
  errorText: {
    color: "#e05555",
    fontSize: 14,
    margin: 0
  },
  retryBtn: {
    marginTop: 10,
    background: "transparent",
    border: "1px solid rgba(200,60,60,0.3)",
    color: "#e05555",
    borderRadius: 8,
    padding: "6px 14px",
    fontSize: 13,
    cursor: "pointer"
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: 3,
    padding: "8px 16px"
  },
  card: {
    borderRadius: 8,
    overflow: "hidden",
    background: "#f5f5f5"
  },
  image: {
    width: "100%",
    aspectRatio: "1/1",
    objectFit: "cover",
    display: "block"
  },
  sentinel: {
    display: "flex",
    justifyContent: "center",
    padding: "20px 0 10px"
  },
  endMessage: {
    textAlign: "center",
    fontSize: 12,
    color: "#ccc",
    padding: "16px 0 20px",
    margin: 0
  },

  /* MODAL */
  modal: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.95)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    animation: "fadeIn 0.2s ease"
  },
  bgGlow: {
    position: "absolute",
    inset: 0,
    backgroundSize: "cover",
    backgroundPosition: "center",
    filter: "blur(60px) brightness(0.25)"
  },
  fullImage: {
    maxWidth: "90%",
    maxHeight: "80%",
    borderRadius: 16,
    zIndex: 2,
    transition: "opacity 0.2s ease",
    boxShadow: "0 8px 40px rgba(0,0,0,0.5)"
  },
  close: {
    position: "absolute",
    top: 20,
    right: 20,
    fontSize: 20,
    background: "rgba(255,255,255,0.1)",
    border: "none",
    color: "white",
    cursor: "pointer",
    zIndex: 3,
    width: 36,
    height: 36,
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backdropFilter: "blur(4px)"
  },
  modalBottom: {
    position: "absolute",
    bottom: 30,
    left: 0,
    right: 0,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 12,
    zIndex: 3
  },
  modalCounter: {
    fontSize: 12,
    color: "rgba(255,255,255,0.4)",
    margin: 0
  },
  downloadBtn: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    background: "rgba(255,255,255,0.12)",
    border: "1px solid rgba(255,255,255,0.15)",
    color: "white",
    borderRadius: 24,
    padding: "10px 20px",
    fontSize: 13,
    fontWeight: 600,
    cursor: "pointer",
    backdropFilter: "blur(8px)"
  }
};