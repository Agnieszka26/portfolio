'use client';
import React, { MouseEventHandler, startTransition, useState } from "react";
import { Link, usePathname } from "@/i18n/navigation";
import { LiaLanguageSolid } from "react-icons/lia";
import styles from "../ListElement/ListElement.module.scss";
import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";


type LanguageSwitchProps = {

}

const LanguageSwitch = () => {
  const r = useRouter()
  const [lang, setLang] = useState<"en"|"pl">("en")
    const pathname = usePathname();
    const locale = useLocale();
    const onLanguageChange = () => {
    console.log("onLanguageChange")

        r.replace(`/${lang}`);

      setLang((prev) => (prev === "en" ? "pl" : "en"));
    };

  return (
    <li className={styles.listElement}>
      <div className={styles.listElement}>
        <button onClick={onLanguageChange} style={{ padding: "0" }}>
        {/*@ts-ignore */}
        <LiaLanguageSolid size={45} color="white" />

        {locale}
        </button>
        {/* <Link   href={pathname} style={{ padding: "0" }} locale={locale}>
        </Link> */}
      </div>
    </li>
  );
};

export default LanguageSwitch;
