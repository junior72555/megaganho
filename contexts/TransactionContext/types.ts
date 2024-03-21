import { ReactNode } from "react";

export interface TransactionContextProviderProps {
  children: ReactNode
}

export type Transaction = {
  id: number
  name: string
  status: string
  balance_type: 'wallet' | 'bonus'
  amount: number
  type: string
  typable_type: string
  created_at: string
}

export type TransactionResponse = {
  data: Transaction[]
  links: {
    first: string
    last: string
    prev: string
    next: string
  },
  meta: {
    current_page: number
    from: number
    last_page: number
    links: {
      url: string | null
      label: string
      active: boolean
    }[]
    path: string
    per_page: number
    to: number
    total: number
  }
}

export const TransactionNameType = {
  'deposit': 'Depósito',
  'cassino': 'Cassino',
  'bonus': 'Bônus',
  'cashout': 'Saque',
  'rollover': 'Rollover',
  'affiliate_cpa': 'CPA',
  'affiliate_revenue_share': 'Revenue Share',
} as any

export const TransactionStatus = {
  chargeback: 'Chargeback',
  pending: 'Pendente',
  expired: 'Expirado',
  error: 'Erro',
  processing: 'Processando',
  refused: 'Recusado',
  waiting_payment: 'Aguardando pagamento',
  approved: 'Aprovado'
} as any

export const TransactionStatusColor = {
  chargeback: 'red',
  pending: 'yellow',
  expired: 'gray',
  error: 'red',
  processing: 'yellow',
  refused: 'red',
  waiting_payment: 'yellow',
  approved: 'green'
} as any