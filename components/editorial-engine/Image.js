import CoverImage from "../cover-image";
import Styles from "./Styles.module.css";

export default function Image({ image }) {
  return (
    <div className={Styles.component}>
      This is an "Image" CMS Component
      <CoverImage title={image.name} url={image.url} />;
    </div>
  );
}
