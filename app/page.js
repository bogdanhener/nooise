export default function Home() {
  return (
    <main style={{
      height: "100vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      background: "linear-gradient(135deg,#ff7a18,#af00ff,#001a4d)",
      color: "white",
      textAlign: "center",
      fontFamily: "sans-serif"
    }}>
      
      <h1 style={{ fontSize: 64, letterSpacing: 8 }}>NOOISE</h1>
      <p style={{ opacity: 0.8 }}>Daytime Experiences</p>

      <div style={{ marginTop: 30 }}>
        <a href="/photos" style={btn}>Find Your Photos</a>
      </div>

      <div style={{ marginTop: 15 }}>
        <a
          href="https://www.livetickets.ro/bilete/nooise-x-crama-thesaurus-winery-session"
          style={{...btn, background: "white", color: "black"}}
        >
          Get Tickets
        </a>
      </div>

    </main>
  );
}

const btn = {
  padding: "12px 22px",
  border: "1px solid white",
  borderRadius: 30,
  textDecoration: "none",
  color: "white",
  display: "inline-block"
};