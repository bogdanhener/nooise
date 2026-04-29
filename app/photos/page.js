"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

export default function PhotosPage() {
  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState("");
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

  const filtered = events.filter((e) =>
    (e.title || "").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={styles.page}>

      {/* HEADER */}
      <div style={styles.header}>
        <h1 style={styles.title}>Find Your Photos</h1>
        <p style={styles.subtitle}>
          Select an event and relive the moment
        </p>
      </div>

      {/* SEARCH */}
      <input
        placeholder="Search events..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={styles.search}
      />

      {/* LOADING */}
      {loading && (
        <p style={{ opacity: 0.6 }}>Loading events...</p>
      )}

      {/* GRID */}
      <div style={styles.grid}>
        {filtered.map((event) => (
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
                <h2 style={styles.titleText}>{event.title}</h2>

                <div style={styles.meta}>
                  <span>
                    {event.event_date
                      ? new Date(event.event_date).toLocaleDateString()
                      : ""}
                  </span>

                  <div style={styles.vibe}>
                    {event.vibe?.map((v, i) => (
                      <span key={i} style={styles.vibeTag}>
                        {v}
                      </span>
                    ))}
                  </div>
                </div>

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
    background: "#05050a",
    minHeight: "100vh",
    color: "white",
    padding: "20px"
  },

  header: {
    marginBottom: 10
  },

  title: {
    fontSize: 24,
    fontWeight: 700
  },

  subtitle: {
    opacity: 0.6,
    fontSize: 13,
    marginTop: 4
  },

  search: {
    width: "100%",
    padding: "12px",
    borderRadius: 12,
    border: "1px solid rgba(255,255,255,0.1)",
    background: "rgba(255,255,255,0.05)",
    color: "white",
    marginBottom: 14,
    outline: "none"
  },

  grid: {
    display: "flex",
    flexDirection: "column",
    gap: 14
  },

  card: {
    position: "relative",
    height: 170,
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
    bottom: 12,
    left: 12,
    right: 12
  },

  titleText: {
    fontSize: 18,
    fontWeight: 700
  },

  meta: {
    marginTop: 6,
    display: "flex",
    justifyContent: "space-between",
    fontSize: 11,
    opacity: 0.8
  },

  vibe: {
    display: "flex",
    gap: 6
  },

  vibeTag: {
    fontSize: 10,
    padding: "3px 8px",
    borderRadius: 20,
    background: "rgba(255,255,255,0.12)"
  }
};