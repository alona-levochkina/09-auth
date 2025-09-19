// middleware.ts

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { cookies } from "next/headers";
import { checkSession } from "./lib/api/serverApi";

const privateRoutes = ["/profile", "/notes"];
const authRoutes = ["/sign-in", "/sign-up"];

export async function middleware(request: NextRequest) {
  const cookieStore = await cookies();

  const accessToken = cookieStore.get("accessToken")?.value;
  const refreshToken = cookieStore.get("refreshToken")?.value;

  const { pathname } = request.nextUrl;
  const isPrivateRoute = privateRoutes.some((route) =>
    pathname.startsWith(route)
  );
  const isAuthRoute = authRoutes.includes(pathname);

  if (!accessToken && isPrivateRoute) {
    if (refreshToken) {
      try {
        const res = await checkSession(cookieStore.toString());
        const setCookie = res.headers["set-cookie"];

        if (setCookie) {
          const response = NextResponse.next();
          response.headers.set("set-cookie", setCookie.toString());
          return response;
        }
      } catch (error) {
        return NextResponse.redirect(new URL("/sign-in", request.url));
      }
    } else {
      return NextResponse.redirect(new URL("/sign-in", request.url));
    }
  }

  if (accessToken && isAuthRoute) {
    return NextResponse.redirect(new URL("/profile", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/profile/:path*", "/notes/:path*", "/sign-in", "/sign-up"],
};
