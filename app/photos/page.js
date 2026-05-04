"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

export default function PhotosPage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    document.body.style.margin = "0";
    document.body.style.padding = "0";
    document.body.style.background = "#ffffff";
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

      {/* BACK */}
      <Link href="/" style={styles.backLink}>← nooise</Link>

      {/* HEADER */}
      <div style={styles.header}>
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

      {/* GRID */}
      <div style={styles.grid}>
        {events.map((event) => (
          <Link
            key={event.id}
            href={`/photos/${event.id}`}
            style={{ textDecoration: "none" }}
          >
            <div style={styles.card}>

              <div
                style={{
                  ...styles.image,
                  backgroundImage: `url(${event.cover_image_url || ""})`
                }}
              />

              <div style={styles.overlay} />

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

    </div>
  );
}

const styles = {
  page: {
    background: "#ffffff",
    minHeight: "100dvh",
    color: "#111",
    padding: "20px",
    margin: 0,
    boxSizing: "border-box",
    fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif"
  },
  backLink: {
    color: "#111",
    textDecoration: "none",
    fontSize: 13,
    fontWeight: 600,
    opacity: 0.5,
    display: "inline-block",
    marginBottom: 16
  },
  header: {
    marginBottom: 20
  },
  title: {
    fontSize: 24,
    fontWeight: 700,
    margin: 0,
    color: "#111"
  },
  subtitle: {
    color: "#888",
    fontSize: 13,
    marginTop: 4
  },
  message: {
    color: "#aaa",
    fontSize: 14
  },
  errorBox: {
    background: "rgba(255,60,60,0.06)",
    border: "1px solid rgba(255,60,60,0.2)",
    borderRadius: 12,
    padding: 16,
    marginBottom: 14
  },
  errorText: {
    color: "#e05555",
    fontSize: 14,
    margin: 0
  },
  retryBtn: {
    marginTop: 10,
    background: "transparent",
    border: "1px solid rgba(200,60,60,0.3)",
    color: "#e05555",
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
    border: "1px solid rgba(0,0,0,0.08)",
    boxShadow: "0 2px 16px rgba(0,0,0,0.08)"
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
    background: "linear-gradient(to top, rgba(0,0,0,0.6), rgba(0,0,0,0.05))"
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
    color: "rgba(255,255,255,0.8)"
  }
};