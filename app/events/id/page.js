"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabase";

export default function EventPage({ params }) {
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (params?.id) loadEvent(params.id);
  }, [params?.id]);

  async function loadEvent(id) {
    setLoading(true);
    setError(null);

    const { data, error } = await supabase
      .from("events")
      .select("id, name, vibe, event_date, cover_image_url")
      .eq("id", id)
      .single();

    if (error) {
      setError("Could not load this event.");
    } else {
      setEvent(data);
    }

    setLoading(false);
  }

  return (
    <div style={styles.page}>

      <Link href="/events" style={styles.backLink}>← All Events</Link>

      {loading && <p style={styles.message}>Loading...</p>}

      {error && (
        <div style={styles.errorBox}>
          <p style={styles.errorText}>{error}</p>
        </div>
      )}

      {!loading && !error && event && (
        <>
          {/* COVER */}
          {event.cover_image_url && (
            <div
              style={{
                ...styles.cover,
                backgroundImage: `url(${event.cover_image_url})`
              }}
            />
          )}

          {/* INFO */}
          <div style={styles.info}>
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

            {event.vibe && (
              <p style={styles.vibe}>
                {Array.isArray(event.vibe)
                  ? event.vibe.join(" • ")
                  : event.vibe}
              </p>
            )}
          </div>

          {/* ACTIONS */}
          <div style={styles.actions}>
            <Link href={`/photos/${event.id}`} style={styles.btnPrimary}>
              📸 View Photos
            </Link>
          </div>
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
  cover: {
    width: "100%",
    height: 220,
    borderRadius: 18,
    backgroundSize: "cover",
    backgroundPosition: "center",
    marginBottom: 20,
    border: "1px solid rgba(255,215,120,0.2)"
  },
  info: {
    marginBottom: 24
  },
  title: {
    fontSize: 26,
    fontWeight: 800,
    color: "white",
    margin: 0
  },
  date: {
    fontSize: 13,
    opacity: 0.6,
    marginTop: 8
  },
  vibe: {
    fontSize: 13,
    color: "#f3e2b3",
    opacity: 0.8,
    marginTop: 6
  },
  actions: {
    display: "flex",
    flexDirection: "column",
    gap: 10
  },
  btnPrimary: {
    display: "block",
    textAlign: "center",
    padding: "14px 20px",
    borderRadius: 14,
    background: "linear-gradient(135deg, #7c3aed, #ec4899, #f97316)",
    color: "white",
    fontWeight: 700,
    fontSize: 15,
    textDecoration: "none"
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
  }
};
