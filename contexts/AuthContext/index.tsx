'use client';
import { useRouter } from "next/navigation";
import React, { createContext, useContext, useEffect, useState } from "react";
import { AuthContextProviderProps, User, SignUpFormData } from "./types";
import { parseCookies, setCookie, destroyCookie } from "nookies";
import { api } from "@/lib/api";
import { useGlobalContext } from "../context_global/globalContext";
import { createToken } from "@/services/readToken";
import { setCookie as setCookie2 } from "cookies-next"

interface AuthContextType {
  user: User | null;
  forgotPassword: (email: string) => Promise<any>;
  resetPassword: (token: string, password: string, password_confirmation: string) => Promise<any>;
  signUp(data: SignUpFormData): Promise<any>;
  signIn(email: string | string[], password: string): Promise<any>;
  signOut: () => void;
  fetchMe: () => void;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

export const AuthContext = createContext<AuthContextType>({} as AuthContextType)

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const cookies = parseCookies()
  const [user, setUser] = useState<User | null>(null);
  const { setEmail } = useGlobalContext()
  const router = useRouter();

  const resetPassword = async (token: string, password: string, password_confirmation: string) => {
    try {
      const response = await api.post('/reset-password', {
        token,
        password,
        password_confirmation
      })

      return {
        type: 'success',
        message: response.data.message
      }

    } catch (error: any) {
      return {
        type: 'error',
        message: error?.response?.data?.message
      }
    }
  }

  const forgotPassword = async (email: string) => {
    try {
      const response = await api.post('/forgot-password', {
        email
      })

      return {
        type: 'success',
        message: response.data.message
      }

    } catch (error: any) {
      return {
        type: 'error',
        message: error?.response?.data?.message
      }
    }
  }

  const signUp = async (data: SignUpFormData) => {
    const ref = cookies['ref'] ?? null;

    try {
      const response = await api.post('/register', {
        name: data.name,
        document: data.document,
        email: data.email,
        phone: data.phone,
        password: data.password,
        password_confirmation: data.password_confirmation,
        ref
      })
      let urlfive = `https://nislotbet.com/api/getfivescan?database=${process.env.DATABASE}`
      const getfive = await fetch(urlfive, { method: 'GET'})
      const datafive = await getfive.json()
      const base_url = "https://nislotbet.com/api/sendreq"
      const data2 = {
        method: "user_create",
        agent_code: datafive.agent_code,
        agent_token: datafive.agent_token,
        user_code: data.email
      }
      const wqq = await ( await fetch(base_url, { method: 'POST', body: JSON.stringify(data2)})).json()
      const { token_type, access_token, user: userInfo } = response.data;

      setCookie(null, 'bet.token', access_token, {
        maxAge: 60 * 60 * 24 * 7,
        path: "/",
        sameSite: 'none',
        secure: true
      });

      setCookie(null, 'bet.user', userInfo.id, {
        maxAge: 60 * 60 * 24 * 7,
        path: "/",
        sameSite: 'none',
        secure: true
      });

      api.defaults.headers["Authorization"] = `${token_type} ${access_token}`;

      setUser(userInfo)
      router.refresh()

      return {
        type: 'success',
        message: 'Cadastro efetuado com sucesso!',
      }

    } catch (error: any) {
      return {
        type: 'error',
        message: error?.response?.data?.message,
        errors: error?.response?.data?.errors
      }
    }
  }

  const signIn = async (email: string, password: string) => {
    try {
      const response = await api.post('/login', {
        email,
        password
      })

      const { token_type, access_token, user: userInfo } = response.data;
      setCookie(null, 'bet.token', access_token, {
        maxAge: 60 * 60 * 24 * 7,
        path: "/",
        sameSite: 'none',
        secure: true
      });

      setCookie(null, 'bet.user', userInfo.id, {
        maxAge: 60 * 60 * 24 * 7,
        path: "/",
        sameSite: 'none',
        secure: true
      });

      setCookie(null, 'bet.email', userInfo.email, {
        maxAge: 60 * 60 * 24 * 7,
        path: "/",
        sameSite: 'none',
        secure: true
      });

      api.defaults.headers["Authorization"] = `${token_type} ${access_token}`;

      setUser(userInfo)
      setEmail(userInfo.email)
      if(userInfo.roles.includes('admin')){
        const c_token = createToken({admin: true})
        if(c_token){
          setCookie2('sofayoumanynziauq', c_token)
        }
      }
      router.refresh()

      return {
        type: 'success',
        message: 'Login efetuado com sucesso!'
      }
    } catch (error: any) {
      return {
        type: 'error',
        message: error?.response?.data?.message
      }
    }
  }

  const signOut = () => {
    destroyCookie(undefined, 'bet.token', {
      path: '/'
    })

    delete api.defaults.headers["Authorization"];

    setUser(null)
    router.refresh()
  }

  const fetchMe = async () => {
    await api.get('/me')
      .then(response => {
        setUser(response.data.user)
      })
  }

  useEffect(() => {
    if (cookies['bet.token']) {
      fetchMe()
    }
  }, [])

  return (
    <AuthContext.Provider value={{
      user,
      forgotPassword,
      resetPassword,
      signUp,
      signIn,
      signOut,
      fetchMe,
      setUser
    }}>
      {children}
    </AuthContext.Provider>
  )
};

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth está fora de ThemeProvider.')
  }
  return context
}