import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");

  if (code) {
    const supabase = createRouteHandlerClient({ cookies });
    const { data: { session } } = await supabase.auth.exchangeCodeForSession(code);
    
    if (session?.access_token) {
      // Cria uma resposta de redirecionamento
      const response = NextResponse.redirect(new URL("/dashboard", request.url));
      
      // Adiciona o token como cookie
      response.cookies.set("token", session.access_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
      });
      
      return response;
    }
  }

  // Se algo der errado, redireciona para o login
  return NextResponse.redirect(new URL("/auth/login", request.url));
} 