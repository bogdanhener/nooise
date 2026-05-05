import ContactMobile from "../../components/mobile/ContactMobile";
import ContactDesktop from "../../components/desktop/ContactDesktop";

export default function ContactPage() {
  return (
    <>
      <div className="mobile-only">
        <ContactMobile />
      </div>
      <div className="desktop-only">
        <ContactDesktop />
      </div>
    </>
  );
}
