// src/components/HpBanner.js

import React from 'react';
import Slider from 'react-slick';

const HpBanner = () => {
  const slides = [
    {
      img: "https://www.royalroadcdn.com/public/blog/a-price-update-AACA_vNKbxU.jpg?time=1719852695",
      title: "A Price Update",
      description: "A price change for new premium subscriptions and internal advertisements",
      link: "//www.royalroad.com/blog/69/a-price-update",
    },
    {
      img: "https://www.royalroadcdn.com/public/blog/the-community-magazine-contest-is-back-AADAreMZShU.jpg?time=1717356806",
      title: "We have a Winner!",
      description: "The Community Magazine Contest June-July Edition",
      link: "//www.royalroad.com/blog/67/we-have-a-winner",
    },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 6000,
    cssEase: "linear",
  };

  return (
    <div className="relative w-full mb-8">
      <Slider {...settings}>
        {slides.map((slide, index) => (
          <div key={index} className="relative w-full h-60 sm:h-72 md:h-80 lg:h-96">
            <img
              src={slide.img}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center px-4 sm:px-8">
              <div className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-black bg-opacity-50 px-4 py-6 sm:py-8 sm:px-8 text-center sm:text-left">
                <h2 className="text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-2">
                  {slide.title}
                </h2>
                <p className="text-white text-sm sm:text-base md:text-lg lg:text-xl mb-4">
                  {slide.description}
                </p>
                <a
                  href={slide.link}
                  className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition-colors"
                >
                  Learn More
                </a>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default HpBanner;
