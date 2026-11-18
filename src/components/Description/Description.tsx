import styles from "@/assets/styles/index.module.scss";
import Animation from "@/atoms/Animation/Animation";
import Markdown from "@/components/Markdown";
import cn from "classnames";
import panelStyles from "./Description.module.scss";

const Description = ({ text }: { text: string }) => {
  return (
    <Animation type="fade-up">
      <div className={cn(styles.box, panelStyles.panel)}>
        <Markdown>{text}</Markdown>
      </div>
    </Animation>
  );
};

export default Description;
