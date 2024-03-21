"use client"

import { useDouble } from "@/contexts/Games/DoubleContext";
import Image from "next/image";

export default function LastGamesDouble() {
  const { lastGames } = useDouble()

  const color = [
    { id: 0, color: 'white' },
    { id: 1, color: 'green' },
    { id: 2, color: 'green' },
    { id: 3, color: 'green' },
    { id: 4, color: 'green' },
    { id: 5, color: 'green' },
    { id: 6, color: 'green' },
    { id: 7, color: 'green' },
    { id: 8, color: 'black' },
    { id: 9, color: 'black' },
    { id: 10, color: 'black' },
    { id: 11, color: 'black' },
    { id: 12, color: 'black' },
    { id: 13, color: 'black' },
    { id: 14, color: 'black' },
  ];

  return (
    <>
      <div className="w-full flex items-center gap-2 overflow-hidden">
        <h3 className="hidden lg:flex h-fit text-sm font-semibold uppercase">Anterior</h3>
        {lastGames.map((game) => (
          <div
            key={game.hash}
            className={`
                ${color[game.winning_number].color === 'green' ? 'bg-green-500' : color[game.winning_number].color === 'black' ? 'bg-black' : 'bg-white'}      
                rounded
            `}
          >
            {
              game.winning_number == 0 ?
                <div className='drop-shadow-xl flex items-center justify-center w-8 h-8 m-1'>
                  <Image src={`/${process.env.NEXT_PUBLIC_SITE_NAME}/gema.png`} width={40} height={40} alt='' />
                </div>
                :
                <span className={`
                  ${color[game.winning_number].color === 'green' ? 'border-zinc-600 text-zinc-600' : 'border-white text-white'}
                  m-2 border-2 h-6 w-6 text-xs font-bold rounded-full flex items-center justify-center
                `}>
                  {game.winning_number}
                </span>
            }
          </div>
        ))}
      </div>
    </>
  )
}