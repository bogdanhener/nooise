"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "../../../lib/supabase";

export default function EventGallery() {
  const params = useParams();
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (params?.id) loadImages();
  }, [params]);

  async function loadImages() {
    setLoading(true);

    const folder = params.id;

    const { data, error } = await supabase.storage
      .from("nooise-photos")
      .list(folder, {
        limit: 200,
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

  function forceDownload(url) {
    const a = document.createElement("a");
    a.href = url;
    a.download = "nooise-photo.jpg";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  return (
    <div style={{ padding: 15, background: "#0b0b0f", minHeight: "100vh", color: "white" }}>
      
      {/* TITLE */}
      <h2 style={{ marginBottom: 20, textTransform: "capitalize" }}>
        {params?.id}
      </h2>

      {/* LOADING */}
      {loading ? (
        <p style={{ opacity: 0.6 }}>Loading photos...</p>
      ) : (

        /* GRID */
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 10
          }}
        >
          {images.map((url, i) => (
            <div
              key={i}
              style={{
                position: "relative",
                borderRadius: 14,
                overflow: "hidden",
                background: "#111"
              }}
            >

              {/* IMAGE */}
              <img
                src={url}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block"
                }}
              />

              {/* OVERLAY DOWNLOAD BUTTON */}
              <button
                onClick={() => forceDownload(url)}
                style={{
                  position: "absolute",
                  top: 8,
                  right: 8,
                  width: 34,
                  height: 34,
                  borderRadius: "50%",
                  background: "rgba(0,0,0,0.65)",
                  border: "none",
                  color: "white",
                  fontSize: 14,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backdropFilter: "blur(6px)"
                }}
              >
                ⬇
              </button>

            </div>
          ))}
        </div>
      )}
    </div>
  );
}