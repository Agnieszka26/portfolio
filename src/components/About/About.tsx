import Header from "@/typography/Header/Header";
import Paragraph from "@/typography/Paragraph/Paragraph";
import Title from "@/typography/Title/Title";
import "animate.css/animate.min.css";
import { FC } from "react";
import ScrollAnimation from "react-animate-on-scroll";
import styles from "./About.module.scss";

const About: FC = () => {
  return (
    <div className={styles.about}>
      <div className={styles.containerLeft}>
        <ScrollAnimation animateIn="animate__fadeInUp ">
          <Header text="What I do?" color={"dark"} />
        </ScrollAnimation>
      </div>
      <div className={styles.containerRight}>
        <ScrollAnimation animateIn="animate__fadeInUp ">
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
        </ScrollAnimation>
        <ScrollAnimation animateIn="animate__fadeInUp ">
          <Title text="Development" />
          <Paragraph
            text="I love learning new technologies. I work with various libraries and framework. I build websites using React and Next.js. I was taking part in building mobile application using React Native."
            color="dark"
          />
        </ScrollAnimation>
      </div>
    </div>
  );
};

export default About;
