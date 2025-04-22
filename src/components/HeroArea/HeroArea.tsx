import styles from "@/assets/styles/index.module.scss";
import Button from "@/atoms/Button/Button";
import Header from "@/typography/Header/Header";
import Paragraph from "@/typography/Paragraph/Paragraph";
import cn from "classnames";
import Link from "next/link";
import { FC } from "react";
import Scroll from "../Scroll/Scroll";
interface HeroAreaProps {
  executeScroll?: () => void;
}

const HeroArea: FC<HeroAreaProps> = ({ executeScroll }) => {
  return (
    <div className={cn(styles.heroArea)}>
      <div className={cn(styles.fixedBox, styles.container)}>
        <div className={cn(styles.containerLeft)}>
          <Header text={`React and Next.js are my playground`} color="light" />

          <Paragraph
            color="light"
            text={`I'm Agnieszka - a frontend developer and consultant who not only builds applications with React and Next.js, but also helps optimize, scale, and fix them. 

Struggling with performance issues? Legacy code? Need to migrate to Next.js? I'll jump in, audit the code, and deliver clear, effective solutions. 

Hire me as your frontend consultant - let's take your project to the next level.
`}
          />
          <Link
            href={
              "https://docs.google.com/forms/d/e/1FAIpQLSc_qJZfLheGYwedgUzP76BO-qpTuKBLfze30xUDdHWjXf5ptA/viewform"
            }
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button text={"Hire me"} color={"dark"} />
          </Link>
        </div>

        <div className={styles.containerRight}>
          <Scroll onClick={executeScroll} />
        </div>
      </div>
    </div>
  );
};

export default HeroArea;
