import { NextRequest, NextResponse } from "next/server";
const locales = ["en", "ml"];
export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (locales.some((l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`))) return;
  const saved = req.cookies.get("lang")?.value;
  const accept = req.headers.get("accept-language") || "";
  const lang = saved && locales.includes(saved) ? saved : /(^|,)\s*ml/i.test(accept) ? "ml" : "en";
  const url = req.nextUrl.clone();
  url.pathname = `/${lang}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}
export const config = { matcher: ["/((?!_next|api|.*\\..*).*)"] };
