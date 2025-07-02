// "use client";
// import React, { MouseEventHandler, startTransition, useState } from "react";
// // import { Link, usePathname } from "@/i18n/navigation";
// import { LiaLanguageSolid } from "react-icons/lia";
// import styles from "../ListElement/ListElement.module.scss";
// import { useLocale } from "next-intl";
// import { usePathname, useRouter } from "next/navigation";
// import Paragraph from "@/typography/Paragraph/Paragraph";
// import Link from "next/link";
// import { cookies } from "next/headers";

// type LanguageSwitchProps = {};

// const LanguageSwitch = () => {
// //   const r = useRouter();
// //   const pathname = usePathname();
// //   const locale = useLocale();
// //   console.log(locale)
//   const router = useRouter()
//   const onLanguageChange = () => {
 
//   };
//   // const pathname = usePathname();
//   // const currentLocale = useLocale();
//   // const router = useRouter();
//   // const currentLocale = document?.cookie
//   //               .split('; ')
//   //               .find((row) => row.startsWith(`NEXT_LOCALE=`))
//   //               ?.split('=')[1];
//   // const otherLocale = currentLocale === 'en' ? 'pl' : 'en'; // example with en/es


//   return (
//     <li className={styles.listElement}>
//       <div className={styles.listElement}>
//         <button onClick={onLanguageChange} className={styles.btn}>
//         {/* <Link   href={pathname} style={{ padding: "0" }} locale={otherLocale}> */}
//           {/*@ts-ignore */}
//           <LiaLanguageSolid size={45} color="white" />
//           <Paragraph text={"xd"} color={"light"} />
//         </button>
//         {/* </Link> */}
//       </div>
//     </li>
//   );
// };

// export default LanguageSwitch;
// // components/LanguageSwitcher.tsx
 

// // import {usePathname, useRouter} from 'next/navigation';
// // import {useLocale} from 'next-intl';
// // import Link from 'next/link';
// // import { cookies } from 'next/headers';


// // const LanguageSwitcher = () => {
 
// //   const pathname = usePathname();
// //   const currentLocale = cookies().get("NEXT_LOCALE")?.value || 'en';

// //   const otherLocale = currentLocale === 'en' ? 'pl' : 'en'; // example with en/es

// //   return (
// //     <Link href={pathname} locale={otherLocale}>
// //       Switch to {otherLocale.toUpperCase()}
// //     </Link>
// //   );
// // };

// // export default LanguageSwitcher;

// "use client";

// import { useRouter, usePathname } from "next/navigation";

// const LanguageSwitcher = () => {
//   const router = useRouter();
//   const pathname = usePathname(); // np. "/pl/about"

//   const changeLanguage = (newLocale: string) => {
//     // Zamieniamy obecny locale w URL na nowy
//     // Załóżmy, że pierwszy segment to locale, np. /pl/...
//     const segments = pathname.split("/")

//     segments[1] = newLocale; // zmieniamy segment locale

//     const newPath = segments.join("/") || "/";
//     router.push(newPath);
//   };

//   return (
//     <select onChange={(e) => changeLanguage(e.target.value)} defaultValue={pathname.split("/")[1]}>
//       <option value="pl">Polski</option>
//       <option value="en">English</option>
//     </select>
//   );
// };

// export default LanguageSwitcher;
import {useLocale, useTranslations} from 'next-intl';
import {routing} from '@/i18n/routing';
import LocaleSwitchSelect from './LocalSwitchSelect';

export default function LocaleSwitcher() {
  const t = useTranslations('LocaleSwitcher');
  const locale = useLocale();
console.log("LocaleSwitcher locale", locale);
  return (
    <LocaleSwitchSelect defaultValue={locale} label={t('label')}>
      {routing.locales.map((cur) => (
        <option key={cur} value={cur}>
          {t('locale', {locale: cur})}
        </option>
      ))}
    </LocaleSwitchSelect>
  );
}