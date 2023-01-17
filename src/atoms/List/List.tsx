import { RoutesPath } from "@/constants";
import { FC } from "react";
import ListElement from "../ListElement/ListElement";
import styles from "./List.module.scss";

interface ListProps {}

const listElementData = [
  {
    link: RoutesPath.HOME,
    text: "Home",
  },
  {
    link: RoutesPath.MY_WORK,
    text: "my work",
  },
  {
    link: RoutesPath.GET_IN_TOUCH,
    text: "get in touch",
  },
];
const List: FC<ListProps> = () => {
  return (
    <ul className={styles.list}>
      {listElementData.map(({ link, text }, index) => (
        <ListElement key={`${text}-${index}`} link={link} text={text} />
      ))}
    </ul>
  );
};

export default List;
