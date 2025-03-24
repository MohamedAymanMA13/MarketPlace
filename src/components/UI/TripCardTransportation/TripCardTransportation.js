import { StarRating } from "components/UI";
import { moneyRenderer } from "utils/helpers/general.helpers";
import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
// import PropTypes from 'prop-types';

const TripCardTransportation = ({
  additionalClasses,
  imgAspectRatio,
  PkgDetails,
  children,
  startDate,
  endDate,
}) => {
  const { t } = useTranslation();
  const { locale } = useRouter();

  const getStarRating = (rating) => {
    const match = rating?.match(/(\d+)\s*Star/);
    return match ? parseInt(match[1], 10) : 0; // Default to 0 if no match found
  };

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
    return ` ${formattedDate} , ${formattedTime}`;
  };
  console.log(PkgDetails, "PkgDetails");
  const PkgCurrency = "EGP";

  return (
    <div
      className={`relative bg-white rounded-md shadow-md overflow-hidden flex-shrink-0 snap-center flex flex-col ${additionalClasses}`}
    >
      {/* <Link href={`/transportationpackages/${PkgDetails?.Id}`}>
        <a className={`block relative ${imgAspectRatio}`}>
          <Image
            alt={`${PkgDetails?.Name || 'Transportation'} cover`}
            src={`http://gammats.com:7009/be/${PkgDetails?.Photo}` || '/transportationcards.jpg'}
            layout="fill"
            className="w-full h-full object-cover"
            priority={true}
            onError={(e) => {
              e.target.src = '/transportationcards.jpg';
            }}
          />
        </a>
      </Link> */}

      <div className="p-4 flex flex-col flex-grow">
        <div>
          <StarRating
            filledStars={getStarRating(PkgDetails?.ProperteyRating)}
          />
          <p className="font-bold first-letter:uppercase mt-2">
            {PkgDetails?.CompanyName}
          </p>

          {/*
          <p className="mt-2 text-sm font-normal">
            {locale === 'ar'
              ? new Date(PkgDetails?.FromDt).toLocaleDateString('ar-EG') +
                ' - ' +
                new Date(PkgDetails?.ToDt).toLocaleDateString('ar-EG')
              : format(new Date(PkgDetails?.FromDt), 'dd/LL/uuuu') +
                ' - ' +
                format(new Date(PkgDetails?.ToDt), 'dd/LL/uuuu')}
          </p>
          */}
        </div>

        <div className="mt-auto px-1">
          <div className="my-1 flex items-center justify-between">
            <p className="">
              <span className="font-semibold">From City :</span>{" "}
              {PkgDetails?.FromCityName}
            </p>
            <p>
              <span className="font-semibold">To City :</span>{" "}
              {PkgDetails?.ToCityName}
            </p>
          </div>
          <div className="my-1 flex items-center justify-between">
            <p className="">
              <span className="font-semibold">Brand :</span> {PkgDetails?.Brand}
            </p>
          </div>
          <div className="my-1 flex items-center justify-between">
            <p className="font-semibold">Departure </p>
            <p>{formatDateTime(PkgDetails?.DepartureDateTime)}</p>
          </div>
          <div className="my-1 flex items-center justify-between">
            <p className="font-semibold">Arrival </p>
            <p>{formatDateTime(PkgDetails?.ArrivalDateTime)}</p>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <div className="text-copy text-sm flex items-center gap-1">
              {/* <EyeIcon className="h-5 w-5" /> */}
              {/* <span>{PkgDetails?.views}</span> */}
            </div>
            <p className="text-main text-lg font-bold">
              {moneyRenderer(locale, PkgCurrency, PkgDetails?.Price)}
            </p>
          </div>
        </div>
        <Link href={`/transportationpackages/${PkgDetails?.Id}`}>
          <a className="block py-2 mt-4 w-full bg-main text-white font-medium text-sm text-center rounded-md">
            {t("Book Now")}
          </a>
        </Link>
      </div>

      {children}
    </div>
  );
};

export default TripCardTransportation;
