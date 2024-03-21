'use client';
import React, { createContext, useContext, useEffect, useState } from "react";
import { Bet, BetResponse, Crash, CrashContextProviderProps, LastGamesCrash, StartGameFormData } from "./types";
import { api } from "@/lib/api";
import { CrashResponse } from "./types";
import { parseCookies } from "nookies";

interface CrashContextType {
  isLoading: boolean;

  game: Crash | null;
  fetchGame: () => void;
  handleSetGame(game: Crash): void;

  startGame: (data: StartGameFormData) => Promise<any>;
  setCashout: () => Promise<any>;
  handleLastGames(lastGames: LastGamesCrash[]): void;
  lastGames: LastGamesCrash[];
  bets: Bet[];
  resetBets: () => void;

  bet: Bet;
  handleBet: (bet: Bet) => void;
  addBets: (bet: Bet) => void;
}

export const CrashContext = createContext<CrashContextType>({} as CrashContextType)

export const CrashContextProvider = ({ children }: CrashContextProviderProps) => {
  const cookies = parseCookies()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [game, setGame] = useState<Crash | null>(null)
  const [lastGames, setLastGames] = useState<LastGamesCrash[]>([])
  const [bets, setBets] = useState<Bet[]>([])
  const [bet, setBet] = useState<Bet>({} as Bet)

  const handleBet = (bet: Bet) => {
    setBet(bet)
  }

  const resetBets = () => {
    setBets([])
  }

  const addBets = (bet: Bet) => {
    setBets((prevBets) => {
      const newBets = prevBets.filter(b => b.id !== bet.id)

      const orderBet = [
        ...newBets,
        bet
      ].sort((a, b) => {
        if (cookies['bet.user']) {
          if (a.user_id == Number(cookies['bet.user']) ?? 0) {
            return -1
          }

          if (b.user_id == Number(cookies['bet.user']) ?? 0) {
            return 1
          }
        }

        return b.bet - a.bet
      })

      return orderBet
    })
  }

  const handleSetGame = (game: Crash) => {
    setGame(game)
  }

  const handleLastGames = (lastGames: LastGamesCrash[]) => {
    setLastGames(lastGames)
  }

  const startGame = async ({
    value_to_bet,
  }: StartGameFormData) => {
    setIsLoading(true)

    try {
      const response = await api.post<BetResponse>('/games/crash', {
        value_to_bet,
      })
        .then(response => {
          setBet(response.data.bet ?? {} as Bet)
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
    await api.get<CrashResponse>('/games/crash')
      .then(response => {
        setGame(response.data.game)

        setLastGames(response.data.game.latest_crash ?? [])

        if (response.data.game.bet) {
          setBet(response.data.game.bet)
        }

        if (response.data.game.bets) {
          setBets(response.data.game.bets)
        }
      })
  }

  const setCashout = async () => {
    setIsLoading(true)

    try {
      return await api.post<BetResponse>('/games/crash/cashout')
        .then(response => {
          if (response.data.bet) {
            setBet(response.data.bet)
          }
        })
        .finally(() => {
          setIsLoading(false)
        })
    } catch (error: any) {
      return {
        type: 'error',
        message: error?.response?.data?.message
      }
    }
  }

  return (
    <CrashContext.Provider value={{
      isLoading,
      game,
      fetchGame,
      handleSetGame,
      startGame,
      setCashout,
      lastGames,
      handleLastGames,
      bets,
      resetBets,
      bet,
      handleBet,
      addBets
    }}>
      {children}
    </CrashContext.Provider>
  )
};

export const useCrash = () => {
  const context = useContext(CrashContext)
  if (context === undefined) {
    throw new Error('useCrash está fora de ThemeProvider.')
  }
  return context
}