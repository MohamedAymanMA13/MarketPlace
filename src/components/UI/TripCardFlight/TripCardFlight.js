import { StarRating } from "components/UI";
import { moneyRenderer } from "utils/helpers/general.helpers";
import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
// import PropTypes from 'prop-types';

const TripCardFlight = ({
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

  const PkgCurrency = "EGP";
  console.log(
    "%csrccomponentsUITripCardFlightTripCardFlight.js:26 object",
    "color: #007acc;",
    PkgDetails
  );

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

  return (
    <div
      className={`relative bg-white rounded-md shadow-md overflow-hidden flex-shrink-0 snap-center flex flex-col w-full `}
    >
      <div className="flex flex-col md:flex-row">
        {/* Airline logo and info */}

        {/* Flight details */}
        <div className="flex-grow p-4 border-r border-blue-200 ">
          <div className="py-1">
            <p className="font-bold first-letter:uppercase ">
              {PkgDetails?.CompanyName}
            </p>
          </div>
          <div className="flex justify-between text-main py-1">
            <div>
              <p className="font-semibold">
                {locale === "ar"
                  ? PkgDetails?.FromAirportNameAr
                  : PkgDetails?.FromAirportName}
              </p>
              <p className="text-sm pt-2">{t("Departure at")} </p>
              <p className="text-sm pt-2">
                {formatDateTime(PkgDetails?.DepartureDateTime)}
              </p>
            </div>
            <div className="flex items-center">
              <img className=" w-5" src={"/plane.svg"} alt="plane" />
            </div>
            <div>
              <p className="font-semibold">
                {locale === "ar"
                  ? PkgDetails?.ToAirportNameAr
                  : PkgDetails?.ToAirportName}
              </p>
              <p className="text-sm pt-2">{t("Arrival at")}</p>
              <p className="text-sm pt-2">
                {formatDateTime(PkgDetails?.ArrivalDateTime)}
              </p>
            </div>
          </div>
        </div>

        {/* Price and Booking */}
        <div className="p-4 flex flex-col items-center justify-center bg-blue-50">
          <p className="text-2xl font-semibold text-main">
            {moneyRenderer(locale, PkgCurrency, PkgDetails?.EconomyClassPrice)}
          </p>
          <p className="text-sm text-gray-600">Price Start</p>
          {/* <button className="mt-4 px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700">Check Details & Book</button> */}
          <Link
            href={`/flightpackage/packageId=${PkgDetails?.Id}&ID=${PkgDetails?.Id}&DepartureAirport=${PkgDetails?.FromAirportName}&ArrivalAirport=${PkgDetails?.ToAirportName}&AircraftType=${PkgDetails?.CompanyName}&BusinessClassPrice=${PkgDetails?.BusinessClassPrice}&EconomyClassPrice=${PkgDetails?.EconomyClassPrice}&DepartureDateTime=${PkgDetails?.DepartureDateTime}&ArrivalDateTime=${PkgDetails?.ArrivalDateTime}`}
          >
            <a className="block py-2 px-4 mt-4 w-full bg-main text-white font-medium text-sm text-center rounded-md">
              {t("Check & Book Now")}
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TripCardFlight;
