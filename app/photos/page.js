"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

export default function Photos() {
  const [photos, setPhotos] = useState([]);
  const [debug, setDebug] = useState(null);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    console.log("🚀 STARTING SUPABASE FETCH...");

    const res = await supabase
      .from("event_photos")
      .select("*");

    console.log("📦 FULL RESPONSE:", res);

    setDebug(res);

    if (res.error) {
      console.log("❌ SUPABASE ERROR:", res.error);
    }

    setPhotos(res.data || []);
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Photos Debug Page</h1>

      {/* 🔥 DEBUG OUTPUT */}
      <div style={{
        background: "#111",
        color: "#0f0",
        padding: 15,
        borderRadius: 10,
        fontSize: 12,
        marginBottom: 20,
        whiteSpace: "pre-wrap"
      }}>
        <strong>DEBUG OUTPUT:</strong>
        {"\n"}
        {JSON.stringify(debug, null, 2)}
      </div>

      {/* 🧪 PHOTO GRID */}
      <div style={{ columnCount: 2, columnGap: 10 }}>
        {photos.map((p, i) => (
          <img
            key={i}
            src={p.image_url}
            alt=""
            style={{
              width: "100%",
              marginBottom: 10,
              borderRadius: 12
            }}
          />
        ))}
      </div>
    </div>
  );
}