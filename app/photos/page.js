"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

export default function PhotosPage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    document.body.style.margin = "0";
    document.body.style.padding = "0";
    document.body.style.background = "#ffffff";
    loadEvents();
  }, []);

  async function loadEvents() {
    setLoading(true);
    setError(null);

    const { data, error } = await supabase
      .from("events")
      .select("id, name, event_date, cover_image_url")
      .order("event_date", { ascending: false });

    if (error) {
      setError("Could not load events. Please try again.");
    } else {
      setEvents(data || []);
    }

    setLoading(false);
  }

  return (
    <div style={styles.page}>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes spin { to { transform: rotate(360deg); } }
        .card-press { transition: transform 0.12s ease, box-shadow 0.12s ease; }
        .card-press:active { transform: scale(0.98); }
      `}</style>

      {/* TOP BAR */}
      <div style={styles.topBar}>
        <Link href="/" style={styles.backLink}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 5l-7 7 7 7"/>
          </svg>
          <span style={styles.backLabel}>nooise</span>
        </Link>
      </div>

      {/* HEADER */}
      <div style={styles.header}>
        <h1 style={styles.title}>Your Photos</h1>
        <p style={styles.subtitle}>Select an event to browse</p>
      </div>

      {/* LOADING */}
      {loading && (
        <div style={styles.loadingWrap}>
          <div style={styles.spinner} />
        </div>
      )}

      {/* ERROR */}
      {error && (
        <div style={styles.errorBox}>
          <p style={styles.errorText}>{error}</p>
          <button style={styles.retryBtn} onClick={loadEvents}>Try again</button>
        </div>
      )}

      {/* EMPTY */}
      {!loading && !error && events.length === 0 && (
        <p style={styles.message}>No events yet. Check back soon.</p>
      )}

      {/* GRID */}
      {!loading && !error && events.length > 0 && (
        <div style={styles.grid}>
          {events.map((event, i) => (
            <Link
              key={event.id}
              href={`/photos/${event.id}`}
              style={{ textDecoration: "none", animation: `fadeIn 0.4s ease ${i * 0.07}s both` }}
            >
  <div className="card-press" style={styles.card}>

                {/* COVER IMAGE */}
                <div
                  style={{
                    ...styles.image,
                    backgroundImage: event.cover_image_url
                      ? `url(${event.cover_image_url})`
                      : "none",
                    background: event.cover_image_url ? undefined : "#e8e8e8"
                  }}
                />

                {/* GRADIENT OVERLAY */}
                <div style={styles.overlay} />

                {/* TEXT */}
                <div style={styles.content}>
                  <h2 style={styles.titleText}>{event.name}</h2>
                  <p style={styles.dateText}>
                    {event.event_date
                      ? new Date(event.event_date).toLocaleDateString("ro-RO", {
                          day: "numeric",
                          month: "long",
                          year: "numeric"
                        })
                      : ""}
                  </p>
                </div>

                {/* ARROW */}
                <div style={styles.cardArrow}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </div>

              </div>
            </Link>
          ))}
        </div>
      )}

      {/* FOOTER */}
      <div style={styles.footer}>
        <a
          href="https://www.instagram.com/nooise___/"
          target="_blank"
          rel="noopener noreferrer"
          style={styles.footerInsta}
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#bbb" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
            <circle cx="12" cy="12" r="4"/>
            <circle cx="17.5" cy="6.5" r="0.8" fill="#bbb" stroke="none"/>
          </svg>
          <span>nooise___</span>
        </a>
      </div>

    </div>
  );
}

const styles = {
  page: {
    background: "#ffffff",
    minHeight: "100dvh",
    color: "#111",
    margin: 0,
    boxSizing: "border-box",
    fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif"
  },
  topBar: {
    display: "flex",
    alignItems: "center",
    padding: "16px 20px 0"
  },
  backLink: {
    display: "flex",
    alignItems: "center",
    gap: 6,
    textDecoration: "none",
    color: "#111"
  },
  backLabel: {
    fontSize: 13,
    fontWeight: 600,
    opacity: 0.5
  },
  header: {
    padding: "20px 20px 8px"
  },
  title: {
    fontSize: 28,
    fontWeight: 800,
    margin: 0,
    color: "#111",
    letterSpacing: -0.5
  },
  subtitle: {
    color: "#aaa",
    fontSize: 13,
    marginTop: 4
  },
  loadingWrap: {
    display: "flex",
    justifyContent: "center",
    padding: "60px 0"
  },
  spinner: {
    width: 22,
    height: 22,
    border: "2px solid rgba(0,0,0,0.08)",
    borderTop: "2px solid #111",
    borderRadius: "50%",
    animation: "spin 0.8s linear infinite"
  },
  message: {
    color: "#aaa",
    fontSize: 14,
    padding: "0 20px"
  },
  errorBox: {
    margin: "0 20px",
    background: "rgba(255,60,60,0.06)",
    border: "1px solid rgba(255,60,60,0.15)",
    borderRadius: 12,
    padding: 16
  },
  errorText: {
    color: "#e05555",
    fontSize: 14,
    margin: 0
  },
  retryBtn: {
    marginTop: 10,
    background: "transparent",
    border: "1px solid rgba(200,60,60,0.3)",
    color: "#e05555",
    borderRadius: 8,
    padding: "6px 14px",
    fontSize: 13,
    cursor: "pointer"
  },
  grid: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
    padding: "12px 16px"
  },
  card: {
    position: "relative",
    height: 190,
    borderRadius: 20,
    overflow: "hidden",
    boxShadow: "0 2px 20px rgba(0,0,0,0.1)"
  },
  image: {
    position: "absolute",
    inset: 0,
    backgroundSize: "cover",
    backgroundPosition: "center"
  },
  overlay: {
    position: "absolute",
    inset: 0,
    background: "linear-gradient(to top, rgba(0,0,0,0.65), rgba(0,0,0,0.0) 60%)"
  },
  content: {
    position: "absolute",
    bottom: 14,
    left: 16,
    right: 48
  },
  titleText: {
    fontSize: 18,
    fontWeight: 700,
    color: "white",
    margin: 0
  },
  dateText: {
    fontSize: 12,
    marginTop: 3,
    color: "rgba(255,255,255,0.7)"
  },
  cardArrow: {
    position: "absolute",
    bottom: 14,
    right: 14,
    width: 32,
    height: 32,
    borderRadius: "50%",
    background: "rgba(255,255,255,0.15)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backdropFilter: "blur(4px)"
  },
  footer: {
    marginTop: 16,
    paddingBottom: 40,
    display: "flex",
    justifyContent: "center"
  },
  footerInsta: {
    display: "flex",
    alignItems: "center",
    gap: 5,
    textDecoration: "none",
    color: "#bbb",
    fontSize: 12
  }
};