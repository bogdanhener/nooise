"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import Link from "next/link";

export default function PhotosPage() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    loadEvents();
  }, []);

  async function loadEvents() {
    const { data } = await supabase.from("events").select("*");
    setEvents(data || []);
  }

  return (
    <div style={{ padding: 20 }}>
      <h1 style={{ fontSize: 28, marginBottom: 20 }}>
        Find Your Photos
      </h1>

      <div style={{ display: "grid", gap: 15 }}>
        {events.map((event) => (
          <Link
            key={event.id}
            href={`/photos/${event.id}`}
            style={{
              padding: 20,
              borderRadius: 12,
              background: "#111",
              color: "white",
              textDecoration: "none"
            }}
          >
            {event.name}
          </Link>
        ))}
      </div>
    </div>
  );
}