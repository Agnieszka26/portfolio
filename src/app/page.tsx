import Button from "@/atoms/Button/Button";
import Scroll from "@/components/Scroll/Scroll";
import WorkSection from "@/components/WorkSection/WorkSection";
import Header from "@/typography/Header/Header";
import Paragraph from "@/typography/Paragraph/Paragraph";
import styles from "./page.module.scss";

const Page = () => {
  return (
    <>
      <div className={styles.page}>
        <div className={styles.containerLeft}>
          <Header
            text={`Hi, I’m Agnieszka,  React Frontend Developer`}
            color="light"
          />
          <Paragraph
            color="light"
            text={`I design and build beautiful websites for businesses around the globe. If you need a modern and powerful website, send me an email. If we are a good fit, I will give you a time and cost estimate.`}
          />
          <Button text={"see my work"} color={"dark"} />
        </div>
        <div className={styles.containerRight}>
          <Scroll />
        </div>
      </div>
      <WorkSection />
    </>
  );
};
export default Page;
