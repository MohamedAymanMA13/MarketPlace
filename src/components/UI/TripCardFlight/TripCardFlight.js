import { StarRating } from 'components/UI';
import { moneyRenderer } from 'utils/helpers/general.helpers';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
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
  console.log('%csrc\components\UI\TripCardFlight\TripCardFlight.js:26 object', 'color: #007acc;', PkgDetails);
  return (
    <div
    className={`relative bg-white rounded-md shadow-md overflow-hidden flex-shrink-0 snap-center flex flex-col w-full `}
  >
    
          <div className="flex">
        {/* Airline logo and info */}
        <div className="flex-shrink-0 ">
          {/* <Link href={`/flightpackage/packageId=${PkgDetails?.AircraftTypeID}&ID=${PkgDetails?.ID}&DepartureAirport=${PkgDetails?.DepartureAirport}&ArrivalAirport=${PkgDetails?.ArrivalAirport}&AircraftType=${PkgDetails?.AircraftType}&BusinessClassPrice=${PkgDetails?.BusinessClassPrice}&EconomyClassPrice=${PkgDetails?.EconomyClassPrice}`}> */}
            <img
              className="h-100 w-72 object-contain"
              src={PkgDetails?.photo || '/f.jpg'}
              alt={PkgDetails?.AircraftType}
            />
          {/* </Link> */}
        </div>

        {/* Flight details */}
        <div className="flex-grow p-4 border-r border-blue-200 ">
          <div className='py-1'>
            <p className="font-bold first-letter:uppercase ">
              {PkgDetails?.AircraftType}
            </p>
          </div>
          <div className="flex justify-between text-main py-1">
            <div>
              <p className="font-semibold">{PkgDetails?.DepartureAirport}</p>
              <p className="text-sm pt-5">Departure at  {PkgDetails?.departureTime}</p>
            </div>
            <div className="flex items-center">
            <img
              className=" w-5"
              src={ '/plane.svg'}
              alt="plane"
            />
            </div>
            <div>
              <p className="font-semibold">{PkgDetails?.ArrivalAirport}</p>
              <p className="text-sm pt-5">Arrival at  {PkgDetails?.ArrivalTime}</p>
            </div>
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
          <p className="text-2xl font-semibold text-main">{moneyRenderer(locale, PkgCurrency, PkgDetails?.EconomyClassPrice)}</p>
          <p className="text-sm text-gray-600">Price Start</p>
          {/* <button className="mt-4 px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700">Check Details & Book</button> */}
          <Link href={`/flightpackage/packageId=${PkgDetails?.AircraftTypeID}&ID=${PkgDetails?.ID}&DepartureAirport=${PkgDetails?.DepartureAirport}&ArrivalAirport=${PkgDetails?.ArrivalAirport}&AircraftType=${PkgDetails?.AircraftType}&BusinessClassPrice=${PkgDetails?.BusinessClassPrice}&EconomyClassPrice=${PkgDetails?.EconomyClassPrice}`}>
            <a className="block py-2 px-4 mt-4 w-full bg-main text-white font-medium text-sm text-center rounded-md">
              {t('Check & Book Now')}
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TripCardFlight;
