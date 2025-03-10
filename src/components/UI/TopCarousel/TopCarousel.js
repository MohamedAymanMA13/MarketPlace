import { useState, useEffect } from 'react';

import {
  CarouselProvider,
  Slider,
  Slide,
  Image,
  Dot,
  ButtonBack,
  ButtonNext,
} from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import Link from 'next/link';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/outline';
import { useTranslation } from 'next-i18next';

const TopCarousel = ({ Packages }) => {
  const { t } = useTranslation();
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % Packages?.length);
    }, 5000); // Change slide every 10 seconds

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [Packages?.length]);

  return (
    <CarouselProvider
      naturalSlideWidth={1366}
      totalSlides={Packages?.length}
      visibleSlides={1}
      isIntrinsicHeight={true}
      currentSlide={currentSlide} // Control the current slide
    >
      <div className="">
        <Slider>
          
          {Packages?.map((pkg, i) => (
            <Slide key={pkg?.PkgId} index={i}>
              <Image
                isBgImage
                tag="div"
                src={pkg?.PkgPhoto || '/bg2.jpg'}
                alt={`${pkg?.PkgTitle} cover`}
                className="aspect-[12/10] sm:aspect-[21/10]"
              >
                <div className="ltr:pl-10 ltr:sm:pl-24 ltr:md:pl-[41%] rtl:pr-10 rtl:sm:pr-24 rtl:md:pr-[41%] bg-black/30 h-full w-full text-white font-medium flex flex-col justify-center">
                  <p className="md:text-2xl lg:text-3xl">{pkg?.PkgTitle}</p>
                  <h2 className="text-3xl md:text-3xl lg:text-5xl font-bold uppercase">
                    {pkg?.PkgLocation}
                  </h2>
                  <Link href={`/packages/${pkg?.PkgId}`}>
                    <a className="mt-3 py-3 px-7 md:px-8 lg:px-10 block w-max font-medium text-sm md:text-base lg:text-base bg-white text-main rounded-md">
                      {t('Book & Enjoy it Now!')}
                    </a>
                  </Link>
                </div>
              </Image>
            </Slide>
          ))}
        </Slider>

        <ButtonBack
          className="absolute top-1/2"
          onClick={() =>
            setCurrentSlide((prevSlide) =>
              prevSlide === 0 ? Packages?.length - 1 : prevSlide - 1
            )
          }
        >
          <ChevronLeftIcon className="w-8 h-8 md:w-10 md:h-10 text-white ltr:rotate-0 rtl:rotate-180" />
        </ButtonBack>
        <ButtonNext
          className="absolute top-1/2 ltr:right-0 rtl:left-0"
          onClick={() =>
            setCurrentSlide((prevSlide) => (prevSlide + 1) % Packages?.length)
          }
        >
          <ChevronRightIcon className="w-8 h-8 md:w-10 md:h-10 text-white ltr:rotate-0 rtl:rotate-180" />
        </ButtonNext>

        <div className="absolute bottom-2 left-1/2 mx-auto flex gap-2 items-center justify-between w-max max-w-xs">
          {Packages?.map((pkg, i) => (
            <Dot
              key={pkg?.PkgId}
              slide={i}
              disabled={false}
              className={`w-3 h-3 rounded-full ${
                currentSlide === i ? 'bg-white' : 'bg-gray-300'
              }`}
              onClick={() => setCurrentSlide(i)}
            />
          ))}
        </div>
      </div>
    </CarouselProvider>
  );
};

export default TopCarousel;
