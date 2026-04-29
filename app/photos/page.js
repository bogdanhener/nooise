"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "../../lib/supabase";

export default function PhotosPage() {
  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadEvents();
  }, []);

  async function loadEvents() {
    const { data, error } = await supabase
      .from("events")
      .select("id, name, slug");

    console.log("EVENTS:", data);
    console.log("ERROR:", error);

    setEvents(data || []);
  }

  const filtered = events.filter((e) =>
    e.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={styles.page}>

      {/* HEADER */}
      <div style={styles.header}>
        <h1 style={styles.title}>Find Your Moment</h1>

        {/* SEARCH */}
        <input
          placeholder="Search event..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={styles.search}
        />
      </div>

      {/* EVENT CARDS */}
      <div style={styles.grid}>
        {filtered.map((event) => (
          <Link key={event.id} href={`/photos/${event.slug}`}>
            <div style={styles.card}>

              <div style={styles.cardOverlay} />

              <h2 style={styles.cardTitle}>{event.name}</h2>

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
    color: "white"
  },

  header: {
    padding: "20px 16px"
  },

  title: {
    fontSize: 24,
    fontWeight: 600,
    marginBottom: 12
  },

  search: {
    width: "100%",
    padding: 12,
    borderRadius: 12,
    border: "none",
    background: "rgba(255,255,255,0.08)",
    color: "white",
    outline: "none"
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: 12,
    padding: 16
  },

  card: {
    position: "relative",
    height: 120,
    borderRadius: 16,
    overflow: "hidden",
    display: "flex",
    alignItems: "flex-end",
    padding: 12,
    background: "linear-gradient(135deg, #111, #222)",
    cursor: "pointer",
    transition: "transform 0.2s ease"
  },

  cardOverlay: {
    position: "absolute",
    inset: 0,
    background: "linear-gradient(to top, rgba(0,0,0,0.7), transparent)"
  },

  cardTitle: {
    position: "relative",
    zIndex: 2,
    color: "white", // ✅ FIXED (always white)
    fontSize: 16,
    fontWeight: 600
  }
};