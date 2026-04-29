"use client";

import { useEffect, useState, useRef } from "react";
import { useParams } from "next/navigation";
import { supabase } from "../../../lib/supabase";

export default function EventGallery() {
  const params = useParams();

  const [images, setImages] = useState([]);
  const [activeIndex, setActiveIndex] = useState(null);
  const [loading, setLoading] = useState(true);

  // touch tracking
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  useEffect(() => {
    if (params?.id) loadImages();
  }, [params]);

  async function loadImages() {
    setLoading(true);

    const { data, error } = await supabase.storage
      .from("nooise-photos")
      .list(params.id, {
        limit: 200,
        sortBy: { column: "name", order: "asc" }
      });

    if (error) {
      console.log(error);
      setLoading(false);
      return;
    }

    const urls = data.map((file) => {
      const { data: urlData } = supabase.storage
        .from("nooise-photos")
        .getPublicUrl(`${params.id}/${file.name}`);

      return urlData.publicUrl;
    });

    setImages(urls);
    setLoading(false);
  }

  function open(index) {
    setActiveIndex(index);
  }

  function close(e) {
    e.stopPropagation();
    setActiveIndex(null);
  }

  function next() {
    setActiveIndex((prev) => (prev + 1) % images.length);
  }

  function prev() {
    setActiveIndex((prev) => (prev - 1 + images.length) % images.length);
  }

  // 📱 REAL SWIPE DETECTION
  function handleTouchStart(e) {
    touchStartX.current = e.touches[0].clientX;
  }

  function handleTouchEnd() {
    const distance = touchStartX.current - touchEndX.current;

    if (distance > 50) next();       // swipe left
    if (distance < -50) prev();     // swipe right
  }

  function handleTouchMove(e) {
    touchEndX.current = e.touches[0].clientX;
  }

  function download(url, index) {
    fetch(url)
      .then((res) => res.blob())
      .then((blob) => {
        const blobUrl = URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = blobUrl;
        a.download = `nooise-${params.id}-${index + 1}.jpg`;
        a.click();

        URL.revokeObjectURL(blobUrl);
      });
  }

  return (
    <div style={styles.page}>

      {/* HEADER */}
      <div style={styles.header}>
        <h1 style={styles.title}>{params?.id}</h1>
        <p style={styles.subtitle}>Swipe. Tap. Relive.</p>
      </div>

      {/* GRID */}
      {!loading && (
        <div className="grid">
          {images.map((url, i) => (
            <div key={i} style={styles.card}>

              <img
                src={url}
                style={styles.image}
                onClick={() => open(i)}
              />

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
      )}

      {/* FULLSCREEN */}
      {activeIndex !== null && (
        <div
          style={styles.fullscreen}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >

          {/* CLOSE (FIXED STOP PROPAGATION) */}
          <button
            style={styles.close}
            onClick={close}
          >
            ✕
          </button>

          {/* IMAGE */}
          <img
            src={images[activeIndex]}
            style={styles.fullImage}
          />

          {/* DOWNLOAD */}
          <button
            style={styles.fullDownload}
            onClick={(e) => {
              e.stopPropagation();
              download(images[activeIndex], activeIndex);
            }}
          >
            ⬇ Download
          </button>

        </div>
      )}

      {/* RESPONSIVE GRID */}
      <style jsx>{`
        .grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 8px;
        }

        @media (max-width: 768px) {
          .grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }
      `}</style>
    </div>
  );
}

/* 💎 STYLES */
const styles = {
  page: {
    background: "#07070c",
    minHeight: "100vh",
    color: "white",
    padding: 12
  },

  header: {
    marginBottom: 10
  },

  title: {
    fontSize: 18,
    textTransform: "capitalize"
  },

  subtitle: {
    opacity: 0.5,
    fontSize: 12
  },

  card: {
    position: "relative",
    borderRadius: 14,
    overflow: "hidden"
  },

  image: {
    width: "100%",
    aspectRatio: "1/1",
    objectFit: "cover",
    display: "block"
  },

  download: {
    position: "absolute",
    top: 6,
    right: 6,
    width: 34,
    height: 34,
    borderRadius: "50%",
    background: "rgba(0,0,0,0.7)",
    border: "1px solid rgba(255,255,255,0.2)",
    color: "white",
    zIndex: 10
  },

  fullscreen: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.95)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 999
  },

  fullImage: {
    maxWidth: "92%",
    maxHeight: "92%",
    objectFit: "contain"
  },

  close: {
    position: "absolute",
    top: 20,
    right: 20,
    fontSize: 24,
    background: "transparent",
    border: "none",
    color: "white",
    zIndex: 1000
  },

  fullDownload: {
    position: "absolute",
    bottom: 20,
    padding: "10px 16px",
    borderRadius: 30,
    background: "white",
    color: "black",
    border: "none"
  }
};