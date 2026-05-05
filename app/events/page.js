import EventsMobile from "../../components/mobile/EventsMobile";
import EventsDesktop from "../../components/desktop/EventsDesktop";

export default function EventsPage() {
  return (
    <>
      <div className="mobile-only">
        <EventsMobile />
      </div>
      <div className="desktop-only">
        <EventsDesktop />
      </div>
    </>
  );
}
