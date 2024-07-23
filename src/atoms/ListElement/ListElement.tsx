import cn from "classnames";
import Link from "next/link";
import { FC } from "react";
import styles from "./ListElement.module.scss";

interface ListElementProps {
  link: string;
  text: string;
  handleCloseHamburger: () => void;
  active?: boolean;
}

const ListElement: FC<ListElementProps> = ({
  link,
  text,
  active,
  handleCloseHamburger,
}) => {
  return (
    <li className={cn(styles.listElement, styles[`active-${active}`])}>
      <Link href={link} onClick={handleCloseHamburger}>
        {text}

        <div className={styles.decorationLine}></div>
      </Link>
    </li>
  );
};

export default ListElement;
