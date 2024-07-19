"use client";
import styles from "@/assets/styles/index.module.scss";
import Button from "@/atoms/Button/Button";
import About from "@/components/About/About";
import Header from "@/typography/Header/Header";
import { useEffect } from "react";
import ScrollAnimation from "react-animate-on-scroll";

const Contact = () => {
  useEffect(() => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, []);

  return (
    <>
      <div className={styles.page}>
        <ScrollAnimation animateIn="animate__fadeInUp " offset={0}>
          <div className={styles.container}>
            <div className={styles.containerLeft}>
              <Header
                text="Do you want to expand your contact list?"
                color={"dark"}
              />
            </div>
            <div className={styles.containerRight}>
              <a href="https://www.linkedin.com/in/agnieszka-m%C4%99drek/">
                <Button text={"go LinkedIn"} color={"light"} />
              </a>
            </div>
          </div>
        </ScrollAnimation>
      </div>
      <About />
    </>
  );
};

export default Contact;
