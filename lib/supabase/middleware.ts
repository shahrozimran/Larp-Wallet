import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { Database } from "@/types/database";

const DEFAULT_SUPABASE_URL = "https://uoqdywagkslbljowcklv.supabase.co";
const DEFAULT_SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVvcWR5d2Fna3NsYmxqb3dja2x2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODcyNDc5NTMsImV4cCI6MjEwMjgyMzk1M30.7A2FF3glpw0vvegvl_nxfwAIMATnAAelULmrttvMYx0";

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || DEFAULT_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || DEFAULT_SUPABASE_ANON_KEY;

  const supabase = createServerClient<Database>(url, key, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) =>
          request.cookies.set(name, value)
        );
        supabaseResponse = NextResponse.next({
          request,
        });
        cookiesToSet.forEach(({ name, value, options }) =>
          supabaseResponse.cookies.set(name, value, options)
        );
      },
    },
  });

  // IMPORTANT: Avoid using getSession() which isn't secure on server side
  // getUser() validates the auth token with Supabase Auth
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const nextUrl = request.nextUrl.clone();
  const pathname = nextUrl.pathname;

  // Protected paths that strictly require authentication
  const isDashboardRoute = pathname.startsWith("/dashboard");
  const isPhantomRoute = pathname.startsWith("/phantom");
  const isPlansRoute = pathname.startsWith("/plans");
  const isAuthPage =
    pathname.startsWith("/login") ||
    pathname.startsWith("/signup") ||
    pathname.startsWith("/forgot-password");

  // If user is not authenticated and attempts to access protected routes
  if (!user && (isDashboardRoute || isPhantomRoute)) {
    nextUrl.pathname = "/login";
    nextUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(nextUrl);
  }

  // If user is authenticated and visits auth pages like /login, redirect to dashboard or plans
  if (user && isAuthPage) {
    nextUrl.pathname = "/plans";
    return NextResponse.redirect(nextUrl);
  }

  return supabaseResponse;
}
