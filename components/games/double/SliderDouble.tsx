"use client"
import { useDouble } from '@/contexts/Games/DoubleContext';
import Image from 'next/image';

export default function SliderDouble() {

  const { game } = useDouble()

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

  const list = [0, 11, 5, 10, 6, 9, 7, 8, 1, 14, 2, 13, 3, 12, 4, 0, 11, 5, 10, 6, 9, 7, 8, 1, 14, 2, 13, 3, 12, 4, 0, 11, 5, 10, 6, 9, 7, 8, 1, 14, 2, 13, 3, 12, 4, 0, 11, 5, 10, 6, 9, 7, 8, 1, 14, 2, 13, 3, 12, 4, 0, 11, 5, 10, 6, 9, 7, 8, 1, 14, 2, 13, 3, 12, 4, 0, 11, 5, 10, 6, 9, 7, 8, 1, 14, 2, 13, 3, 12, 4, 0, 11, 5, 10, 6, 9, 7, 8, 1, 14, 2, 13, 3, 12, 4, 0, 11, 5, 10, 6, 9, 7, 8, 1, 14, 2, 13, 3, 12, 4, 0, 11, 5, 10, 6, 9, 7, 8, 1, 14, 2, 13, 3, 12, 4, 0, 11, 5, 10, 6, 9, 7, 8, 1, 14, 2, 13, 3, 12, 4, 0, 11, 5, 10, 6, 9, 7, 8, 1, 14, 2, 13, 3, 12, 4, 0, 11, 5, 10, 6, 9, 7, 8, 1, 14, 2, 13, 3, 12, 4, 0, 11, 5, 10, 6, 9, 7, 8, 1, 14, 2, 13, 3, 12, 4, 0, 11, 5, 10, 6]

  const number = game?.winning_number ?? 99;

  const indexes = list.map((item, index) => {
    if (item == number) {
      return index
    }

    return null
  }).filter(item => item != null)

  const rotate = -104 * (indexes[indexes.length - 2] ?? 30)
  const animateVelocity = indexes.length ? 5000 : 10

  return (
    <>
      <div className='mb-10 mt-10 w-full z-30 overflow-visible px-0 py-1.5 flex items-center justify-center relative h-[96px]'>
        <div className="absolute w-1 -top-5 z-30 left-1/2 bg-white shadow h-[140px] rounded-2xl"></div>

        <div className="w-[104px] flex">
          <div className={`w-[104px] flex transition-transform`} style={{ transitionDuration: animateVelocity + 'ms', transform: 'translate(' + rotate + 'px, 0px)' }}>
            {
              list.map((item, index) => {
                return (
                  <div
                    key={index}
                    className={`w-[104px] px-1 h-[96px] float-right`}>
                    <div className={`
                      ${color[item].color === 'green' ? 'bg-green-500' : color[item].color === 'black' ? 'bg-black' : 'bg-white'}
                      w-[96px] h-[96px] rounded-md flex items-center justify-center font-bold mx-auto
                    `}>
                      {
                        item == 0 ?
                          <span className='drop-shadow-xl'>
                            <Image src={`/${process.env.NEXT_PUBLIC_SITE_NAME}/gema.png`} width={75} height={75} alt='' />
                          </span>
                          :
                          <span className={`
                            ${color[item].color === 'green' ? 'border-zinc-600 text-zinc-600' : 'border-white text-white'}
                            border-4 h-14 w-14 text-xl rounded-full flex items-center justify-center`}>
                            {item}
                          </span>
                      }
                    </div>
                  </div>
                )
              })
            }
          </div>
        </div>
      </div>
    </>
  )
}