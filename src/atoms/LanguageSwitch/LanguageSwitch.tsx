// import { useLocale, useTranslations } from "next-intl";
// import { routing } from "@/i18n/routing";
// import LocaleSwitchSelect from "./LocalSwitchSelect";

// export default function LocaleSwitcher() {
//   const t = useTranslations("LocaleSwitcher");
//   const locale = useLocale();

//   return (
//     <li>
//       <LocaleSwitchSelect defaultValue={locale} label={t("label")}>
//         {routing.locales.map((cur) => (
//           <option key={cur} value={cur} style={{ color: "black" }}>
//             {t("locale", { locale: cur })}
//           </option>
//         ))}
//       </LocaleSwitchSelect>
//     </li>
//   );
// }
"use client";

import styles from "./styles.module.scss";
import { AnimatePresence, motion } from "motion/react";
import { useState, useTransition } from "react";
import { useRouter, usePathname } from "@/i18n/navigation";
import { Locale, useLocale } from "next-intl";
import { routing } from "@/i18n/routing";
import polishFlag from "@/assets/flags/polish.webp";
import englishFlag from "@/assets/flags/english.webp";
import Image, { StaticImageData } from "next/image";

const FlagComponent = ({ flag }: { flag: StaticImageData }) => {
  return <Image src={flag} alt="flag" width={20} height={20} className={styles.flag} />;
};

export default function LocaleSwitcher() {
  const l = routing.locales;

  const locales = l.map(l => ({
    code: l,
    label: l === "pl" ? "Polski" : "English",
    flag: l === "pl" ? polishFlag : englishFlag
  }));

  const pathname = usePathname();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [_, startTransition] = useTransition();
  const locale = useLocale();
  const current = locales.find(l => l.code === locale)!;

  const changeLocale = (next: Locale) => {
    setOpen(false);
    startTransition(() => {
      router.replace(pathname, {
        locale: next
      });
    });
  }

  return (
    <li className={styles.wrapper}>
      <motion.button
        layout
        whileTap={{ scale: .98 }}
        className={styles.trigger}
        onClick={() => setOpen(!open)}
      >
        <span>
          <FlagComponent flag={current.flag} />
        </span>
        <span>{current.label}</span>
      </motion.button>
      <AnimatePresence>
        {open && (
          <motion.ul
            layout
            initial={{
              opacity: 0,
              y: -10,
              scale: .96
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1
            }}
            exit={{
              opacity: 0,
              y: -10,
              scale: .96
            }}
            transition={{
              duration: .18
            }}
            className={styles.menu}
          >

            {locales.map(item => (

              <motion.li
                layout
                key={item.code}
                whileHover={{
                  x: 4
                }}
                whileTap={{
                  scale: .98
                }}
                className={
                  item.code === locale
                    ? styles.active
                    : ""
                }
                onClick={() =>
                  changeLocale(item.code as Locale)
                }
              >
                <span><FlagComponent flag={item.flag} /></span>
                <span>{item.label}</span>
              </motion.li>

            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </li>
  );
}
