import { ReactNode } from "react";

export interface AuthContextProviderProps {
  children: ReactNode
}

export type User = {
  id: number;
  name: string;
  avatar: string;
  document: string;
  email: string;
  birth_date: string;
  phone: string;
  ref_code: string;
  roles: string[];
  permissions: string[];
};


export type SignUpFormData = {
  name: string;
  document: string;
  email: string;
  phone: string;
  password: string;
  password_confirmation: string;
}