"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

export default function Photos() {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    const { data, error } = await supabase
      .from("event_photos")
      .select("image_url");

    if (!error) {
      setPhotos(data || []);
    } else {
      console.error(error);
    }
  }

  return (
    <div style={{
      padding: 20,
      background: "#0b0b0f",
      minHeight: "100vh",
      color: "white"
    }}>
      
      {/* HEADER */}
      <h1 style={{
        textAlign: "center",
        marginBottom: 30,
        fontSize: 28,
        letterSpacing: 2
      }}>
        NOOISE — Photos
      </h1>

      {/* GALLERY */}
      <div style={{
        columnCount: 2,
        columnGap: 10
      }}>
        {photos.map((p, i) => (
          <img
            key={i}
            src={p.image_url}
            alt=""
            style={{
              width: "100%",
              marginBottom: 10,
              borderRadius: 14,
              breakInside: "avoid"
            }}
          />
        ))}
      </div>

    </div>
  );
}