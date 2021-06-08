import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import markdownStyles from '../markdown-styles.module.css'
import Styles from "./Styles.module.css";

export default function Text(props) {
  return (
    <div className={Styles.component}>
      This is a "Text" CMS Component
      <div className={markdownStyles['markdown']}>
        {documentToReactComponents(props.json)}
      </div>
    </div>
  )
}
