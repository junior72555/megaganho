import { NextResponse, NextRequest } from 'next/server';
import { getCookie } from 'cookies-next';

export function middleware(request: NextRequest, responseh: NextResponse) {
  console.log('')
  const { pathname } = request.nextUrl;
  const ref = request.nextUrl.searchParams.get('ref')
  const authToken = request.nextUrl.searchParams.get('auth-token')
  const admin = getCookie('sofayoumanynziauq', {req: request, res: responseh}) as string
  if(admin == undefined){
    if(pathname.startsWith('/admin')){
      return NextResponse.redirect(new URL ('/', request.url))
    }
  }
  if (
    pathname.startsWith('/user') ||
    pathname.startsWith('/affiliate')
  ) {
    const token = request.cookies.get('bet.token')
    if (!token || token == undefined) {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }
  const response = NextResponse.next();

  if (ref) {
    response.cookies.set('ref', ref, {
      path: '/',
      maxAge: 60 * 60 * 24 * 30, // 30 days
    })
  }


  return response;
}
