import { ReactNode } from "react";

export interface MinesContextProviderProps {
  children: ReactNode
}


export type StartGameFormData = {
  value_to_bet: number,
  number_of_bombs: number,
}

export type Mines = {
  bet: number,
  balance_type: string,
  number_of_bombs: number,
  step: number,
  clicks: number[],
  finish: boolean,
  win: boolean,
  payout_multiplier: number,
  payout_multiplier_on_next: number,
  bombs?: number[]
}

export type MinesResponse = {
  message: string,
  game: Mines
}
