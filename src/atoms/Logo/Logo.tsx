import { RoutesPath } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import logo from "../../../public/logo.svg";
import styles from "./Logo.module.scss";

interface LogoProps {
  // children: ReactNode;
}

const Logo: FC<LogoProps> = ({}) => {
  return (
    <Link href={RoutesPath.HOME}>
      <div className={styles.logo}>
        <Image src={logo} alt={"logo"} height="75" width="75" />
      </div>
    </Link>
  );
};

export default Logo;
