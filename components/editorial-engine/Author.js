import Avatar from "../avatar";
import Styles from "./Styles.module.css";

export default function Author({ name, picture }) {
  return (
    <div className={Styles.component}>
      This is a "Author" CMS Component
      <Avatar name={name} picture={picture} />
    </div>
  );
}
