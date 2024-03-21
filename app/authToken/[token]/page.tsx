"use client"
import { useAuth } from "@/contexts/AuthContext";
import { api } from "@/lib/api";
import { useRouter, useSearchParams } from "next/navigation";
import { setCookie, destroyCookie, parseCookies } from "nookies";

type PageProps = {
  params: {
    token: string;
  }
}

export default function AuthTokenPage({ params }: PageProps) {
  const { push } = useRouter()
  const search = useSearchParams()

  const { setUser, fetchMe, user } = useAuth()
  const token = decodeURIComponent(params.token)
  const redirect = search.get('redirect') || '/'

  const cookies = parseCookies()

  if (!token) {
    push('/')
  }

  if (cookies['bet.token']) {
    destroyCookie(undefined, 'bet.token', {
      path: '/'
    })

    delete api.defaults.headers["Authorization"];

    setUser(null)
  }

  setCookie(null, 'bet.token', token, {
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
    sameSite: 'none',
    secure: true
  });


  api.defaults.headers["Authorization"] = `Bearer ${token}`;

  fetchMe()

  setCookie(null, 'bet.user', String(user?.id), {
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
    sameSite: 'none',
    secure: true
  });


  push(redirect)
}