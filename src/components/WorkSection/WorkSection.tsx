import Button from "@/atoms/Button/Button";
import Header from "@/typography/Header/Header";
import Heading from "@/typography/Heading/Heading";
import Paragraph from "@/typography/Paragraph/Paragraph";
import Tag from "@/typography/Tag/Tag";
import { FC } from "react";
import styles from "./WorkSection.module.scss";

interface WorkSectionProps {
  // children: ReactNode;
}

const WorkSection: FC<WorkSectionProps> = () => {
  return (
    <section className={styles.workSection}>
      <div className={styles.containerLeft}>
        <Heading text={"latest work"} />
        <Header text={"Team App website"} color="dark" />
        <div className={styles.tagContainer}>
          <Tag text="Website Design" />
          <Tag text="Website Design" />
          <Tag text="Website Design" />
        </div>
        <Paragraph
          color="dark"
          text="Full website design and build for a concept team collaboration platform. This website also includes a beautiful blog. I have built the website and the blog in Webflow which has one of the best CMS for blog hosting."
        />
        <Button text={"see this project"} color={"light"} />
      </div>
      <div className={styles.containerRight}></div>
    </section>
  );
};

export default WorkSection;
