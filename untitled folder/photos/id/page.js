"use client";

import { useEffect, useState, useRef } from "react";
import { useParams } from "next/navigation";
import { supabase } from "../../../lib/supabase";

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
  const [index, setIndex] = useState(0);
  const [active, setActive] = useState(false);
  const [fade, setFade] = useState(true);

  const startY = useRef(0);
  const endY = useRef(0);

  useEffect(() => {
    if (params?.id) load();
  }, [params]);

  async function load() {
    const { data } = await supabase.storage
      .from("nooise-photos")
      .list(params.id, { limit: 200 });

    const urls = data.map((file) => {
      const { data: urlData } = supabase.storage
        .from("nooise-photos")
        .getPublicUrl(`${params.id}/${file.name}`);

      return urlData.publicUrl;
    });

    setImages(urls);
  }

  function open(i) {
    setIndex(i);
    setActive(true);
  }

  function close() {
    setActive(false);
  }

  function changeImage(i) {
    setFade(false);
    setTimeout(() => {
      setIndex(i);
      setFade(true);
    }, 180);
  }

  function next() {
    changeImage((index + 1) % images.length);
  }

  function prev() {
    changeImage((index - 1 + images.length) % images.length);
  }

  function onTouchStart(e) {
    startY.current = e.touches[0].clientY;
  }

  function onTouchMove(e) {
    endY.current = e.touches[0].clientY;
  }

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
        a.download = `nooise-${params.id}-${i}.jpg`;
        a.click();
        URL.revokeObjectURL(blobUrl);
      });
  }

  return (
    <div style={styles.page}>

      {/* HERO */}
      <div style={styles.hero}>
        <div
          style={{
            ...styles.glow,
            background: `radial-gradient(circle, ${config.glow}, transparent)`
          }}
        />

        <h1 style={styles.title}>{config.title}</h1>

        <p style={styles.story}>{config.story}</p>
      </div>

      {/* GRID */}
      <div style={styles.grid}>
        {images.map((url, i) => (
          <div key={i} style={styles.card}>
            <img src={url} style={styles.image} onClick={() => open(i)} />

            {/* DOWNLOAD ICON ON GRID */}
            <button
              style={styles.gridDownload}
              onClick={(e) => {
                e.stopPropagation();
                download(url, i);
              }}
            >
              ⬇
            </button>
          </div>
        ))}
      </div>

      {/* MODAL */}
      {active && (
        <div
          style={styles.modal}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          <div
            style={{
              ...styles.bgGlow,
              backgroundImage: `url(${images[index]})`
            }}
          />

          <button style={styles.close} onClick={close}>✕</button>

          <img
            src={images[index]}
            style={{
              ...styles.fullImage,
              opacity: fade ? 1 : 0
            }}
          />

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

const styles = {
  page: {
    background: "#05050a",
    color: "white",
    minHeight: "100vh"
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
    fontWeight: 600
  },

  story: {
    fontSize: 13,
    opacity: 0.65,
    marginTop: 6
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
    objectFit: "cover"
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
    fontSize: 12
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

  close: {
    position: "absolute",
    top: 20,
    right: 20,
    fontSize: 22,
    background: "transparent",
    border: "none",
    color: "white"
  },

  download: {
    position: "absolute",
    top: 20,
    left: 20,
    width: 40,
    height: 40,
    borderRadius: "50%",
    background: "rgba(255,255,255,0.1)",
    border: "none",
    color: "white"
  }
};