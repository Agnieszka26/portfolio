"use client";
import styles from "@/assets/styles/index.module.scss";
import Animation from "@/atoms/Animation/Animation";
import Button from "@/atoms/Button/Button";
import About from "@/components/About/About";
import Header from "@/typography/Header/Header";
import Paragraph from "@/typography/Paragraph/Paragraph";
import Link from "next/link";
import Image from "next/image";
import image from "@/assets/images/undraw_proud-coder_9prj.svg"
const Contact = () => {
  return (
    <>
      <div className={styles.page}>
        <Animation x={0} y={-20}>
          <div className={[styles.container, styles.flex].join(" ")}>
            <div className={styles.containerLeft}>
              <Header
                text="Let's Build Something Awesome Together"
                color={"dark"}
              />
              <Paragraph
                text="Got a project in mind, need help with a website, or just want to say hi?
      Drop me a message — I'm always up for a creative challenge."
                color="dark"
              />
    
              <Link href="https://www.linkedin.com/in/agnieszka-m%C4%99drek/">
                <Button text={"go LinkedIn"} color={"light"} />
              </Link>
   

              <Link href="mailto:agna.medrek@gmail.com">
                <Button text={"Email me directly"} color={"light"} />
              </Link>
         </div>
          
            <Image
            src={image}
            alt="contact"
            width={500}
            height={500}
            className={styles.image} />
            </div>
          
        </Animation>
      </div>
    </>
  );
};

export default Contact;
