import { jwtVerify } from "jose";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { JWT_SECRET } from "@/config";

type decodedResponse = {
  username: string;
  role: string;
};

export default async function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;

  if (token) {
    try {
      const { payload } = await jwtVerify(
        token,
        new TextEncoder().encode(JWT_SECRET)
      );
      const userObject = payload as decodedResponse;

      const requestHeaders = new Headers(request.headers);
      requestHeaders.set("username", userObject.username);

      const response = NextResponse.next({
        request: {
          headers: requestHeaders
        }
      });

      return response;
    } catch (error) {
      console.log(error);
    }
  } else {
    // return NextResponse.redirect(new URL("/", request.nextUrl));
  }
}

export const config = {
  matcher: ["/", "/api/me", "/profile"]
};
