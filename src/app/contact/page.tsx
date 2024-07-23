"use client";
import styles from "@/assets/styles/index.module.scss";
import Animation from "@/atoms/Animation/Animation";
import Button from "@/atoms/Button/Button";
import About from "@/components/About/About";
import Header from "@/typography/Header/Header";
import Link from "next/link";
const Contact = () => {
  return (
    <>
      <div className={styles.page}>
        <Animation x={0} y={-20}>
          <div className={styles.container}>
            <div className={styles.containerLeft}>
              <Header
                text="Do you want to expand your contact list?"
                color={"dark"}
              />
            </div>
            <div className={styles.containerRight}>
              <Link href="https://www.linkedin.com/in/agnieszka-m%C4%99drek/">
                <Button text={"go LinkedIn"} color={"light"} />
              </Link>
            </div>
          </div>
        </Animation>
      </div>
      <About />
    </>
  );
};

export default Contact;
