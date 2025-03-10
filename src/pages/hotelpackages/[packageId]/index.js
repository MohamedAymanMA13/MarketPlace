// TODO: update the image placeholder

import { useEffect,useState } from 'react';
import { PageLayout } from 'components/layout';
import { RoomTypeSec, StarRating, Timeline } from 'components/UI';
import HeartBtn from 'components/UI/HeartBtn/HeartBtn';
import ShareBtn from 'components/UI/ShareBtn/ShareBtn';
import BookingForm from 'components/UI/BookingForm/BookingForm';
import { Form } from 'react-final-form';
import arrayMutators from 'final-form-arrays';
import { useAuth } from 'hooks/useAuth';
import { axios_instance as axios } from 'apis/axios-instance';
import {
  MinusIcon,
  PlusIcon,
} from '@heroicons/react/outline';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { GetHotelDetailsWebsiteContent,searchHotels } from 'apis/services/packages';
import { isEmpty } from 'lodash';
import { PopoverBtn } from 'components/UI';

export default function PackageDetailsPage({ PkgDetails, PkgId ,startDate, endDate}) {
  const { t } = useTranslation();
  const router = useRouter();
  const auth = useAuth();
  const [detailsValue, setDetailsValue] = useState([]);
  const [matchedDetails, setMatchedDetails] = useState(null);
  const [numberOfRooms, setNumberOfRooms] = useState(PkgDetails.map(() => 0));
  const [reqLoading, setReqLoading] = useState(false);

  const valuesToSubmit = {
    hotelName: -1,
    location: 0,
    rating: -1,
    from_date: startDate,
    to_date: endDate,
  };

  useEffect(() => {
    async function fetchDetails() {
      try {
        const response = await searchHotels(valuesToSubmit);
        setDetailsValue(response.data?.Data);
      } catch (error) {
        console.error('Error fetching details:', error);
      }
    }
    fetchDetails();
  }, []);

  useEffect(() => {
    const foundDetail = detailsValue.find(detail => detail.ID === parseInt(PkgId));
    if (foundDetail) {
      setMatchedDetails(foundDetail);
    }
  }, [detailsValue, PkgId]);

  const getStarRating = (rating) => {
    const match = rating?.match(/(\d+)\s*Star/);
    return match ? parseInt(match[1], 10) : 0; // Default to 0 if no match found
  };
  const calculateNights = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const timeDiff = end - start;
    const nights = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
    return nights;
  };
  const incrementRooms = (index) => {
    setNumberOfRooms((prevRooms) =>
      prevRooms.map((rooms, i) =>
        i === index && rooms < PkgDetails[index].availableRooms ? rooms + 1 : rooms
      )
    );
  };
  
  const decrementRooms = (index) => {
    setNumberOfRooms((prevRooms) =>
      prevRooms.map((rooms, i) => (i === index && rooms > 0 ? rooms - 1 : rooms))
    );
  };
  console.log('%csrc\pages\hotelpackages\[packageId]\index.js:84 detailsValue', 'color: #007acc;', startDate, endDate);
  const submitHandler = async values => {
    const roomTypes = PkgDetails.map((data, i) => ({
      roomId: data.ID, // Assuming RoomTypeId is the correct field in PkgDetails
      numberOfRooms: numberOfRooms[i],
      price: data.TotalPrice, // Total price for the rooms selected
    })).filter(room => room.numberOfRooms > 0); // Only include rooms that have been selected

  console.log('%csrc\pages\hotelpackages\[packageId]\index.js:90 values', 'color: #007acc;', {reservationHotelCompanions :values.reservationPackageCompanions, hotelID : matchedDetails.ID , roomTypes ,startDate, endDate});
  try {
    setReqLoading(true);
    const response = await axios.post('/Hotel/AddHotelWebsiteReservation', {reservationHotelCompanions :values.reservationPackageCompanions, hotelID : matchedDetails.ID , roomTypes ,startDate, endDate}, {
      headers: {
        authorization: 'Bearer ' + auth.user.AccessToken,
      },
    });
    if (response.data.Data) {
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
  return (
    <PageLayout >
      <div className="px-4 pt-6 pb-10 space-y-4">
        <div className="p-4 w-full bg-white rounded-md sm:flex sm:items-start sm:justify-between">
          <div>
            <StarRating filledStars={getStarRating(matchedDetails?.ProperteyRating)} />
            <h2 className="font-bold text-base md:text-lg xl:text-xl text-copy">
              {matchedDetails?.ProperteyName}
            </h2>
            <div className="mt-2 flex items-center justify-between sm:flex-col sm:items-start sm:gap-2">
              <p className="text-copy text-sm font-medium xl:text-base">
                {matchedDetails?.City} , {matchedDetails?.Country}
              </p>
              <p className="text-copy text-sm font-medium xl:text-base">
                {calculateNights(startDate, endDate)} {t('Nights')}
              </p>
            </div>
          </div>
          <div className="mt-4 flex items-center justify-between gap-4">
            <ShareBtn  />
          </div>
        </div>

        <div className="relative aspect-[12/9] sm:aspect-video lg:aspect-[3/1] rounded-md overflow-hidden">
          <Image
            alt="package cover"
            src={matchedDetails?.HotelPagePhoto || '/bg5.jpg'}
            layout="fill"
            className="w-full h-full object-cover"
            priority
          />
        </div>
        <section className="py-2 px-3 bg-white rounded-md text-copy">
          <h3 className="text-sm md:text-base font-bold">
            {t('Hotel Details')}
          </h3>
          <div className="mt-2">
            {matchedDetails?.Description}
          </div>
        </section>
        {isEmpty(PkgDetails.roomTypes) ? null : (
          <section className="py-4 px-3 bg-white rounded-md text-copy">
            <h3 className="text-sm md:text-base font-bold">
              {t('Select Room Type')}
            </h3>

            <div className="mt-3 space-y-5">
              {PkgDetails.roomTypes.map((room, i) => (
                <RoomTypeSec key={i} pricingDetails={room} />
              ))}
            </div>
          </section>
        )}
        <>
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
              <>
                {PkgDetails.map((data, i) => (
                  <section className="py-2 px-3 bg-white rounded-md text-copy" key={i}>
                    <div className='p-4 w-full flex flex-wrap	 bg-white rounded-md sm:flex sm:items-start sm:justify-between'>
                      <div className='w-1/4'>
                        <p className="text-copy text-sm font-medium xl:text-base">
                          {data.RoomTypeName}
                        </p>
                      </div>
                      <div className='w-1/4'>
                          <p className="text-copy text-sm font-medium xl:text-base">
                            Price/Night: {data.TotalPrice}
                          </p>
                      </div>
                      <div className="w-1/4 flex items-center justify-between gap-4">
                      
                        <div className="px-1 text-sm font-medium text-inputGray flex items-center justify-between">
                          <p className="text-copy text-sm font-medium xl:text-base">{t('Number of Rooms')}</p>
                          <div className="flex items-center gap-3 px-3">
                            <button
                              type="button"
                              className="p-1 rounded-full bg-zinc-100"
                              onClick={() => decrementRooms(i)}
                            >
                              <MinusIcon className="w-5 h-5" />
                            </button>
                            <span className="font-semibold">{numberOfRooms[i]}</span>
                            <button
                              type="button"
                              className="p-1 rounded-full bg-zinc-100"
                              onClick={() => incrementRooms(i)}
                            >
                              <PlusIcon className="w-5 h-5" />
                            </button>
                          </div>
                        </div>
                        
                      </div>
                      <div className='w-1/4 flex justify-end'>
                          <p className="text-copy text-sm font-medium xl:text-base">
                            Total Price: {data.TotalPrice * numberOfRooms[i]}
                          </p>
                        </div>
                    </div>
                  </section>
                ))}
                <section className="py-2 px-3 bg-white rounded-md text-copy">
                  {auth.user?.loggedIn ? 
                    <div className="mt-4 space-y-4 flex flex-col">
                      <BookingForm
                        handleSubmit={handleSubmit}
                        submitting={submitting}
                        pristine={pristine}
                        reqLoading={reqLoading}
                        change={change}
                      />
                    </div>
                    :
                    <div className="sm:self-end flex gap-4 items-center justify-center">
                      <PopoverBtn
                        triggerElement={
                          <button
                            type="button"
                            className="py-2 sm:px-8 lg:px-28 mt-4 w-full max-w-xs sm:max-w-none self-center sm:w-fit bg-main text-white font-medium text-sm text-center rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            {t('Book Now')}
                          </button>
                        }
                      />
                    </div>
                  }
                </section>
              </>
            )}
          />
        </>
      </div>
    </PageLayout>
  );
}

export async function getServerSideProps(context) {
  const { query, locale } = context;
  let { packageId } = query;

  let PkgId, startDate, endDate;

  if (packageId.includes('&')) {
    const params = new URLSearchParams(packageId);
    PkgId = params.get('packageId');
    startDate = params.get('fromDate');
    endDate = params.get('toDate');
  }



  let resToSend;
  try {
    const response = await GetHotelDetailsWebsiteContent(PkgId, startDate, endDate, locale);

    if (response.data && response.data?.Data) {
      resToSend = response.data.Data;
    } else {
      throw new Error('not found');
    }
  } catch (error) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'messages'])),
      PkgDetails: resToSend,
      PkgId,
      startDate,
      endDate,
    },
  };
}

