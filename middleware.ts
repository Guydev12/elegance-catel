import { NextResponse } from 'next/server';
import { auth } from "@/auth";

export default auth((req) => {
  const { pathname } = req.nextUrl;
  const isLoggedIn = !!req.auth;
  const user = req.auth;

  console.log("User:", user);

  // Public route: /admin
  if (pathname === '/admin') {
    // Redirect logged-in users from /admin to /admin/dashboard
    if (isLoggedIn) {
      return NextResponse.redirect(new URL('/admin/dashboard', req.nextUrl));
    }
    // Allow access for non-logged-in users
    return NextResponse.next();
  }

  // Public routes: /login and /register
  if (pathname === '/login' || pathname === '/register') {
    // Redirect logged-in users to /admin/dashboard
    if (isLoggedIn) {
      return NextResponse.redirect(new URL('/admin/dashboard', req.nextUrl));
    }
    // Allow access for non-logged-in users
    return NextResponse.next();
  }

  // Protected routes: /admin/* (e.g., /admin/dashboard, /admin/product)
  if (pathname.startsWith('/admin/')) {
    // Redirect non-logged-in users to /admin
    if (!isLoggedIn) {
      return NextResponse.redirect(new URL('/admin', req.nextUrl));
    }
    // Allow logged-in users to access protected routes
    return NextResponse.next();
  }

  // Default to allowing the request
  return NextResponse.next();
});

// Restrict Middleware to specific routes
export const config = {
  matcher: [
    "/admin", // Public access to /admin
    "/admin/:path*", // Protect all other admin routes
    "/login", // Handle login route
    "/register", // Handle register route
  ],
};
