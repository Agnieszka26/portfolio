import { createNavigation } from "next-intl/navigation";
import { defineRouting } from "next-intl/routing";
import { Locales, locales } from "./locales";

export const routing = defineRouting({
  locales,
  defaultLocale: Locales.EN,
});

export const publicPages = ["/"];
export type Locale = (typeof routing.locales)[number];

