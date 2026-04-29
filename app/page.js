export default function Home() {
  return (
    <main>

      {/* HERO */}
      <section className="sunset-bg" style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        textAlign: "center"
      }}>

        <div className="glow" style={{ top: 50, left: 80 }} />
        <div className="glow" style={{ bottom: 80, right: 60 }} />

        <h1 style={{
          fontSize: 72,
          letterSpacing: 10,
          margin: 0
        }}>
          NOOISE
        </h1>

        <p style={{ opacity: 0.8 }}>
          Daytime Experiences
        </p>

        <div style={{ marginTop: 30 }}>
          <a className="btn btn-primary" href="/events">
            Next Events
          </a>

          <a className="btn btn-outline" href="/photos" style={{ marginLeft: 10 }}>
            Find Your Photos
          </a>
        </div>

      </section>

      {/* NEXT EVENT */}
      <section style={{ padding: 60, textAlign: "center" }}>
        <div className="glass" style={{ maxWidth: 500, margin: "0 auto" }}>
          <h2>Next Event</h2>
          <p>Crama Thesaurus Winery Session</p>

          <a
            className="btn btn-primary"
            href="https://www.livetickets.ro/bilete/nooise-x-crama-thesaurus-winery-session"
            target="_blank"
          >
            Get Tickets
          </a>
        </div>
      </section>

    </main>
  );
}