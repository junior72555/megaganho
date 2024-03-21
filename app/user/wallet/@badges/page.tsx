"use client"
import { useWallet } from "@/contexts/WalletContext";
import { formatBRL, formatBonus } from "@/utils/currency";
import { useEffect } from "react";
import TextCountDown from "@/components/ui/TextCountDown/Index";
import { useModal } from "@/contexts/ModalContext";

export default function Badges() {
  const { wallet, bonus, fetchBonus } = useWallet()
  const { setOpenModal } = useModal()

  useEffect(() => {
    fetchBonus()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wallet])

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">

        <div className="rounded w-full bg-zinc-700 p-6 flex flex-col">
          <div className="flex justify-between mb-6">
            <h2 className="text-white text-lg font-bold uppercase">Carteira</h2>
            <div className="bg-green-500 h-fit text-zinc-900 font-semibold text-xs p-1 rounded">
              Ativa
            </div>
          </div>

          <div className="flex-1 flex flex-col gap-2 justify-between">
            <div className="font-bold text-4xl">
              <div className="text-base font-normal">
                Reais
              </div>
              {formatBRL(wallet?.balance ?? 0.00)}
            </div>

            <div className="flex items-center justify-start pt-3 gap-2">
              <button
                type="button"
                onClick={() => setOpenModal('deposit')}
                className="flex items-center gap-1 rounded-md bg-green-500 px-3 py-2 text-sm font-bold uppercase text-zinc-900 shadow-green hover:bg-green-400"
              >
                Depositar
              </button>

              <button
                type="button"
                onClick={() => setOpenModal('withdraw')}
                className="flex items-center gap-1 rounded-md bg-zinc-500 px-3 py-2 text-sm font-bold uppercase text-zinc-200 shadow-sm hover:bg-zinc-600"
              >
                Sacar
              </button>
            </div>
          </div>
        </div>

        {
          wallet && wallet?.bonus > 0 && (
            <div className="rounded w-full bg-zinc-700 p-6">
              <div className="flex justify-between mb-2">
                <h2 className="text-white text-lg font-bold uppercase">
                  Bônus
                </h2>
                <div className="bg-yellow-500 h-fit text-zinc-900 font-semibold text-xs p-1 rounded">
                  Rollover
                </div>
              </div>

              <div className="space-y-1">

                <div className="font-bold text-4xl">
                  {formatBonus(wallet?.bonus ?? 0.00)}
                </div>

                <div className="text-zinc-400">
                  <div className="text-sm">
                    <TextCountDown expiration_at={bonus?.expiration_at ?? ''} />
                  </div>
                  <div className="text-sm">
                    Regras do bônus
                  </div>
                </div>

                <div className="pt-2">
                  <div className="mb-1 flex items-center justify-between text-sm">
                    <div className="text-xs text-left">Valor Apostado</div>
                    <div className="text-xs text-center">{formatBRL((bonus?.rollover?.amount ?? 0) / 100)} / {formatBRL((bonus?.credit_hold ?? 0) * (bonus?.rollover?.multiplier ?? 50) / 100)}</div>
                    <div className="text-xs text-right">Meta do rollover</div>
                  </div>
                  <div className="flex-1 bg-zinc-500 w-full rounded h-3 overflow-hidden">
                    <div
                      className="rounded h-full bg-green-500"
                      style={{ width: `${(bonus?.rollover?.amount ?? 0) / ((bonus?.credit_hold ?? 0) * (bonus?.rollover?.multiplier ?? 50)) * 100}%` }}
                    >
                    </div>
                  </div>

                  <div className="pt-2">
                    <div className="flex items-center justify-between text-sm">
                      <div className="text-xs text-left">Rodadas jogadas</div>
                      <div className="text-xs text-center">{bonus?.rollover?.count} / {bonus?.rollover?.rollover_count}</div>
                      <div className="text-xs text-right">Meta de jogadas</div>
                    </div>
                    <div className="flex-1 bg-zinc-500 w-full rounded h-3 overflow-hidden">
                      <div
                        className="rounded h-full bg-green-500"
                        style={{ width: `${(bonus?.rollover?.count ?? 0) / (bonus?.rollover?.rollover_count ?? 0) * 100}%` }}
                      >
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

      </div>
    </>
  )
} 