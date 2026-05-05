import EventGalleryMobile from "../../../components/mobile/EventGalleryMobile";
import EventGalleryDesktop from "../../../components/desktop/EventGalleryDesktop";

export default function EventGalleryPage() {
  return (
    <>
      <div className="mobile-only">
        <EventGalleryMobile />
      </div>
      <div className="desktop-only">
        <EventGalleryDesktop />
      </div>
    </>
  );
}
