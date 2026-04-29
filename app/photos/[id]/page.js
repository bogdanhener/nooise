"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabase";

export default function EventGallery({ params }) {
  const [images, setImages] = useState([]);

  useEffect(() => {
    loadImages();
  }, []);

  async function loadImages() {
    const folder = params.id;

    const { data, error } = await supabase.storage
      .from("nooise-photos")
      .list(folder);

    if (error) {
      console.log("ERROR:", error);
      return;
    }

    const urls = data.map(
      (file) =>
        `https://cntbmodmvknudjdapxyz.supabase.co/storage/v1/object/public/nooise-photos/${folder}/${file.name}`
    );

    setImages(urls);
  }

  return (
    <div style={{ padding: 15 }}>
      <h2 style={{ marginBottom: 15 }}>{params.id}</h2>

      {/* 3 COLUMN GRID */}
      <div
        style={{
          columnCount: 3,
          columnGap: 10
        }}
      >
        {images.map((url, i) => (
          <div key={i} style={{ marginBottom: 10 }}>

            <img
              src={url}
              style={{
                width: "100%",
                borderRadius: 12
              }}
            />

            <a
              href={url}
              download
              target="_blank"
              style={{
                display: "block",
                textAlign: "center",
                fontSize: 12,
                marginTop: 5,
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