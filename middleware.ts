import { NextResponse } from 'next/server';
import { auth } from "@/auth";

export default auth((req) => {
  const { pathname } = req.nextUrl;
  const isLoggedIn = !!req.auth;
  const user = req.auth;

  console.log(user);

  // Redirect to dashboard if logged in and trying to access login or register page
  if ((pathname === '/login' || pathname === '/register') && isLoggedIn) {
    return NextResponse.redirect(new URL('/admin/dashboard', req.nextUrl));
  }

  // Allow access to login or register page if not logged in
  if ((pathname === '/login' || pathname === '/register') && !isLoggedIn) {
    return NextResponse.next();
  }

  // Redirect to login if not logged in and trying to access a protected route
  console.log(isLoggedIn);
  if (!isLoggedIn) {
    return NextResponse.redirect(new URL('/login', req.nextUrl));
  }

  // Allow the request to continue for authenticated users
  return NextResponse.next();
});

// Restrict Middleware to only /admin/* routes
export const config = {
  matcher: ["/admin/:path*"], // Matches any route under /admin/
};
