"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabase";

export default function EventPhotosPage({ params }) {
  const [event, setEvent] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (params?.id) loadEventAndPhotos(params.id);
  }, [params?.id]);

  async function loadEventAndPhotos(id) {
    setLoading(true);
    setError(null);

    const [eventRes, photosRes] = await Promise.all([
      supabase
        .from("events")
        .select("id, name, event_date, cover_image_url")
        .eq("id", id)
        .single(),
      supabase
        .from("event_photos")
        .select("id, image_url")
        .eq("event_id", id)
    ]);

    if (eventRes.error) {
      setError("Could not load this event.");
    } else {
      setEvent(eventRes.data);
      setPhotos(photosRes.data || []);
    }

    setLoading(false);
  }

  return (
    <div style={styles.page}>

      {/* BACK */}
      <Link href="/photos" style={styles.backLink}>← All Events</Link>

      {/* LOADING */}
      {loading && <p style={styles.message}>Loading photos...</p>}

      {/* ERROR */}
      {error && (
        <div style={styles.errorBox}>
          <p style={styles.errorText}>{error}</p>
        </div>
      )}

      {/* CONTENT */}
      {!loading && !error && event && (
        <>
          {/* EVENT HEADER */}
          <div style={styles.header}>
            <h1 style={styles.title}>{event.name}</h1>
            {event.event_date && (
              <p style={styles.date}>
                {new Date(event.event_date).toLocaleDateString("ro-RO", {
                  day: "numeric",
                  month: "long",
                  year: "numeric"
                })}
              </p>
            )}
          </div>

          {/* PHOTOS */}
          {photos.length === 0 ? (
            <p style={styles.message}>No photos uploaded yet for this event.</p>
          ) : (
            <div style={styles.grid}>
              {photos.map((photo) => (
                <a
                  key={photo.id}
                  href={photo.image_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={styles.photoLink}
                >
                  <img
                    src={photo.image_url}
                    alt=""
                    style={styles.photo}
                    loading="lazy"
                  />
                </a>
              ))}
            </div>
          )}
        </>
      )}

    </div>
  );
}

const styles = {
  page: {
    background: "#05050a",
    minHeight: "100vh",
    color: "white",
    padding: "20px",
    fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif"
  },
  backLink: {
    color: "#ffcf6a",
    textDecoration: "none",
    fontSize: 13,
    opacity: 0.8,
    display: "inline-block",
    marginBottom: 20
  },
  header: {
    marginBottom: 20
  },
  title: {
    fontSize: 24,
    fontWeight: 700,
    color: "white",
    margin: 0
  },
  date: {
    fontSize: 13,
    opacity: 0.6,
    marginTop: 6
  },
  message: {
    opacity: 0.6,
    fontSize: 14
  },
  errorBox: {
    background: "rgba(255,60,60,0.1)",
    border: "1px solid rgba(255,60,60,0.3)",
    borderRadius: 12,
    padding: 16
  },
  errorText: {
    color: "#ff6b6b",
    fontSize: 14,
    margin: 0
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: 8
  },
  photoLink: {
    display: "block",
    borderRadius: 12,
    overflow: "hidden",
    border: "1px solid rgba(255,215,120,0.15)"
  },
  photo: {
    width: "100%",
    aspectRatio: "1 / 1",
    objectFit: "cover",
    display: "block"
  }
};
