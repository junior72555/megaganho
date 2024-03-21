'use client';
import React, { createContext, useContext, useEffect, useState } from "react";
import { Mines, MinesContextProviderProps, StartGameFormData } from "./types";
import { api } from "@/lib/api";
import { AxiosResponse } from "axios";
import { MinesResponse } from "./types";
import { parseCookies } from "nookies";
import useSound from "use-sound";

interface MinesContextType {
  isLoading: boolean;
  game: Mines | null;
  fetchGame: () => void;
  startGame: (data: StartGameFormData) => Promise<any>;
  setClick: (position: number) => void;
  setCashout: () => void;
  setVolume: (volume: number) => void;
  volume: number;
}

export const MinesContext = createContext<MinesContextType>({} as MinesContextType)

export const MinesContextProvider = ({ children }: MinesContextProviderProps) => {
  const cookies = parseCookies()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [game, setGame] = useState<Mines | null>(null)

  const [volume, setVolume] = useState<number>(1)

  const [start] = useSound(`/${process.env.NEXT_PUBLIC_SITE_NAME}/sound/start.mp3`, { volume })
  const [bomb] = useSound(`/${process.env.NEXT_PUBLIC_SITE_NAME}/sound/bomb.mp3`, { volume })
  const [gem] = useSound(`/${process.env.NEXT_PUBLIC_SITE_NAME}/sound/gem.mp3`, { volume })

  const startGame = async ({
    value_to_bet,
    number_of_bombs,
  }: StartGameFormData) => {
    setIsLoading(true)

    try {
      const response = await api.post<MinesResponse>('/games/mines', {
        value_to_bet,
        number_of_bombs
      })
        .then(response => {
          setGame(response.data.game)

          start()
        })
        .finally(() => {
          setIsLoading(false)
        })

      return response

    } catch (error: any) {
      return {
        type: 'error',
        message: error?.response?.data?.message
      }
    }
  }

  const fetchGame = async () => {
    await api.get<MinesResponse>('/games/mines')
      .then(response => {
        setGame(response.data.game)
      })
  }

  const setClick = async (position: number) => {
    setIsLoading(true)

    if (!game || game?.finish || !cookies['bet.token']) {
      return;
    }

    await api.post<MinesResponse>('/games/mines/play', {
      position
    })
      .then(response => {
        setGame(response.data.game)

        if (!!response.data.game?.finish && !!!response.data.game?.win) {
          bomb()
        } else {
          gem()
        }
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  const setCashout = async () => {
    setIsLoading(true)
    await api.post<MinesResponse>('/games/mines/cashout')
      .then(response => {
        setGame(response.data.game)
        gem()
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  return (
    <MinesContext.Provider value={{
      isLoading,
      game,
      fetchGame,
      startGame,
      setClick,
      setCashout,
      setVolume,
      volume
    }}>
      {children}
    </MinesContext.Provider>
  )
};

export const useMines = () => {
  const context = useContext(MinesContext)
  if (context === undefined) {
    throw new Error('useMines está fora de ThemeProvider.')
  }
  return context
}