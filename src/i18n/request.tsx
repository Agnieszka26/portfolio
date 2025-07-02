import { getRequestConfig } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { cookies } from "next/headers";
import { hasLocale } from "next-intl";

export default getRequestConfig(async () => {
  const requested =
    cookies().get("NEXT_LOCALE")?.value || routing.defaultLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;
  console.log(" getRequestConfig locale", locale);
  return {
    messages: (await import(`../../messages/${locale}.json`)).default,
    locale,
  };
});
