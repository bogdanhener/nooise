import Link from "next/link";

export default function PhotosPage() {
  const events = [
    { id: "mall-takeover", name: "Mall Takeover" },
    { id: "matchaty", name: "MatchaTy" },
    { id: "sudplazza", name: "SudPlazza" }
  ];

  return (
    <div style={{ padding: 20 }}>
      <h1>Find Your Photos</h1>

      <div style={{ display: "grid", gap: 12 }}>
        {events.map((event) => (
          <Link
            key={event.id}
            href={`/photos/${event.id}`}
            style={{
              padding: 18,
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