import CramaMobile from "../../../components/mobile/CramaMobile";
import CramaDesktop from "../../../components/desktop/CramaDesktop";

export default function CramaThesaurusPage() {
  return (
    <>
      <div className="mobile-only">
        <CramaMobile />
      </div>
      <div className="desktop-only">
        <CramaDesktop />
      </div>
    </>
  );
}
