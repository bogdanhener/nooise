import PhotosMobile from "../../components/mobile/PhotosMobile";
import PhotosDesktop from "../../components/desktop/PhotosDesktop";

export default function PhotosPage() {
  return (
    <>
      <div className="mobile-only">
        <PhotosMobile />
      </div>
      <div className="desktop-only">
        <PhotosDesktop />
      </div>
    </>
  );
}
