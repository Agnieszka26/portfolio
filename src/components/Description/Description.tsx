import styles from "@/assets/styles/index.module.scss";
import Animation from "@/atoms/Animation/Animation";
import LazyMarkdown from "@/components/client/LazyMarkdown";

const Description = ({ text }: { text: string }) => {
  return (
    <Animation type="fade-up">
      <div className={styles.box}>
        <LazyMarkdown>{text}</LazyMarkdown>
      </div>
    </Animation>
  );
};

export default Description;
