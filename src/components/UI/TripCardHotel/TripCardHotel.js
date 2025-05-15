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
    return rating;
  };

  const PkgCurrency = "EGP";
  return (
    <div
      className={`relative bg-white rounded-md shadow-md overflow-hidden flex-shrink-0 snap-center flex flex-col w-full `}
    >
      <div className="flex w-full flex-col md:flex-row">
        {/* Airline logo and info */}
        <div className="flex-shrink-0 h-[170px] w-full md:w-1/3 ">
          {/* <Link href={`/flightpackage/packageId=${PkgDetails?.AircraftTypeID}&ID=${PkgDetails?.ID}&DepartureAirport=${PkgDetails?.DepartureAirport}&ArrivalAirport=${PkgDetails?.ArrivalAirport}&AircraftType=${PkgDetails?.AircraftType}&BusinessClassPrice=${PkgDetails?.BusinessClassPrice}&EconomyClassPrice=${PkgDetails?.EconomyClassPrice}`}> */}
          <img
            className="h-full w-full object-cover"
            src={
              `http://gammats.com:7009/be/${PkgDetails?.HotelDetails?.Paths[0]}` ||
              "/hotel1.jpg"
            }
            alt={PkgDetails?.HotelDetails?.Name}
          />
          {/* </Link> */}
        </div>

        {/* Flight details */}
        <div className="flex-grow  justify-center p-4 border-r border-blue-200 ">
          <StarRating
            additionalClass="justify-center md:justify-start"
            filledStars={getStarRating(PkgDetails?.HotelDetails?.Rating)}
          />

          <div className="py-2 text-center md:text-start">
            <p className="font-bold first-letter:uppercase ">
              {PkgDetails?.HotelDetails?.Name}
            </p>
          </div>
          <div className=" text-center md:text-start text-main py-1">
            {PkgDetails?.HotelDetails?.CityName} ,{" "}
            {PkgDetails?.HotelDetails?.CountryName}
          </div>

          {/* 
            <div className="mt-4 flex space-x-4 text-gray-600">
              <div className="flex items-center space-x-1">
                <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h7"></path></svg>
                <span className="text-sm">Economy</span>
              </div>
              <div className="flex items-center space-x-1">
                <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" d="M4.75 3.75l14.5 14.5m0-14.5l-14.5 14.5"></path></svg>
                <span className="text-sm">Airbus</span>
              </div>
              <div className="flex items-center space-x-1">
                <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" d="M3 18v6h4v-6H3zm14 0v6h4v-6h-4zm-6-6a4 4 0 100-8 4 4 0 000 8zm6 0h4a4 4 0 000-8h-4"></path></svg>
                <span className="text-sm">1 hour 30 min</span>
              </div>
            </div> */}
        </div>

        {/* Price and Booking */}
        <div className="p-4 flex flex-col items-center justify-center bg-blue-50">
          <p className="text-2xl font-semibold text-main">
            {moneyRenderer(locale, PkgCurrency, 400)}
          </p>
          <p className="text-sm text-gray-600">Price Start</p>
          {/* <button className="mt-4 px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700">Check Details & Book</button> */}
          <Link
            href={`/hotelpackages/packageId=${PkgDetails?.SeasonDetails?.Id}&Id=${PkgDetails?.HotelDetails?.Id}&fromDate=${startDate}&toDate=${endDate}`}
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
