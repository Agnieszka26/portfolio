import { navbarElements } from "@/constants";
import cn from "classnames";
import ListElement from "../ListElement/ListElement";
import styles from "./MobileList.module.scss";

const MobileList = ({
  visible,
  handleCloseHamburger,
}: {
  visible: boolean;
  handleCloseHamburger: () => void;
}) => {
  return (
    <ul className={cn(styles.list, visible ? styles.visible : styles.hidden)}>
      {navbarElements.map(({ link, text }, index) => (
        <ListElement
          key={`${text}-${index}`}
          link={link}
          text={text}
          handleCloseHamburger={handleCloseHamburger}
        />
      ))}
      <ListElement
        link={"https://www.facebook.com/"}
        text={"facebook"}
        handleCloseHamburger={handleCloseHamburger}
      />
      <ListElement
        link={"https://www.instagram.com/"}
        text={"instagram"}
        handleCloseHamburger={handleCloseHamburger}
      />
    </ul>
  );
};

export default MobileList;
