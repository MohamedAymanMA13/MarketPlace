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
      className={`relative bg-white rounded-md shadow-md overflow-hidden flex-shrink-0 snap-center flex flex-col ${additionalClasses}`}
    >
      <Link href={`/flightpackage/packageId=${PkgDetails?.AircraftTypeID}&ID=${PkgDetails?.ID}&DepartureAirport=${PkgDetails?.DepartureAirport}&ArrivalAirport=${PkgDetails?.ArrivalAirport}&AircraftType=${PkgDetails?.AircraftType}&BusinessClassPrice=${PkgDetails?.BusinessClassPrice}&EconomyClassPrice=${PkgDetails?.EconomyClassPrice}`}>
        <a className={`block relative ${imgAspectRatio}`}>
          <Image
            alt={`${PkgDetails?.ProperteyName} cover`}
            src={PkgDetails?.photo || '/f.jpg'}
            layout="fill"
            className="w-full h-full object-cover"
          />
        </a>
      </Link>

      <div className="p-4 flex flex-col flex-grow">
        
        <div>
          <p className="font-bold first-letter:uppercase ">
            {PkgDetails?.AircraftType}
          </p>
        </div>
        <div className='flex flex-wrap'>
          <div className='w-1/2'>
            <p className="font-bold first-letter:uppercase ">
            Departure Airport 
            </p>
            <p className=" first-letter:uppercase ">
            {PkgDetails?.DepartureAirport}
            </p>
          </div>
          <div className='w-1/2'>
            <p className="font-bold first-letter:uppercase ">
            Arrival Airport 
            </p>
            <p className=" first-letter:uppercase ">
            {PkgDetails?.ArrivalAirport}
            </p>
          </div>
        </div>
        
        <div className="mt-auto">
          <div className="mt-2  ">
            <p className="font-bold first-letter:uppercase mt-2">
              Starting price
            </p>
            
            <p className="text-main text-lg font-bold ">
              {moneyRenderer(locale, PkgCurrency, PkgDetails?.EconomyClassPrice)}
            </p>
          </div>

          <Link href={`/flightpackage/packageId=${PkgDetails?.AircraftTypeID}&ID=${PkgDetails?.ID}&DepartureAirport=${PkgDetails?.DepartureAirport}&ArrivalAirport=${PkgDetails?.ArrivalAirport}&AircraftType=${PkgDetails?.AircraftType}&BusinessClassPrice=${PkgDetails?.BusinessClassPrice}&EconomyClassPrice=${PkgDetails?.EconomyClassPrice}`}>
            <a className="block py-2 mt-4 w-full bg-main text-white font-medium text-sm text-center rounded-md">
              {t('Book Now')}
            </a>
          </Link>
        </div>
      </div>

      {children}
    </div>
  );
};

export default TripCardFlight;
