"use client"
import { useSwiper, Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';

import Link from 'next/link';
import Image from 'next/image';

// Import Swiper styles
import 'swiper/css';
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./styles.css";

import { useState } from 'react';

export default function CarouselItems() {
  const [swiper, setSwiper] = useState<any>({});

  const carousel = [
    {
      key: 1,
      src: `/${process.env.NEXT_PUBLIC_SITE_NAME}/games/mines.png`,
      alt: 'Mines',
      href: '/mines'
    },
    {
      key: 2,
      src: `/${process.env.NEXT_PUBLIC_SITE_NAME}/games/crash_zinbets.png`,
      alt: 'Crash',
      href: '/crash'
    },
    {
      key: 3,
      src: `/${process.env.NEXT_PUBLIC_SITE_NAME}/games/double_zinbets.png`,
      alt: 'Double',
      href: '/double'
    },
  ];

  return (
    <div className='items'>
      <div className='w-full mb-4 flex justify-between'>
        <h2 className='text-base items-center flex gap-2 font-bold '>
          <svg xmlns="http://www.w3.org/2000/svg" width="58" height="58" viewBox="0 0 58 58" fill="none">
            <g filter="url(#filter0_f_435_7582)">
              <circle cx="29" cy="27" r="8" fill="#569AFF" fill-opacity="0.7" />
            </g>
            <rect x="25" y="22" width="8" height="7" fill="#569AFF" />
            <g clip-path="url(#clip0_435_7582)">
              <path d="M28.9997 20C25.5876 20 22.8122 22.7754 22.8122 26.1875C22.8122 29.5996 25.5876 32.375 28.9997 32.375C32.4107 32.375 35.1872 29.5996 35.1872 26.1875C35.1872 22.7754 32.4107 20 28.9997 20ZM32.2521 25.3123L31.1834 26.651L31.3004 28.4004C31.3139 28.595 31.225 28.7829 31.0641 28.8965C30.9662 28.9651 30.8526 29 30.7379 29C30.6636 29 30.5882 28.9854 30.5185 28.955L28.9997 28.3104L27.4821 28.955C27.3021 29.0315 27.0951 29.0101 26.9365 28.8965C26.7767 28.7829 26.6879 28.595 26.7002 28.4004L26.8172 26.651L25.7485 25.3123C25.6292 25.1638 25.5944 24.9646 25.654 24.7835C25.7136 24.6024 25.861 24.4651 26.0455 24.4168L27.6407 23.9994L28.516 22.5256C28.7185 22.1836 29.281 22.1836 29.4824 22.5256L30.3576 23.9994L31.954 24.4168C32.1373 24.4651 32.2847 24.6035 32.3455 24.7835C32.4062 24.9635 32.3702 25.1626 32.2521 25.3123Z" fill="white" />
              <path d="M22.6716 29.8359L20.0751 34.3438C19.9615 34.5418 19.9783 34.7881 20.1167 34.9681C20.2551 35.1481 20.488 35.2291 20.7085 35.1684L24.0115 34.2808L24.8901 37.5838C24.9486 37.8031 25.1342 37.9663 25.3592 37.9966C25.384 37.9989 25.4098 38 25.4335 38C25.6326 38 25.8193 37.8943 25.9206 37.7188L28.3765 33.4685C25.9363 33.2615 23.8393 31.8519 22.6716 29.8359Z" fill="white" />
              <path d="M37.9255 34.3438L35.3278 29.8359C34.1612 31.8519 32.0631 33.2615 29.623 33.4685L32.0788 37.7188C32.1801 37.8943 32.3668 38 32.566 38C32.5896 38 32.6155 37.9989 32.6391 37.9955C32.8652 37.9651 33.0497 37.802 33.1093 37.5826L33.988 34.2796L37.291 35.1673C37.5115 35.228 37.7432 35.147 37.8827 34.967C38.0222 34.7881 38.038 34.5418 37.9255 34.3438Z" fill="white" />
            </g>
            <defs>
              <filter id="filter0_f_435_7582" x="8" y="6" width="42" height="42" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                <feFlood flood-opacity="0" result="BackgroundImageFix" />
                <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                <feGaussianBlur stdDeviation="6.5" result="effect1_foregroundBlur_435_7582" />
              </filter>
              <clipPath id="clip0_435_7582">
                <rect width="18" height="18" fill="white" transform="translate(20 20)" />
              </clipPath>
            </defs>
          </svg>

          <span className='uppercase'>Originais</span>
          <Link
            href={'/'}
            className='text-green-500'>
            Ver todos
          </Link>
        </h2>

        <div className='flex gap-2'>
          <div
            onClick={() => swiper.slidePrev()}
            className='cursor-pointer w-8 h-6 bg-zinc-500 hover:bg-zinc-600 rounded flex items-center justify-center'>
            <ChevronLeftIcon width={20} height={20} className='text-green-500 font-black' />
          </div>
          <div
            onClick={() => swiper.slideNext()}
            className='cursor-pointer w-8 h-6 bg-zinc-500 hover:bg-zinc-600 rounded flex items-center justify-center'>
            <ChevronRightIcon width={20} height={20} className='text-green-500 font-black' />
          </div>
        </div>
      </div>

      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        onSwiper={setSwiper}
        controller={{ control: swiper }}
        slidesPerView={'auto'}
        spaceBetween={12}
        freeMode={true}
        className='w-full max-w-full z-10'
      >
        {
          carousel.map((item) => (
            <SwiperSlide key={item.key} className='rounded-3xl'>
              <Link href={item.href}>
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                />
              </Link>
            </SwiperSlide>
          ))
        }
      </ Swiper>
    </div>
  )
}