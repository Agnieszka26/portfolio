import { RoutesPath } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import logo from "../../../public/logo.svg";

import styles from "./Logo.module.scss";
const Logo: FC = () => {
  return (
    <Link href={RoutesPath.HOME} className={styles.logo}>
      <Image src={logo} alt={"logo"} height="50" width="50" />
    </Link>
  );
};

export default Logo;
