import React from 'react'
import Work from '../data/work'
import Carousel from '../carousel'

interface Props {
  works: Work[];
  className?: string;
}

export const WorkPanel = ({
  works,
}:Props) => {
  return (
    <Carousel data={works} />
  )
}
