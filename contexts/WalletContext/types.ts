import { ReactNode } from "react";

export interface WalletContextProviderProps {
  children: ReactNode
}

export type Balance = {
  balance: number
  bonus: number
}

export type Bonus = {
  status: boolean
  balance: number
  credit_hold: number
  expiration_at: string
  rollover: Rollover
}

export type Rollover = {
  amount: number
  count: number
  multiplier: number
  rollover_count: number
}

export type Wallets = {
  id: number;
  name: string;
  type: 'main' | 'affiliate_cpa' | 'affiliate_revenue_share';
  balance: number;
  min_cashout_amount: number;
}