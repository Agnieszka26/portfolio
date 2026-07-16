import styles from "@/assets/styles/index.module.scss";
import Animation from "@/atoms/Animation/Animation";
import Markdown from "@/components/Markdown";

const Description = ({ text }: { text: string }) => {
  return (
    <Animation type="fade-up">
      <div className={styles.box}>
        <Markdown>{text}</Markdown>
      </div>
    </Animation>
  );
};

export default Description;
