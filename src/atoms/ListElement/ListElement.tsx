import Link from "next/link";
import { FC } from "react";
import styles from "./ListElement.module.scss";

interface ListElementProps {
  link: string;
  text: string;
}

const ListElement: FC<ListElementProps> = ({ link, text }) => {
  return (
    <li className={styles.listElement}>
      <Link href={link}>{text} </Link>
    </li>
  );
};

export default ListElement;
