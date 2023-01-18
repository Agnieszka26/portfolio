import cn from "classnames";
import Link from "next/link";
import { FC } from "react";
import styles from "./ListElement.module.scss";

interface ListElementProps {
  link: string;
  text: string;
  active?: boolean;
}

const ListElement: FC<ListElementProps> = ({ link, text, active }) => {
  return (
    <li className={cn(styles.listElement, styles[`active-${active}`])}>
      <Link href={link}>
        {text}

        <div className={styles.decorationLine}></div>
      </Link>
    </li>
  );
};

export default ListElement;
