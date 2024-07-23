import ReactMarkdown from "react-markdown";
import styles from "@/assets/styles/index.module.scss";

import Animation from "@/atoms/Animation/Animation";
const Description = ({ text }: { text: string }) => {
  return (
    <Animation y={20}>
      <div className={styles.box}>
        <ReactMarkdown>{text}</ReactMarkdown>
      </div>
    </Animation>
  );
};

export default Description;
