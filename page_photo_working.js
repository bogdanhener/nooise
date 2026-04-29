"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

export default function PhotosPage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadEvents();
  }, []);

  async function loadEvents() {
    const { data, error } = await supabase
      .from("events")
      .select("*")
      .order("event_date", { ascending: false });

    console.log("EVENTS:", data, error);

    setEvents(data || []);
    setLoading(false);
  }

  return (
    <div style={styles.page}>

      {/* HEADER */}
      <div style={styles.header}>
        <h1 style={styles.title}>Find Your Photos</h1>
        <p style={styles.subtitle}>Select an event</p>
      </div>

      {/* LOADING */}
      {loading && (
        <p style={{ opacity: 0.6 }}>Loading events...</p>
      )}

      {/* EVENTS GRID */}
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
                  backgroundImage: `url(${event.cover_image_url || ""})`
                }}
              />

              {/* DARK OVERLAY */}
              <div style={styles.overlay} />

              {/* TEXT CONTENT */}
              <div style={styles.content}>

                {/* EVENT NAME */}
                <h2 style={styles.titleText}>
                  {event.name || event.title}
                </h2>

                {/* EVENT DATE */}
                <p style={styles.dateText}>
                  {event.event_date
                    ? new Date(event.event_date).toLocaleDateString()
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

/* ================= STYLES ================= */

const styles = {
  page: {
    background: "#05050a",
    minHeight: "100vh",
    color: "white",
    padding: "20px"
  },

  header: {
    marginBottom: 14
  },

  title: {
    fontSize: 24,
    fontWeight: 700,
    color: "white"
  },

  subtitle: {
    opacity: 0.6,
    fontSize: 13,
    marginTop: 4
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
    overflow: "hidden"
  },

  image: {
    position: "absolute",
    inset: 0,
    backgroundSize: "cover",
    backgroundPosition: "center",
    filter: "brightness(0.75)"
  },

  overlay: {
    position: "absolute",
    inset: 0,
    background: "linear-gradient(to top, rgba(0,0,0,0.85), transparent)"
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
    color: "white"
  },

  dateText: {
    fontSize: 12,
    marginTop: 4,
    opacity: 0.75,
    color: "white"
  }
};