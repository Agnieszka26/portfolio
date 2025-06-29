import {hasLocale} from 'next-intl';
import {getRequestConfig} from 'next-intl/server';
import { notFound } from 'next/navigation';
import { locales } from './locales';
import {routing} from './routing';

export default getRequestConfig(async({requestLocale}) => {
  // Typically corresponds to the `[locale]` segment
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;
  console.log("requested", requested, "locale ", locale )

  // if (!locales.includes(locale as any)) notFound();
  return {
    locale,
    messages: (await import(`../../messages/${requested}.json`)).default
  };
});