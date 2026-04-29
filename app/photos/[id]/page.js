"use client";

import { useEffect, useState, useRef } from "react";
import { useParams } from "next/navigation";
import { supabase } from "../../../lib/supabase";

export default function EventGallery() {
  const params = useParams();

  const [images, setImages] = useState([]);
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [animating, setAnimating] = useState(false);

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

  function next() {
    if (animating) return;
    setAnimating(true);
    setIndex((prev) => (prev + 1) % images.length);
    setTimeout(() => setAnimating(false), 250);
  }

  function prev() {
    if (animating) return;
    setAnimating(true);
    setIndex((prev) => (prev - 1 + images.length) % images.length);
    setTimeout(() => setAnimating(false), 250);
  }

  // 📱 SWIPE ENGINE (TikTok style)
  function onTouchStart(e) {
    startY.current = e.touches[0].clientY;
  }

  function onTouchMove(e) {
    endY.current = e.touches[0].clientY;
  }

  function onTouchEnd() {
    const diff = startY.current - endY.current;

    if (diff > 60) next();   // swipe up → next
    if (diff < -60) prev();  // swipe down → prev
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

  if (loading) {
    return (
      <div style={styles.loading}>Loading experience...</div>
    );
  }

  const current = images[index];

  return (
    <div
      style={styles.wrapper}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >

      {/* 🌫 BACKGROUND BLUR LAYER */}
      <div
        style={{
          ...styles.bg,
          backgroundImage: `url(${current})`
        }}
      />

      {/* 💎 MAIN IMAGE */}
      <div
        style={{
          ...styles.imageWrap,
          opacity: animating ? 0.6 : 1,
          transform: animating ? "scale(0.98)" : "scale(1)"
        }}
      >
        <img src={current} style={styles.image} />
      </div>

      {/* ⬇ DOWNLOAD */}
      <button
        style={styles.download}
        onClick={(e) => {
          e.stopPropagation();
          download(current, index);
        }}
      >
        ⬇
      </button>

      {/* 📊 COUNTER */}
      <div style={styles.counter}>
        {index + 1} / {images.length}
      </div>

    </div>
  );
}

/* 💎 STYLES */
const styles = {
  wrapper: {
    height: "100vh",
    width: "100%",
    overflow: "hidden",
    position: "relative",
    background: "#000"
  },

  bg: {
    position: "absolute",
    inset: 0,
    backgroundSize: "cover",
    backgroundPosition: "center",
    filter: "blur(40px) brightness(0.5)",
    transform: "scale(1.2)"
  },

  imageWrap: {
    position: "relative",
    height: "100%",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 0.25s ease"
  },

  image: {
    maxHeight: "85%",
    maxWidth: "92%",
    objectFit: "contain",
    borderRadius: 20,
    boxShadow: "0 20px 80px rgba(0,0,0,0.6)"
  },

  download: {
    position: "absolute",
    top: 20,
    right: 20,
    zIndex: 10,
    width: 44,
    height: 44,
    borderRadius: "50%",
    border: "none",
    background: "rgba(255,255,255,0.15)",
    color: "white",
    fontSize: 18,
    backdropFilter: "blur(10px)"
  },

  counter: {
    position: "absolute",
    bottom: 20,
    left: "50%",
    transform: "translateX(-50%)",
    color: "white",
    fontSize: 13,
    opacity: 0.7
  },

  loading: {
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    background: "#000"
  }
};