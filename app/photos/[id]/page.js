"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabase";

export default function EventPhotos({ params }) {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    setLoading(true);

    const { data, error } = await supabase
      .from("event_photos")
      .select("image_url")
      .eq("event_id", params.id);

    if (!error) setPhotos(data || []);

    setLoading(false);
  }

  return (
    <div style={styles.page}>

      {/* BACKGROUND GLOW */}
      <div style={styles.glow}></div>

      {/* HEADER */}
      <div style={styles.header}>
        <h1 style={styles.title}>NOOISE</h1>
        <p style={styles.subtitle}>Event Memories</p>
      </div>

      {/* LOADING */}
      {loading && (
        <p style={styles.loading}>Loading memories...</p>
      )}

      {/* GALLERY */}
      <div style={styles.grid}>

        {photos.map((p, i) => (
          <div key={i} style={styles.card}>

            <img
              src={p.image_url}
              style={styles.image}
              alt=""
            />

            {/* DOWNLOAD BUTTON */}
            <a
              href={p.image_url}
              download
              target="_blank"
              style={styles.download}
            >
              ⬇
            </a>

          </div>
        ))}

      </div>
    </div>
  );
}

/* ================= STYLES ================= */

const styles = {
  page: {
    background: "#070A12",
    minHeight: "100vh",
    padding: 18,
    color: "white",
    position: "relative",
    overflow: "hidden"
  },

  glow: {
    position: "fixed",
    top: "-200px",
    left: "-200px",
    width: "600px",
    height: "600px",
    background: "radial-gradient(circle, #ff4d6d, transparent 60%)",
    filter: "blur(120px)",
    opacity: 0.35,
    zIndex: 0
  },

  header: {
    textAlign: "center",
    marginBottom: 25,
    position: "relative",
    zIndex: 2
  },

  title: {
    fontSize: 28,
    letterSpacing: 6,
    margin: 0
  },

  subtitle: {
    opacity: 0.6,
    fontSize: 12,
    marginTop: 6
  },

  loading: {
    textAlign: "center",
    opacity: 0.5
  },

  grid: {
    columnCount: 3,
    columnGap: 10,
    position: "relative",
    zIndex: 2
  },

  card: {
    position: "relative",
    marginBottom: 10,
    breakInside: "avoid",
    borderRadius: 16,
    overflow: "hidden",
    transition: "transform 0.25s ease"
  },

  image: {
    width: "100%",
    display: "block",
    borderRadius: 16,
    boxShadow: "0 12px 40px rgba(0,0,0,0.5)",
    transition: "transform 0.3s ease",
    cursor: "pointer"
  },

  download: {
    position: "absolute",
    bottom: 10,
    right: 10,
    background: "rgba(0,0,0,0.55)",
    backdropFilter: "blur(10px)",
    padding: "6px 8px",
    borderRadius: 10,
    fontSize: 12,
    color: "white",
    textDecoration: "none",
    opacity: 0.85
  }
};