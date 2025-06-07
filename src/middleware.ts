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

  // Use getUser para garantir autenticação real
  const { data: { user } } = await supabase.auth.getUser();

  // Debug session state
  console.log('Middleware - Session:', !!user);
  console.log('Middleware - Path:', req.nextUrl.pathname);

  const isAuth = !!user;
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