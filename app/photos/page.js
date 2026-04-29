"use client";

import { useState } from "react";
import Link from "next/link";

const EVENTS = [
  { id: "mall-takeover", title: "Mall Takeover", type: "day" },
  { id: "matchaty", title: "MatchaTy", type: "day" },
  { id: "sudplazza", title: "SudPlazza", type: "night" }
];

export default function PhotosPage() {
  const [search, setSearch] = useState("");

  const filtered = EVENTS.filter((e) =>
    e.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={styles.page}>

      {/* HEADER */}
      <div style={styles.header}>
        <h1 style={styles.title}>Find Your Photos</h1>
        <p style={styles.subtitle}>
          Select an event to view your moments
        </p>
      </div>

      {/* SEARCH BAR (FORCED TOP) */}
      <div style={styles.searchWrap}>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search event..."
          style={styles.search}
        />
      </div>

      {/* EVENT CARDS */}
      <div style={styles.grid}>
        {filtered.map((event) => (
          <Link
            key={event.id}
            href={`/photos/${event.id}`}
            style={{ textDecoration: "none" }}
          >
            <div style={styles.card}>
              <div style={styles.overlay} />

              <div style={styles.content}>
                <h2 style={styles.cardTitle}>{event.title}</h2>
                <span style={styles.tag}>{event.type}</span>
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
    padding: "20px 16px",
    color: "white"
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
    fontSize: 13,
    opacity: 0.6,
    marginTop: 4,
    color: "white"
  },

  searchWrap: {
    marginBottom: 16
  },

  search: {
    width: "100%",
    padding: "12px 14px",
    borderRadius: 12,
    border: "1px solid rgba(255,255,255,0.15)",
    background: "rgba(255,255,255,0.05)",
    color: "white",
    outline: "none"
  },

  grid: {
    display: "flex",
    flexDirection: "column",
    gap: 12
  },

  card: {
    position: "relative",
    height: 110,
    borderRadius: 16,
    overflow: "hidden",
    background: "linear-gradient(135deg, #7c3aed, #ec4899, #f97316)"
  },

  overlay: {
    position: "absolute",
    inset: 0,
    background: "rgba(0,0,0,0.35)"
  },

  content: {
    position: "absolute",
    inset: 0,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: "14px"
  },

  cardTitle: {
    fontSize: 18,
    fontWeight: 700,
    color: "white",
    zIndex: 2
  },

  tag: {
    marginTop: 6,
    fontSize: 11,
    padding: "4px 8px",
    borderRadius: 20,
    background: "rgba(255,255,255,0.15)",
    width: "fit-content",
    color: "white"
  }
};