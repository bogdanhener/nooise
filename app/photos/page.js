"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

export default function PhotosPage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadEvents();
  }, []);

  async function loadEvents() {
    setLoading(true);
    setError(null);

    const { data, error } = await supabase
      .from("events")
      .select("id, name, event_date, cover_image_url")
      .order("event_date", { ascending: false });

    if (error) {
      setError("Could not load events. Please try again.");
    } else {
      setEvents(data || []);
    }

    setLoading(false);
  }

  return (
    <div style={styles.page}>

      {/* HEADER */}
      <div style={styles.header}>
        <Link href="/" style={styles.backLink}>← Back</Link>
        <h1 style={styles.title}>Find Your Photos</h1>
        <p style={styles.subtitle}>Select an event</p>
      </div>

      {/* LOADING */}
      {loading && (
        <p style={styles.message}>Loading events...</p>
      )}

      {/* ERROR */}
      {error && (
        <div style={styles.errorBox}>
          <p style={styles.errorText}>{error}</p>
          <button style={styles.retryBtn} onClick={loadEvents}>Try again</button>
        </div>
      )}

      {/* EMPTY */}
      {!loading && !error && events.length === 0 && (
        <p style={styles.message}>No events yet. Check back soon.</p>
      )}

      {/* EVENTS GRID */}
      {!loading && !error && events.length > 0 && (
        <div style={styles.grid}>
          {events.map((event) => (
            <Link
              key={event.id}
              href={`/photos/${event.id}`}
              style={{ textDecoration: "none" }}
            >
              <div style={styles.card}>

                {/* BACKGROUND IMAGE */}
                <div
                  style={{
                    ...styles.image,
                    backgroundImage: event.cover_image_url
                      ? `url(${event.cover_image_url})`
                      : "none",
                    background: event.cover_image_url
                      ? undefined
                      : "rgba(255,255,255,0.05)"
                  }}
                />

                {/* OVERLAY */}
                <div style={styles.overlay} />

                {/* TEXT */}
                <div style={styles.content}>
                  <h2 style={styles.titleText}>{event.name}</h2>
                  <p style={styles.dateText}>
                    {event.event_date
                      ? new Date(event.event_date).toLocaleDateString("ro-RO", {
                          day: "numeric",
                          month: "long",
                          year: "numeric"
                        })
                      : ""}
                  </p>
                </div>

              </div>
            </Link>
          ))}
        </div>
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
  header: {
    marginBottom: 20
  },
  backLink: {
    color: "#ffcf6a",
    textDecoration: "none",
    fontSize: 13,
    opacity: 0.8,
    display: "inline-block",
    marginBottom: 10
  },
  title: {
    fontSize: 24,
    fontWeight: 700,
    color: "white",
    margin: 0
  },
  subtitle: {
    opacity: 0.6,
    fontSize: 13,
    marginTop: 4
  },
  message: {
    opacity: 0.6,
    fontSize: 14
  },
  errorBox: {
    background: "rgba(255,60,60,0.1)",
    border: "1px solid rgba(255,60,60,0.3)",
    borderRadius: 12,
    padding: 16,
    marginBottom: 20
  },
  errorText: {
    color: "#ff6b6b",
    fontSize: 14,
    margin: 0
  },
  retryBtn: {
    marginTop: 10,
    background: "transparent",
    border: "1px solid rgba(255,100,100,0.4)",
    color: "#ff6b6b",
    borderRadius: 8,
    padding: "6px 14px",
    fontSize: 13,
    cursor: "pointer"
  },
  grid: {
    display: "flex",
    flexDirection: "column",
    gap: 14
  },
  card: {
    position: "relative",
    height: 180,
    borderRadius: 18,
    overflow: "hidden",
    border: "1px solid rgba(255,215,120,0.35)",
    boxShadow: "0 0 18px rgba(255,200,100,0.15)"
  },
  image: {
    position: "absolute",
    inset: 0,
    backgroundSize: "cover",
    backgroundPosition: "center",
    filter: "brightness(0.9)"
  },
  overlay: {
    position: "absolute",
    inset: 0,
    background: "linear-gradient(to top, rgba(0,0,0,0.55), rgba(0,0,0,0.05))"
  },
  content: {
    position: "absolute",
    bottom: 14,
    left: 14,
    right: 14
  },
  titleText: {
    fontSize: 18,
    fontWeight: 700,
    color: "white",
    margin: 0
  },
  dateText: {
    fontSize: 12,
    marginTop: 4,
    opacity: 0.85,
    color: "white"
  }
};
