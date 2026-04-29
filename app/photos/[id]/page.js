"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "../../../lib/supabase";

export default function EventGallery() {
  const params = useParams();
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  // fullscreen state
  const [activeIndex, setActiveIndex] = useState(null);

  useEffect(() => {
    if (params?.id) loadImages();
  }, [params]);

  async function loadImages() {
    setLoading(true);

    const folder = params.id;

    const { data, error } = await supabase.storage
      .from("nooise-photos")
      .list(folder, {
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
        .getPublicUrl(`${folder}/${file.name}`);

      return urlData.publicUrl;
    });

    setImages(urls);
    setLoading(false);
  }

  function downloadImage(url, index) {
    fetch(url)
      .then((res) => res.blob())
      .then((blob) => {
        const blobUrl = window.URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = blobUrl;
        a.download = `nooise-${params.id}-${index + 1}.jpg`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);

        window.URL.revokeObjectURL(blobUrl);
      });
  }

  function openFullscreen(index) {
    setActiveIndex(index);
  }

  function closeFullscreen() {
    setActiveIndex(null);
  }

  function next() {
    setActiveIndex((prev) => (prev + 1) % images.length);
  }

  function prev() {
    setActiveIndex((prev) => (prev - 1 + images.length) % images.length);
  }

  return (
    <div style={styles.page}>

      {/* HEADER */}
      <div style={styles.header}>
        <h1 style={styles.title}>{params?.id}</h1>
        <p style={styles.subtitle}>Swipe. Feel. Relive.</p>
      </div>

      {/* GRID */}
      {!loading && (
        <div style={styles.grid} className="grid">

          {images.map((url, i) => (
            <div key={i} style={styles.card}>

              {/* IMAGE */}
              <img
                src={url}
                style={styles.image}
                onClick={() => openFullscreen(i)}
              />

              {/* DOWNLOAD ICON (FIXED VISIBILITY) */}
              <button
                onClick={() => downloadImage(url, i)}
                style={styles.download}
              >
                ⬇
              </button>

            </div>
          ))}

        </div>
      )}

      {/* LOADING */}
      {loading && (
        <div style={styles.loading}>Loading memories...</div>
      )}

      {/* FULLSCREEN VIEWER */}
      {activeIndex !== null && (
        <div style={styles.fullscreen}>

          {/* CLOSE */}
          <div style={styles.close} onClick={closeFullscreen}>✕</div>

          {/* LEFT */}
          <div style={styles.left} onClick={prev} />

          {/* IMAGE */}
          <img
            src={images[activeIndex]}
            style={styles.fullImage}
          />

          {/* RIGHT */}
          <div style={styles.right} onClick={next} />

          {/* DOWNLOAD */}
          <button
            style={styles.fullDownload}
            onClick={() => downloadImage(images[activeIndex], activeIndex)}
          >
            ⬇ Download
          </button>

        </div>
      )}

      {/* RESPONSIVE GRID */}
      <style jsx>{`
        .grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 10px;
        }

        @media (min-width: 768px) {
          .grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        @media (min-width: 1024px) {
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
    minHeight: "100vh",
    background: "#07070c",
    color: "white",
    padding: 14
  },

  header: {
    marginBottom: 15
  },

  title: {
    fontSize: 20,
    textTransform: "capitalize"
  },

  subtitle: {
    opacity: 0.5,
    fontSize: 13
  },

  loading: {
    opacity: 0.6,
    paddingTop: 20
  },

  grid: {},

  card: {
    position: "relative",
    borderRadius: 16,
    overflow: "hidden"
  },

  image: {
    width: "100%",
    aspectRatio: "1 / 1",
    objectFit: "cover",
    cursor: "pointer",
    display: "block"
  },

  download: {
    position: "absolute",
    top: 8,
    right: 8,
    width: 38,
    height: 38,
    borderRadius: "50%",
    background: "rgba(0,0,0,0.75)",
    border: "1px solid rgba(255,255,255,0.15)",
    color: "white",
    fontSize: 16,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 5
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
    maxWidth: "90%",
    maxHeight: "90%",
    objectFit: "contain"
  },

  close: {
    position: "absolute",
    top: 20,
    right: 20,
    fontSize: 26,
    cursor: "pointer"
  },

  left: {
    position: "absolute",
    left: 0,
    width: "50%",
    height: "100%"
  },

  right: {
    position: "absolute",
    right: 0,
    width: "50%",
    height: "100%"
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