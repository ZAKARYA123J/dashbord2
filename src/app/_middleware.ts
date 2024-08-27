import { NextRequest, NextResponse } from 'next/server';

// Function to check if the user is authenticated
const isAuthenticated = (req: NextRequest): boolean => {
  // Example check: Look for a cookie named 'token'
  const token = req.cookies.get('custom-auth-token');
  return !!token;
};

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // If the user is authenticated and tries to access the login page, redirect to the dashboard
  if (isAuthenticated(req) && pathname === '/login') {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }

  // If the user is not authenticated and tries to access the dashboard, redirect to login
  if (!isAuthenticated(req) && pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  // Allow the request to proceed as usual
  return NextResponse.next();
}
