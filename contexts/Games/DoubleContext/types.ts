import { ReactNode } from "react";

export interface DoubleContextProviderProps {
  children: ReactNode
}

export type StartGameFormData = {
  value_to_bet: number,
  color: "green" | "black" | "white",
}

export type Double = {
  id: number,
  status: 'pending' | 'started' | 'finished',
  hash: string,
  pending_at?: string,
  latest_double?: LastGamesDouble[],
  bet?: Bet[],
  bets?: Bet[],
  winning_number?: number,
  winning_color?: "green" | "black" | "white",
}

export type Bet = {
  id: number,
  name: string,
  user_id?: number,
  bet: number,
  bet_color?: "green" | "black" | "white",
  win?: boolean,
}

export type LastGamesDouble = {
  hash: string,
  winning_number: number,
}

export type DoubleResponse = {
  message: string,
  game: Double
}


export type BetResponse = {
  message: string,
  bet: Bet[]
}