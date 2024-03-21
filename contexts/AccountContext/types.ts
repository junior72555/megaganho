import { ReactNode } from "react";

export interface AccountContextProviderProps {
  children: ReactNode
}

export type Profile = {
  name: string;
  email: string;
  document: string;
  phone: string;
  birth_date: string;
}

export type PixKeys = {
  pix_key_type: 'cpf' | 'email' | 'phone' | 'random' | 'cnpj'
  pix_key: string
}