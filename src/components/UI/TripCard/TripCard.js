// TODO: update the placeholder image below

import { StarRating } from 'components/UI';

import { moneyRenderer } from 'utils/helpers/general.helpers';

import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { format } from 'date-fns';
import { EyeIcon } from '@heroicons/react/outline';
// import PropTypes from 'prop-types';

const TripCard = ({
  additionalClasses,
  imgAspectRatio,
  PkgDetails,
  children,
  forPackageDetails
}) => {
  const { t } = useTranslation();
  const { locale } = useRouter();
  const PkgCurrency = "EGP";
  const getStarRating = (rating) => {
    return rating
  };
  return (
    <div
      className={`relative mx-2 bg-white rounded-md shadow-md overflow-hidden flex-shrink-0 snap-center ${additionalClasses}`}
    >
      {forPackageDetails ? 
      <Link href={`/hotels/${PkgDetails?.HotelId}`}>
      <a className={`block relative ${imgAspectRatio}`}>
        <Image
          alt={`${PkgDetails?.Name} cover`}
          src={`http://gammats.com:7009/be/${PkgDetails?.Images[0]}`|| '/bg3.jpg'}
          layout="fill"
          className="w-full h-full object-cover"
        />
      </a>
      </Link>
      :<Link href={`/packages/${PkgDetails?.Id}`}>
        <a className={`block relative ${imgAspectRatio}`}>
          <Image
            alt={`${PkgDetails?.Name} cover`}
            src={`http://gammats.com:7009/be/${PkgDetails?.PackageImage}`|| '/bg3.jpg'}
            layout="fill"
            className="w-full h-full object-cover"
          />
        </a>
      </Link>}

      <div className="p-4 text-copy">
        <p className="font-bold first-letter:uppercase flex justify-between w-full ">
          <span>{PkgDetails?.Name}</span>
          {forPackageDetails && <span className='mt-1'>
          <StarRating filledStars={getStarRating(PkgDetails.Rating)} />
          </span>}
        </p>

        {forPackageDetails ?
        <p className="mt-2 text-sm font-normal">
        {locale === 'ar'
          ? new Date(PkgDetails?.CheckInDate).toLocaleDateString('ar-EG') +
            ' - ' +
            new Date(PkgDetails?.CheckOutDate).toLocaleDateString('ar-EG')
          : format(new Date(PkgDetails?.CheckInDate), 'dd/LL/uuuu') +
            ' - ' +
            format(new Date(PkgDetails?.CheckOutDate), 'dd/LL/uuuu')}
      </p>
        : 

        <p className="mt-2 text-sm font-normal">
          {locale === 'ar'
            ? new Date(PkgDetails?.StartDate).toLocaleDateString('ar-EG') +
              ' - ' +
              new Date(PkgDetails?.EndDate).toLocaleDateString('ar-EG')
            : format(new Date(PkgDetails?.StartDate), 'dd/LL/uuuu') +
              ' - ' +
              format(new Date(PkgDetails?.EndDate), 'dd/LL/uuuu')}
        </p>}

        <div className="mt-4 flex items-center justify-between">
          {!forPackageDetails && <p className="text-main text-lg font-bold">
            {moneyRenderer(locale,PkgCurrency, PkgDetails?.Price)}
          </p>}
          {forPackageDetails && <p className="text-main text-lg font-bold">
            {PkgDetails?.CityName}
          </p>}
          {forPackageDetails && <Link className='cursor-pointer ' href={`/hotels/${PkgDetails?.HotelId}`}>
            <div className="text-copy cursor-pointer text-sm flex items-center gap-1">
              <EyeIcon className="h-5 w-5" />
            </div>
          </Link>}
        </div>
        {!forPackageDetails && <Link href={`/packages/${PkgDetails.Id}`}>
          <a className="block py-2 mt-4 w-full bg-main text-white font-medium text-sm text-center rounded-md">
            {t('Book Now')}
          </a>
        </Link>}
        
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
