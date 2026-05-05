import HomeMobile from "../components/mobile/HomeMobile";
import HomeDesktop from "../components/desktop/HomeDesktop";

export default function Home() {
  return (
    <>
      <div className="mobile-only">
        <HomeMobile />
      </div>
      <div className="desktop-only">
        <HomeDesktop />
      </div>
    </>
  );
}
