"use client";

import { useCrash } from "@/contexts/Games/CrashContext";
import { formatCentsToBRL } from "@/utils/currency";

export default function ListBetsCrash() {
  const { bets, game } = useCrash()

  const numbersOfBets = bets?.length

  const sumOfBets = bets?.reduce((acc, bet) => {
    return acc + (bet.bet ?? 0)
  }, 0)

  return (
    <div className="rounded bg-zinc-700 p-6 flex flex-col gap-6">
      <div className="w-full flex items-center justify-between border-b border-zinc-500">
        <div>
          <b className="mr-1">
            {numbersOfBets} {numbersOfBets && numbersOfBets > 1 ? 'apostas' : 'aposta'}
          </b>
        </div>

        <h4 className="border-b-4 border-green-500 px-4 py-4 font-semibold">{formatCentsToBRL(Number(sumOfBets ?? 0))}</h4>
      </div>


      <table className="shadow rounded-xl overflow-hidden">
        <thead className="bg-zinc-800 p-2 text-xs">
          <tr>
            <th className="text-left p-3 w-2/5">Jogador</th>
            <th className="text-left p-3">Aposta</th>
            <th className="text-left p-3">Multiplicador</th>
            <th className="text-right p-3">Lucro</th>
          </tr>
        </thead>
        <tbody className="text-xs divide-y divide-zinc-600 text-zinc-400">
          {bets?.slice(0, 49).map((bet) => (
            <tr key={bet.id} className={`${bet.win ? 'bg-green-500/20' : game?.status == 'crashed' ? 'bg-red-500/20' : ''}`}>
              <td className="text-xs p-4 w-2/5">{bet?.name}</td>
              <td className="text-xs p-4">{formatCentsToBRL(bet?.bet ?? 1)}</td>
              <td className="text-xs p-4">{bet?.multiplier ?? '-'}</td>
              <td className="text-xs text-right p-4">{bet?.profit ? formatCentsToBRL(bet?.profit) : '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div >
  )
}