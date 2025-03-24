// TODO: update the header lang below

import { useEffect, useState } from 'react';

import BookingForm from 'components/UI/BookingForm/BookingForm';
import PkgDetailsPane from 'components/UI/PkgDetailsPane/PkgDetailsPane';
import { PageLayout } from 'components/layout';
import { Spinner, CustomModal } from 'components/UI';
import { PurpleCheck } from 'components/Icons';
import { useAuth } from 'hooks/useAuth';
import { axios_instance as axios } from 'apis/axios-instance';
import { httpErrorHandler } from 'utils/helpers/apis.helpers';

import toast from 'react-hot-toast';
import { useRouter } from 'next/router';
import { Form } from 'react-final-form';
import arrayMutators from 'final-form-arrays';
import { serialize } from 'object-to-formdata';
import Link from 'next/link';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { fetchPackageById } from 'apis/services/packages';
import { isEmpty } from 'lodash';

export default function NewBooking() {
  const { t } = useTranslation(['common', 'messages']);
  const [detailLoading, setDetailLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [pkgDetails, setPkgDetails] = useState({});
  const [reqLoading, setReqLoading] = useState(false);
  const [bookingNo, setBookingNo] = useState('');
  const router = useRouter();
  const auth = useAuth();

  const submitHandler = async values => {
    console.log({...values,totalPrice: +pkgDetails.PkgPrice * values.reservationPackageCompanions.length,packageId: router.query.packageId});
    let valuesToSubmit = serialize(values, {
      indices: true,
      dotsForObjectNotation: true,
    });
    valuesToSubmit.append('packageId', router.query.packageId);
    valuesToSubmit.append(
      'totalPrice',
      +pkgDetails.PkgPrice * values.reservationPackageCompanions.length
    );
    // for (var pair of valuesToSubmit.entries()) {
    //   console.log(pair[0] + ', ' + pair[1]);
    // }
    try {
      setReqLoading(true);
      // const response = await axios.post('/Booking', valuesToSubmit, {
      //   headers: {
      //     authorization: 'Bearer ' + auth.user.AccessToken,
      //   },
      // });
      const response = await axios.post('/Reservations/PackageReservation/MarketPlace', {...values,Price: +pkgDetails.Price ,TotalPrice: +pkgDetails.Price * values.reservationPackageCompanions.length,PackageId: Number(router.query.packageId)},{
        headers: {
          authorization: 'Bearer ' + auth.user.Token,
        },
      });
      if (response.data.Message === "Package Reservation Created Successfully.") {
        router.push('/');  // Redirect to homepage
      } else {
        toast.error(response.data.Message);  // Show error message
      }
    } catch (error) {
      setReqLoading(false);
      const errorMsg = httpErrorHandler(
        error,
        t('Booking Failed. Please try again!', {
          ns: 'messages',
        })
      );
      toast.error(errorMsg);
    }
  };

  const toggleModalHandler = () => {
    setIsOpen(prevState => !prevState);
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

  // * This useEffect handles fetching package details
  useEffect(() => {
    const fetcher = async PkgId => {
      setDetailLoading(true);
      try {
        const response = await fetchPackageById(PkgId);

        if (response.data.Items) {
          setPkgDetails(response.data.Items);
        }
        setDetailLoading(false);
      } catch (error) {
        setDetailLoading(false);
        const errorMsg = httpErrorHandler(
          error,
          t('Failed to fetch package details!', {
            ns: 'messages',
          })
        );
        toast.error(errorMsg);
      }
    };

    if ( router.query.packageId) {
      fetcher(router.query.packageId);
    } else {
      console.log(' 🏧 no fetching! ');
    }
  }, [auth, router, t]);
console.log('%csrc\pages\packages\[packageId]\new-booking.js:127 PkgDetails', 'color: #007acc;', pkgDetails);
  return (
    <PageLayout
      pageTitle={
        !isEmpty(pkgDetails)
          ? `${t('Complete the booking of')} ${pkgDetails.PkgTitle}`
          : 'Loading...'
      }
    >

        <Form
          onSubmit={submitHandler}
          initialValues={{ reservationPackageCompanions: [{}] }}
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
                PkgDetails={pkgDetails}
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
      

      <CustomModal
        isOpen={isOpen}
        toggleModalHandler={toggleModalHandler}
        escapeClose={false}
      >
        <div className="p-10 px-12 rounded-md space-y-4 text-copy flex flex-col items-center">
          <PurpleCheck className="w-24 h-24" />

          <h1 className="font-semibold text-xl">{t('Successfully Booked!')}</h1>

          <p>
            {t('Reservation No.')}{' '}
            <span className="font-bold text-black">{bookingNo}</span>
          </p>

          <Link href="/">
            <a className="block py-3 sm:px-8 lg:px-28 mt-4 w-full max-w-xs sm:max-w-none sm:w-fit bg-main text-white font-medium text-sm text-center rounded-md">
              {t('Back To Home')}
            </a>
          </Link>
        </div>
      </CustomModal>
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
