import { RoutesPath } from "@/constants";
import "animate.css/animate.min.css";
import { FC } from "react";
import ListElement from "../ListElement/ListElement";
import styles from "./MobileList.module.scss";

interface ListProps {}

const listElementData = [
  {
    link: RoutesPath.MY_WORK,
    text: "my work",
  },
  {
    link: RoutesPath.GET_IN_TOUCH,
    text: "get in touch",
  },
];
const MobileList: FC<ListProps> = () => {
  return (
    <ul className={styles.list}>
      {listElementData.map(({ link, text }, index) => (
        <ListElement key={`${text}-${index}`} link={link} text={text} />
      ))}
    </ul>
  );
};

export default MobileList;
