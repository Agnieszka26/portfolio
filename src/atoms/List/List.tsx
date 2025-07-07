import { navbarElements, RoutesPath } from "@/constants";
import { FC } from "react";
import ListElement from "../ListElement/ListElement";
import styles from "@/assets/styles/index.module.scss";

import LanguageSwitch from "../LanguageSwitch/LanguageSwitch";
import { useTranslations } from "next-intl";
const List: FC = () => {
  const t = useTranslations("Navbar");
  return (
    <ul className={styles.list}>
      {navbarElements.map(({ link, text }, index) => (
        <ListElement
          key={`${text}-${index}`}
          link={link}
          text={t(text)}
          handleCloseHamburger={() => {}}
        />
      ))}
      <LanguageSwitch />
    </ul>
  );
};

export default List;
