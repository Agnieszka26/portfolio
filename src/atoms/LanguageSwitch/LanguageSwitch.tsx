import { useLocale, useTranslations } from "next-intl";
import { routing } from "@/i18n/routing";
import LocaleSwitchSelect from "./LocalSwitchSelect";

export default function LocaleSwitcher() {
  const t = useTranslations("LocaleSwitcher");
  const locale = useLocale();

  return (
    <LocaleSwitchSelect defaultValue={locale} label={t("label")}>
      {routing.locales.map((cur) => (
        <option key={cur} value={cur} style={{ color: "black" }}>
          {t("locale", { locale: cur })}
        </option>
      ))}
    </LocaleSwitchSelect>
  );
}
