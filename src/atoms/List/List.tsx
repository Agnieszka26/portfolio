import { navbarElements, RoutesPath } from "@/constants";
import { FC } from "react";
import ListElement from "../ListElement/ListElement";
import styles from "@/assets/styles/index.module.scss";

const List: FC = () => {
  return (
    <ul className={styles.list}>
      {navbarElements.map(({ link, text }, index) => (
        <ListElement key={`${text}-${index}`} link={link} text={text} handleCloseHamburger={()=>{}} />
      ))}
    </ul>
  );
};

export default List;
