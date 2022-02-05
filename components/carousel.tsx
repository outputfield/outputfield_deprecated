import React, { useState } from "react";
import Swipe from "react-easy-swipe";
import { useEffect } from "react";
import Image from 'next/image';

type Props = {
  data: string;
  className: string;
};

export default function Carousel({ data, className }: Props) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    setInterval(() => {
      if (!paused) {
        let newSlide = currentSlide === data.length - 1 ? 0 : currentSlide + 1;
        setCurrentSlide(newSlide);
      }
    }, 3000);
  }, []);

  const nextSlide = () => {
    let newSlide = currentSlide === data.length - 1 ? 0 : currentSlide + 1;
    setCurrentSlide(newSlide);
  };

  const prevSlide = () => {
    let newSlide = currentSlide === 0 ? data.length - 1 : currentSlide - 1;
    setCurrentSlide(newSlide);
  };

  return (
    <div className={`mt-8 ${className}`}>
      <div className="max-w-lg h-72 flex overflow-hidden relative">
        <button
          onClick={prevSlide}
          className="absolute left-0 text-3xl inset-y-1/2 text-white cursor-pointer"
        />

        <Swipe onSwipeLeft={nextSlide} onSwipeRight={prevSlide}>
          {data.map((slide, index) => {
            return (
                // TODO: USE NEXT IMAGE HERE
              <Image
                src={slide.link}
                layout="fill"
                alt="This is a carousel slide"
                key={index}
                className={
                  index === currentSlide
                    ? "block w-full h-auto object-cover"
                    : "hidden"
                }
                onMouseEnter={() => setPaused(true)}
                onMouseLeave={() => setPaused(false)}
              />
            );
          })}
        </Swipe>

        <div className="absolute w-full flex justify-center bottom-0">
          {data.map((element, index) => {
            return (
              <div
                className={
                  index === currentSlide
                    ? "h-2 w-2 bg-blue-700 rounded-full mx-2 mb-2 cursor-pointer"
                    : "h-2 w-2 bg-white rounded-full mx-2 mb-2 cursor-pointer"
                }
                key={index}
                onClick={() => setCurrentSlide(index)}></div>
            );
          })}
        </div>

        <button
          onClick={nextSlide}
          className="absolute right-0 text-3xl inset-y-1/2 text-white cursor-pointer"
        />
      </div>
    </div>
  );
}
