import React, { useState } from 'react'
import { Link } from '@prisma/client'
import Modal from '@mui/base/Modal'
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

const Backdrop = React.forwardRef<
  HTMLDivElement,
  { open?: boolean; className: string }
>((props, ref) => {
  const { open, className, ...other } = props
  return (
    <div
      className={`
        ${open && 'MuiBackdrop-open'} 
        -z-10
        fixed
        right-0
        bottom-0
        top-0
        left-0
        bg-black
        opacity-50
        ${className} 
      `}
      ref={ref}
      {...other}
    />
  )
})
Backdrop.displayName = 'Backdrop'

const WorkPanel: React.FC<Props> = ({
  works,
}) => {
  const [openImg, setOpenImg] = useState('')
  const handleOpen = (url: string) => setOpenImg(url)
  const handleClose = () => setOpenImg('')

  return (
    <>
      <Modal
        open={openImg !== ''}
        slots={{ backdrop: Backdrop }}
        className={`
          fixed
          z-1300
          right-0
          bottom-0 
          top-0
          left-0 
          flex 
          items-center
          justify-center
        `}
        onClose={handleClose}
        aria-label={openImg}
      >
        <div>
          <Image
            src={openImg}
            width={300}
            height={300}
            alt={openImg}
            className='block object-contain'
          />
        </div>
      </Modal>
      <Swiper
        modules={[A11y, Scrollbar, FreeMode]}
        freeMode={true}
        spaceBetween={30}
        slidesPerView={'auto'}
        scrollbar={{
          hide: true,
        }}
        className={`h-3/5 ${Boolean(openImg) && '!-z-20'}`}
      >
        {works ? 
          works.map(({id, url}) => {
            const playable = ReactPlayer.canPlay(url)          
            return (
              <SwiperSlide key={id} className='!h-auto !w-4/5'>
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
                        onClick={() => handleOpen(url)}
                      />
                    )
                }
              </SwiperSlide>
            )
          })
          : 'No works found'}
      </Swiper>
    </>

  )
}

export default WorkPanel
