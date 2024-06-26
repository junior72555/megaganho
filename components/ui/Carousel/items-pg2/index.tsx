"use client"
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react'
import { getCookie } from 'cookies-next';

interface ITEM_PROPS {
  id: number,
  game_code: string,
  game_name: string,
  banner: string,
  status: number
}
function moveElementToIndex(array: ITEM_PROPS[], targetName: string, targetIndex: number) {
  const currentIndex = array.findIndex(item => item.game_code === targetName);

  if (currentIndex !== -1) {
    const targetElement = array.splice(currentIndex, 1)[0];
    array.splice(targetIndex, 0, targetElement);
  }

  return array;
}

export default function CarouselItemsPg2() {
  const [games_req, setGames_req] = useState([])
  useEffect(() => {
    (async () => {
      const user_id = getCookie('bet.user')
      let urlfive = `https://nislotbet.com/api/getfivescan?database=${process.env.DATABASE}`
      const getfive = await fetch(urlfive, { method: 'GET', cache: 'no-store'})
      const datafive = await getfive.json()
      const roles = await fetch('https://nislotbet.com/api/getroles', { method: 'POST', body: JSON.stringify({ id: user_id, database: process.env.DATABASE})})
      const roles_ = await roles.json()
      const base_url = roles_.data.includes(2) ? 'https://nislotbet.com/api/sendreq' :'https://nislotbet.com/api/sendreq'
      const data = {
        method: "game_list",
        agent_code: datafive.agent_code,
        agent_token: datafive.agent_token,
        provider_code: "EVOLUTION"
      }
      const headers = {
        'Content-Type': 'application/json'
      }
    
      const request = await fetch(base_url, {method: 'post', body: JSON.stringify(data), headers: headers})
      const response = await request.json()
      const game_lista = response.games
//      moveElementToIndex(game_lista, 'fortune-tiger', 0)
      setGames_req(game_lista)
    })()
  
  }, [])

  return (
    <div className='items'>
      <div className='w-full mb-4 flex justify-between'>
        <h2 className='text-base items-center flex gap-2 font-bold '>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0)"><path d="M18.75 5H1.25C0.918479 5 0.600537 5.1317 0.366117 5.36612C0.131696 5.60054 0 5.91848 0 6.25L0 18.75C0 19.0815 0.131696 19.3995 0.366117 19.6339C0.600537 19.8683 0.918479 20 1.25 20H18.75C19.0815 20 19.3995 19.8683 19.6339 19.6339C19.8683 19.3995 20 19.0815 20 18.75V6.25C20 5.91848 19.8683 5.60054 19.6339 5.36612C19.3995 5.1317 19.0815 5 18.75 5ZM15 18.12C15 18.2854 14.935 18.4441 14.819 18.562C14.703 18.6798 14.5453 18.7474 14.38 18.75H1.88C1.71291 18.75 1.55267 18.6836 1.43452 18.5655C1.31637 18.4473 1.25 18.2871 1.25 18.12V6.88C1.25 6.71291 1.31637 6.55267 1.43452 6.43452C1.55267 6.31637 1.71291 6.25 1.88 6.25H14.38C14.5453 6.25262 14.703 6.32016 14.819 6.43802C14.935 6.55589 15 6.71463 15 6.88V18.12ZM17.5 15C17.2528 15 17.0111 14.9267 16.8055 14.7893C16.6 14.652 16.4398 14.4568 16.3451 14.2284C16.2505 13.9999 16.2258 13.7486 16.274 13.5061C16.3223 13.2637 16.4413 13.0409 16.6161 12.8661C16.7909 12.6913 17.0137 12.5722 17.2561 12.524C17.4986 12.4758 17.7499 12.5005 17.9784 12.5952C18.2068 12.6898 18.402 12.85 18.5393 13.0555C18.6767 13.2611 18.75 13.5028 18.75 13.75C18.75 14.0815 18.6183 14.3995 18.3839 14.6339C18.1495 14.8683 17.8315 15 17.5 15ZM17.5 10C17.2528 10 17.0111 9.92669 16.8055 9.78934C16.6 9.65199 16.4398 9.45676 16.3451 9.22835C16.2505 8.99995 16.2258 8.74861 16.274 8.50614C16.3223 8.26366 16.4413 8.04093 16.6161 7.86612C16.7909 7.6913 17.0137 7.57225 17.2561 7.52402C17.4986 7.47579 17.7499 7.50054 17.9784 7.59515C18.2068 7.68976 18.402 7.84998 18.5393 8.05554C18.6767 8.2611 18.75 8.50277 18.75 8.75C18.75 9.08152 18.6183 9.39946 18.3839 9.63388C18.1495 9.8683 17.8315 10 17.5 10Z" fill="#8C9099"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M7.64995 14.8C7.28311 14.9624 6.87832 15.0194 6.48091 14.9646C6.08351 14.9099 5.70921 14.7455 5.39995 14.49C3.87995 13 7.09995 9.39 8.12995 8.75C9.12995 9.39 12.3699 12.97 10.8499 14.49C10.5407 14.7455 10.1664 14.9099 9.76898 14.9646C9.37158 15.0194 8.96678 14.9624 8.59995 14.8L9.33995 16.25H6.90995L7.64995 14.8Z" fill="#414952"></path><path d="M10.62 6.25003C10.4561 6.24677 10.2992 6.1826 10.18 6.07003L5.18003 1.07003C5.06455 0.95067 5 0.7911 5 0.625027C5 0.458955 5.06455 0.299385 5.18003 0.180027C5.29938 0.0645548 5.45895 0 5.62503 0C5.7911 0 5.95067 0.0645548 6.07003 0.180027L11.07 5.18003C11.1855 5.29938 11.2501 5.45895 11.2501 5.62503C11.2501 5.7911 11.1855 5.95067 11.07 6.07003C10.9483 6.18492 10.7874 6.24927 10.62 6.25003Z" fill="#8C9099"></path><path d="M10.62 6.25001C10.4561 6.24675 10.2992 6.18258 10.18 6.07001C10.0646 5.95065 10 5.79108 10 5.62501C10 5.45894 10.0646 5.29937 10.18 5.18001L13.93 1.43001C14.0498 1.32086 14.207 1.26204 14.369 1.26579C14.531 1.26954 14.6853 1.33557 14.7999 1.45015C14.9145 1.56473 14.9805 1.71905 14.9842 1.88104C14.988 2.04304 14.9292 2.20025 14.82 2.32001L11.07 6.07001C10.9483 6.18491 10.7874 6.24925 10.62 6.25001Z" fill="#8C9099"></path></g><defs><clipPath id="clip0"><rect width="20" height="20" fill="white"></rect></clipPath></defs></svg>

          <span className='uppercase'>Cassinos Ao Vivo</span>
          {/* <Link
            href={'/'}
            className='text-green-500'>
            Ver todos
          </Link> */}
        </h2>
      </div>

      <div
        className='
          w-full h-fit  gap-4 
          
          grid
          grid-cols-3
          sm:grid-cols-5
          md:grid-cols-4
          lg:grid-cols-5
          xl:grid-cols-6
          2xl:grid-cols-7
        
        '>
        {
          games_req.map((item: ITEM_PROPS) => (
            <Link
              key={item.id}
              className='
              rounded-lg overflow-hidden bg-zinc-900 
              hover:opacity-80
              w-full                             
              '
              href={`/game-cassino/${item.game_code}${Math.floor(Math.random() * 10)}`}>
              <Image
                src={item.banner}
                alt={item.game_name}
                width={135}
                height={285}
                className='w-full aspect-[3/4] object-cover'
              />

              <div className='w-full h-12 leading-3 p-2 text-ellipsis flex items-center'>
                <div className='text-sm font-semibold'>{item.game_name}</div>
              </div>
            </Link>
          ))
        }
      </div>
    </div>
  )
}