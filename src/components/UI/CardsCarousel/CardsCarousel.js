// import { useRef, useState, useEffect } from 'react';

import { TripCard } from 'components/UI';

// import { ArrowRightIcon, ArrowLeftIcon } from '@heroicons/react/outline';

const CardsCarousel = ({ Packages, withArrows }) => {
  // const parentRef = useRef(null);
  // const [isArrowsShown, setIsArrowsShown] = useState(false);

  // const scrollHandler = xOffset => {
  //   if (parentRef.current) {
  //     parentRef.current.scrollBy(xOffset, 0);
  //   }
  // };

  // useEffect(() => {
  //   const theRef = parentRef.current;
  //   if (theRef) {
  //     const totalWidth = theRef.scrollWidth;
  //     // const visibleWidth = theRef.offsetWidth;

  //     const resizeObserver = new ResizeObserver(entries => {
  //       for (let entry of entries) {
  //         if (entry.borderBoxSize) {
  //           const borderBoxSize = Array.isArray(entry.borderBoxSize)
  //             ? entry.borderBoxSize[0]
  //             : entry.borderBoxSize;
  //           // console.log(borderBoxSize);

  //           console.log({ inline: borderBoxSize.inlineSize, totalWidth });

  //           if (borderBoxSize.inlineSize < totalWidth) {
  //             console.log(' setting ⤴️ ⤵️ ', true);
  //             setIsArrowsShown(true);
  //           } else {
  //             console.log(' setting ⤴️ ⤵️ ', false);
  //             setIsArrowsShown(false);
  //           }
  //         } else {
  //           console.log('In else', borderBoxSize);

  //           if (entry.contentRect.width < totalWidth) {
  //             setIsArrowsShown(true);
  //           } else {
  //             setIsArrowsShown(false);
  //           }
  //         }
  //       }
  //     });

  //     resizeObserver.observe(theRef);

  //     return () => resizeObserver.unobserve(theRef);
  //   }
  // }, []);

  return (
    <div className="relative">
      {/* {withArrows ? (
        <div
          className={`px-5 absolute top-1/3 w-full z-10 flex items-center justify-between ${
            isArrowsShown ? '' : 'hidden'
          }`}
        >
          <button
            type="button"
            className="p-3 rounded-full bg-[#8b78eb] text-white shadow-lg"
            onClick={() => scrollHandler(-288)}
          >
            <ArrowLeftIcon className="h-5 w-5" />
          </button>

          <button
            type="button"
            className="p-3 rounded-full bg-[#8b78eb] text-white shadow-lg"
            onClick={() => scrollHandler(288)}
          >
            <ArrowRightIcon className="h-5 w-5" />
          </button>
        </div>
      ) : null} */}

      <div
        // ref={parentRef}
        className="relative px-3 md:px-8 lg:px-16 pb-3 flex gap-4 overflow-x-auto scroll-smooth snap-x"
      >
        {Packages?.map(Pkg => (
          <TripCard
            key={Pkg?.PkgId}
            additionalClasses="w-72"
            imgAspectRatio="aspect-[10/6]"
            PkgDetails={Pkg}
          />
        ))}
      </div>
    </div>
  );
};

export default CardsCarousel;
