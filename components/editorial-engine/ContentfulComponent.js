import Image from "./Image";
import Text from "./Text";
import Author from "./Author";
import Post from "./Post";

const componentsByTypeName = {
  Author,
  PagePost: Post,
  Text,
  Image,
};

export default function ContentfulComponent({
  content: { __typename, ...content },
}) {
  const { [__typename]: Component = () => null } = componentsByTypeName;
  return <Component {...content} />;
}

export const renderComponentList = ({ items = [] } = {}) => {
  console.log(items)
  return items.map((item, index) => (
    <ContentfulComponent key={index} content={item} />
  ));
};
