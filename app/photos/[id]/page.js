"use client";

import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { useParams } from "next/navigation";
import { supabase } from "../../../lib/supabase";

const PAGE_SIZE = 30;

const EVENT_CONFIG = {
  "mall-takeover": {
    title: "Mall Takeover",
    story: "Energy takes over the space. Movement, sound, and crowd in sync.",
    glow: "rgba(0, 200, 255, 0.5)"
  },
  "matchaty": {
    title: "MatchaTy",
    story: "A curated moment of rhythm, aesthetic and connection.",
    glow: "rgba(120, 255, 160, 0.5)"
  },
  "sudplazza": {
    title: "SudPlazza",
    story: "Deeper sounds. Late energy. A different side of Nooise.",
    glow: "rgba(168, 85, 247, 0.5)"
  }
};

export default function EventGallery() {
  const params = useParams();
  const config = EVENT_CONFIG[params?.id] || {
    title: params?.id,
    story: "Nooise experience.",
    glow: "rgba(255,255,255,0.3)"
  };

  const [images, setImages] = useState([]);
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
    document.body.style.background = "#05050a";
    if (params?.id) load();
  }, [params]);

  // watch sentinel div — when it enters viewport, render 30 more
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

  return (
    <div style={styles.page}>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>

      {/* BACK */}
      <Link href="/photos" style={styles.backLink}>← All Events</Link>

      {/* HERO */}
      <div style={styles.hero}>
        <div style={{ ...styles.glow, background: `radial-gradient(circle, ${config.glow}, transparent)` }} />
        <h1 style={styles.title}>{config.title}</h1>
        <p style={styles.story}>{config.story}</p>
      </div>

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

      {/* GRID — only renders visible slice, not all at once */}
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

      {/* SENTINEL — invisible, triggers more photos when scrolled into view */}
      {!loading && hasMore && (
        <div ref={sentinelRef} style={styles.sentinel}>
          <div style={styles.spinner} />
        </div>
      )}

      {/* END */}
      {!loading && !error && !hasMore && images.length > 0 && (
        <p style={styles.endMessage}>All {images.length} photos loaded</p>
      )}

      {/* MODAL */}
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
    background: "#05050a",
    color: "white",
    minHeight: "100dvh",
    margin: 0,
    fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif"
  },
  backLink: {
    color: "#ffcf6a",
    textDecoration: "none",
    fontSize: 13,
    opacity: 0.8,
    display: "inline-block",
    padding: "16px 16px 0"
  },
  hero: {
    padding: "20px 16px",
    position: "relative"
  },
  glow: {
    position: "absolute",
    width: 220,
    height: 220,
    filter: "blur(50px)",
    top: 0,
    left: 20
  },
  title: {
    fontSize: 22,
    fontWeight: 600,
    margin: 0
  },
  story: {
    fontSize: 13,
    opacity: 0.65,
    marginTop: 6
  },
  count: {
    fontSize: 12,
    opacity: 0.4,
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
    border: "2px solid rgba(255,207,106,0.2)",
    borderTop: "2px solid #ffcf6a",
    borderRadius: "50%",
    animation: "spin 0.8s linear infinite"
  },
  message: {
    opacity: 0.6,
    fontSize: 14,
    padding: "0 16px"
  },
  errorBox: {
    margin: "0 16px",
    background: "rgba(255,60,60,0.1)",
    border: "1px solid rgba(255,60,60,0.3)",
    borderRadius: 12,
    padding: 16
  },
  errorText: {
    color: "#ff6b6b",
    fontSize: 14,
    margin: 0
  },
  retryBtn: {
    marginTop: 10,
    background: "transparent",
    border: "1px solid rgba(255,100,100,0.4)",
    color: "#ff6b6b",
    borderRadius: 8,
    padding: "6px 14px",
    fontSize: 13,
    cursor: "pointer"
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: 6,
    padding: 10
  },
  card: {
    position: "relative",
    borderRadius: 12,
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
    background: "rgba(0,0,0,0.6)",
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
    opacity: 0.3,
    padding: "16px 0 40px",
    margin: 0
  },
  modal: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.92)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  bgGlow: {
    position: "absolute",
    inset: 0,
    backgroundSize: "cover",
    backgroundPosition: "center",
    filter: "blur(60px) brightness(0.4)"
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