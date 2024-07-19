import ReactMarkdown from "react-markdown";
import styles from "../../assets/styles/index.module.scss";
const Description = ({
  text
}: {
  text: string
}) => {
  return <div className={styles.box}>

    <ReactMarkdown>
      {text}
    </ReactMarkdown>
  </div>
};

export default Description;
