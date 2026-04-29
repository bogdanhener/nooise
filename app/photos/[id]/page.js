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
      console.log("STORAGE ERROR:", error);
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

  // ✅ REAL DOWNLOAD FUNCTION (forced + fallback)
  function downloadImage(url, index) {
    const fileName = `nooise-${params.id}-${index + 1}.jpg`;

    fetch(url)
      .then((res) => res.blob())
      .then((blob) => {
        const blobUrl = window.URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = blobUrl;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);

        window.URL.revokeObjectURL(blobUrl);
      })
      .catch(() => {
        window.open(url, "_blank");
      });
  }

  return (
    <div style={styles.page}>
      
      {/* TITLE */}
      <h2 style={styles.title}>
        {params?.id}
      </h2>

      {/* LOADING */}
      {loading ? (
        <p style={styles.loading}>Loading photos...</p>
      ) : (

        /* RESPONSIVE GRID */
        <div style={styles.grid} className="gallery-grid">

          {images.map((url, i) => (
            <div key={i} style={styles.card}>

              {/* IMAGE */}
              <img
                src={url}
                style={styles.image}
              />

              {/* DOWNLOAD BUTTON */}
              <button
                onClick={() => downloadImage(url, i)}
                style={styles.downloadBtn}
              >
                ⬇
              </button>

            </div>
          ))}

        </div>
      )}

      {/* RESPONSIVE CSS */}
      <style jsx>{`
        .gallery-grid {
          grid-template-columns: repeat(2, 1fr);
        }

        @media (min-width: 768px) {
          .gallery-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        @media (min-width: 1024px) {
          .gallery-grid {
            grid-template-columns: repeat(4, 1fr);
          }
        }
      `}</style>
    </div>
  );
}

/* INLINE STYLES (clean + portable for Vercel) */
const styles = {
  page: {
    padding: 12,
    background: "#0b0b0f",
    minHeight: "100vh",
    color: "white"
  },

  title: {
    marginBottom: 16,
    fontSize: 18,
    textTransform: "capitalize"
  },

  loading: {
    opacity: 0.6
  },

  grid: {
    display: "grid",
    gap: 10
  },

  card: {
    position: "relative",
    borderRadius: 14,
    overflow: "hidden",
    background: "#111"
  },

  image: {
    width: "100%",
    height: "auto",
    aspectRatio: "1 / 1",
    objectFit: "cover",
    display: "block"
  },

  downloadBtn: {
    position: "absolute",
    top: 8,
    right: 8,
    width: 34,
    height: 34,
    borderRadius: "50%",
    background: "rgba(0,0,0,0.6)",
    border: "none",
    color: "white",
    fontSize: 14,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backdropFilter: "blur(6px)"
  }
};