import Header from "@/typography/Header/Header";
import Paragraph from "@/typography/Paragraph/Paragraph";
import Title from "@/typography/Title/Title";
import { FC } from "react";
import styles from "./About.module.scss";

interface AboutProps {
  // children: ReactNode;
}

const About: FC<AboutProps> = ({}) => {
  return (
    <div className={styles.about}>
      <div className={styles.containerLeft}>
        <Header text="What I do?" color={"dark"} />
      </div>
      <div className={styles.containerRight}>
        <Title text="Design" />
        <Paragraph
          text="I design beautiful and powerful websites for modern businesses. Any business today needs a website that wins customers’ trust and helps you do your business well. I make sure your website is up to that standard."
          color="dark"
        />
        <Title text="Design" />
        <Paragraph
          text="I design beautiful and powerful websites for modern businesses. Any business today needs a website that wins customers’ trust and helps you do your business well. I make sure your website is up to that standard."
          color="dark"
        />
      </div>
    </div>
  );
};

export default About;
