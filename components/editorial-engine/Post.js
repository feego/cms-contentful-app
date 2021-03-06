import PostBody from "../post-body";
import PostHeader from "../post-header";
import { renderComponentList } from "./ContentfulComponent";
import Styles from "./Styles.module.css";

export default function Post(props) {
  console.log(props)
  return (
    <div className={Styles.component}>
      This is a "Post" CMS Component
      <PostHeader
        title={props.title}
        coverImage={props.coverImage}
        date={props.date}
        author={props.author}
      />
      <PostBody content={props.content} />
      {renderComponentList(props.componentsCollection)}
    </div>
  );
}
