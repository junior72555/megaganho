"use client"
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from "swiper";

import Image from 'next/image';

// Import Swiper styles
import 'swiper/css';
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./styles.css";

export default function CarouselBanner() {
  const carousel = [
    {
      key: 0,
      src: `/${process.env.NEXT_PUBLIC_SITE_NAME}/banner-pix.jpg`,
      alt: 'banner2'
    },
    {
      key: 1,
      src: `/${process.env.NEXT_PUBLIC_SITE_NAME}/banner1.jpg`,
      alt: 'banner0'
    },
    {
      key: 2,
      src: `/${process.env.NEXT_PUBLIC_SITE_NAME}/ft-ox.jpg`,
      alt: 'banner1'
    }
  ];

  return (
    <div className='banner'>
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        centeredSlides={true}
        spaceBetween={0}
        slidesPerView={1}
        loop={true}
        navigation
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        className='w-full max-w-full aspect-[1240/460] rounded-2xl z-10'
      >
        {
          carousel.map((item) => (
            <SwiperSlide key={item.key}>
              <Image
                src={item.src}
                alt={item.alt}
                fill
              />
            </SwiperSlide>
          ))
        }
      </Swiper>
    </div>
  )
}