import Link from "next/link";

export default function PhotosPage() {
  const events = [
    "mall-takeover",
    "matchaty",
    "sudplazza"
  ];

  return (
    <div style={{ padding: 20 }}>
      <h1>Find Your Photos</h1>

      <div style={{ display: "grid", gap: 12 }}>
        {events.map((e) => (
          <Link
            key={e}
            href={`/photos/${e}`}
            style={{
              padding: 20,
              background: "#111",
              color: "white",
              borderRadius: 12,
              textDecoration: "none"
            }}
          >
            {e}
          </Link>
        ))}
      </div>
    </div>
  );
}