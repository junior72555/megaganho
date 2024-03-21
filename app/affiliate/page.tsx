"use client"
import AffiliateChart from "@/components/ui/Chart/AffiliateChart";
import { useAffiliate } from "@/contexts/AffiliateContext";
import { useAuth } from "@/contexts/AuthContext";
import { useModal } from "@/contexts/ModalContext";
import copyText from "@/utils/copyText";
import { formatBRL, formatCentsToBRL } from "@/utils/currency";
import getURL from "@/utils/getURL";
import { UserIcon } from "@heroicons/react/20/solid";
import { Square2StackIcon } from "@heroicons/react/24/outline";
import { useEffect } from "react";

export default function AffiliatePage() {
  const { setOpenModal } = useModal()
  const { user } = useAuth()
  const { isLoading, statistics, fetchStatistics } = useAffiliate()

  useEffect(() => {
    fetchStatistics()
  }, [])

  if (isLoading)
    return (<div>Carregando...</div>)

  return (
    <div className="rounded bg-zinc-700 p-6 flex flex-col gap-6">

      <div className="flex flex-col gap-4 lg:flex-row justify-between items-center mb-4 mt-2">
        <div className="w-full flex flex-col gap-1">
          <div className='text-lg text-white font-bold'>SISTEMA DE AFILIADOS</div>
          <div className='text-base text-zinc-400'>Indique um amigo e ganhe até {statistics?.wallet_revenue_share?.value ?? ''}% de Revenue Share.</div>
        </div>

        <div className="w-full rounded-xl bg-zinc-800 p-4 flex justify-between gap-4">
          <input value={`${getURL('/')}?ref=${user?.ref_code}`} className="bg-transparent text-zinc-400 text-sm w-72" />
          <div
            onClick={() => copyText(`${getURL('/')}?ref=${user?.ref_code}`)}
            className="text-green-500 hover:text-green-600 cursor-pointer flex items-center gap-1 text-sm">
            <Square2StackIcon className="h-5 w-5" />
            <span>COPIAR</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <div>
          <h2 className="uppercase text-lg text-white font-bold mb-1">Carteira CPA</h2>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-5 md:grid-cols-5 lg:grid-cols-5">
            <div className="bg-zinc-900 col-span-2 sm:col-span-3 md:col-span-3 lg:col-span-3 p-4 rounded-xl flex justify-between items-center">
              <button
                onClick={() => setOpenModal('withdraw')}
                className="h-10 flex first:items-center cursor-pointer md:mx-2 rounded shadow-green shadow-green-500 bg-green-500 text-zinc-900 hover:bg-green-700 px-2 py-2 text-center font-bold text-xs md:text-sm">
                RESGATAR
              </button>
              <div className="flex flex-col justify-center">
                <span className="text-white font-bold text-3xl uppercase text-right">{formatCentsToBRL(statistics?.wallet_cpa?.available ?? 0)}</span>
                <span className="text-zinc-400 text-xs text-right uppercase">Ganhos Disponíveis</span>
              </div>
            </div>
            <div className="bg-zinc-600 col-span-1 p-4 rounded-xl flex flex-col justify-between">
              <UserIcon className="w-6 h-6 text-green-500" />
              <div className="flex flex-col">
                <span className="-mt-2 text-white font-bold text-xl uppercase text-right">{formatCentsToBRL(statistics?.wallet_cpa?.total ?? 0)}</span>
                <span className="text-zinc-400 text-xs text-right uppercase">Ganhos totais</span>
              </div>
            </div>
            <div className="bg-zinc-600 col-span-1 p-4 rounded-xl flex flex-col justify-between">
              <UserIcon className="w-6 h-6 text-green-500" />
              <div className="flex flex-col">
                <span className="-mt-2 text-white font-bold text-xl uppercase text-right">{formatCentsToBRL(statistics?.wallet_cpa?.value ?? 0)}</span>
                <span className="text-zinc-400 text-xs text-right uppercase">POR CPA</span>
              </div>
            </div>
          </div>
        </div>
        <div>
          <h2 className="uppercase text-lg text-white font-bold mb-1">Carteira Revenue Share</h2>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-5 md:grid-cols-5 lg:grid-cols-5">
            <div className="bg-zinc-900 col-span-2 sm:col-span-3 md:col-span-3 lg:col-span-3 p-4 rounded-xl flex justify-between items-center">
              <button
                onClick={() => setOpenModal('withdraw')}
                className="h-10 flex first:items-center cursor-pointer md:mx-2 rounded shadow-green shadow-green-500 bg-green-500 text-zinc-900 hover:bg-green-700 px-2 py-2 text-center font-bold text-xs md:text-sm">
                RESGATAR
              </button>
              <div className="flex flex-col justify-center">
                <span className="text-white font-bold text-3xl uppercase text-right">{formatCentsToBRL(statistics?.wallet_revenue_share?.available ?? 0)}</span>
                <span className="text-zinc-400 text-xs text-right uppercase">Ganhos Disponíveis</span>
              </div>
            </div>
            <div className="bg-zinc-600 sm:col-span-1 p-4 rounded-xl flex flex-col justify-between">
              <UserIcon className="w-6 h-6 text-green-500" />
              <div className="flex flex-col">
                <span className="-mt-2 text-white font-bold text-xl uppercase text-right">{formatCentsToBRL(statistics?.wallet_revenue_share?.total ?? 0)}</span>
                <span className="text-zinc-400 text-xs text-right uppercase">Ganhos totais</span>
              </div>
            </div>
            <div className="bg-zinc-600 sm:col-span-1 p-4 rounded-xl flex flex-col justify-between">
              <UserIcon className="w-6 h-6 text-green-500" />
              <div className="flex flex-col">
                <span className="-mt-2 text-white font-bold text-xl uppercase text-right">{(statistics?.wallet_revenue_share?.value ?? 0)}</span>
                <span className="text-zinc-400 text-xs text-right uppercase">% Revenue Share</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='text-lg text-white font-bold mt-6'>SISTEMA DE AFILIADOS</div>

      <div className="grid grid-cols-12 gap-2">

      <div className="bg-zinc-600 col-span-6 md:col-span-6 lg:col-span-3 p-4 rounded-xl flex flex-col justify-between items-center">
          <span className="text-white font-bold text-xl uppercase text-right">{statistics?.players?.today}</span>
          <span className="text-zinc-400 text-xs text-right uppercase">Jogadores Hoje</span>
        </div>

        <div className="bg-zinc-600 col-span-6 md:col-span-6 lg:col-span-3 p-4 rounded-xl flex flex-col justify-between items-center">
          <span className="text-white font-bold text-xl uppercase text-right">{statistics?.players?.weekly}</span>
          <span className="text-zinc-400 text-xs text-right uppercase">Jogadores Semana</span>
        </div>

        <div className="bg-zinc-600 col-span-6 md:col-span-6 lg:col-span-3 p-4 rounded-xl flex flex-col justify-between items-center">
          <span className="text-white font-bold text-xl uppercase text-right">{statistics?.players?.monthly}</span>
          <span className="text-zinc-400 text-xs text-right uppercase">Jogadores Mês</span>
        </div>

        <div className="bg-zinc-600 col-span-6 md:col-span-6 lg:col-span-3 p-4 rounded-xl flex flex-col justify-between items-center">
          <span className="text-white font-bold text-xl uppercase text-right">{statistics?.players?.total}</span>
          <span className="text-zinc-400 text-xs text-right uppercase">Jogadores Total</span>
        </div>

        <div className="bg-zinc-600 col-span-6 md:col-span-6 lg:col-span-3 p-4 rounded-xl flex flex-col justify-between items-center">
          <span className="text-white font-bold text-xl uppercase text-right">{formatCentsToBRL(statistics?.commissions?.today ?? 0)}</span>
          <span className="text-zinc-400 text-xs text-right uppercase">Comissões Hoje</span>
        </div>

        <div className="bg-zinc-600 col-span-6 md:col-span-6 lg:col-span-3 p-4 rounded-xl flex flex-col justify-between items-center">
          <span className="text-white font-bold text-xl uppercase text-right">{formatCentsToBRL(statistics?.commissions?.weekly ?? 0)}</span>
          <span className="text-zinc-400 text-xs text-right uppercase">Comissões Semana</span>
        </div>

        <div className="bg-zinc-600 col-span-6 md:col-span-6 lg:col-span-3 p-4 rounded-xl flex flex-col justify-between items-center">
          <span className="text-white font-bold text-xl uppercase text-right">{formatCentsToBRL(statistics?.commissions?.monthly ?? 0)}</span>
          <span className="text-zinc-400 text-xs text-right uppercase">Comissões Mês</span>
        </div>

        <div className="bg-zinc-600 col-span-6 md:col-span-6 lg:col-span-3 p-4 rounded-xl flex flex-col justify-between items-center">
          <span className="text-white font-bold text-xl uppercase text-right">{formatCentsToBRL(statistics?.commissions?.total ?? 0)}</span>
          <span className="text-zinc-400 text-xs text-right uppercase">Comissões Totais</span>
        </div>

        <div className="bg-zinc-600 col-span-6 md:col-span-6 lg:col-span-3 p-4 rounded-xl flex flex-col justify-between items-center">
          <span className="text-white font-bold text-xl uppercase text-right">{formatCentsToBRL(statistics?.commissions_cpa?.today ?? 0)}</span>
          <span className="text-zinc-400 text-xs text-right uppercase">Comissões CPA Hoje</span>
        </div>

        <div className="bg-zinc-600 col-span-6 md:col-span-6 lg:col-span-3 p-4 rounded-xl flex flex-col justify-between items-center">
          <span className="text-white font-bold text-xl uppercase text-right">{formatCentsToBRL(statistics?.commissions_cpa?.weekly ?? 0)}</span>
          <span className="text-zinc-400 text-xs text-right uppercase">Comissões CPA Semana</span>
        </div>

        <div className="bg-zinc-600 col-span-6 md:col-span-6 lg:col-span-3 p-4 rounded-xl flex flex-col justify-between items-center">
          <span className="text-white font-bold text-xl uppercase text-right">{formatCentsToBRL(statistics?.commissions_cpa?.monthly ?? 0)}</span>
          <span className="text-zinc-400 text-xs text-right uppercase">Comissões CPA Mês</span>
        </div>

        <div className="bg-zinc-600 col-span-6 md:col-span-6 lg:col-span-3 p-4 rounded-xl flex flex-col justify-between items-center">
          <span className="text-white font-bold text-xl uppercase text-right">{formatCentsToBRL(statistics?.commissions_cpa?.total ?? 0)}</span>
          <span className="text-zinc-400 text-xs text-right uppercase">Comissões CPA Total</span>
        </div>

        <div className="bg-zinc-600 col-span-4 p-4 rounded-xl flex flex-col justify-between items-center">
          <span className="text-white font-bold text-xl uppercase text-right">{formatCentsToBRL(statistics?.commissions_revenue_share?.today ?? 0)}</span>
          <span className="text-zinc-400 text-xs text-right uppercase">Comissões Revenue Share Hoje</span>
        </div>

        <div className="bg-zinc-600 col-span-4 p-4 rounded-xl flex flex-col justify-between items-center">
          <span className="text-white font-bold text-xl uppercase text-right">{formatCentsToBRL(statistics?.commissions_revenue_share?.weekly ?? 0)}</span>
          <span className="text-zinc-400 text-xs text-right uppercase">Comissões Revenue Share Semana</span>
        </div>

        <div className="bg-zinc-600 col-span-4 p-4 rounded-xl flex flex-col justify-between items-center">
          <span className="text-white font-bold text-xl uppercase text-right">{formatCentsToBRL(statistics?.commissions_revenue_share?.monthly ?? 0)}</span>
          <span className="text-zinc-400 text-xs text-right uppercase">Comissões Revenue Share Mês</span>
        </div>

        <div className="bg-zinc-600 col-span-4 p-4 rounded-xl flex flex-col justify-between items-center">
          <span className="text-white font-bold text-xl uppercase text-right">{formatCentsToBRL(statistics?.commissions_revenue_share?.total ?? 0)}</span>
          <span className="text-zinc-400 text-xs text-right uppercase">Comissões Revenue Share Total</span>
        </div>

        <div className="bg-zinc-600 col-span-6 p-4 rounded-xl flex flex-col justify-between items-center">
          <span className="text-white font-bold text-xl uppercase text-right">{formatCentsToBRL(statistics?.deposits?.amount_total ?? 0)}</span>
          <span className="text-zinc-400 text-xs text-right uppercase">Valor Total de Depósitos</span>
        </div>

        <div className="bg-zinc-600 col-span-6 p-4 rounded-xl flex flex-col justify-between items-center">
          <span className="text-white font-bold text-xl uppercase text-right">{statistics?.deposits?.quantity ?? 0}</span>
          <span className="text-zinc-400 text-xs text-right uppercase">Quantidade Total de Depósitos</span>
        </div>
      </div>

      <div className="hidden bg-zinc-900 rounded-xl p-6 flex flex-col gap-3">
        <div className="flex justify-between">
          <div className='text-lg text-white font-bold uppercase'>Relatórios</div>
          <div className='text-lg text-white font-bold'>FILTRO</div>
        </div>

        <AffiliateChart />
      </div>

    </div>
  )
}