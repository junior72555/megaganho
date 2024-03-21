"use client"
import LastGamesDouble from "@/components/games/double/LastGamesDouble";
import ListBetsMines from "@/components/games/double/ListBetsMines";
import ResultDoubleMessage from "@/components/games/double/ResultDoubleMessage";
import SliderDouble from "@/components/games/double/SliderDouble";
import BadgeErrorsMessage from "@/components/ui/Errors/BadgeErrorsMessage";
import Input from "@/components/ui/Form/Input";
import { useModal } from "@/contexts/ModalContext";
import { useWallet } from "@/contexts/WalletContext";
import { formatBRL, formatCentsToBRL } from "@/utils/currency";
import { yupResolver } from "@hookform/resolvers/yup";
import { parseCookies } from "nookies";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import Pusher from 'pusher-js';
import { useDouble } from "@/contexts/Games/DoubleContext";
import { Bet, BetResponse } from "@/contexts/Games/DoubleContext/types";
import { useAuth } from "@/contexts/AuthContext";

interface IFormInputs {
  value_to_bet: string;
  color: 'green' | 'black' | 'white';
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
    color: yup.string()
      .required("Cor Obrigatória")
      .oneOf(['green', 'black', 'white'], 'Cor inválida'),
  })
  .required();

export default function DoublePage() {
  const cookies = parseCookies()
  const { user } = useAuth()
  const [messageError, setMessageError] = useState({ type: '', message: '' })
  const { wallet, fetchBalance } = useWallet()
  const { setOpenModal } = useModal()

  const userId = user?.id ?? undefined

  const { game, fetchGame, bet, addBets, startGame, handleSetGame, resetBets, handleLastGames, handleBet, resetBet } = useDouble()

  const [waitBet, setWaitBet] = useState<number>(0)
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    getValues,
    formState: { errors },
  } = useForm<IFormInputs>({
    resolver: yupResolver(schema),
  });

  function half_value_to_bet() {
    let value = getValues('value_to_bet').replace(/[^0-9]/g, '') as any
    if (value == 0) { value = 2 }

    value = formatCentsToBRL((value) / 2)
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

  const onSubmit = async ({ value_to_bet, color }: IFormInputs) => {
    if (!cookies['bet.token']) {
      setOpenModal('login')
      return
    }

    setMessageError({ type: '', message: '' })

    if (!!game && game?.status !== 'pending') {
      setWaitBet(Number(value_to_bet.replace(/[^0-9]/g, '')))
    } else {
      const response = await startGame({
        value_to_bet: Number(value_to_bet.replace(/[^0-9]/g, '')),
        color
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

  const isBet = (bet && bet.length >= 2)

  const handleResetWaitBet = () => {
    setWaitBet(0)
  }


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

    const channel = pusher.subscribe("double");

    channel.bind("double-game", function (data: { message: any }) {
      const { message } = data

      handleSetGame(message)
      handleLastGames(message?.latest_double ?? [])

      if (message.status == 'pending') {
        resetBets()
      }

      if (message.status == 'finished') {
        resetBet()
      }
    });

    channel.bind("double-bet", function (data: { message: Bet }) {
      const { message } = data

      addBets(message, userId)
    });

    return () => {
      pusher.unsubscribe("double");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (game?.status === 'pending' && waitBet > 0) {
      onSubmit({ value_to_bet: String(waitBet), color: getValues('color') })
    }

    if (game?.status === 'pending') {
      setMessageError({ type: '', message: '' })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [game?.status])

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

            <div className="w-full flex gap-2 mb-4">
              <button
                type="button"
                className={`
                ${watch('color') == 'black' ? 'border-4 border-red-500' : ''}
                cursor-pointer flex-1 h-12 rounded-lg font-semibold bg-black flex items-center justify-center`}
                onClick={() => setValue('color', 'black')}
              >
                x2
              </button>
              <button
                type="button"
                className={`
                ${watch('color') == 'white' ? 'border-4 border-red-500' : ''}
                cursor-pointer flex-1 h-12 rounded-lg font-semibold text-zinc-700 bg-white flex items-center justify-center`}
                onClick={() => setValue('color', 'white')}
              >
                x14
              </button>
              <button
                type="button"
                className={`
                ${watch('color') == 'green' ? 'border-4 border-red-500' : ''}
                cursor-pointer flex-1 h-12 rounded-lg font-semibold bg-green-500 text-zinc-700 flex items-center justify-center`}
                onClick={() => setValue('color', 'green')}
              >
                x2
              </button>
            </div>
            {
              errors.color && (
                <BadgeErrorsMessage
                  type={'error'}
                  message={'Selecione uma cor antes de apostar'} />
              )
            }

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

                  type="button"
                  className="disabled:cursor-not-allowed disabled:opacity-80 h-12 w-full text-center cursor-pointer  rounded shadow-green shadow-red-500 bg-red-500 text-white hover:bg-red-700 px-2 py-2  font-bold text-xs md:text-sm"
                >
                  Esperando
                </button>
              )
            }
          </form>

          <div className="col-span-3 lg:col-span-2 flex flex-col gap-4 ">
            <div className="block lg:hidden w-full">
              <LastGamesDouble />
            </div>

            <div className="w-full relative bg-zinc-900 rounded-xl overflow-hidden py-6">
              <ResultDoubleMessage />
              <SliderDouble />
            </div>

            <div className="hidden lg:block w-full border-t border-zinc-500 pt-4">
              <LastGamesDouble />
            </div>
          </div>
        </div>
      </div>

      <ListBetsMines />
    </>
  )
}