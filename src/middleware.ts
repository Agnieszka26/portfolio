import createIntlMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { routing,  publicPages} from "./i18n/routing";


 
const PUBLIC_FILE = /\.(.*)$/
export const BASE_URL = "http://localhost:3000/en"
export const intlMiddleware = createIntlMiddleware(routing);
 export default async function middleware(req: NextRequest) {

  console.log("req.cookies.get('NEXT_LOCALE')?.value ", req.cookies.get('NEXT_LOCALE')?.value)
  console.log("req.nextUrl.pathname", req.nextUrl.pathname)

//   const reqUrl = new URL(req.url);
//   if(req.nextUrl.pathname !== '/'){
//     return NextResponse.redirect(new URL('/en', req.url))
//   }
//   if (reqUrl?.pathname === "/") {
//     return NextResponse.redirect(
//       new URL(`${BASE_URL}`, req.url)
//     );
//   }
   return intlMiddleware(req)
 }
export const config = {
  matcher: ['/', '/(en|pl)/:path*']
};

