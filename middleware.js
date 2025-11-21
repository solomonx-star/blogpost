import { NextResponse } from "next/server";

export function middleware(request) {
  // Check if the token exists in cookies
  const token = request.cookies.get("authToken");

  // Redirect to login if the token is missing
  console.log("This is the token: ",token)
  if (!token) {
    return NextResponse.redirect(new URL("/Home", request.url));
  }

  // If the token exists, allow the request to proceed
  return NextResponse.next();
}

// Apply middleware only to protected routes
export const config = {

  matcher: ["/BlogPost"], // Adjust paths as needed

};