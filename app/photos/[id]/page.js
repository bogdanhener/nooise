"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabase";

export default function EventGallery({ params }) {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    const { data } = await supabase
      .from("event_photos")
      .select("*")
      .eq("event_id", params.id);

    setPhotos(data || []);
  }

  return (
    <div style={{ padding: 15 }}>
      <h2 style={{ marginBottom: 15 }}>
        {params.id}
      </h2>

      {/* GRID */}
      <div
        style={{
          columnCount: 3,
          columnGap: 10
        }}
      >
        {photos.map((p) => (
          <div key={p.id} style={{ marginBottom: 10 }}>
            
            <img
              src={p.image_url}
              style={{
                width: "100%",
                borderRadius: 12,
                display: "block"
              }}
            />

            {/* DOWNLOAD BUTTON */}
            <a
              href={p.image_url}
              download
              target="_blank"
              style={{
                display: "block",
                textAlign: "center",
                marginTop: 5,
                fontSize: 12,
                color: "#666"
              }}
            >
              ⬇ Download
            </a>

          </div>
        ))}
      </div>
    </div>
  );
}