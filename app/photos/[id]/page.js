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

  // 📱 REAL SWIPE (only inside modal)
  function onTouchStart(e) {
    startY.current = e.touches[0].clientY;
  }

  function onTouchMove(e) {
    endY.current = e.touches[0].clientY;
  }

  function onTouchEnd() {
    const diff = startY.current - endY.current;

    if (diff > 60) next();   // swipe up
    if (diff < -60) prev();  // swipe down
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

      {/* GRID VIEW */}
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
        <div style={styles.loading}>Loading...</div>
      )}

      {/* FULLSCREEN MODAL */}
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
            style={styles.download}
            onClick={(e) => {
              e.stopPropagation();
              download(images[activeIndex], activeIndex);
            }}
          >
            ⬇
          </button>

        </div>
      )}

      {/* RESPONSIVE GRID */}
      <style jsx>{`
        div {
          box-sizing: border-box;
        }

        ${"" /* mobile-first 3 columns */}
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
    minHeight: "100vh"
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: 6,
    padding: 10
  },

  card: {
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
    color: "white",
    background: "transparent",
    border: "none",
    zIndex: 1000
  },

  download: {
    position: "absolute",
    top: 20,
    left: 20,
    width: 44,
    height: 44,
    borderRadius: "50%",
    background: "rgba(255,255,255,0.15)",
    color: "white",
    border: "none"
  },

  loading: {
    color: "white",
    padding: 20
  }
};