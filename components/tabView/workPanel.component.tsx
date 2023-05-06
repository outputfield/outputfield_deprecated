import React from 'react'
import { Link } from '@prisma/client'
import ReactPlayer from 'react-player'
import Image from 'next/legacy/image'
import { A11y } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Scrollbar, FreeMode } from 'swiper'
import 'swiper/css'

interface Props {
  works: Link[];
  className?: string;
}

const WorkPanel: React.FC<Props> = ({
  works,
}) => {
  return (
    <Swiper
      modules={[A11y, Scrollbar, FreeMode]}
      freeMode={true}
      spaceBetween={30}
      slidesPerView={'auto'}
      scrollbar={{
        hide: true,
      }}
      className='h-3/5'
    >
      {works ? 
        works.map(({id, url}) => {
          const playable = ReactPlayer.canPlay(url)          
          return (
            <SwiperSlide key={id} className='!h-auto !w-3/4'>
              {
                playable ?
                  (
                    <ReactPlayer
                      url={url}
                      width='100%'
                      height='100%'
                    />
                  ) : (
                    <Image
                      src={url}
                      width={300}
                      height={300}
                      alt="This is a carousel slide"
                      className='block object-contain'
                    />
                  )
              }      
            </SwiperSlide>
          )
        })
        : 'No works found'}
    </Swiper>
  )
}

export default WorkPanel
