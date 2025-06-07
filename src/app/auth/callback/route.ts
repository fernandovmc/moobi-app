import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");

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

    const { data: { session }, error } = await supabase.auth.exchangeCodeForSession(code);
    
    if (error) {
      console.error('Auth callback error:', error);
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }

    if (session) {
      console.log('Auth callback - Session set successfully');
      // Redirect to the original destination or dashboard
      const redirectTo = requestUrl.searchParams.get('redirectTo') || '/dashboard';
      return NextResponse.redirect(new URL(redirectTo, request.url));
    }
  }

  console.log('Auth callback - No code or session');
  return NextResponse.redirect(new URL("/auth/login", request.url));
} 