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
        <ScrollAnimation animateIn="animate__fadeInUp " offset={0}>
          <Header text="What do I do?" color={"dark"} />
        </ScrollAnimation>
      </div>
      <div className={styles.containerRight}>
        <ScrollAnimation animateIn="animate__fadeInUp " offset={0}>
          <Title text="Coding" />
          <Paragraph
            text="With a deep-rooted passion for the exact sciences, programming has become my medium to explore and expand my interests. I possess strong technical and analytical skills, enabling me to analyze existing codebases and transform requirements into concrete software solutions. My commitment to continuous learning drives my ongoing professional development, enhancing my competencies as a frontend developer."
            color="dark"
          />
        </ScrollAnimation>
        <ScrollAnimation animateIn="animate__fadeInUp ">
          <Title text="Development" />
          <Paragraph
            text="I thrive on the excitement of learning new technologies and applying them to real-world projects. I specialize in building robust, responsive websites using React and Next.js. Additionally, I have contributed to mobile application development with React Native. My experience with a variety of libraries and frameworks allows me to deliver high-quality, user-centric applications."
            color="dark"
          />
        </ScrollAnimation>
      </div>
    </div>
  );
};

export default About;
