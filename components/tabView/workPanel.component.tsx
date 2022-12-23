import React from 'react'
import { Pagination, A11y } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/css'
import 'swiper/css/pagination'
import { Work } from '@prisma/client'
import ReactPlayer from 'react-player'
import Image from 'next/legacy/image'

interface Props {
  works: Work[];
  className?: string;
}

const WorkPanel: React.FC<Props> = ({
  works,
}) => {
  return (
    <Swiper
      modules={[Pagination, A11y]}
      pagination={{clickable: true}}
      spaceBetween={0}
      slidesPerView={1}
      onSlideChange={() => console.log('slide change')}
      onSwiper={swiper => console.log(swiper)}
      className='h-72'>
      {works ? 
        works.map(({id, url}) => {
          const playable = ReactPlayer.canPlay(url)
          console.log(playable, url)
          
          return (
            <SwiperSlide key={id}>
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
                      layout="fill"
                      alt="This is a carousel slide"
                      className='block w-full h-auto object-cover'
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
