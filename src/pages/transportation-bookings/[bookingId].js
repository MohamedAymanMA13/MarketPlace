// TODO: update the header lang below

import { useEffect, useState } from 'react';

import BookingForm from 'components/UI/BookingForm/BookingForm';
import PkgDetailsPane from 'components/UI/PkgDetailsPane/PkgDetailsPane';
import { PageLayout } from 'components/layout';
import { Spinner, CustomModal } from 'components/UI';
import { PurpleCheck } from 'components/Icons';
import { useAuth } from 'hooks/useAuth';
import { httpErrorHandler } from 'utils/helpers/apis.helpers';
import { fetchBookingById, updateBooking } from 'apis/services/bookings';

import toast from 'react-hot-toast';
import { useRouter } from 'next/router';
import { Form } from 'react-final-form';
import arrayMutators from 'final-form-arrays';
import { serialize } from 'object-to-formdata';
import Link from 'next/link';
import { isEmpty } from 'lodash';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

export default function BookingPage() {
  const { t } = useTranslation(['common', 'messages']);
  const [detailLoading, setDetailLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [bookingDetails, setBookingDetails] = useState({});
  const [reqLoading, setReqLoading] = useState(false);
  const [bookingNo, setBookingNo] = useState('');
  const router = useRouter();
  const auth = useAuth();

  const submitHandler = async values => {
    console.log(values);
    delete values.packageImageUrl;
    delete values.pkgTitle;
    delete values.noOfNights;
    delete values.pkgClass;
    delete values.currency;
    delete values.reservationDate;
    delete values.price;
    delete values.totalPrice;

    values.reservationPackageCompanions.forEach(comp => {
      if (typeof comp.passportImageFile === 'string') {
        delete comp.passportImageFile;
      } else if (comp.passportImageFile && comp.passportImageUrl) {
        delete comp.passportImageUrl;
      }
    });

    let valuesToSubmit = serialize(values, {
      indices: true,
      dotsForObjectNotation: true,
    });
    valuesToSubmit.append(
      'totalPrice',
      +bookingDetails.price * values.reservationPackageCompanions.length
    );

    for (var pair of valuesToSubmit.entries()) {
      console.log(pair[0] + ', ' + pair[1]);
    }

    try {
      setReqLoading(true);
      const response = await updateBooking(
        valuesToSubmit,
        auth.user.accessToken
      );

      if (response.data.data) {
        toast.success(
          <b>
            {t('Booking Successfully Updated!', {
              ns: 'messages',
            })}
          </b>
        );
        router.push('/');
        // setBookingNo(response.data.data);
        // toggleModalHandler();
      }
      setReqLoading(false);
    } catch (error) {
      setReqLoading(false);
      const errorMsg = httpErrorHandler(
        error,
        t('Failed to update the booking. Please try again!', {
          ns: 'messages',
        })
      );
      toast.error(errorMsg);
    }
  };

  // * This useEffect handles redirecting un-auth users to the login page.
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

  // * This useEffect handles fetching booking details
  useEffect(() => {
    const fetcher = async bookingId => {
      setDetailLoading(true);
      try {
        const response = await fetchBookingById(
          bookingId,
          router.locale,
          auth.user.accessToken
        );

        if (response.data.data) {
          setBookingDetails(response.data.data);
        }
        setDetailLoading(false);
      } catch (error) {
        setDetailLoading(false);
        const errorMsg = httpErrorHandler(
          error,
          t('Failed to fetch booking details!', {
            ns: 'messages',
          })
        );
        toast.error(errorMsg);
      }
    };

    if (auth.user && router.query.bookingId) {
      fetcher(router.query.bookingId);
    } else {
      console.log(' 🏧 no fetching! ');
    }
  }, [auth, t, router]);

  return (
    <PageLayout
      pageTitle={
        !isEmpty(bookingDetails)
          ? `${t('Complete the booking of')} ${bookingDetails.pkgTitle}`
          : 'Loading...'
      }
    >
      {!auth.user ? (
        <div className="w-full flex items-center justify-center h-screen">
          <Spinner className="animate-spin h-5 w-5 text-main" />
        </div>
      ) : (
        <Form
          onSubmit={submitHandler}
          initialValues={
            !isEmpty(bookingDetails) && !detailLoading ? bookingDetails : {}
          }
          mutators={{
            ...arrayMutators,
          }}
          render={({
            handleSubmit,
            form: { change },
            submitting,
            pristine,
            values,
          }) => (
            <div className="px-4 pt-6 pb-10 sm:space-y-0 sm:grid sm:grid-cols-[240px_1fr] md:grid-cols-[288px_1fr] lg:grid-cols-[320px_1fr] gap-4">
              {/* // * package details section */}
              <PkgDetailsPane
                detailLoading={detailLoading}
                pkgDetails={
                  !isEmpty(bookingDetails) && !detailLoading
                    ? {
                        pkgTitle: bookingDetails.pkgTitle,
                        pkgPhoto: bookingDetails.packageImageUrl,
                        pkgClass: bookingDetails.pkgClass,
                        noOfNights: bookingDetails.noOfNights,
                        pkgCurrency: bookingDetails.currency,
                        pkgPrice: bookingDetails.price,
                      }
                    : {}
                }
              />

              <div className="mt-4 space-y-4 flex flex-col">
                {/* // * Companions section */}
                <BookingForm
                  handleSubmit={handleSubmit}
                  reqLoading={reqLoading}
                  submitting={submitting}
                  pristine={pristine}
                  change={change}
                />

                {/* // * CC section */}
                {/* Refer to the UI directory */}
              </div>
            </div>
          )}
        />
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
