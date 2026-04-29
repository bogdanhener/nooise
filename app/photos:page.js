"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

export default function Photos() {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    const { data } = await supabase
      .from("event_photos")
      .select("*");

    setPhotos(data || []);
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Find Your Moment</h1>

      <div style={{
        columnCount: 3,
        columnGap: 10
      }}>
        {photos.map((p, i) => (
          <img
            key={i}
            src={p.image_url}
            style={{
              width: "100%",
              marginBottom: 10,
              borderRadius: 10
            }}
          />
        ))}
      </div>
    </div>
  );
}