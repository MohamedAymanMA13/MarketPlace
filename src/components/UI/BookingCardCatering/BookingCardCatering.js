import { StarRating, CustomModal } from 'components/UI';
import { moneyRenderer } from 'utils/helpers/general.helpers';
import { UserIcon } from '@heroicons/react/outline';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';

const BookingCard = ({
  bookingDetails,
  cancelBookingHandler,
  toggleModal,
  isOpen,
}) => {
  const { t } = useTranslation(['common', 'messages']);
  const { locale } = useRouter();
  const PkgCurrency = "EGP";
  console.log('%csrc\components\UI\BookingCardCatering\BookingCardCatering.js:22 object', 'color: #007acc;', bookingDetails);
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };


  return (
    <>
      <div className={`bg-white rounded-md shadow-md overflow-hidden flex-shrink-0 w-full max-w-sm sm:w-72 sm:max-w-none md:w-full md:flex md:justify-between lg:h-44`}>
        <div className={`relative aspect-[2/1] md:w-60 lg:w-72 md:flex-shrink-0 cursor-pointer`}>
          <Image
            alt={`${bookingDetails.cateringName} cover`}
            src={bookingDetails.photo || '/bg3.jpg'}
            layout="fill"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="py-3 md:py-4 px-4 md:flex md:justify-between md:items-center md:w-full md:gap-6">
          <div className="text-copy w-full">
            <a className="font-bold truncate lg:text-lg">
              {bookingDetails.cateringName}
            </a>
            <div className="mt-2 flex items-center justify-between gap-1" >
              <p className="text-main text-base lg:text-lg font-medium">Start Date</p>
              <p className="text-main text-base lg:text-lg font-medium px-10">End Date</p>
            </div>
            <div className="mt-2 flex items-center justify-between gap-1" >
              <p className="text-inputGray font-medium">{formatDate(bookingDetails?.startDate)}</p>
              <p className="text-inputGray font-medium px-6">{formatDate(bookingDetails?.endDate)}</p>
            </div>
          </div>

          <div className="text-copy w-full px-16">
            <div className="mt-1 flex items-center justify-between gap-1">
              <p className="text-main text-base lg:text-lg font-medium">{t('Items')}</p>
              <p className="text-main text-base lg:text-lg font-medium">
                {t('Quantity')}
              </p>
            </div>
            <div className="max-h-32 overflow-y-auto"> 
              {bookingDetails?.CateringItems?.map(items => (
                <div className="mt-2 flex items-center justify-between gap-1" key={items?.id}>
                  <p className="text-inputGray font-medium">{items?.name}</p>
                  <p className="text-copy font-semibold px-5">
                    {items?.quantity}
                  </p>
                </div>
              ))}

              {bookingDetails?.CateringCombos?.map(items => (
                <div className="mt-2 flex items-center justify-between gap-1" key={items?.id}>
                  <p className="text-inputGray font-medium">{items?.name}</p>
                  <p className="text-copy font-semibold px-5">
                    {items?.quantity}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <hr className="my-3 md:hidden" />
          <div className="h-full w-px bg-gray-300 mx-2"></div>

          {/* Prices */}
          <div className="w-full ">
            {/* <div className="mt-2 flex items-center justify-between gap-1">
              <p className="text-inputGray font-medium">{t('Price')}</p>
              <p className="text-copy font-semibold">
                {moneyRenderer(locale, PkgCurrency, bookingDetails.price)}
              </p>
            </div> */}

            <div className="mt-1 flex items-center justify-between gap-1">
              <p className="text-inputGray font-medium">{t('Total Price')}</p>
              <p className="text-main text-base lg:text-lg font-semibold">
                {moneyRenderer(locale, PkgCurrency, bookingDetails.price)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookingCard;
