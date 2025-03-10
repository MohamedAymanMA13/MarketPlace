// TODO: update the placeholder image below

import { StarRating, CustomModal } from 'components/UI';

import { moneyRenderer } from 'utils/helpers/general.helpers';

import { UserIcon } from '@heroicons/react/outline';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';

const BookingCardCatering = ({
  bookingDetails,
  cancelBookingHandler,
  toggleModal,
  isOpen,
}) => {
  const { t } = useTranslation(['common', 'messages']);
  const { locale } = useRouter();
  const PkgCurrency = "EGP";
  const startDate = new Date(bookingDetails.startDate);
  const endDate = new Date(bookingDetails.endDate);
  const numberOfNights = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
  const getStarRating = (rating) => {
    const match = rating?.match(/(\d+)\s*Star/);
    return match ? parseInt(match[1], 10) : 0; // Default to 0 if no match found
  };
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };
  return (
    <>
      <div
        className={`bg-white rounded-md shadow-md overflow-hidden flex-shrink-0 w-full max-w-sm sm:w-72 sm:max-w-none md:w-full md:flex md:justify-between lg:h-44`}
      >
          <div
            className={`relative aspect-[2/1] md:w-60 lg:w-72 md:flex-shrink-0 cursor-pointer`}
          >
            <Image
              alt={`${bookingDetails?.name} cover`}
              src={bookingDetails?.photo || '/hotel1.jpg'}
              layout="fill"
              className="w-full h-full object-cover"
            />
          </div>

        <div className="py-3 md:py-4 px-4 md:flex md:justify-between md:items-center md:w-full md:gap-6">
          {/* // ! title & rating */}
          <div className="text-copy w-full">
              <a className="font-bold truncate lg:text-lg">
                {bookingDetails.name}
              </a>
            <StarRating filledStars={getStarRating(bookingDetails.rate)} />

            <p className="mt-3 text-sm lg:text-base font-medium">
              {numberOfNights} {t('Nights')}
            </p>
          </div>
          <div className="text-copy w-full px-16">
            <div className="flex justify-between  py-1">
                <div>
                  <p className="font-semibold text-main">From Date</p>
                  <p className="font-semibold py-2">{formatDate(bookingDetails?.startDate)}</p>

                </div>
                <div className="flex items-center">

                </div>
                <div>
                  <p className="font-semibold text-main">To Date</p>
                  <p className="font-semibold py-2">{formatDate(bookingDetails?.endDate)}</p>
                </div>
            </div>
          </div>
          <hr className="my-3 md:hidden" />
          <div className="h-full w-px bg-gray-300 mx-2"></div>

          {/* // ! prices */}
          <div className=" w-full">
            <div className="flex items-center text-inputGray text-sm lg:text-base font-medium gap-1">
              <UserIcon className="w-4 h-4 lg:w-5 lg:h-5" />
              <span>
                {bookingDetails?.noOfCompanions}{' '}
                {t('Travellers')}
              </span>
            </div>
            <div className="flex items-center text-inputGray text-sm lg:text-base font-medium gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21V9.349m0 0a3.001 3.001 0 0 0 3.75-.615A2.993 2.993 0 0 0 9.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 0 0 2.25 1.016c.896 0 1.7-.393 2.25-1.015a3.001 3.001 0 0 0 3.75.614m-16.5 0a3.004 3.004 0 0 1-.621-4.72l1.189-1.19A1.5 1.5 0 0 1 5.378 3h13.243a1.5 1.5 0 0 1 1.06.44l1.19 1.189a3 3 0 0 1-.621 4.72M6.75 18h3.75a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75H6.75a.75.75 0 0 0-.75.75v3.75c0 .414.336.75.75.75Z" />
</svg>
              <span>
                {bookingDetails?.noOfRooms}{' '}
                {t('Rooms')}
              </span>
            </div>
            {/* <div className="mt-2 flex items-center justify-between gap-1">
              <p className="text-inputGray font-medium">{t('Price')}</p>
              <p className="text-copy font-semibold">
                {moneyRenderer(
                  locale,
                  bookingDetails.currency,
                  bookingDetails?.price
                )}
              </p>
            </div> */}

            <div className="mt-1 flex items-center justify-between gap-1">
              <p className="text-inputGray font-medium">{t('Total Price')}</p>
              <p className="text-main text-base lg:text-lg font-semibold">
                {moneyRenderer(
                  locale,
                  PkgCurrency,
                  bookingDetails?.price
                )}
              </p>
            </div>
          </div>

          {/* <div className="mt-5 md:mt-0 flex flex-col h-full justify-evenly gap-3 lg:gap-0">
            <Link href={`/my-bookings/${bookingDetails.id}`}>
              <a className="block p-2 w-full text-sm lg:text-base font-medium rounded-md bg-main text-white text-center whitespace-nowrap min-w-[155px]">
                {t('Edit Booking')}
              </a>
            </Link>

            <button
              type="button"
              className="p-2 w-full text-sm lg:text-base font-medium rounded-md text-[#DF0000] border border-[#DF0000] flex items-center justify-center hover:text-white hover:bg-[#DF0000] min-w-[155px]"
              onClick={toggleModal}
            >
              <span className="whitespace-nowrap">
                {t('Cancel Reservation')}
              </span>
            </button>
          </div> */}
        </div>
      </div>
{/* 
      <CustomModal isOpen={isOpen} toggleModalHandler={toggleModal}>
        <div className="p-6 px-12 rounded-md text-copy flex flex-col items-center">
          <h1 className="font-semibold text-xl">
            {t('Are you sure you want to cancel your booking?', {
              ns: 'messages',
            })}
          </h1>

          <p className="mt-2 text-inputGray font-medium">
            {t("There's", {
              ns: 'messages',
            })}
            <span className="font-bold">
              {' '}
              {t('a 200 EGP cancellation fee', {
                ns: 'messages',
              })}
            </span>
          </p>

          <div className="mt-6 flex items-center justify-center gap-4">
            <button
              type="button"
              className="py-2 w-40 border border-main text-main font-medium text-sm rounded-md"
              onClick={toggleModal}
            >
              {t('No')}
            </button>
            <button
              type="button"
              className="py-2 w-40 bg-main text-white font-medium text-sm rounded-md"
              onClick={() => cancelBookingHandler(bookingDetails.id)}
            >
              {t("I'm Sure")}
            </button>
          </div>
        </div>
      </CustomModal> */}
    </>
  );
};

export default BookingCardCatering;
