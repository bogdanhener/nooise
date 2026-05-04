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

    // fetch event info for cover image
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

  const displayedImages = images.slice(0, visible);
  const hasMore = visible < images.length;

  const coverUrl = eventData?.cover_image_url || null;
  const displayName = eventData?.name || config.title;
  const displayDate = eventData?.event_date
    ? new Date(eventData.event_date).toLocaleDateString("ro-RO", {
        day: "numeric", month: "long", year: "numeric"
      })
    : null;

  return (
    <div style={styles.page}>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>

      {/* BACK */}
      <Link href="/photos" style={styles.backLink}>← All Events</Link>

      {/* COVER HERO — only if cover image exists in DB */}
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

      {/* HERO — fallback when no cover image */}
      {!coverUrl && (
        <div style={styles.hero}>
          <h1 style={styles.title}>{config.title}</h1>
          <p style={styles.story}>{config.story}</p>
        </div>
      )}

      {/* LOADING */}
      {loading && (
        <div style={styles.loadingWrap}>
          <div style={styles.spinner} />
          <p style={styles.message}>Loading photos...</p>
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
        <p style={styles.message}>No photos uploaded yet for this event.</p>
      )}

      {/* COUNT */}
      {!loading && !error && images.length > 0 && (
        <p style={styles.count}>{images.length} photos</p>
      )}

      {/* GRID */}
      {!loading && !error && displayedImages.length > 0 && (
        <div style={styles.grid}>
          {displayedImages.map((url, i) => (
            <div key={i} style={styles.card}>
              <img
                src={url}
                style={styles.image}
                loading="lazy"
                decoding="async"
                onClick={() => open(i)}
              />
              <button
                style={styles.gridDownload}
                onClick={(e) => { e.stopPropagation(); download(url, i); }}
              >
                ⬇
              </button>
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

      {/* MODAL — stays dark for photo viewing */}
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
          <p style={styles.modalCounter}>{index + 1} / {images.length}</p>
          <button style={styles.downloadBtn} onClick={() => download(images[index], index)}>⬇</button>
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
    fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif"
  },
  backLink: {
    color: "#111",
    textDecoration: "none",
    fontSize: 13,
    fontWeight: 600,
    opacity: 0.5,
    display: "inline-block",
    padding: "16px 16px 0"
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

  /* FALLBACK HERO */
  hero: {
    padding: "20px 16px"
  },
  title: {
    fontSize: 22,
    fontWeight: 700,
    margin: 0,
    color: "#111"
  },
  story: {
    fontSize: 13,
    color: "#888",
    marginTop: 6
  },

  count: {
    fontSize: 12,
    color: "#bbb",
    padding: "0 16px 4px",
    margin: 0
  },
  loadingWrap: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 12,
    padding: "40px 16px"
  },
  spinner: {
    width: 24,
    height: 24,
    border: "2px solid rgba(0,0,0,0.08)",
    borderTop: "2px solid #111",
    borderRadius: "50%",
    animation: "spin 0.8s linear infinite"
  },
  message: {
    color: "#aaa",
    fontSize: 14,
    padding: "0 16px"
  },
  errorBox: {
    margin: "0 16px",
    background: "rgba(255,60,60,0.06)",
    border: "1px solid rgba(255,60,60,0.2)",
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
    gap: 4,
    padding: 10
  },
  card: {
    position: "relative",
    borderRadius: 10,
    overflow: "hidden"
  },
  image: {
    width: "100%",
    aspectRatio: "1/1",
    objectFit: "cover",
    cursor: "pointer",
    display: "block"
  },
  gridDownload: {
    position: "absolute",
    bottom: 6,
    right: 6,
    width: 28,
    height: 28,
    borderRadius: "50%",
    background: "rgba(0,0,0,0.5)",
    border: "none",
    color: "white",
    fontSize: 12,
    cursor: "pointer"
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
    padding: "16px 0 40px",
    margin: 0
  },
  modal: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.95)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  bgGlow: {
    position: "absolute",
    inset: 0,
    backgroundSize: "cover",
    backgroundPosition: "center",
    filter: "blur(60px) brightness(0.3)"
  },
  fullImage: {
    maxWidth: "90%",
    maxHeight: "90%",
    borderRadius: 16,
    zIndex: 2,
    transition: "opacity 0.2s ease"
  },
  modalCounter: {
    position: "absolute",
    bottom: 24,
    left: "50%",
    transform: "translateX(-50%)",
    fontSize: 12,
    opacity: 0.5,
    color: "white",
    zIndex: 3,
    margin: 0
  },
  close: {
    position: "absolute",
    top: 20,
    right: 20,
    fontSize: 22,
    background: "transparent",
    border: "none",
    color: "white",
    cursor: "pointer",
    zIndex: 3
  },
  downloadBtn: {
    position: "absolute",
    top: 20,
    left: 20,
    width: 40,
    height: 40,
    borderRadius: "50%",
    background: "rgba(255,255,255,0.1)",
    border: "none",
    color: "white",
    cursor: "pointer",
    zIndex: 3
  }
};