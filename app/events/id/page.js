export default function EventPage({ params }) {
  return (
    <div style={{ padding: 20, color: "white", background: "#05050a", minHeight: "100vh" }}>
      <h1>Event: {params.id}</h1>
      <p>Event page coming soon (gallery + story + tickets)</p>
    </div>
  );
}