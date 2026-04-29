"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "../../../lib/supabase";

export default function EventGallery() {
  const params = useParams();
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <div style={styles.page}>

      {/* BACKGROUND GLOW */}
      <div style={styles.bgGlow}></div>

      {/* HEADER */}
      <div style={styles.header}>
        <h1 style={styles.title}>{params?.id}</h1>
        <p style={styles.subtitle}>Find your moment</p>
      </div>

      {/* LOADING */}
      {loading ? (
        <div style={styles.loading}>Loading memories...</div>
      ) : (

        <div style={styles.grid} className="grid">

          {images.map((url, i) => (
            <div key={i} style={styles.card}>

              {/* IMAGE */}
              <img src={url} style={styles.image} />

              {/* HOVER OVERLAY */}
              <div style={styles.overlay}>
                <button
                  onClick={() => downloadImage(url, i)}
                  style={styles.download}
                >
                  ⬇
                </button>
              </div>

            </div>
          ))}

        </div>
      )}

      {/* RESPONSIVE GRID */}
      <style jsx>{`
        .grid {
          grid-template-columns: repeat(2, 1fr);
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

/* 💎 PREMIUM STYLES */
const styles = {
  page: {
    minHeight: "100vh",
    background: "#07070c",
    color: "white",
    padding: 16,
    position: "relative",
    overflow: "hidden"
  },

  bgGlow: {
    position: "absolute",
    top: "-200px",
    left: "-200px",
    width: "500px",
    height: "500px",
    background: "radial-gradient(circle, rgba(255,0,128,0.25), transparent 60%)",
    filter: "blur(80px)"
  },

  header: {
    marginBottom: 18
  },

  title: {
    fontSize: 20,
    letterSpacing: 1,
    textTransform: "capitalize",
    marginBottom: 4
  },

  subtitle: {
    opacity: 0.5,
    fontSize: 13
  },

  loading: {
    opacity: 0.6,
    paddingTop: 20
  },

  grid: {
    display: "grid",
    gap: 10
  },

  card: {
    position: "relative",
    borderRadius: 16,
    overflow: "hidden",
    background: "#111",
    transform: "translateZ(0)",
    transition: "0.3s ease"
  },

  image: {
    width: "100%",
    aspectRatio: "1 / 1",
    objectFit: "cover",
    display: "block",
    transition: "0.3s ease"
  },

  overlay: {
    position: "absolute",
    inset: 0,
    background: "linear-gradient(to top, rgba(0,0,0,0.5), transparent)",
    opacity: 0,
    transition: "0.3s ease",
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "flex-start",
    padding: 10
  },

  download: {
    width: 36,
    height: 36,
    borderRadius: "50%",
    background: "rgba(0,0,0,0.6)",
    border: "1px solid rgba(255,255,255,0.1)",
    color: "white",
    cursor: "pointer",
    backdropFilter: "blur(10px)"
  }
};