"use client";

import { useEffect, useState, useRef } from "react";
import { useParams } from "next/navigation";
import { supabase } from "../../../lib/supabase";

const EVENT_CONFIG = {
  "mall-takeover": {
    title: "Mall Takeover",
    glow: "rgba(0,200,255,0.4)"
  },
  "matchaty": {
    title: "MatchaTy",
    glow: "rgba(120,255,160,0.4)"
  },
  "sudplazza": {
    title: "SudPlazza",
    glow: "rgba(168,85,247,0.4)"
  }
};

export default function EventGallery() {
  const params = useParams();
  const config = EVENT_CONFIG[params?.id] || {};

  const [images, setImages] = useState([]);
  const [active, setActive] = useState(false);
  const [index, setIndex] = useState(0);

  const startY = useRef(0);
  const endY = useRef(0);

  useEffect(() => {
    if (params?.id) load();
  }, [params]);

  async function load() {
    const { data } = await supabase.storage
      .from("nooise-photos")
      .list(params.id);

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

  function next() {
    setIndex((prev) => (prev + 1) % images.length);
  }

  function prev() {
    setIndex((prev) => (prev - 1 + images.length) % images.length);
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
      });
  }

  return (
    <div style={styles.page}>

      {/* HEADER */}
      <div style={styles.header}>
        <h1 style={styles.title}>{config.title}</h1>
      </div>

      {/* GRID */}
      <div style={styles.grid}>
        {images.map((url, i) => (
          <div key={i} style={styles.card}>

            <img
              src={url}
              style={styles.image}
              onClick={() => open(i)}
            />

            {/* GLASS OVERLAY */}
            <div style={styles.overlay} />

            {/* DOWNLOAD */}
            <button
              style={styles.download}
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

      {/* FULLSCREEN */}
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

          <img src={images[index]} style={styles.fullImage} />

        </div>
      )}
    </div>
  );
}

const styles = {

  page: {
    background: "#05050a",
    minHeight: "100vh",
    color: "white"
  },

  header: {
    padding: "20px 16px"
  },

  title: {
    fontSize: 20,
    fontWeight: 600
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: 8,
    padding: 10
  },

  card: {
    position: "relative",
    borderRadius: 16,
    overflow: "hidden",
    backdropFilter: "blur(10px)",
    background: "rgba(255,255,255,0.05)"
  },

  image: {
    width: "100%",
    aspectRatio: "1/1",
    objectFit: "cover",
    cursor: "pointer",
    transition: "transform 0.3s ease"
  },

  overlay: {
    position: "absolute",
    inset: 0,
    background: "linear-gradient(to top, rgba(0,0,0,0.4), transparent)"
  },

  download: {
    position: "absolute",
    bottom: 8,
    right: 8,
    width: 32,
    height: 32,
    borderRadius: "50%",
    background: "rgba(0,0,0,0.6)",
    border: "none",
    color: "white",
    fontSize: 14
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
    filter: "blur(60px) brightness(0.4)"
  },

  fullImage: {
    maxWidth: "90%",
    maxHeight: "90%",
    borderRadius: 16,
    zIndex: 2
  },

  close: {
    position: "absolute",
    top: 20,
    right: 20,
    fontSize: 22,
    background: "transparent",
    border: "none",
    color: "white"
  }
};