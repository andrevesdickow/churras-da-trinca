import { NextResponse, type NextRequest } from 'next/server';
import { AuthKeys } from '@/enums/AuthKeys';

export async function middleware(request: NextRequest) {
  const isSignPage = request.url === 'http://localhost:3000/signup' || request.url === 'http://localhost:3000/';
  const isApi = request.url.includes('/api');

  if (!isApi && !isSignPage && !request.cookies.has(AuthKeys.ACCESS_TOKEN)) {
    return NextResponse.rewrite(new URL('/', request.url));
  }

  if (!isApi && isSignPage && request.cookies.has(AuthKeys.ACCESS_TOKEN)) {
    return NextResponse.redirect(new URL('/churras', request.url));
  }

  const nextResponse = NextResponse.next();

  if (isSignPage) {
    return nextResponse;
  }

  return nextResponse;
}

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)']
};
