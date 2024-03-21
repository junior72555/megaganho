import { ReactNode } from "react";

export interface CrashContextProviderProps {
  children: ReactNode
}


export type StartGameFormData = {
  value_to_bet: number,
}

export type Crash = {
  id: number,
  status: 'pending' | 'started' | 'crashed',
  hash: string,
  pending_at?: string,
  latest_crash?: LastGamesCrash[],
  multiplier?: number,
  multiplier_crashed?: number,
  started_at?: string,
  bet?: Bet,
  bets?: Bet[],
}

export type Bet = {
  id: number,
  name: string,
  bet: number,
  multiplier?: number,
  profit?: number,
  user_id?: number,
  win?: boolean,
}

export type LastGamesCrash = {
  hash: string,
  multiplier: number,
}

export type CrashResponse = {
  message: string,
  game: Crash
}


export type BetResponse = {
  message: string,
  bet: Bet
}