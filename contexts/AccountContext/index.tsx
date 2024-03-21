'use client';
import React, { createContext, useContext, useEffect, useState } from "react";
import { AccountContextProviderProps, PixKeys, Profile } from "./types";
import { api } from "@/lib/api";

interface AccountContextType {
  pixKeys: PixKeys | null;
  changeProfile: (data: Profile) => Promise<any>;
  changePix: (data: PixKeys) => Promise<any>;
  fetchAccount: () => void;
  isLoading: boolean;
}

export const AccountContext = createContext<AccountContextType>({} as AccountContextType)

export const AccountContextProvider = ({ children }: AccountContextProviderProps) => {
  const [pixKeys, setPixKeys] = useState<PixKeys | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const changeProfile = async (data: Profile) => {
    setIsLoading(true)
    try {
      const response = await api.put('/account/profile', data).finally(() => {
        setIsLoading(false)
      })


      return {
        type: 'success',
        message: response.data.message
      }

    } catch (error: any) {
      return {
        type: 'error',
        message: error?.response?.data?.message,
        errors: error?.response?.data?.errors
      }
    }
  }

  const changePix = async (data: PixKeys) => {
    setIsLoading(true)
    try {
      const response = await api.put('/account/profile', data)
        .finally(() => {
          setIsLoading(false)
        })

      return {
        type: 'success',
        message: response.data.message
      }

    } catch (error: any) {
      return {
        type: 'error',
        message: error?.response?.data?.message,
        errors: error?.response?.data?.errors
      }
    }
  }

  const fetchAccount = async () => {

    await api.get('/account/profile')
      .then(response => {
        setPixKeys({
          pix_key: response.data.user.pix_key,
          pix_key_type: response.data.user.pix_key_type
        })
      })
  }

  return (
    <AccountContext.Provider value={{
      changeProfile,
      changePix,
      pixKeys,
      fetchAccount,
      isLoading
    }}>
      {children}
    </AccountContext.Provider>
  )
};

export const useAccount = () => {
  const context = useContext(AccountContext)
  if (context === undefined) {
    throw new Error('useAccount está fora de ThemeProvider.')
  }
  return context
}