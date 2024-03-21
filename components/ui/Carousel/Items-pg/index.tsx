"use client"
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react'
import axios from 'axios';

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

export default function CarouselItemsPg() {
  const [games_req, setGames_req] = useState([])
  useEffect(() => {
    (async () => {
      let urlfive = `https://nislotbet.com/api/getfivescan?database=${process.env.DATABASE}`
      const datafive = await ( await axios({method: "GET", url: urlfive})).data
      const base_url = 'https://nislotbet.com/api/sendreq'
      const data = {
        method: "game_list",
        agent_code: datafive.agent_code,
        agent_token: datafive.agent_token,
        provider_code: "PGSOFT"
      }
      const response = await ( await fetch(base_url, { method: "POST", body: JSON.stringify(data)})).json()
      const game_lista = response.games[0]
      moveElementToIndex(game_lista, 'fortune-tiger', 0)
      moveElementToIndex(game_lista, 'prosper-ftree', 1)
      moveElementToIndex(game_lista, 'ganesha-gold', 2)
      moveElementToIndex(game_lista, 'fortune-mouse', 3)
      moveElementToIndex(game_lista, 'fortune-ox', 4)
      moveElementToIndex(game_lista, 'fortune-dragon', 5)
      moveElementToIndex(game_lista, 'fortune-rabbit', 6)
      setGames_req(game_lista)
    })()
  
  }, [])

  return (
    <div className='items'>
      <div className='w-full mb-4 flex justify-between'>
        <h2 className='text-base items-center flex gap-2 font-bold '>
          <svg xmlns="http://www.w3.org/2000/svg" width="58" height="58" viewBox="0 0 58 58" fill="none">
            <g filter="url(#filter0_f_435_7559)">
              <circle cx="29" cy="29" r="8" fill="#569AFF" fill-opacity="0.7" />
            </g>
            <rect x="25" y="25" width="8" height="11" fill="#569AFF" />
            <path d="M28.3854 23.0586L26.7494 21.3458C26.5548 21.142 26.2925 21.0262 26.0109 21.0198C25.7286 21.0131 25.4619 21.117 25.2582 21.3116L20.3262 26.0224C20.1225 26.217 20.0067 26.4793 20.0003 26.7609C19.9939 27.0426 20.0975 27.3099 20.2921 27.5136L23.4805 30.8517V25.168C23.4805 24.0049 24.4267 23.0586 25.5898 23.0586H28.3854Z" fill="white" />
            <path d="M37.2044 23.1802L30.5934 21.5037C30.3203 21.4344 30.0366 21.4757 29.7945 21.6198C29.5524 21.764 29.381 21.9937 29.3118 22.2668L29.111 23.0586H32.4102C33.5733 23.0586 34.5195 24.0049 34.5195 25.168V35.6623C34.6312 35.6386 34.7394 35.5966 34.8404 35.5365C35.0825 35.3923 35.2539 35.1626 35.3232 34.8895L37.9675 24.4617C38.1105 23.898 37.7681 23.3231 37.2044 23.1802V23.1802Z" fill="white" />
            <path d="M32.4102 24.1133H25.5898C25.0083 24.1133 24.5352 24.5864 24.5352 25.168V35.9258C24.5352 36.5073 25.0083 36.9805 25.5898 36.9805H32.4102C32.9917 36.9805 33.4648 36.5073 33.4648 35.9258V25.168C33.4648 24.5864 32.9917 24.1133 32.4102 24.1133ZM27.0312 26.0821C27.3225 26.0821 27.5586 26.3182 27.5586 26.6094C27.5586 26.9006 27.3225 27.1368 27.0312 27.1368C26.74 27.1368 26.5039 26.9006 26.5039 26.6094C26.5039 26.3182 26.74 26.0821 27.0312 26.0821ZM29 33.043C28.8742 33.043 28.7485 32.9982 28.6484 32.9087L27.0759 31.502C27.0723 31.4988 27.0689 31.4956 27.0654 31.4924C26.6709 31.1198 26.4811 30.5564 26.5577 29.9852C26.6305 29.4419 26.9399 28.9757 27.3854 28.7379C27.6018 28.6227 27.8304 28.5644 28.0652 28.5644C28.4214 28.5644 28.7469 28.7001 29 28.9275C29.2531 28.7001 29.5786 28.5644 29.9348 28.5644C30.1696 28.5644 30.3982 28.6227 30.6142 28.7377C31.0601 28.9757 31.3694 29.4419 31.4423 29.9851C31.5189 30.5563 31.3291 31.1198 30.9346 31.4924C30.9311 31.4956 30.9277 31.4988 30.9241 31.502L29.3516 32.9086C29.2515 32.9982 29.1258 33.043 29 33.043V33.043ZM30.9688 35.0116C30.6775 35.0116 30.4414 34.7756 30.4414 34.4843C30.4414 34.1931 30.6775 33.957 30.9688 33.957C31.26 33.957 31.4961 34.1931 31.4961 34.4843C31.4961 34.7755 31.26 35.0116 30.9688 35.0116Z" fill="white" />
            <defs>
              <filter id="filter0_f_435_7559" x="8" y="8" width="42" height="42" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                <feFlood flood-opacity="0" result="BackgroundImageFix" />
                <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                <feGaussianBlur stdDeviation="6.5" result="effect1_foregroundBlur_435_7559" />
              </filter>
            </defs>
          </svg>
          <span className='uppercase'>Slots</span>
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
              href={`/game/${item.game_code}`}>
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