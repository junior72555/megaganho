'use client';
import React, { createContext, useContext, useEffect, useState } from "react";
import { Bet, BetResponse, Double, DoubleContextProviderProps, LastGamesDouble, StartGameFormData } from "./types";
import { api } from "@/lib/api";
import { DoubleResponse } from "./types";
import { parseCookies } from "nookies";

interface DoubleContextType {
  isLoading: boolean;
  game: Double | null;
  fetchGame: () => void;
  handleSetGame(game: Double): void;
  startGame: (data: StartGameFormData) => Promise<any>;
  handleLastGames(lastGames: LastGamesDouble[]): void;
  lastGames: LastGamesDouble[];
  bets: Bet[];
  bet: Bet[];
  resetBets: () => void;
  resetBet: () => void;
  handleBet: (bet: Bet) => void;
  addBets: (bet: Bet, userId?: number) => void;
}

export const DoubleContext = createContext<DoubleContextType>({} as DoubleContextType)

export const DoubleContextProvider = ({ children }: DoubleContextProviderProps) => {
  const cookies = parseCookies()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [game, setGame] = useState<Double | null>(null)
  const [lastGames, setLastGames] = useState<LastGamesDouble[]>([])
  const [bets, setBets] = useState<Bet[]>([])
  const [bet, setBet] = useState<Bet[]>([])

  const handleBet = (bet: Bet) => {
    setBet((state) => [
      ...state,
      bet
    ])
  }


  const resetBet = () => {
    setBet([])
  }

  const resetBets = () => {
    setBets([])
  }

  const addBets = (addbet: Bet, userId?: number) => {
    setBets((prevBets) => {
      const newBets = prevBets.filter(b => b.id !== addbet.id)

      const orderBet = [
        ...newBets,
        addbet
      ].sort((a, b) => {
        if (cookies['bet.user']) {
          if (a.user_id == Number(cookies['bet.user']) ?? 0) {
            return -1
          }

          if (b.user_id == Number(cookies['bet.user']) ?? 0) {
            return 1
          }
        }

        return b.bet < a.bet ? -1 : 1
      })

      return orderBet
    })
  }

  const handleSetGame = (game: Double) => {
    setGame(game)
  }

  const handleLastGames = (lastGames: LastGamesDouble[]) => {
    setLastGames(lastGames)
  }

  const startGame = async ({
    value_to_bet,
    color
  }: StartGameFormData) => {
    setIsLoading(true)

    try {
      const response = await api.post<BetResponse>('/games/double', {
        value_to_bet,
        color
      })
        .then(response => {
          setBet(response.data.bet ?? [])
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
    await api.get<DoubleResponse>('/games/double')
      .then(response => {
        setGame(response.data.game)

        setLastGames(response.data.game.latest_double ?? [])

        if (response.data.game.bet) {
          setBet(response.data.game.bet ?? [])
        }

        if (response.data.game.bets) {
          setBets(response.data.game.bets)
        }
      })
  }

  return (
    <DoubleContext.Provider value={{
      isLoading,
      game,
      fetchGame,
      handleSetGame,
      startGame,
      lastGames,
      handleLastGames,
      bets,
      resetBets,
      bet,
      handleBet,
      resetBet,
      addBets
    }}>
      {children}
    </DoubleContext.Provider>
  )
};

export const useDouble = () => {
  const context = useContext(DoubleContext)
  if (context === undefined) {
    throw new Error('useDouble está fora de ThemeProvider.')
  }
  return context
}