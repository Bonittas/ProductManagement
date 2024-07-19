import React, { useState } from 'react';

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const images = [
    '/images/bg2.jpg',

  ];

  const handlePrevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide === 0 ? images.length - 1 : prevSlide - 1));
  };

  const handleNextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide === images.length - 1 ? 0 : prevSlide + 1));
  };

  return (
    <div className=" w-full text-white ">
      <header className=" px-4 shadow-md">
      </header>
      <main className="">
        <div className="relative h-[600px] w-full overflow-hidden">
          <div
            className="absolute top-0 left-0 h-full w-full transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {images.map((image, index) => (
              <div
                key={index}
                className="inline-block h-full w-full bg-cover bg-center relative"
                style={{ backgroundImage: `url(${image})` }}
              >
<div class=" text-white  absolute top-32 left-24 p-8">
  <div class="container mx-auto px-4 text-center">
    <h2 class="text-5xl font-bold mb-4">Discover the Best Products for Your Lifestyle</h2>
    <p class="text-2xl font-bold ">Elevate your everyday with our carefully curated collection.</p>
    <p className='text-md mb-6'>Unlock the Power of Effective Product Management</p>

  </div>
</div>
              </div>
            ))}
          </div>

       
        </div>
      </main>
    </div>
  );
}