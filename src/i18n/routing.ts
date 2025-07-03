import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "pl"],
  localeCookie: {
    name: "NEXT_LOCALE",
  },
  defaultLocale: "en",
});
