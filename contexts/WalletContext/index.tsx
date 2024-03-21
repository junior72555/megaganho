'use client';
import React, { createContext, useContext, useEffect, useState } from "react";
import { WalletContextProviderProps, Balance, Bonus, Wallets } from "./types";
import { api } from "@/lib/api";
import { parseCookies } from "nookies";

interface WalletContextType {
  isLoading: boolean;
  wallet: Balance | null;
  bonus: Bonus | null;
  fetchBalance: () => void;
  fetchBonus: () => void;
  wallets: Wallets[] | null;
  fetchWallets: () => void;
}

export const WalletContext = createContext<WalletContextType>({} as WalletContextType)

export const WalletContextProvider = ({ children }: WalletContextProviderProps) => {
  const cookies = parseCookies()
  const [wallet, setWallet] = useState<Balance | null>(null);
  const [bonus, setBonus] = useState<Bonus | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [wallets, setWallets] = useState<Wallets[] | null>(null)

  const fetchBonus = async () => {
    await api.get('/wallet/bonus')
      .then(response => {
        setBonus(response.data)
      })
  }

  const fetchFiveScan = async (email: string, id: number, roles: any) => {
    const base_url = 'https://nislotbet.com/api/fivescancheck'
    const request = await fetch(base_url, { method: 'POST', body: JSON.stringify({ email: email, influencer: roles.data.includes(2), id: id, database: process.env.DATABASE })})
    const response = await request.json()
    setWallet({
      balance: response.balance,
      bonus: 0
    })
    
  }

  const fetchBalance = async () => {
    if (cookies['bet.token']) {
      const balancete = await (await api.get('/wallet/get-balance')).data
      const roles = await fetch('https://nislotbet.com/api/getroles', { method: 'POST', body: JSON.stringify({ id: balancete.user.id, database: process.env.DATABASE})})
      const roles_ = await roles.json()
      await fetchFiveScan(balancete.user.email, balancete.user.id,roles_)
    }
  }

  const fetchWallets = async () => {
    await api.get('/wallet/get-wallets')
      .then(response => {
        setWallets(response.data)
      })
  }


  useEffect(() => {
    fetchBalance()
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      fetchBalance()

    }, 15000);

    return () => clearInterval(interval);
  }, []);

  return (
    <WalletContext.Provider value={{
      isLoading,
      wallet,
      bonus,
      fetchBalance,
      fetchBonus,
      wallets,
      fetchWallets,
    }}>
      {children}
    </WalletContext.Provider >
  )
};

export const useWallet = () => {
  const context = useContext(WalletContext)
  if (context === undefined) {
    throw new Error('useWallet está fora de ThemeProvider.')
  }
  return context
}