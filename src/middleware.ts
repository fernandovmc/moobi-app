import { createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return req.cookies.get(name)?.value;
        },
        set(name: string, value: string) {
          res.cookies.set({ name, value });
        },
        remove(name: string) {
          res.cookies.delete(name);
        },
      },
    }
  );

  const { data: { user } } = await supabase.auth.getUser();
  const isAuth = !!user;
  const isAuthPage = req.nextUrl.pathname.startsWith("/auth");
  const isDashboardPage = req.nextUrl.pathname.startsWith("/dashboard");
  const isCallbackPage = req.nextUrl.pathname === "/auth/callback";

  // Allow callback page to handle auth
  if (isCallbackPage) {
    return res;
  }

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
    if (!isDashboardPage) {
      return res;
    }
    // Redirect from dashboard to login
    if (isDashboardPage) {
      const redirectUrl = new URL("/auth/login", req.url);
      redirectUrl.searchParams.set("next", req.nextUrl.pathname);
      return NextResponse.redirect(redirectUrl);
    }
  }

  return res;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}; 