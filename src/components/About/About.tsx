import Header from "@/typography/Header/Header";
import Paragraph from "@/typography/Paragraph/Paragraph";
import Title from "@/typography/Title/Title";
import { FC } from "react";
import styles from "./About.module.scss";

const About: FC = () => {
  return (
    <div className={styles.about}>
      <div className={styles.containerLeft}>
        <Header text="What I do?" color={"dark"} />
      </div>
      <div className={styles.containerRight}>
        <Title text="Coding" />
        <Paragraph
          text="My interests have always revolved around exact sciences and
          programming allows me to broaden my passions. I have strong technical
          and analytical skills, with the ability to analyze an existing code base and
          convert requests into specific software solutions. I have a great desire and need for continuous
          learning and further professional development aimed at improving my
          competences in the frontend developer profession."
          color="dark"
        />

        <Title text="Development" />
        <Paragraph
          text="I love learning new technologies. I work with various libraries and framework. I build websites using React and Next.js. I was taking part in building mobile application using React Native."
          color="dark"
        />
      </div>
    </div>
  );
};

export default About;
