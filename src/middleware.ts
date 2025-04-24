import createIntlMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { NextRequest, NextResponse } from "next/server";
import { locales } from "./i18n/locales";


export const config = {
     matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)'
//   matcher: ["/", "/(de|en|pl)/:path*"],
};

const intlMiddleware = createIntlMiddleware(routing );



export default function middleware(req: NextRequest, ctx: any) {

    return intlMiddleware(req);

    
}