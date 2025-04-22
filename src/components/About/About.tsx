import Header from "@/typography/Header/Header";
import Paragraph from "@/typography/Paragraph/Paragraph";
import Title from "@/typography/Title/Title";
import { FC } from "react";
import Animation from "@/atoms/Animation/Animation";
import styles from "@/assets/styles/index.module.scss";
import cn from "classnames";
import GradientIcon from "@/atoms/Icon/IconWithGradient";

const About: FC = () => {
  return (
    <div className={cn(styles.container, styles.flex, styles.fixedBox)}>
    <div className={styles.containerLeft}>
      <Animation y={20}>
        <Header text="What do I do?" color="dark" />
      </Animation>
    </div>
  
    <div className={styles.containerRight}>
  <Animation y={20}>
        <Title text="Development" />
        <div className={styles.iconAsBackground}>
         <GradientIcon
      path="M16 18l6-6-6-6M8 6l-6 6 6 6"
    /> 
        <Paragraph
        color="dark"
        text={`I specialize in building fast, responsive, and elegant web interfaces using React and Next.js — with a strong focus on performance and user experience.
        
        What sets me apart? I don't just use frameworks — I understand how they work under the hood. From modern CSS with Tailwind to interactive UIs with React Native, I love bringing ideas to life with code that's clean, scalable, and future-proof.
        
        I thrive in collaborative environments, but I'm also self-driven and independent. Either way, I just love making cool stuff that people enjoy using.`}
        />
        </div>
        </Animation> 
    <Animation y={20}>
      <Title text="Coding" />
      <div className={styles.iconAsBackground}>
 <GradientIcon
      path="M287.9 17.8L354 150.2 499.2 171.5C519.2 174.3 528.5 198.1 513.6 211.8L403.3 313.4 427.8 458.6C431 478.7 410.4 493.4 393.5 484.4L288 428.1 182.5 484.4C165.6 493.4 145 478.7 148.2 458.6L172.7 313.4 62.4 211.8C47.5 198.1 56.8 174.3 76.8 171.5L222 150.2 288.1 17.8C296.2 1.7 319.8 1.7 327.9 17.8Z" // classic "code arrows"
    />  
      <Paragraph
        color="dark"
        text={`I've always been drawn to the logic and clarity of the exact sciences — so naturally, programming became my creative outlet.
        
Whether I'm diving into a new codebase or architecting a solution from scratch, I love the problem-solving process. I bring a sharp analytical mindset, the ability to transform complex requirements into clean, efficient code, and a deep commitment to writing software that just *works*.

My curiosity is constant — I'm always learning, always improving. It's not just a job, it's a mindset.`}
      />
      </div>
    </Animation>
    </div>

  </div>
  
  );
};

export default About;
