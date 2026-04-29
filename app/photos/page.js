"use client";

import Link from "next/link";

const EVENTS = [
  {
    id: "mall-takeover",
    title: "Mall Takeover",
    subtitle: "Energy takes over the space",
    glow: "rgba(0,200,255,0.6)",
    image: "https://images.unsplash.com/photo-1506157786151-b8491531f063"
  },
  {
    id: "matchaty",
    title: "MatchaTy",
    subtitle: "Curated rhythm & aesthetic",
    glow: "rgba(120,255,160,0.6)",
    image: "https://images.unsplash.com/photo-1519681393784-d120267933ba"
  },
  {
    id: "sudplazza",
    title: "SudPlazza",
    subtitle: "Deeper sounds, late energy",
    glow: "rgba(168,85,247,0.6)",
    image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30"
  }
];

export default function Home() {
  return (
    <main style={styles.page}>

      {/* HERO */}
      <div style={styles.hero}>
        <h1 style={styles.logo}>NOOISE</h1>
        <p style={styles.tagline}>
          Select your moment
        </p>
      </div>

      {/* EVENTS */}
      <div style={styles.container}>
        {EVENTS.map((event) => (
          <Link key={event.id} href={`/photos/${event.id}`} style={{ textDecoration: "none" }}>
            <div style={styles.card}>

              {/* IMAGE */}
              <div
                style={{
                  ...styles.image,
                  backgroundImage: `url(${event.image})`
                }}
              />

              {/* GLOW */}
              <div
                style={{
                  ...styles.glow,
                  background: `radial-gradient(circle, ${event.glow}, transparent)`
                }}
              />

              {/* CONTENT */}
              <div style={styles.content}>
                <h2 style={styles.title}>{event.title}</h2>
                <p style={styles.subtitle}>{event.subtitle}</p>
              </div>

            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}

const styles = {

  page: {
    background: "#05050a",
    minHeight: "100vh",
    color: "white",
    fontFamily: "sans-serif"
  },

  hero: {
    padding: "30px 20px 10px"
  },

  logo: {
    fontSize: 28,
    letterSpacing: 4,
    fontWeight: 600
  },

  tagline: {
    opacity: 0.6,
    marginTop: 6,
    fontSize: 14
  },

  container: {
    padding: 16,
    display: "flex",
    flexDirection: "column",
    gap: 16
  },

  card: {
    position: "relative",
    height: 180,
    borderRadius: 20,
    overflow: "hidden",
    cursor: "pointer",
    transform: "scale(1)",
    transition: "all 0.3s ease"
  },

  image: {
    position: "absolute",
    inset: 0,
    backgroundSize: "cover",
    backgroundPosition: "center",
    filter: "brightness(0.7)"
  },

  glow: {
    position: "absolute",
    width: 300,
    height: 300,
    filter: "blur(80px)",
    top: -80,
    left: -40
  },

  content: {
    position: "absolute",
    bottom: 16,
    left: 16,
    zIndex: 2
  },

  title: {
    fontSize: 20,
    fontWeight: 600
  },

  subtitle: {
    fontSize: 13,
    opacity: 0.7,
    marginTop: 4
  }
};