import { ReactNode } from "react";

export interface GameContextProviderProps {
  children: ReactNode
}

export type StartGame = {
  data: {
    operator_player_session: string,
    game_url: string,
  }
}

export type Game = {
  status: number,
  msg: string,
  fc_code: string,
  launch_url: string,
}
