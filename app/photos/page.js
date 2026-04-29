"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "../../lib/supabase";

export default function PhotosPage() {
  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    loadEvents();
  }, []);

  async function loadEvents() {
    const { data, error } = await supabase
      .from("events")
      .select("id, name, slug, cover_image_url, vibe, event_date")
      .order("event_date", { ascending: false });

    console.log("EVENTS:", data);
    console.log("ERROR:", error);

    setEvents(data || []);
  }

  const filtered = events
    .filter((e) =>
      e.name.toLowerCase().includes(search.toLowerCase())
    )
    .filter((e) =>
      filter === "all" ? true : e.vibe?.includes(filter)
    );

  return (
    <div style={styles.page}>

      {/* HEADER */}
      <div style={styles.header}>
        <h1 style={styles.title}>Find Your Moment</h1>

        <input
          placeholder="Search event..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={styles.search}
        />

        <div style={styles.filters}>
          {["all", "day", "night"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              style={{
                ...styles.filterBtn,
                background:
                  filter === f ? "white" : "rgba(255,255,255,0.1)",
                color: filter === f ? "black" : "white"
              }}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* GRID */}
      <div style={styles.grid}>
        {filtered.map((event) => {

          const image =
            event.cover_image_url ||
            "https://images.unsplash.com/photo-1506157786151-b8491531f063?q=80&w=1200";

          return (
            <Link key={event.id} href={`/photos/${event.slug}`}>
              <div style={styles.card}>

                {/* IMAGE */}
                <img
                  src={image}
                  style={styles.cover}
                />

                {/* OVERLAY */}
                <div style={styles.overlay} />

                {/* CONTENT */}
                <div style={styles.content}>
                  <h2 style={styles.cardTitle}>
                    {event.name}
                  </h2>

                  <div style={styles.tags}>
                    {event.vibe?.map((v, i) => (
                      <span key={i} style={styles.tag}>
                        {v}
                      </span>
                    ))}
                  </div>
                </div>

              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

const styles = {

  page: {
    background: "#05050a",
    minHeight: "100vh",
    color: "white"
  },

  header: {
    padding: "20px 16px"
  },

  title: {
    fontSize: 24,
    fontWeight: 600,
    marginBottom: 12,
    color: "white"
  },

  search: {
    width: "100%",
    padding: 12,
    borderRadius: 12,
    border: "none",
    background: "rgba(255,255,255,0.08)",
    color: "white",
    marginBottom: 12
  },

  filters: {
    display: "flex",
    gap: 8
  },

  filterBtn: {
    padding: "6px 12px",
    borderRadius: 20,
    border: "none",
    cursor: "pointer"
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: 12,
    padding: 16
  },

  card: {
    position: "relative",
    height: 160,
    borderRadius: 16,
    overflow: "hidden",
    cursor: "pointer"
  },

  cover: {
    position: "absolute",
    width: "100%",
    height: "100%",
    objectFit: "cover"
  },

  overlay: {
    position: "absolute",
    inset: 0,
    background:
      "linear-gradient(to top, rgba(0,0,0,0.85), rgba(0,0,0,0.2))"
  },

  content: {
    position: "absolute",
    bottom: 10,
    left: 10,
    right: 10,
    zIndex: 2
  },

  cardTitle: {
    fontSize: 16,
    fontWeight: 600,
    color: "white" // ✅ FORCE WHITE
  },

  tags: {
    display: "flex",
    gap: 6,
    marginTop: 4,
    flexWrap: "wrap"
  },

  tag: {
    fontSize: 10,
    padding: "2px 6px",
    borderRadius: 6,
    background: "rgba(255,255,255,0.2)",
    color: "white"
  }
};