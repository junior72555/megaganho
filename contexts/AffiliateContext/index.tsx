'use client';
import React, { createContext, useContext, useEffect, useState } from "react";
import { AffiliateStatisticsResponse, AffiliateContextProviderProps } from "./types";
import { api } from "@/lib/api";
import { AxiosResponse } from "axios";
import { useSearchParams } from "next/navigation";

interface AffiliateContextType {
  isLoading: boolean;
  statistics: AffiliateStatisticsResponse | null;
  fetchStatistics(): Promise<AxiosResponse<AffiliateStatisticsResponse>>;
}

export const AffiliateContext = createContext<AffiliateContextType>({} as AffiliateContextType)

export const AffiliateContextProvider = ({ children }: AffiliateContextProviderProps) => {
  const [isLoading, setIsLoading] = useState(false)
  const [statistics, setStatistics] = useState<AffiliateStatisticsResponse | null>(null)


  const fetchStatistics = async (): Promise<AxiosResponse<AffiliateStatisticsResponse>> => {
    setIsLoading(true)

    const response: AxiosResponse<AffiliateStatisticsResponse> =
      await api.get<AffiliateStatisticsResponse>(
        `/affiliate/get-statistics`
      );

    if (response.status === 200) {
      const { data } = response;
      setStatistics(data);
    }

    setIsLoading(false);
    return response;
  }

  return (
    <AffiliateContext.Provider value={{
      isLoading,
      statistics,
      fetchStatistics
    }}>
      {children}
    </AffiliateContext.Provider>
  )
};

export const useAffiliate = () => {
  const context = useContext(AffiliateContext)
  if (context === undefined) {
    throw new Error('useAffiliate está fora de ThemeProvider.')
  }
  return context
}