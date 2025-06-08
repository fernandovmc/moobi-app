import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const next = requestUrl.searchParams.get("next") || "/dashboard";

  if (code) {
    const cookieStore = await cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            const cookie = cookieStore.get(name);
            return cookie?.value;
          },
          set(name: string, value: string) {
            try {
              cookieStore.set(name, value);
            } catch (error) {
              console.error('Error setting cookie:', error);
            }
          },
          remove(name: string) {
            try {
              cookieStore.delete(name);
            } catch (error) {
              console.error('Error removing cookie:', error);
            }
          },
        },
      }
    );

    try {
      const { data: { session }, error } = await supabase.auth.exchangeCodeForSession(code);
      
      if (error) {
        console.error('Auth callback error:', error);
        return NextResponse.redirect(new URL("/auth/login", request.url));
      }

      if (session) {
        // Validate the next URL to prevent open redirects
        const allowedPaths = ['/dashboard', '/'];
        const redirectPath = allowedPaths.includes(next) ? next : '/dashboard';
        
        return NextResponse.redirect(new URL(redirectPath, request.url));
      }
    } catch (error) {
      console.error('Auth callback error:', error);
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }
  }

  // If no code is present, redirect to login
  return NextResponse.redirect(new URL("/auth/login", request.url));
} 