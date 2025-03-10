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
}) => {
  const { t } = useTranslation();
  const { locale } = useRouter();

  return (
    <div
      className={`relative bg-white rounded-md shadow-md overflow-hidden flex-shrink-0 snap-center ${additionalClasses}`}
    >
      <Link href={`/packages/${PkgDetails?.PkgId}`}>
        <a className={`block relative ${imgAspectRatio}`}>
          <Image
            alt={`${PkgDetails?.PkgTitle} cover`}
            src={PkgDetails?.PkgPhoto || '/bg3.jpg'}
            layout="fill"
            className="w-full h-full object-cover"
          />
        </a>
      </Link>

      <div className="p-4 text-copy">
        <StarRating filledStars={PkgDetails?.PkgClass} />
        <p className="font-bold first-letter:uppercase">
          {PkgDetails?.PkgTitle}
        </p>

        <p className="mt-2 text-sm font-normal">
          {locale === 'ar'
            ? new Date(PkgDetails?.FromDt).toLocaleDateString('ar-EG') +
              ' - ' +
              new Date(PkgDetails?.ToDt).toLocaleDateString('ar-EG')
            : format(new Date(PkgDetails?.FromDt), 'dd/LL/uuuu') +
              ' - ' +
              format(new Date(PkgDetails?.ToDt), 'dd/LL/uuuu')}
        </p>

        <div className="mt-4 flex items-center justify-between">
          <p className="text-main text-lg font-bold">
            {moneyRenderer(locale, PkgDetails?.PkgCurrency, PkgDetails?.PkgPrice)}
          </p>

          <div className="text-copy text-sm flex items-center gap-1">
            <EyeIcon className="h-5 w-5" />
            <span>{PkgDetails?.views}</span>
          </div>
        </div>

        <Link href={`/packages/${PkgDetails.PkgId}`}>
          <a className="block py-2 mt-4 w-full bg-main text-white font-medium text-sm text-center rounded-md">
            {t('Book Now')}
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
