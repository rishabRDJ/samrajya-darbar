import { NextResponse, type NextRequest } from 'next/server';

const AUTH_COOKIE = 'darbar_auth';
const PUBLIC_PATHS = new Set(['/', '/register']);

function isPublic(pathname: string): boolean {
  if (PUBLIC_PATHS.has(pathname)) return true;
  return pathname.startsWith('/register/');
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const isAuthed = req.cookies.get(AUTH_COOKIE)?.value === '1';

  if (!isAuthed && !isPublic(pathname)) {
    const url = req.nextUrl.clone();
    url.pathname = '/';
    return NextResponse.redirect(url);
  }

  if (isAuthed && isPublic(pathname)) {
    const url = req.nextUrl.clone();
    url.pathname = '/dashboard';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/|api/|assets/|favicon.ico|.*\\..*).*)'],
};
