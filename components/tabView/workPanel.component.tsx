import React from 'react'
import Work from '../data/work'
import { Pagination, A11y } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import Image from 'next/image'

import 'swiper/css'
import 'swiper/css/pagination'

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
        works.map((work) => {
          return (
            <SwiperSlide key={work.id}>
              <Image
                src={work.link}
                layout="fill"
                alt="This is a carousel slide"
                className='block w-full h-auto object-cover'
              />
            </SwiperSlide>
          )
        })
        : 'No works found'}
    </Swiper>
  )
}

export default WorkPanel
