// TODO: update the placeholder image below

import { StarRating, CustomModal } from 'components/UI';

import { moneyRenderer } from 'utils/helpers/general.helpers';

import { UserIcon } from '@heroicons/react/outline';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
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
const BookingCardCatering = ({
  bookingDetails,
  cancelBookingHandler,
  toggleModal,
  isOpen,
}) => {
  const { t } = useTranslation(['common', 'messages']);
  const { locale } = useRouter();
  const PkgCurrency = "EGP";

  return (
    <>
      <div
        className={`bg-white rounded-md shadow-md overflow-hidden flex-shrink-0 w-full max-w-sm sm:w-72 sm:max-w-none md:w-full md:flex md:justify-between lg:h-44`}
      >
          <div
            className={`relative aspect-[2/1] md:w-60 lg:w-72 md:flex-shrink-0 cursor-pointer`}
          >
            <Image
              alt={` cover`}
              src={bookingDetails.photo || '/f.jpg'}
              layout="fill"
              className="w-full h-full object-cover"
            />
          </div>

        <div className="py-3 md:py-4 px-4 md:flex md:justify-between md:items-center md:w-full md:gap-6">
          <div className="text-copy w-full">
            <p className="font-semibold">{bookingDetails?.FlightTravel?.flightCompany?.Name}</p>
            <div className="flex justify-between text-main py-1">
                <div>
                  <p className="font-semibold">{bookingDetails?.FlightTravel?.FromCountryName}</p>
                  <p className="font-semibold py-2">{bookingDetails?.FlightTravel?.FromAirportName}</p>
                  <p className="text-sm ">Departure at </p>
                  <p className="text-sm ">{formatDateTime(bookingDetails?.FlightTravel?.DepartureDateTime)}</p>
                </div>
                <div className="flex items-center">
                <img
                  className=" w-5"
                  src={ '/plane.svg'}
                  alt="plane"
                />
                </div>
                <div>
                  <p className="font-semibold">{bookingDetails?.FlightTravel?.ToCountryName}</p>
                  <p className="font-semibold py-2">{bookingDetails?.FlightTravel?.ToAirportName}</p>
                  <p className="text-sm ">Arrival at</p>
                  <p className="text-sm ">{formatDateTime(bookingDetails?.FlightTravel?.ArrivalDateTime)}</p>

                </div>
            </div>
          </div>

          <hr className="my-3 md:hidden " />
          <div className="h-full w-px bg-gray-300 mx-2"></div>
          {/* // ! prices */}
          <div className=" w-full  ">
            <div className="flex items-center text-inputGray text-sm lg:text-base font-medium gap-1">
              <UserIcon className="w-4 h-4 lg:w-5 lg:h-5" />
              <span>
                {bookingDetails.GroupMembersNumber}{' '}
                {t('Travellers')}
              </span>
            </div>
            <div className="flex items-center text-inputGray text-sm lg:text-base font-medium gap-1">
              <span>
                {bookingDetails.Class}
              </span>
            </div>

            {/* <div className="mt-2 flex items-center justify-between gap-1">
              <p className="text-inputGray font-medium">{t('Price')}</p>
              <p className="text-copy font-semibold">
                {moneyRenderer(
                  locale,
                  PkgCurrency,
                  bookingDetails.price
                )}
              </p>
            </div> */}

            <div className="mt-1 flex items-center justify-between gap-1">
              <p className="text-inputGray font-medium">{t('Price')}</p>
              <p className="text-main text-base lg:text-lg font-semibold">
                {moneyRenderer(
                  locale,
                  PkgCurrency,
                  bookingDetails.Price
                )}
              </p>
            </div>
            <div className="mt-1 flex items-center justify-between gap-1">
              <p className="text-inputGray font-medium">{t('Total Price')}</p>
              <p className="text-main text-base lg:text-lg font-semibold">
                {moneyRenderer(
                  locale,
                  PkgCurrency,
                  bookingDetails.TotalPrice
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

      {/* <CustomModal isOpen={isOpen} toggleModalHandler={toggleModal}>
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
