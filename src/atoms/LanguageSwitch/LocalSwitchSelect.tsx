"use client";
import styles from "./styles.module.scss";
import classNames from "classnames";
import { Locale } from "next-intl";
import { ChangeEvent, ReactNode, useTransition } from "react";
import { usePathname, useRouter } from "@/i18n/navigation";
import { LiaLanguageSolid } from "react-icons/lia";

type Props = {
  children: ReactNode;
  defaultValue: string;
  label: string;
};

export default function LocaleSwitcherSelect({
  children,
  defaultValue,
  label,
}: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();

  function onSelectChange(event: ChangeEvent<HTMLSelectElement>) {
    const nextLocale = event.target.value as Locale;
    startTransition(() => {
      // Shared routing (no `pathnames` in routing): pathname is already resolved.
      router.replace(pathname, { locale: nextLocale });
    });
  }

  return (
    <label className={classNames(styles.label, isPending && styles.pending)}>
      {/*@ts-ignore */}
      <LiaLanguageSolid size={45} color="white" />
      <p className={styles.srOnly}>{label}</p>
      <select
        className={styles.select}
        defaultValue={defaultValue}
        disabled={isPending}
        onChange={onSelectChange}
      >
        {children}
      </select>
    </label>
  );
}
