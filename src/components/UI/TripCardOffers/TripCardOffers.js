// TODO: update the placeholder image below

import { StarRating } from "components/UI";

import { moneyRenderer } from "utils/helpers/general.helpers";

import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { format } from "date-fns";
import { EyeIcon } from "@heroicons/react/outline";
import { useEffect, useState } from "react";
// import PropTypes from 'prop-types';

const TripCard = ({
  additionalClasses,
  imgAspectRatio,
  PkgDetails,
  children,
}) => {
  const { t } = useTranslation();
  const { locale } = useRouter();
  const PkgCurrency = "EGP";
  const formatDateTime = (dateTime) => {
    const date = new Date(dateTime);
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    const formattedDate = date
      .toLocaleDateString(undefined, options)
      .replace(/\//g, "-");
    const formattedTime = date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
    return ` ${formattedDate}`;
  };
  console.log(
    "%csrccomponentsUITripCardOffersTripCardOffers.js:23 PkgDetails",
    "color: #007acc;",
    PkgDetails
  );
  const getStarRating = (rating) => {
    return rating;
  };

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [hoveredCardIndex, setHoveredCardIndex] = useState(null);

  useEffect(() => {
    const imageCount = PkgDetails?.HotelDetails?.Paths.length || 0;
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imageCount);
    }, 5000);

    return () => clearInterval(interval);
  }, [PkgDetails?.HotelDetails?.Paths]);

  return (
    <div
      className={`relative bg-white rounded-md shadow-md overflow-hidden flex-shrink-0 snap-center ${additionalClasses}`}
      onMouseEnter={() => setHoveredCardIndex(PkgDetails?.PkgId)}
      onMouseLeave={() => setHoveredCardIndex(null)}
    >
      <Link href={`/packages/${PkgDetails?.PkgId}`}>
        <a className={`block relative ${imgAspectRatio}`}>
          <Image
            alt={`${PkgDetails?.PkgTitle} cover`}
            src={
              hoveredCardIndex === PkgDetails?.PkgId
                ? `http://gammats.com:7010/be/${
                    PkgDetails?.HotelDetails?.Paths[
                      (currentImageIndex + 1) %
                        PkgDetails?.HotelDetails?.Paths.length
                    ]
                  }`
                : `http://gammats.com:7010/be/${PkgDetails?.HotelDetails?.Paths[0]}` ||
                  "/bg3.jpg"
            }
            layout="fill"
            className="w-full h-full object-cover"
          />
        </a>
      </Link>

      <div className="p-4 text-copy">
        <StarRating
          filledStars={getStarRating(PkgDetails?.HotelDetails?.Rating)}
        />
        <p className="font-bold first-letter:uppercase">
          {PkgDetails?.HotelDetails?.Name}
        </p>

        <p className="">
          {PkgDetails?.HotelDetails?.CityName} ,{" "}
          {PkgDetails?.HotelDetails?.CountryName}
        </p>
        {/* <p className="">
          <span className='font-semibold'>Offer end</span> {formatDateTime(PkgDetails?.OfferDetails?.EndDate)}
        </p> */}
        <div className="mt-4 flex items-center justify-between">
          <p className="text-main text-lg font-bold">
            {moneyRenderer(
              locale,
              PkgCurrency,
              PkgDetails?.OfferDetails?.StartingPrice
            )}
          </p>

          <div className="text-copy text-sm flex items-center gap-1">
            <EyeIcon className="h-5 w-5" />
            <span>{PkgDetails?.views}</span>
          </div>
        </div>

        <Link href={`/packages/${PkgDetails.PkgId}`}>
          <a className="block py-2 mt-4 w-full bg-main text-white font-medium text-sm text-center rounded-md">
            {t("Book Now")}
          </a>
        </Link>
      </div>

      {children}
    </div>
  );
};

// TripCard.propTypes = {
//   additionalClasses: PropTypes.string,
//   imgAspectRatio: PropTypes.string.isRequired,
//   pkgDetails: PropTypes.exact({
//     pkgId: PropTypes.number,
//     pkgTitle: PropTypes.string,
//     fkPackageTypeId: PropTypes.number,
//     fromDt: PropTypes.string,
//     toDt: PropTypes.string,
//     noOfNights: PropTypes.number,
//     pkgClass: PropTypes.number,
//     pkgPrice: PropTypes.number,
//     pkgCurrency: PropTypes.string,
//     pkgPhoto: PropTypes.string,
//     pkgDetails: PropTypes.string,
//     pkgLocation: PropTypes.string,
//     isFav: PropTypes.bool,
//   }).isRequired,
// };

export default TripCard;
