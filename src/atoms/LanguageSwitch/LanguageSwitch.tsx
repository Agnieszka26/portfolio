import { useLocale, useTranslations } from "next-intl";
import { routing } from "@/i18n/routing";
import LocaleSwitchSelect from "./LocalSwitchSelect";
import Paragraph from "@/typography/Paragraph/Paragraph";

export default function LocaleSwitcher() {
  const t = useTranslations("LocaleSwitcher");
  const locale = useLocale();

  return (
    <LocaleSwitchSelect defaultValue={locale} label={t("label")}>
      {routing.locales.map((cur) => (
        <option key={cur} value={cur} style={{ color: "black" }}>
          <Paragraph text={t("locale", { locale: cur })} color={"light"} />
        </option>
      ))}
    </LocaleSwitchSelect>
  );
}
