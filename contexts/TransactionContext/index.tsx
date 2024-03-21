'use client';
import React, { createContext, useContext, useEffect, useState } from "react";
import { TransactionResponse, Transaction, TransactionContextProviderProps } from "./types";
import { api } from "@/lib/api";
import { AxiosResponse } from "axios";
import { useSearchParams } from "next/navigation";

interface TransactionContextType {
  isLoading: boolean;
  transactions: TransactionResponse | null;
  fetchTransactions(): Promise<AxiosResponse<TransactionResponse>>;
}

export const TransactionContext = createContext<TransactionContextType>({} as TransactionContextType)

export const TransactionContextProvider = ({ children }: TransactionContextProviderProps) => {
  const [isLoading, setIsLoading] = useState(false)
  const [transactions, setTransactions] = useState<TransactionResponse | null>(null)
  const searchParams = useSearchParams()

  const fetchTransactions = async (): Promise<AxiosResponse<TransactionResponse>> => {
    setIsLoading(true)

    const response: AxiosResponse<TransactionResponse> =
      await api.get<TransactionResponse>(
        `/transactions?${searchParams.toString()}`
      );

    if (response.status === 200) {
      const { data } = response;
      setTransactions(data);
    }

    setIsLoading(false);
    return response;
  }

  return (
    <TransactionContext.Provider value={{
      isLoading,
      transactions,
      fetchTransactions
    }}>
      {children}
    </TransactionContext.Provider>
  )
};

export const useTransaction = () => {
  const context = useContext(TransactionContext)
  if (context === undefined) {
    throw new Error('useTransaction está fora de ThemeProvider.')
  }
  return context
}