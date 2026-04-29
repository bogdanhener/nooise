"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

export default function Photos() {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    load();
  }, []);

  async function load() {
   console.log("TEST START");

    const res = await supabase.from("event_photos").select("*");

    console.log("FULL RESPONSE:", res);

    setPhotos(res.data || []);
  }

    console.log("DATA:", data);
    console.log("ERROR:", error);

    setPhotos(data || []);
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Photos</h1>

      <div style={{ columnCount: 2, columnGap: 10 }}>
        {photos.map((p, i) => (
          <img
            key={i}
            src={p.image_url}
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