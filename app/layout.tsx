
import { cookies } from 'next/headers'

import Link from 'next/link'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react';
import Sidebar from '@/components/ui/Sidebar'
import Footer from '@/components/ui/Footer'
import Logo from '@/components/Logo'
import TopBar from '@/components/ui/Topbar'
import Head from 'next/head'
import { ModalContextProvider } from '@/contexts/ModalContext';

import Modal from '@/components/ui/Modal/Index';
import SignIn from '@/components/ui/Header/SignIn';
import Profile from '@/components/ui/Header/Profile';
import { AuthContextProvider } from '@/contexts/AuthContext';

import './globals.css'
import { AccountContextProvider } from '@/contexts/AccountContext';
import { WalletContextProvider } from '@/contexts/WalletContext';
import { TransactionContextProvider } from '@/contexts/TransactionContext';
import { MinesContextProvider } from '@/contexts/Games/MinesContext';
import { AffiliateContextProvider } from '@/contexts/AffiliateContext';
import { CrashContextProvider } from '@/contexts/Games/CrashContext';
import { DoubleContextProvider } from '@/contexts/Games/DoubleContext';
import { Metadata } from 'next'
import MenuMobile from '@/components/ui/Sidebar/MenuMobile';
import Script from 'next/script';
import { GlobalContextProvider } from '@/contexts/context_global/globalContext';

const inter = Inter({
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: process.env.NEXT_PUBLIC_SITE_NAME
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const isAuthenticated = cookies().has('bet.token')

  return (
    <GlobalContextProvider>
      <AuthContextProvider>
        <ModalContextProvider>
          <AccountContextProvider>
            <WalletContextProvider>
              <TransactionContextProvider>
                <AffiliateContextProvider>
                  <MinesContextProvider>
                    <CrashContextProvider>
                      <DoubleContextProvider>

                          <Analytics />
                          <html lang="pt-BR" >
                            <body className={`${inter.className} bg-zinc-800 text-white`}>
                              <TopBar />

                              <header className="bg-zinc-800 w-full h-[78px] px-4 md:px-6 gap-4 flex justify-between items-center border-b border-zinc-600">
                                <div className="flex h-full py-6 items-center">
                                  <div className="h-full max-w-[6rem] md:max-w-full flex items-center">
                                    <Link href={'/'}>
                                      <Logo />
                                    </Link>
                                  </div>
                                </div>

                                {
                                  isAuthenticated ? (
                                    <Profile />
                                  ) : (
                                    <SignIn />
                                  )
                                }
                              </header>

                              <div className="pt-26 text-white w-full flex-1 flex">
                                <Sidebar />

                                <div className="flex-1 flex flex-col justify-between gap-4">
                                  <div className="flex flex-col px-4 md:px-6 py-6 mx-auto w-[calc(98vw)] md:w-[calc(100vw-18rem)] lg:max-w-6xl gap-8">
                                    {children}
                                  </div>

                                  <Footer />
                                </div>
                              </div>
                              <Modal />

                              {/* <MenuMobile /> */}
                            </body>
                          </html>
                      </DoubleContextProvider>
                    </CrashContextProvider>
                  </MinesContextProvider>
                </AffiliateContextProvider>
              </TransactionContextProvider>
            </WalletContextProvider>
          </AccountContextProvider>
        </ModalContextProvider>
      </AuthContextProvider >
    </GlobalContextProvider>
  )
}
