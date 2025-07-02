import { i18nRouter } from 'next-i18n-router';
import { NextRequest } from 'next/server';
// import i18nConfig from '../i18Config';
const i18n = {
  locales: ['en', 'pl'],
  defaultLocale: 'en',
  localeDetection: true,
};  
export function middleware(request: NextRequest) {
  return i18nRouter(request, i18n);
}

// import createIntlMiddleware from "next-intl/middleware";
// import { NextRequest, NextResponse } from "next/server";
// import { routing,  publicPages} from "./i18n/routing";
// import { i18nRouter } from 'next-i18n-router';

 
// const PUBLIC_FILE = /\.(.*)$/
// export const BASE_URL = process.env.NEXT_PUBLIC_ENV === "dev" ?  "http://localhost:3000" : "https://portfolio-agnieszka26.vercel.app/"
// export const intlMiddleware = createIntlMiddleware(routing);
//  export default async function middleware(req: NextRequest) {

//   // console.log("req.cookies.get('NEXT_LOCALE')?.value ", req.cookies.get('NEXT_LOCALE')?.value)
//   // console.log("req.nextUrl.pathname", req.nextUrl.pathname)

// //   const reqUrl = new URL(req.url);
// //   if(req.nextUrl.pathname !== '/'){
// //     return NextResponse.redirect(new URL('/en', req.url))
// //   }
// //   if (reqUrl?.pathname === "/") {
// //     return NextResponse.redirect(
// //       new URL(`${BASE_URL}`, req.url)
// //     );
// //   }
//   return i18nRouter(request, i18nConfig);
//   //  return intlMiddleware(req)
//}
// export const config = {
//    matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)'
  

//   // matcher: ['/', '/(en|pl)/:path*']
// };

import createMiddleware from "next-intl/middleware";
import { routing } from './i18n/routing';
// import { locales } from "./i18n";
const locales = ["en", "pl"];
export default createMiddleware(routing);

export const config = {
  // Match only internationalized pathnames
  matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)'
};