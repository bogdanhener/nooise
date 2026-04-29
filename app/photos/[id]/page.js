"use client";

import { useEffect, useState, useRef } from "react";
import { useParams } from "next/navigation";
import { supabase } from "../../../lib/supabase";

export default function EventGallery() {
  const params = useParams();

  const [images, setImages] = useState([]);
  const [index, setIndex] = useState(0);
  const [active, setActive] = useState(false);
  const [loading, setLoading] = useState(true);
  const [fade, setFade] = useState(true);

  const startY = useRef(0);
  const endY = useRef(0);

  useEffect(() => {
    if (params?.id) load();
  }, [params]);

  async function load() {
    setLoading(true);

    const { data } = await supabase.storage
      .from("nooise-photos")
      .list(params.id, {
        limit: 200,
        sortBy: { column: "name", order: "asc" }
      });

    const urls = data.map((file) => {
      const { data: urlData } = supabase.storage
        .from("nooise-photos")
        .getPublicUrl(`${params.id}/${file.name}`);

      return urlData.publicUrl;
    });

    setImages(urls);
    setLoading(false);
  }

  function open(i) {
    setIndex(i);
    setActive(true);
  }

  function close() {
    setActive(false);
  }

  // 🌀 SMOOTH TRANSITION ENGINE
  function changeImage(nextIndex) {
    setFade(false);

    setTimeout(() => {
      setIndex(nextIndex);
      setFade(true);
    }, 180);
  }

  function next() {
    changeImage((index + 1) % images.length);
  }

  function prev() {
    changeImage((index - 1 + images.length) % images.length);
  }

  // 📱 SWIPE (with inertia feel)
  function onTouchStart(e) {
    startY.current = e.touches[0].clientY;
  }

  function onTouchMove(e) {
    endY.current = e.touches[0].clientY;
  }

  function onTouchEnd() {
    const diff = startY.current - endY.current;

    if (Math.abs(diff) < 40) return;

    if (diff > 0) next();
    else prev();
  }

  function download(url, i) {
    fetch(url)
      .then((r) => r.blob())
      .then((blob) => {
        const blobUrl = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = blobUrl;
        a.download = `nooise-${params.id}-${i}.jpg`;
        a.click();
        URL.revokeObjectURL(blobUrl);
      });
  }

  return (
    <div style={styles.page}>

      {/* 🌟 HERO STORY (EVENT IDENTITY LAYER) */}
      <div style={styles.hero}>
        <div style={styles.glow}></div>

        <h1 style={styles.title}>{params?.id}</h1>

        <p style={styles.story}>
          Swipe through memories from <b>Nooise daytime experience</b>.
          <br />
          Feel the sound, the sun, the crowd.
        </p>
      </div>

      {/* GRID */}
      {!loading && (
        <div style={styles.grid}>
          {images.map((url, i) => (
            <div key={i} style={styles.card}>
              <img
                src={url}
                style={styles.image}
                onClick={() => open(i)}
              />
            </div>
          ))}
        </div>
      )}

      {/* LOADING */}
      {loading && (
        <div style={styles.loading}>Loading experience...</div>
      )}

      {/* MODAL VIEWER */}
      {active && (
        <div
          style={styles.modal}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >

          {/* BACK GLOW LAYER */}
          <div
            style={{
              ...styles.bgGlow,
              backgroundImage: `url(${images[index]})`
            }}
          />

          {/* CLOSE */}
          <button style={styles.close} onClick={close}>✕</button>

          {/* IMAGE (FADE ANIMATION) */}
          <img
            src={images[index]}
            style={{
              ...styles.fullImage,
              opacity: fade ? 1 : 0,
              transform: fade ? "scale(1)" : "scale(1.02)"
            }}
          />

          {/* DOWNLOAD */}
          <button
            style={styles.download}
            onClick={() => download(images[index], index)}
          >
            ⬇
          </button>

        </div>
      )}
    </div>
  );
}

/* 💎 CINEMATIC DESIGN SYSTEM */
const styles = {

  page: {
    background: "#05050a",
    minHeight: "100vh",
    color: "white"
  },

  /* HERO STORY */
  hero: {
    padding: "20px 16px 10px",
    position: "relative"
  },

  glow: {
    position: "absolute",
    width: 200,
    height: 200,
    background: "radial-gradient(circle, rgba(168,85,247,0.5), transparent)",
    filter: "blur(40px)",
    top: 0,
    left: 20
  },

  title: {
    fontSize: 22,
    fontWeight: 600,
    letterSpacing: 1
  },

  story: {
    fontSize: 13,
    opacity: 0.65,
    marginTop: 6,
    lineHeight: 1.4
  },

  /* GRID */
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: 6,
    padding: 10
  },

  card: {
    borderRadius: 12,
    overflow: "hidden",
    position: "relative"
  },

  image: {
    width: "100%",
    aspectRatio: "1/1",
    objectFit: "cover",
    cursor: "pointer",
    transition: "transform 0.3s ease"
  },

  /* MODAL */
  modal: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.92)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 999
  },

  bgGlow: {
    position: "absolute",
    inset: 0,
    backgroundSize: "cover",
    backgroundPosition: "center",
    filter: "blur(60px) brightness(0.4)",
    transform: "scale(1.2)"
  },

  fullImage: {
    maxWidth: "90%",
    maxHeight: "90%",
    objectFit: "contain",
    borderRadius: 18,
    transition: "all 0.25s ease",
    zIndex: 2
  },

  close: {
    position: "absolute",
    top: 20,
    right: 20,
    fontSize: 24,
    background: "transparent",
    border: "none",
    color: "white",
    zIndex: 3
  },

  download: {
    position: "absolute",
    top: 20,
    left: 20,
    width: 44,
    height: 44,
    borderRadius: "50%",
    background: "rgba(255,255,255,0.12)",
    border: "1px solid rgba(255,255,255,0.2)",
    color: "white",
    zIndex: 3
  },

  loading: {
    padding: 20,
    opacity: 0.6
  }
};