import Button from "@/atoms/Button/Button";
import About from "@/components/About/About";
import Header from "@/typography/Header/Header";
// import Paragraph from "@/typography/Paragraph/Paragraph";
// import Title from "@/typography/Title/Title";
import styles from "./page.module.scss";
const Contact = () => {
  return (
    <>
      <div className={styles.page}>
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
      </div>
      <About />
    </>
  );
};

export default Contact;
