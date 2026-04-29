"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

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
  const [enter, setEnter] = useState(false);

  useEffect(() => {
    setTimeout(() => setEnter(true), 1200);
  }, []);

  return (
    <main style={styles.page}>

      {/* 🎬 CINEMATIC ENTRY */}
      {!enter && (
        <div style={styles.intro}>
          <div style={styles.introGlow}></div>
          <h1 style={styles.introLogo}>NOOISE</h1>
        </div>
      )}

      {/* MAIN CONTENT */}
      {enter && (
        <>
          <div style={styles.hero}>
            <h1 style={styles.logo}>NOOISE</h1>
            <p style={styles.tagline}>
              Select your moment
            </p>
          </div>

          <div style={styles.container}>
            {EVENTS.map((event) => (
              <Link key={event.id} href={`/photos/${event.id}`} style={{ textDecoration: "none" }}>
                <div style={styles.card}>

                  <div
                    style={{
                      ...styles.image,
                      backgroundImage: `url(${event.image})`
                    }}
                  />

                  <div
                    style={{
                      ...styles.glow,
                      background: `radial-gradient(circle, ${event.glow}, transparent)`
                    }}
                  />

                  <div style={styles.content}>
                    <h2 style={styles.title}>{event.title}</h2>
                    <p style={styles.subtitle}>{event.subtitle}</p>
                  </div>

                </div>
              </Link>
            ))}
          </div>
        </>
      )}
    </main>
  );
}

const styles = {
  page: {
    background: "#05050a",
    minHeight: "100vh",
    color: "white",
    fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif"
  },

  /* 🎬 INTRO */
  intro: {
    position: "fixed",
    inset: 0,
    background: "#05050a",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 999
  },

  introLogo: {
    fontSize: 40,
    letterSpacing: 8,
    fontWeight: 600,
    animation: "fadeIn 1.2s ease"
  },

  introGlow: {
    position: "absolute",
    width: 300,
    height: 300,
    background: "radial-gradient(circle, rgba(168,85,247,0.5), transparent)",
    filter: "blur(80px)"
  },

  /* HERO */
  hero: {
    padding: "40px 20px 10px"
  },

  logo: {
    fontSize: 30,
    letterSpacing: 6,
    fontWeight: 600
  },

  tagline: {
    opacity: 0.5,
    marginTop: 8,
    fontSize: 14,
    letterSpacing: 1
  },

  container: {
    padding: 16,
    display: "flex",
    flexDirection: "column",
    gap: 18
  },

  card: {
    position: "relative",
    height: 190,
    borderRadius: 24,
    overflow: "hidden",
    transition: "transform 0.4s ease"
  },

  image: {
    position: "absolute",
    inset: 0,
    backgroundSize: "cover",
    backgroundPosition: "center",
    filter: "brightness(0.65)"
  },

  glow: {
    position: "absolute",
    width: 320,
    height: 320,
    filter: "blur(100px)",
    top: -80,
    left: -40
  },

  content: {
    position: "absolute",
    bottom: 20,
    left: 20
  },

  title: {
    fontSize: 22,
    fontWeight: 600,
    letterSpacing: 1
  },

  subtitle: {
    fontSize: 13,
    opacity: 0.7,
    marginTop: 6
  }
};