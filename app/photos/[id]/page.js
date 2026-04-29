"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "../../../lib/supabase";

export default function EventGallery() {
  const params = useParams();
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (params?.id) {
      loadImages();
    }
  }, [params]);

  async function loadImages() {
    setLoading(true);

    const folder = params.id;

    const { data, error } = await supabase.storage
      .from("nooise-photos")
      .list(folder, {
        limit: 100,
        sortBy: { column: "name", order: "asc" }
      });

    if (error) {
      console.log("STORAGE ERROR:", error);
      setLoading(false);
      return;
    }

    const urls = data.map((file) => {
      const { data: urlData } = supabase.storage
        .from("nooise-photos")
        .getPublicUrl(`${folder}/${file.name}`);

      return urlData.publicUrl;
    });

    setImages(urls);
    setLoading(false);
  }

  return (
    <div style={{ padding: 15 }}>
      <h2 style={{ marginBottom: 15, textTransform: "capitalize" }}>
        {params?.id}
      </h2>

      {loading ? (
        <p>Loading photos...</p>
      ) : (
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
                  borderRadius: 12,
                  display: "block"
                }}
              />

              <a
                href={url}
                download
                target="_blank"
                style={{
                  display: "block",
                  textAlign: "center",
                  marginTop: 6,
                  fontSize: 12,
                  color: "#666",
                  textDecoration: "none"
                }}
              >
                ⬇ Download
              </a>

            </div>
          ))}
        </div>
      )}
    </div>
  );
}