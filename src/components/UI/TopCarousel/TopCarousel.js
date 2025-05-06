import { useState, useEffect } from "react";

import {
  CarouselProvider,
  Slider,
  Slide,
  Image,
  Dot,
  ButtonBack,
  ButtonNext,
} from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";
import Link from "next/link";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/outline";
import { useTranslation } from "next-i18next";

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
      className="h-full"
      currentSlide={currentSlide} // Control the current slide
    >
      <div style={{ height: "100%" }} className="">
        <Slider>
          {Packages?.map((pkg, i) => (
            <Slide className="h-full" key={pkg?.Id} index={i}>
              <Image
                isBgImage
                // tag="div"
                src={`http://gammats.com:7010/be/${pkg?.Image}` || "/bg2.jpg"}
                alt={`${pkg?.PkgTitle} cover`}
                className="aspect-[12/10] object-cover h-full sm:aspect-[21/10]"
                style={{ height: "100vh" }}
              ></Image>
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
                currentSlide === i ? "bg-white" : "bg-gray-300"
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
