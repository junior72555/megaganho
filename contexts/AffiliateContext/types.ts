import { ReactNode } from "react";

export interface AffiliateContextProviderProps {
  children: ReactNode;
}

export type AffiliateStatisticsResponse = {
  wallet_cpa: {
    available: number;
    total: number;
    value: number;
  };
  wallet_revenue_share: {
    available: number;
    total: number;
    value: number;
  };
  players: {
    total: number;
    today: number;
    weekly: number;
    monthly: number;
  };
  commissions_cpa: {
    today: number;
    monthly: number;
    weekly: number;
    total: number;
  };
  commissions_revenue_share: {
    today: number;
    monthly: number;
    weekly: number;
    total: number;
  };
  commissions: {
    today: number;
    monthly: number;
    weekly: number;
    total: number;
  };
  deposits: {
    quantity: number;
    amount_total: number;
  };
};