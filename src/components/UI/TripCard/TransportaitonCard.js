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

const TransportaitonCard = ({
  additionalClasses,
  imgAspectRatio,
  PkgDetails,
  children,
  kind,
  forPackageDetails
}) => {
    console.log(PkgDetails , "PkgDetails?.ArrivalDateTime")
  return (
    <div
      className={`relative mx-2 bg-white rounded-md shadow-md overflow-hidden flex-shrink-0 snap-center ${additionalClasses}`}
    >
      <div className="p-[10.7px] text-copy">
        <p className="font-bold first-letter:uppercase flex justify-between w-full ">
          {kind === "Flight" && <span>{PkgDetails?.FlightCompanyName}</span>}
          {kind === "Transportation" && <span>{PkgDetails?.TransportaionCompanyName}</span>}
        </p>
        <div className="mt-2 flex items-center justify-between">
          <p>{PkgDetails?.FromCity}</p>
          <p>{PkgDetails?.ToCity}</p>
        </div>
        <div className="mt-2 flex items-center justify-between">
        <p>{PkgDetails?.DepartureDateTime?.split("T")[0]}</p>
        <p>{PkgDetails?.ArrivalDateTime?.split("T")[0]}</p>
        </div>
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

export default TransportaitonCard;
