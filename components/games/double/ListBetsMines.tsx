"use client"
import { useDouble } from "@/contexts/Games/DoubleContext";
import { Bet } from "@/contexts/Games/DoubleContext/types";
import { formatCentsToBRL } from "@/utils/currency";
import Image from "next/image";

export default function ListBetsMines() {
  const { bets, game } = useDouble()

  const green = bets.filter(bet => bet.bet_color === 'green') as Bet[]

  const sumBetsGreen = green?.reduce((acc, bet) => {
    return acc + (Number(bet.bet) ?? 0)
  }, 0)

  const white = bets.filter(bet => bet.bet_color === 'white') as Bet[]

  const sumBetsWhite = white?.reduce((acc, bet) => {
    return acc + (Number(bet.bet) ?? 0)
  }, 0)

  const black = bets.filter(bet => bet.bet_color === 'black') as Bet[]

  const sumBetsBlack = black?.reduce((acc, bet) => {
    return acc + (Number(bet.bet) ?? 0)
  }, 0)


  return (
    <>
      <div className="rounded bg-zinc-700 p-6 flex flex-col gap-6">
        <div className="w-full flex items-center justify-between border-b border-zinc-500">
          <h4 className="border-b-4 border-green-500 px-4 py-4 text-xs font-semibold">
            APOSTAS
          </h4>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

          <div className="w-full shadow-sm bg-zinc-800 rounded-xl p-2">
            <div className="w-full flex justify-between items-center py-2 px-2 border-b-2 border-zinc-400/50">
              <div className="uppercase text-xs font-semibold">Vitória 2X</div>
              <div className="rounded bg-green-500 h-8 w-8 flex items-center justify-center">
                <div className="w-6 h-6 border-2 border-zinc-600 rounded-full"></div>
              </div>
            </div>

            <div className="w-full flex justify-between items-center mt-1 mb-1 py-3 px-2">
              <div className="uppercase text-xs font-semibold">Total Apostas</div>
              <div className="uppercase text-xs font-semibold">{formatCentsToBRL(sumBetsGreen)}</div>
            </div>

            <table className="w-full shadow rounded-md overflow-hidden">
              <thead className="bg-zinc-700 p-2 text-xs rounded-md">
                <tr>
                  <th className="text-left p-3 w-2/5">Usuário</th>
                  <th className="text-right p-3">Quantia</th>
                </tr>
              </thead>
              <tbody className={`
                ${game?.status == 'finished' && game.winning_color == 'green' ? 'text-green-400' : game?.status == 'finished' ? 'text-red-500' : 'text-zinc-400'}
                text-xs divide-y divide-zinc-600 
              `}>
                {green?.slice(0, 9).map(bet =>
                  <tr key={bet.id} className={``}>
                    <td className="text-xs font-semibold p-3 w-2/5">{bet.name}</td>
                    <td className="text-xs font-semibold p-3 text-right">{formatCentsToBRL(bet.bet)}</td>
                  </tr>
                )}
              </tbody>

            </table>

            <div className="w-full flex justify-between px-4 py-4 border-t-2 border-zinc-400/20 text-xs">
              <div className="text-zinc-400 font-semibold">+{green.length - 10 < 0 ? 0 : green.length - 10} jogadores</div>
            </div>
          </div>

          <div className="w-full shadow-sm bg-zinc-800 rounded-xl p-2">

            <div className="w-full flex justify-between items-center py-2 px-2 border-b-2 border-zinc-400/50">
              <div className="uppercase text-xs font-semibold">Vitória 14X</div>
              <div className="rounded bg-white h-8 w-8 flex items-center justify-center">
                <Image src={`/${process.env.NEXT_PUBLIC_SITE_NAME}/gema.png`} width={26} height={26} alt="" />
              </div>
            </div>

            <div className="w-full flex justify-between items-center mt-1 mb-1 py-3 px-2">
              <div className="uppercase text-xs font-semibold">Total Apostas</div>
              <div className="uppercase text-xs font-semibold">{formatCentsToBRL(sumBetsWhite)}</div>
            </div>

            <table className="w-full shadow rounded-md overflow-hidden">
              <thead className="bg-zinc-700 p-2 text-xs rounded-md">
                <tr>
                  <th className="text-left p-3 w-2/5">Usuário</th>
                  <th className="text-right p-3">Quantia</th>
                </tr>
              </thead>
              <tbody className={`
                ${game?.status == 'finished' && game.winning_color == 'white' ? 'text-green-400' : game?.status == 'finished' ? 'text-red-500' : 'text-zinc-400'}
                text-xs divide-y divide-zinc-600
               `}>
                {white?.slice(0, 9).map(bet =>
                  <tr key={bet.id} className={``}>
                    <td className="text-xs font-semibold p-3 w-2/5">{bet.name}</td>
                    <td className="text-xs font-semibold p-3 text-right">{formatCentsToBRL(bet.bet)}</td>
                  </tr>
                )}
              </tbody>

            </table>
            <div className="w-full flex justify-between px-4 py-4 border-t-2 border-zinc-400/20 text-xs">
              <div className="text-zinc-400 font-semibold">+{white.length - 10 < 0 ? 0 : white.length - 10} jogadores</div>
            </div>
          </div>

          <div className="w-full shadow-sm bg-zinc-800 rounded-xl p-2">

            <div className="w-full flex justify-between items-center py-2 px-2 border-b-2 border-zinc-400/50">
              <div className="uppercase text-xs font-semibold">Vitória 2X</div>
              <div className="rounded bg-black h-8 w-8 flex items-center justify-center">
                <div className="w-6 h-6 border-2 border-white rounded-full"></div>
              </div>
            </div>

            <div className="w-full flex justify-between items-center mt-1 mb-1 py-3 px-2">
              <div className="uppercase text-xs font-semibold">Total Apostas</div>
              <div className="uppercase text-xs font-semibold">{formatCentsToBRL(sumBetsBlack)}</div>
            </div>

            <table className="w-full shadow rounded-md overflow-hidden">
              <thead className="bg-zinc-700 p-2 text-xs rounded-md">
                <tr>
                  <th className="text-left p-3 w-2/5">Usuário</th>
                  <th className="text-right p-3">Quantia</th>
                </tr>
              </thead>
              <tbody className={`
               ${game?.status == 'finished' && game.winning_color == 'black' ? 'text-green-400' : game?.status == 'finished' ? 'text-red-500' : 'text-zinc-400'}
               text-xs divide-y divide-zinc-600
               `}>
                {black?.slice(0, 9).map(bet =>
                  <tr key={bet.id} className={``}>
                    <td className="text-xs font-semibold p-3 w-2/5">{bet.name}</td>
                    <td className="text-xs font-semibold p-3 text-right">{formatCentsToBRL(bet.bet)}</td>
                  </tr>
                )}
              </tbody>

            </table>
            <div className="w-full flex justify-between px-4 py-4 border-t-2 border-zinc-400/20 text-xs">
              <div className="text-zinc-400 font-semibold">+{black.length - 10 < 0 ? 0 : black.length - 10} jogadores</div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}