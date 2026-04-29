"use client";

import Link from "next/link";

const EVENTS = [
  {
    id: "mall-takeover",
    title: "Mall Takeover",
    glow: "rgba(0,200,255,0.6)"
  },
  {
    id: "matchaty",
    title: "MatchaTy",
    glow: "rgba(120,255,160,0.6)"
  },
  {
    id: "sudplazza",
    title: "SudPlazza",
    glow: "rgba(168,85,247,0.6)"
  }
];

export default function PhotosPage() {
  return (
    <div style={styles.page}>

      <div style={styles.header}>
        <h1 style={styles.title}>Find Your Moment</h1>
        <p style={styles.subtitle}>
          Select the event you were part of
        </p>
      </div>

      <div style={styles.list}>
        {EVENTS.map((event) => (
          <Link key={event.id} href={`/photos/${event.id}`} style={{ textDecoration: "none" }}>
            <div style={styles.item}>

              <div
                style={{
                  ...styles.glow,
                  background: `radial-gradient(circle, ${event.glow}, transparent)`
                }}
              />

              <span style={styles.text}>{event.title}</span>

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
    padding: 20
  },

  header: {
    marginBottom: 30
  },

  title: {
    fontSize: 24,
    fontWeight: 600
  },

  subtitle: {
    opacity: 0.6,
    marginTop: 6,
    fontSize: 13
  },

  list: {
    display: "flex",
    flexDirection: "column",
    gap: 14
  },

  item: {
    position: "relative",
    padding: "18px 20px",
    borderRadius: 16,
    background: "rgba(255,255,255,0.05)",
    overflow: "hidden"
  },

  glow: {
    position: "absolute",
    width: 200,
    height: 200,
    filter: "blur(80px)",
    top: -60,
    left: -40
  },

  text: {
    fontSize: 16,
    fontWeight: 500
  }
};