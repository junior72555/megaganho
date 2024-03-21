"use client"

import { useCrash } from "@/contexts/Games/CrashContext"

export default function LastGamesCrash() {
  const { lastGames } = useCrash()

  return (
    <>
      <div className="w-full flex items-center gap-3 overflow-hidden">
        <h3 className="hidden lg:flex h-fit text-sm font-semibold uppercase">Anterior</h3>
        {lastGames.map((game) => (
          <div
            key={game.hash}
            className={`
              ${game.multiplier > 2 ? 'text-green-500 hover:text-green-600' : 'text-zinc-400 hover:text-zinc-500'}
             bg-zinc-800 cursor-pointer text-xs font-semibold p-2 rounded transition-transform`}>
            {game.multiplier.toFixed(2)}X
          </div>
        ))}
      </div>
    </>
  )
}