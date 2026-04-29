"use client";

import { useEffect, useState, useRef } from "react";
import { useParams } from "next/navigation";
import { supabase } from "../../../lib/supabase";

export default function EventGallery() {
  const params = useParams();

  const [images, setImages] = useState([]);
  const [activeIndex, setActiveIndex] = useState(null);
  const [loading, setLoading] = useState(true);

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

  function open(index) {
    setActiveIndex(index);
  }

  function close() {
    setActiveIndex(null);
  }

  function next() {
    setActiveIndex((prev) => (prev + 1) % images.length);
  }

  function prev() {
    setActiveIndex((prev) => (prev - 1 + images.length) % images.length);
  }

  function onTouchStart(e) {
    startY.current = e.touches[0].clientY;
  }

  function onTouchMove(e) {
    endY.current = e.touches[0].clientY;
  }

  function onTouchEnd() {
    const diff = startY.current - endY.current;

    if (diff > 60) next();
    if (diff < -60) prev();
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

      {/* HEADER (RESTORED) */}
      <div style={styles.header}>
        <h1 style={styles.title}>
          {params?.id}
        </h1>

        <p style={styles.subtitle}>
          Swipe. Tap. Relive.
        </p>
      </div>

      {/* GRID */}
      {!loading && (
        <div style={styles.grid}>
          {images.map((url, i) => (
            <div key={i} style={styles.card}>

              {/* IMAGE */}
              <img
                src={url}
                style={styles.image}
                onClick={() => open(i)}
              />

              {/* DOWNLOAD (NOW BACK IN GRID ✔) */}
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

      {/* LOADING */}
      {loading && (
        <div style={styles.loading}>
          Loading memories...
        </div>
      )}

      {/* MODAL */}
      {activeIndex !== null && (
        <div
          style={styles.modal}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >

          {/* CLOSE */}
          <button style={styles.close} onClick={close}>
            ✕
          </button>

          {/* IMAGE */}
          <img
            src={images[activeIndex]}
            style={styles.fullImage}
          />

          {/* DOWNLOAD */}
          <button
            style={styles.modalDownload}
            onClick={(e) => {
              e.stopPropagation();
              download(images[activeIndex], activeIndex);
            }}
          >
            ⬇
          </button>

        </div>
      )}

      {/* GRID RESPONSIVE */}
      <style jsx>{`
        .grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 6px;
          padding: 10px;
        }

        @media (min-width: 768px) {
          .grid {
            grid-template-columns: repeat(4, 1fr);
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
    color: "white"
  },

  header: {
    padding: 12,
    paddingBottom: 6
  },

  title: {
    fontSize: 20,
    textTransform: "capitalize",
    marginBottom: 4
  },

  subtitle: {
    opacity: 0.6,
    fontSize: 13
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
    aspectRatio: "1 / 1",
    objectFit: "cover",
    display: "block",
    cursor: "pointer"
  },

  download: {
    position: "absolute",
    top: 6,
    right: 6,
    width: 34,
    height: 34,
    borderRadius: "50%",
    background: "rgba(0,0,0,0.6)",
    border: "1px solid rgba(255,255,255,0.2)",
    color: "white",
    zIndex: 10
  },

  modal: {
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

  modalDownload: {
    position: "absolute",
    top: 20,
    left: 20,
    width: 44,
    height: 44,
    borderRadius: "50%",
    background: "rgba(255,255,255,0.15)",
    border: "none",
    color: "white"
  },

  loading: {
    padding: 20,
    opacity: 0.6
  }
};