"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

export default function PhotosPage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
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
      setLoading(false);
      return;
    }

    const enriched = await Promise.all(
      (data || []).map(async (event) => {
        if (event.cover_image_url) return event;
        const { data: files } = await supabase.storage
          .from("nooise-photos")
          .list(event.id, { limit: 1, sortBy: { column: "name", order: "asc" } });
        if (files && files.length > 0 && !files[0].name.startsWith(".")) {
          const { data: urlData } = supabase.storage
            .from("nooise-photos")
            .getPublicUrl(`${event.id}/${files[0].name}`);
          return { ...event, cover_image_url: urlData.publicUrl };
        }
        return event;
      })
    );

    setEvents(enriched);
    setLoading(false);
  }

  return (
    <div style={styles.page}>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes lineGrow {
          from { transform: scaleX(0); }
          to   { transform: scaleX(1); }
        }
        .event-card { transition: opacity 0.4s cubic-bezier(0.22, 1, 0.36, 1), transform 0.4s cubic-bezier(0.22, 1, 0.36, 1); }
        .event-card:active { opacity: 0.75; transform: scale(0.995); }
        .img-zoom { transition: transform 0.6s cubic-bezier(0.22, 1, 0.36, 1); }
        .event-card:hover .img-zoom { transform: scale(1.03); }
      `}</style>

      {/* TOP BAR */}
      <div style={styles.topBar}>
        <Link href="/" style={styles.backLink}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 5l-7 7 7 7"/>
          </svg>
          <span>nooise</span>
        </Link>
        <span style={styles.pageNumber}>Archive</span>
      </div>

      {/* HEADER */}
      <div style={styles.header}>
        <span style={styles.eyebrow}>The Archive</span>
        <h1 style={styles.title}>
          Your <span style={styles.titleSerif}>photos</span>
        </h1>
        <p style={styles.subtitle}>Select an event to browse</p>
        <div style={styles.headerLine} />
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
              style={{
                textDecoration: "none",
                color: "inherit",
                opacity: 0,
                animation: `fadeUp 0.6s cubic-bezier(0.22, 1, 0.36, 1) ${i * 0.08}s forwards`
              }}
            >
              <article className="event-card" style={styles.card}>

                {/* CAPTION — above image now */}
                <div style={styles.caption}>
                  <div>
                    <h2 style={styles.captionTitle}>{event.name}</h2>
                    <p style={styles.captionDate}>
                      {event.event_date
                        ? new Date(event.event_date).toLocaleDateString("en-GB", {
                            day: "numeric",
                            month: "long",
                            year: "numeric"
                          })
                        : ""}
                    </p>
                  </div>
                  <span style={styles.captionNumber}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>

                {/* IMAGE */}
                <div style={styles.imageWrap}>
                  <div style={{ ...styles.imagePlaceholder, background: "#ececea" }} />
                  {event.cover_image_url && (
                    <div
                      className="img-zoom"
                      style={{ ...styles.image, backgroundImage: `url(${event.cover_image_url})` }}
                    />
                  )}
                  <div style={styles.imageBorder} />
                </div>

              </article>
            </Link>
          ))}
        </div>
      )}

      {/* FOOTER */}
      <div style={styles.footer}>
        <div style={styles.footerLine} />
        <a
          href="https://www.instagram.com/nooise___/"
          target="_blank"
          rel="noopener noreferrer"
          style={styles.footerInsta}
        >
          @nooise___
        </a>
      </div>

    </div>
  );
}

const styles = {
  page: {
    background: "var(--paper)",
    minHeight: "100dvh",
    color: "var(--ink)",
    margin: 0,
    boxSizing: "border-box",
    fontFamily: "var(--sans)"
  },

  /* TOP BAR */
  topBar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "20px 22px 0"
  },
  backLink: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    textDecoration: "none",
    color: "var(--ink-soft)",
    fontSize: 11,
    fontWeight: 500,
    letterSpacing: "0.04em"
  },
  pageNumber: {
    fontSize: 10,
    fontWeight: 500,
    letterSpacing: "0.18em",
    textTransform: "uppercase",
    color: "var(--ink-mute)"
  },

  /* HEADER */
  header: {
    padding: "40px 22px 24px",
    maxWidth: 480,
    margin: "0 auto",
    boxSizing: "border-box"
  },
  eyebrow: {
    fontSize: 10,
    fontWeight: 500,
    letterSpacing: "0.18em",
    textTransform: "uppercase",
    color: "var(--ink-soft)"
  },
  title: {
    fontSize: 40,
    fontWeight: 500,
    margin: "10px 0 0",
    color: "var(--ink)",
    letterSpacing: "-0.03em",
    lineHeight: 1
  },
  titleSerif: {
    fontFamily: "var(--serif)",
    fontStyle: "italic",
    fontWeight: 400
  },
  subtitle: {
    color: "var(--ink-mute)",
    fontSize: 13,
    marginTop: 14,
    margin: "14px 0 0"
  },
  headerLine: {
    width: 40,
    height: 1,
    background: "var(--ink)",
    marginTop: 22,
    transformOrigin: "left",
    animation: "lineGrow 0.7s cubic-bezier(0.22, 1, 0.36, 1) 0.2s both"
  },

  /* LOADING */
  loadingWrap: {
    display: "flex",
    justifyContent: "center",
    padding: "60px 0"
  },
  spinner: {
    width: 18,
    height: 18,
    border: "1.5px solid rgba(10,10,10,0.1)",
    borderTop: "1.5px solid var(--ink)",
    borderRadius: "50%",
    animation: "spin 0.9s linear infinite"
  },
  message: {
    color: "var(--ink-mute)",
    fontSize: 13,
    padding: "0 22px",
    maxWidth: 480,
    margin: "0 auto"
  },
  errorBox: {
    margin: "0 22px",
    maxWidth: 480,
    padding: "16px 18px",
    border: "1px solid var(--line-strong)",
    borderRadius: 12
  },
  errorText: {
    color: "var(--ink)",
    fontSize: 13,
    margin: 0
  },
  retryBtn: {
    marginTop: 12,
    background: "transparent",
    border: "1px solid var(--line-strong)",
    color: "var(--ink)",
    borderRadius: 8,
    padding: "7px 14px",
    fontSize: 11,
    fontWeight: 500,
    letterSpacing: "0.04em",
    cursor: "pointer",
    fontFamily: "var(--sans)"
  },

  /* GRID */
  grid: {
    display: "flex",
    flexDirection: "column",
    gap: 40,
    padding: "16px 22px 24px",
    maxWidth: 480,
    margin: "0 auto",
    boxSizing: "border-box"
  },
  card: {
    cursor: "pointer"
  },
  imageWrap: {
    position: "relative",
    width: "100%",
    aspectRatio: "16 / 11",
    borderRadius: 10,
    overflow: "hidden"
  },
  imagePlaceholder: {
    position: "absolute",
    inset: 0
  },
  image: {
    position: "absolute",
    inset: 0,
    backgroundSize: "cover",
    backgroundPosition: "center"
  },
  imageBorder: {
    position: "absolute",
    inset: 0,
    border: "1px solid var(--line)",
    borderRadius: 10,
    pointerEvents: "none"
  },
  caption: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-between",
    paddingBottom: 14,
    gap: 16
  },
  captionTitle: {
    fontSize: 16,
    fontWeight: 500,
    margin: 0,
    color: "var(--ink)",
    letterSpacing: "-0.01em",
    lineHeight: 1.2
  },
  captionDate: {
    fontSize: 11,
    color: "var(--ink-mute)",
    margin: "4px 0 0",
    letterSpacing: "0.02em"
  },
  captionNumber: {
    fontSize: 10,
    fontWeight: 500,
    letterSpacing: "0.18em",
    color: "var(--ink-mute)",
    paddingTop: 3,
    flexShrink: 0
  },

  /* FOOTER */
  footer: {
    marginTop: 32,
    paddingBottom: 40
  },
  footerLine: {
    width: "100%",
    maxWidth: 480,
    height: 1,
    background: "var(--line)",
    margin: "0 auto"
  },
  footerInsta: {
    display: "block",
    textAlign: "center",
    paddingTop: 18,
    textDecoration: "none",
    color: "var(--ink-mute)",
    fontSize: 11,
    fontWeight: 500,
    letterSpacing: "0.04em"
  }
};