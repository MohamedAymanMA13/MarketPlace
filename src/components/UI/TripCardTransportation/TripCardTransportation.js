import { StarRating } from 'components/UI';
import { moneyRenderer } from 'utils/helpers/general.helpers';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
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

  const PkgCurrency = "EGP";

  return (
    <div
      className={`relative bg-white rounded-md shadow-md overflow-hidden flex-shrink-0 snap-center flex flex-col ${additionalClasses}`}
    >
      <Link href={`/transportationpackages/${PkgDetails?.ID}`}>
        <a className={`block relative ${imgAspectRatio}`}>
          <Image
            alt={`${PkgDetails?.Name} cover`}
            src={ '/transportationcards.jpg'}
            layout="fill"
            className="w-full h-full object-cover"
          />
        </a>
      </Link>

      <div className="p-4 flex flex-col flex-grow">
        <div>
          <StarRating filledStars={getStarRating(PkgDetails?.ProperteyRating)} />
          <p className="font-bold first-letter:uppercase mt-2">
            {PkgDetails?.Name}
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

        <div className="mt-auto">
          <div className="mt-4 flex items-center justify-between">
            <p className=" text-lg font-bold">
            Address : {PkgDetails?.Address}
            </p>
          </div>

          <Link href={`/transportationpackages/${PkgDetails?.ID}`}>
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

export default TripCardTransportation;
