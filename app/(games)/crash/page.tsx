"use client"
import ChartCrash from "@/components/games/crash/ChartCrash";
import LastGamesCrash from "@/components/games/crash/LastGamesCrash";
import ListBetsCrash from "@/components/games/crash/ListBetsCrash";
import LoadingNextGameCrash from "@/components/games/crash/LoadingNextGameCrash";
import BadgeErrorsMessage from "@/components/ui/Errors/BadgeErrorsMessage";
import Input from "@/components/ui/Form/Input";
import { useCrash } from "@/contexts/Games/CrashContext";
import { Bet, Crash } from "@/contexts/Games/CrashContext/types";
import { useModal } from "@/contexts/ModalContext";
import { useWallet } from "@/contexts/WalletContext";
import { formatBRL, formatCentsToBRL } from "@/utils/currency";
import { yupResolver } from "@hookform/resolvers/yup";
import { parseCookies } from "nookies";
import Pusher from 'pusher-js';
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

interface IFormInputs {
  value_to_bet: string;
  value_auto_cashout?: string;
}

const schema = yup
  .object({
    value_to_bet: yup.string()
      .test('is-num', "Valor mínimo é R$0,01", value => {
        if (!value) return false
        const amount = value.replace(/[^0-9]/g, '');
        if (parseInt(amount) < 1) {
          return false
        }

        return true
      })
      .required("Valor Obrigatório"),
    value_auto_cashout: yup
      .number(),
  })
  .required();

export default function CrashPage() {
   const cookies = parseCookies()
   const [messageError, setMessageError] = useState({ type: '', message: '' })
   const { wallet, fetchBalance } = useWallet()
   const { setOpenModal } = useModal()

   const { fetchGame, bet, startGame, handleSetGame, game, setCashout, addBets, handleLastGames, handleBet, resetBets } = useCrash()

   const [waitBet, setWaitBet] = useState<number>(0)
   const [autoCashout, setAutoCashout] = useState<number>(0)

   const {
     register,
     handleSubmit,
     setValue,
     getValues,
     formState: { errors },
   } = useForm<IFormInputs>({
     resolver: yupResolver(schema),
   });

   const handleResetWaitBet = () => {
     setWaitBet(0)
   }

   function half_value_to_bet() {
     let value = getValues('value_to_bet').replace(/[^0-9]/g, '') as any
     if (value == 0) { value = 2 }

     value = formatBRL(((value) / 100) / 2)
     setValue('value_to_bet', value)
   }

   function double_value_to_bet() {
     let value = getValues('value_to_bet').replace(/[^0-9]/g, '') as any
     if (value == 0) { value = 1 }

     value = (value / 100) * 2

     if (value > ((wallet?.balance ?? 0) > 0 ? (wallet?.balance ?? 0) : (wallet?.bonus ?? 100))) {
       value = ((wallet?.balance ?? 0) > 0 ? (wallet?.balance ?? 0) : (wallet?.bonus ?? 100))
     }

     value = formatBRL(value)
     setValue('value_to_bet', value)
   }

   function max_value_to_bet() {
     let value = formatBRL(((wallet?.balance ?? 0) > 0 ? (wallet?.balance ?? 0) : (wallet?.bonus ?? 100)))
     setValue('value_to_bet', value)
   }

   const onSubmit = async ({ value_to_bet, value_auto_cashout }: IFormInputs) => {
     if (!cookies['bet.token']) {
       setOpenModal('login')
       return
     }

     setAutoCashout(value_auto_cashout ? Number(value_auto_cashout?.replace(/[^0-9]/g, '')) : 0)

     if (!!game && game?.status !== 'pending') {
       setWaitBet(Number(value_to_bet.replace(/[^0-9]/g, '')))
     } else {
       const response = await startGame({
         value_to_bet: Number(value_to_bet.replace(/[^0-9]/g, '')),
       })

       if (response?.type === 'error') {
         setMessageError({ type: 'error', message: response.message })
       } else {
         setMessageError({ type: '', message: '' })
       }

       setWaitBet(0)
       fetchBalance()
     }

   }

   const handleCashout = async () => {
     if (!cookies['bet.token'] && game?.status !== 'started') {
       return
     }

     const response = await setCashout()

     if (response?.type === 'error') {
       setMessageError({ type: 'error', message: response.message })
     } else {
       setMessageError({ type: '', message: '' })
     }
     fetchBalance()
   }

   const isGameActive = game == null || game?.status === 'pending' ? false : true
   const isLogged = !!cookies['bet.token']
   const isBet = !!bet && !!bet?.id && !bet?.win

   useEffect(() => {
     fetchGame()

     const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY ?? '', {
       cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER ?? 'sa1',
       wsHost: process.env.NEXT_PUBLIC_PUSHER_HOST ?? '',
       wssPort: Number(process.env.NEXT_PUBLIC_PUSHER_PORT ?? 443),
       wsPort: Number(process.env.NEXT_PUBLIC_PUSHER_PORT ?? 443),
       forceTLS: false,
       disableStats: true,
       enabledTransports: ['ws', 'wss'],
     });

     const channel = pusher.subscribe("crash");

     channel.bind("crash-game", function (data: { message: Crash }) {
       const { message } = data
       handleSetGame(message)

       if (message.status == 'pending') {
         resetBets()
       }

       if (message.status == 'crashed') {
         handleLastGames(message?.latest_crash ?? [])
         handleBet({} as Bet)
       }
     });

     channel.bind("crash-bet", function (data: { message: Bet }) {
       const { message } = data
       addBets(message)
     });

     return () => {
       pusher.unsubscribe("crash");
     };
     // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [])

   useEffect(() => {
     if (game?.status === 'pending' && waitBet > 0) {
       onSubmit({ value_to_bet: String(waitBet) })
     }
     // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [game?.status])

   useEffect(() => {
     if (game && game?.multiplier && autoCashout > 0 && game?.status === 'started' && autoCashout >= game?.multiplier) {
       handleCashout()
     }
     // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [game?.multiplier])

  return (
    <>
      <div className="rounded bg-zinc-700 p-6 flex flex-col gap-6">
        <div
          className="grid grid-cols-3 gap-4"
        >
          <form onSubmit={handleSubmit(onSubmit)}
            className="border-t pt-4 lg:pt-0 lg:border-t-0 lg:border-r lg:pr-3 border-zinc-600 order-last lg:order-first col-span-3 lg:col-span-1">
            <Input
              title="Valor da Aposta"
              type="tel"
              disabled={isBet}
              currency={true}
              {...register('value_to_bet', { required: true })}
              errors={errors.value_to_bet?.message}
            />

            <div className="flex -mt-2 mb-4 items-center justify-between rounded overflow-hidden">
              <button
                type="button"
                disabled={isBet}
                onClick={half_value_to_bet} className="disabled:cursor-not-allowed disabled:hover:bg-zinc-800 disabled:hover:text-zinc-400 h-10 text-sm flex justify-center items-center cursor-pointer font-semibold bg-zinc-800 hover:text-zinc-950 hover:bg-green-500 flex-1 text-center text-zinc-400">1/2</button>
              <button
                type="button"
                disabled={isBet}
                onClick={double_value_to_bet} className="disabled:cursor-not-allowed disabled:hover:bg-zinc-800 disabled:hover:text-zinc-400 h-10 text-sm flex justify-center items-center cursor-pointer font-semibold bg-zinc-800 hover:text-zinc-950 hover:bg-green-500 flex-1 text-center text-zinc-400">2x</button>
              <button
                type="button"
                disabled={isBet}
                onClick={max_value_to_bet} className="disabled:cursor-not-allowed disabled:hover:bg-zinc-800 disabled:hover:text-zinc-400 h-10 text-sm flex justify-center items-center cursor-pointer font-semibold bg-zinc-800 hover:text-zinc-950 hover:bg-green-500 flex-1 text-center text-zinc-400">MAX</button>
            </div>

            <BadgeErrorsMessage
              type={messageError.type}
              message={messageError.message} />

            {
              !isBet ? (
                waitBet > 0 ? (
                  <div
                    onClick={handleResetWaitBet}
                    className="h-12 flex items-center text-center w-full justify-center cursor-pointer  rounded shadow-green shadow-red-500 bg-red-500 text-white hover:bg-red-700 px-2 py-2  font-bold text-xs md:text-sm"
                  >
                    Na fila (clique para cancelar)
                  </div>
                ) : (
                  <button
                    type="submit"
                    className="h-12 w-full text-center cursor-pointer  rounded shadow-green shadow-green-500 bg-green-500 text-zinc-900 hover:bg-green-700 px-2 py-2  font-bold text-xs md:text-sm"
                  >
                    Começar o jogo
                  </button>
                )
              ) : (
                <button
                  disabled={game?.status === 'pending'}
                  onClick={handleCashout}
                  type="button"
                  className="disabled:cursor-not-allowed disabled:opacity-80 h-12 w-full text-center cursor-pointer  rounded shadow-green shadow-red-500 bg-red-500 text-white hover:bg-red-700 px-2 py-2  font-bold text-xs md:text-sm"
                >
                  {game?.status === 'pending' ? 'Aguardando' : `Retirar ${formatBRL((bet.bet ?? 0) * (game?.multiplier ?? 1) / 100)}`}
                </button>
              )
            }
          </form>

          <div className="col-span-3 lg:col-span-2 flex flex-col gap-4 ">
            <div className="block lg:hidden w-full">
              <LastGamesCrash />
            </div>

            <div className="w-full relative aspect-video bg-zinc-900 rounded-xl overflow-hidden p-3">

              <ChartCrash started_at={game?.started_at} float={game?.multiplier ?? 0} />

              {!!game && !!game.pending_at && game?.status == 'pending' && <LoadingNextGameCrash date={game.pending_at} />}

              {
                !!game && game?.status == 'started' && game?.multiplier && game?.multiplier > 1 && (
                  <div className="absolute top-0 left-0 w-full h-full  flex flex-col items-center justify-center">

                    {bet && bet.win && (
                      <div className="mb-4 w-fit h-fit text-center font-bold bg-green-500 shadow overflow-hidden rounded-lg flex items-center flex-col justify-center">
                        <div className="flex-1 flex items-center text-xl px-3 py-3 drop-shadow text-zinc-900">
                          X{bet?.multiplier ?? 1}
                        </div>
                        <div className="text-zinc-900 font-bold w-full h-10 flex justify-center items-center text-xs bg-green-700/40 p-2">
                          VOCÊ GANHOU {formatCentsToBRL((bet?.bet ?? 1) * (bet?.multiplier ?? 1))}
                        </div>
                      </div>)}

                    <div className="w-fit px-6 h-20 text-center font-bold backdrop-blur-sm bg-zinc-700/30 shadow overflow-hidden rounded-lg flex items-center flex-col justify-center">
                      <div className="flex-1 flex items-center text-4xl drop-shadow">
                        {game?.multiplier?.toFixed(2).replace('.', ',')}x
                      </div>
                    </div>
                  </div>
                )}

              {
                !!game && game?.status === 'crashed' && (
                  <div className="absolute top-0 left-0 w-full h-full  flex items-center justify-center">
                    <div className="w-fit h-fit text-center font-bold  bg-red-500/80 shadow overflow-hidden rounded-lg flex items-center flex-col justify-center">
                      <div className="flex-1 px-6 py-4 flex items-center text-4xl drop-shadow">
                        {game?.multiplier_crashed?.toFixed(2).replace('.', ',')}x
                      </div>
                      <div className="w-full h-10 flex justify-center items-center text-sm bg-red-700 p-2">
                        CRASHED!
                      </div>
                    </div>
                  </div>
                )}
            </div>

            <div className="hidden lg:block w-full border-t border-zinc-500 pt-4">
              <LastGamesCrash />
            </div>
          </div>
        </div>
      </div >

      <ListBetsCrash /> 
    </>
  )
}
