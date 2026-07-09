import styles from "@/assets/styles/index.module.scss";
import LazyAnimation from "@/components/client/LazyAnimation";
import LazyMarkdown from "@/components/client/LazyMarkdown";

const Description = ({ text }: { text: string }) => {
  return (
    <LazyAnimation y={20}>
      <div className={styles.box}>
        <LazyMarkdown>{text}</LazyMarkdown>
      </div>
    </LazyAnimation>
  );
};

export default Description;
