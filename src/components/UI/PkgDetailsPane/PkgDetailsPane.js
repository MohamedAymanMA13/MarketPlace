// TODO: update the placeholder image below

import { useState, useEffect } from 'react';

import { Spinner, StarRating } from 'components/UI';
import { moneyRenderer } from 'utils/helpers/general.helpers';

import { isEmpty, sortBy } from 'lodash';
import Image from 'next/image';
import { useFormState } from 'react-final-form';
import { UserIcon } from '@heroicons/react/outline';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { BedIcon } from 'components/Icons';

const PkgDetailsPane = ({ detailLoading, PkgDetails }) => {
  const { t } = useTranslation();
  const { locale, query } = useRouter();
  const [selectedPrice, setSelectedPrice] = useState(0);
  const [selectedRoom, setSelectedRoom] = useState(undefined);
  const [totalPrice, setTotalPrice] = useState(undefined);
  const formState = useFormState();
  // console.log(formState);

  useEffect(() => {
    // if (selectedPrice) {
    if (!isEmpty(PkgDetails) && !detailLoading) {
      // console.log(
      //   ' 🐗 ',
      //   formState.values.reservationPackageCompanions?.length
      // );
      setTotalPrice(
        +selectedPrice * formState.values.reservationPackageCompanions?.length
      );
    }
  }, [
    PkgDetails,
    formState.values.reservationPackageCompanions?.length,
    detailLoading,
    selectedPrice,
  ]);

  useEffect(() => {
    if (!detailLoading && !isEmpty(PkgDetails)) {
      // * no query and no rooms
      if (!query.roomType && isEmpty(PkgDetails.roomTypes)) {
        setSelectedPrice(PkgDetails.PkgPrice);
        setSelectedRoom(undefined);

        // * with rooms
      } else if (!isEmpty(PkgDetails.roomTypes)) {
        const cheapestRoom = sortBy(PkgDetails.roomTypes, r => r.price)[0];

        // * no query
        if (!query.roomType) {
          setSelectedPrice(cheapestRoom.price);
          setSelectedRoom(cheapestRoom);
        } else {
          const foundType = PkgDetails.roomTypes.find(
            room => +room.id === +query.roomType
          );

          if (foundType) {
            setSelectedPrice(foundType.price);
            setSelectedRoom(foundType);
          } else {
            setSelectedPrice(cheapestRoom.price);
            setSelectedRoom(cheapestRoom);
          }
        }
      }
    }
  }, [detailLoading, PkgDetails, query]);

  return (
    <>
      {detailLoading ? (
        <div className="p-2 w-full bg-white rounded-md flex items-center justify-center max-h-[25rem]">
          <Spinner className="animate-spin h-5 w-5 text-main" />
        </div>
      ) : !detailLoading && isEmpty(PkgDetails) ? (
        <div className="p-2 w-full bg-white rounded-md flex items-center justify-center max-h-[25rem]">
          <p className="text-xs text-red-500">{t('No data available')}</p>
        </div>
      ) : (
        <div className="p-2 w-full bg-white rounded-md sm:h-max">
          <div className="relative aspect-video lg:aspect-[2/1] rounded-md overflow-hidden">
            <Image
              alt={`${PkgDetails.PkgTitle} cover`}
              src={PkgDetails.PkgPhoto || '/bg5.jpg'}
              layout="fill"
              className="w-full h-full object-cover"
              priority
            />
          </div>

          <div className="px-1 mt-4 space-y-1">
            <StarRating filledStars={PkgDetails.PkgClass} />
            <h2 className="font-bold text-base lg:text-lg text-copy">
              {PkgDetails.PkgTitle}
            </h2>

            <p className="text-copy text-xs font-medium xl:text-base">
              {PkgDetails.NoOfNights} {t('Nights')}
            </p>
          </div>

          <hr className="my-4 bg-gray-200" />

          <section className="px-1">
            <h3 className="font-bold text-base lg:text-lg text-copy">
              {t('Price')}
            </h3>

            <div className="mt-2 flex flex-col gap-3">
              <div className="flex items-center text-inputGray text-sm font-medium gap-1">
                <UserIcon className="w-4 h-4" />
                <p>
                  {formState.values.reservationPackageCompanions?.length}{' '}
                  {t('Travellers')}
                </p>
              </div>

              <div className="flex items-center text-inputGray text-sm font-medium gap-1">
                {selectedRoom ? (
                  <>
                    <BedIcon className="w-4 h-4" />
                    <p>{selectedRoom.roomType}</p>
                  </>
                ) : null}
              </div>

              <div className="flex items-center justify-between">
                <p className="text-inputGray text-sm font-medium">
                  {t('Price')}
                </p>
                <p className="text-copy text-sm font-semibold">
                  {moneyRenderer(locale, PkgDetails.PkgCurrency, selectedPrice)}
                </p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-inputGray text-sm font-medium">
                  {t('Total Price')}
                </p>
                <p className="text-main text-base font-semibold">
                  {moneyRenderer(locale, PkgDetails.PkgCurrency, totalPrice)}
                </p>
              </div>
            </div>
          </section>
        </div>
      )}
    </>
  );
};

export default PkgDetailsPane;
