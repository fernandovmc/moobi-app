import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const isAuth = !!session;
  const isAuthPage = req.nextUrl.pathname.startsWith("/auth");
  const isDashboardPage = req.nextUrl.pathname.startsWith("/dashboard");
  const isMarketingPage = !isAuthPage && !isDashboardPage;

  // If user is authenticated
  if (isAuth) {
    // Redirect from auth pages to dashboard
    if (isAuthPage) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
    // Allow access to both marketing and dashboard pages
    return res;
  }

  // If user is not authenticated
  if (!isAuth) {
    // Allow access to marketing pages and auth pages
    if (isMarketingPage || isAuthPage) {
      return res;
    }
    // Redirect from dashboard to login
    if (isDashboardPage) {
      return NextResponse.redirect(new URL("/auth/login", req.url));
    }
  }

  return res;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}; 