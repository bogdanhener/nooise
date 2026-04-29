"use client";

import { useState } from "react";
import Link from "next/link";

const EVENTS = [
  {
    id: "mall-takeover",
    title: "Mall Takeover",
    type: "day",
    date: "2026-04-10",
    cover: "/covers/mall.jpg" // optional later
  },
  {
    id: "matchaty",
    title: "MatchaTy",
    type: "day",
    date: "2026-03-22",
    cover: "/covers/matcha.jpg"
  },
  {
    id: "sudplazza",
    title: "SudPlazza",
    type: "night",
    date: "2026-02-14",
    cover: "/covers/sud.jpg"
  }
];

export default function PhotosPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const filtered = EVENTS
    .filter((e) =>
      e.title.toLowerCase().includes(search.toLowerCase())
    )
    .filter((e) => (filter === "all" ? true : e.type === filter))
    .sort((a, b) => new Date(b.date) - new Date(a.date)); // newest first

  return (
    <div style={styles.page}>
      
      {/* HEADER */}
      <div style={styles.header}>
        <h1 style={styles.title}>Find Your Moment</h1>
        <p style={styles.subtitle}>
          Every event. Every memory. All in one place.
        </p>
      </div>

      {/* SEARCH */}
      <div style={styles.controls}>
        <input
          placeholder="Search event..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={styles.search}
        />

        <div style={styles.filters}>
          <button onClick={() => setFilter("all")} style={btn(filter === "all")}>All</button>
          <button onClick={() => setFilter("day")} style={btn(filter === "day")}>Day</button>
          <button onClick={() => setFilter("night")} style={btn(filter === "night")}>Night</button>
        </div>
      </div>

      {/* EVENTS GRID */}
      <div style={styles.grid}>
        {filtered.map((event) => (
          <Link key={event.id} href={`/photos/${event.id}`} style={{ textDecoration: "none" }}>
            <div style={styles.card}>

              {/* COVER */}
              <div
                style={{
                  ...styles.cover,
                  backgroundImage: `url(${event.cover || ""})`
                }}
              />

              {/* OVERLAY */}
              <div style={styles.overlay} />

              {/* CONTENT */}
              <div style={styles.cardContent}>
                <h2 style={styles.cardTitle}>{event.title}</h2>

                <div style={styles.meta}>
                  <span style={styles.tag}>{event.type}</span>
                  <span style={styles.date}>
                    {new Date(event.date).toLocaleDateString()}
                  </span>
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
    color: "white",
    minHeight: "100vh",
    padding: "20px 16px"
  },

  header: {
    marginBottom: 20
  },

  title: {
    fontSize: 26,
    fontWeight: 600,
    color: "white"
  },

  subtitle: {
    fontSize: 13,
    opacity: 0.6,
    marginTop: 4,
    color: "white"
  },

  controls: {
    marginBottom: 20
  },

  search: {
    width: "100%",
    padding: "12px",
    borderRadius: 10,
    border: "none",
    marginBottom: 10,
    background: "rgba(255,255,255,0.08)",
    color: "white"
  },

  filters: {
    display: "flex",
    gap: 10
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "1fr",
    gap: 14
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
    inset: 0,
    backgroundSize: "cover",
    backgroundPosition: "center",
    filter: "brightness(0.7)"
  },

  overlay: {
    position: "absolute",
    inset: 0,
    background: "linear-gradient(to top, rgba(0,0,0,0.8), transparent)"
  },

  cardContent: {
    position: "absolute",
    bottom: 12,
    left: 12,
    right: 12
  },

  cardTitle: {
    fontSize: 18,
    fontWeight: 600,
    color: "white"
  },

  meta: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: 6
  },

  tag: {
    fontSize: 11,
    padding: "4px 8px",
    borderRadius: 20,
    background: "rgba(255,255,255,0.1)",
    textTransform: "uppercase",
    color: "white"
  },

  date: {
    fontSize: 11,
    opacity: 0.7,
    color: "white"
  }
};

function btn(active) {
  return {
    padding: "8px 12px",
    borderRadius: 20,
    border: "none",
    background: active ? "white" : "rgba(255,255,255,0.1)",
    color: active ? "black" : "white",
    cursor: "pointer"
  };
}