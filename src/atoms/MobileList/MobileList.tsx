import { navbarElements, RoutesPath } from "@/constants";
import "animate.css/animate.min.css";
import { FC } from "react";
import ListElement from "../ListElement/ListElement";
import styles from "./MobileList.module.scss";

const MobileList: FC = () => {
  return (
    <ul className={styles.list}>
      {navbarElements.map(({ link, text }, index) => (
        <ListElement key={`${text}-${index}`} link={link} text={text} />
      ))}
    </ul>
  );
};

export default MobileList;
