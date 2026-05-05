import AboutMobile from "../../components/mobile/AboutMobile";
import AboutDesktop from "../../components/desktop/AboutDesktop";

export default function AboutPage() {
  return (
    <>
      <div className="mobile-only">
        <AboutMobile />
      </div>
      <div className="desktop-only">
        <AboutDesktop />
      </div>
    </>
  );
}
