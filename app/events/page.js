"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

export default function EventsPage() {
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
      .select("id, name, vibe, event_date")
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

      <Link href="/" style={styles.backLink}>← Back</Link>

      <h1 style={styles.title}>Events</h1>

      {loading && <p style={styles.message}>Loading events...</p>}

      {error && (
        <div style={styles.errorBox}>
          <p style={styles.errorText}>{error}</p>
          <button style={styles.retryBtn} onClick={loadEvents}>Try again</button>
        </div>
      )}

      {!loading && !error && events.length === 0 && (
        <p style={styles.message}>No events yet. Check back soon.</p>
      )}

      {!loading && !error && events.length > 0 && (
        <div style={styles.list}>
          {events.map((event) => (
            <Link
              key={event.id}
              href={`/events/${event.id}`}
              style={{ textDecoration: "none" }}
            >
              <div style={styles.card}>
                <h3 style={styles.cardTitle}>{event.name}</h3>

                {event.vibe && (
                  <p style={styles.vibe}>
                    {Array.isArray(event.vibe)
                      ? event.vibe.join(" • ")
                      : event.vibe}
                  </p>
                )}

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
  backLink: {
    color: "#ffcf6a",
    textDecoration: "none",
    fontSize: 13,
    opacity: 0.8,
    display: "inline-block",
    marginBottom: 16
  },
  title: {
    fontSize: 24,
    fontWeight: 700,
    color: "white",
    marginBottom: 20
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
  list: {
    display: "flex",
    flexDirection: "column",
    gap: 12
  },
  card: {
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,215,120,0.2)",
    borderRadius: 16,
    padding: 18,
    boxShadow: "0 0 20px rgba(255,200,80,0.06)"
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 700,
    color: "white",
    margin: 0
  },
  vibe: {
    fontSize: 13,
    opacity: 0.7,
    marginTop: 6,
    color: "#f3e2b3"
  },
  date: {
    fontSize: 12,
    opacity: 0.5,
    marginTop: 6,
    color: "white"
  }
};
