// TODO: add pagination

import { useEffect, useState, useCallback } from 'react';

import { PageLayout } from 'components/layout';
import { Spinner, BookingCardHotels } from 'components/UI';

import { useAuth } from 'hooks/useAuth';
import { axios_instance as axios } from 'apis/axios-instance';
import { httpErrorHandler } from 'utils/helpers/apis.helpers';
import toast from 'react-hot-toast';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { isEmpty } from 'lodash';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { cancelBooking, fetchUserHotelBookings } from 'apis/services/bookings';

export default function MyBookings() {
  const { t } = useTranslation(['common', 'messages']);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userBookings, setUserBookings] = useState({ data: [], totalRow: 0 });
  const router = useRouter();
  const auth = useAuth();

  const toggleModal = () => {
    setIsOpen(prevState => !prevState);
  };

  const fetcher = useCallback(async () => {
    // console.log(' in useCallback fetcher ');
    setIsLoading(true);
    try {
      const response = await fetchUserHotelBookings(
        router.locale,
        auth.user.AccessToken
      );

      if (response.data) {
        setUserBookings({
          data: response.data.Data,
          totalRow: response.data.totalRow,
        });
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      const errorMsg = httpErrorHandler(
        error,
        t('Failed to fetch bookings!', { ns: 'messages' })
      );
      toast.error(errorMsg);
    }
  }, [auth, t, router.locale]);

  // const cancelBookingHandler = async bookingId => {
  //   try {
  //     const response = await cancelBooking(
  //       bookingId,
  //       router.locale,
  //       auth.user.accessToken
  //     );

  //     if (response.data.data) {
  //       toast.success(t('Booking cancelled successfully!', { ns: 'messages' }));
  //       setIsOpen(false);
  //       fetcher();
  //     }
  //   } catch (error) {
  //     setIsLoading(false);
  //     const errorMsg = httpErrorHandler(
  //       error,
  //       t('Failed to cancel the booking!', { ns: 'messages' })
  //     );
  //     toast.error(errorMsg);
  //   }
  // };

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const localUser = localStorage.getItem('loggedInUser');
    if (!localUser && !auth.user) {
      console.log(' REPLACING ');
      router.replace({
        pathname: '/sign-in',
        query: {
          from: router.asPath,
        },
      });
    }
  }, [auth, router]);

  useEffect(() => {
    if (auth.user) {
      fetcher();
    } else {
      console.log(' 📖 no fetching! ');
    }
  }, [auth, fetcher]);

  return (
    <PageLayout pageTitle={t('My Bookings')}>
      <section className="relative w-full h-32 md:h-48 lg:h-60 bg-hotel bg-cover bg-bottom bg-no-repeat">
        <div className="w-full h-full flex items-center">
          <h2 className="px-6 md:px-8 lg:px-16 text-2xl md:text-3xl lg:text-4xl text-white font-bold">
            {t('My Hotel Bookings')}
          </h2>
        </div>
      </section>

      {!auth.user || isLoading ? (
        <div className="w-full flex items-center justify-center h-screen">
          <Spinner className="animate-spin h-5 w-5 text-main" />
        </div>
      ) : !isLoading && isEmpty(userBookings.data) ? (
        <div className="py-7 w-full bg-bg flex items-center justify-center">
          <p className="text-sm text-main">{t('No data available')}</p>
        </div>
      ) : (
        <div className="px-4 pb-5 mt-4 gap-4 flex flex-col sm:flex-row md:flex-col flex-wrap md:flex-nowrap items-center justify-start">
          {userBookings.data.map(booking => (
            <BookingCardHotels
              key={booking.id}
              bookingDetails={booking}
              // cancelBookingHandler={cancelBookingHandler}
              toggleModal={toggleModal}
              isOpen={isOpen}
            />
          ))}
        </div>
      )}
    </PageLayout>
  );
}

export async function getServerSideProps(context) {
  const { locale } = context;
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'messages'])),
    },
  };
}
