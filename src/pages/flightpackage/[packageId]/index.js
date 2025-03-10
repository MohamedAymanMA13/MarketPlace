import { useEffect, useState } from 'react';
import { PageLayout } from 'components/layout';
import { RoomTypeSec, StarRating, Timeline } from 'components/UI';
import HeartBtn from 'components/UI/HeartBtn/HeartBtn';
import ShareBtn from 'components/UI/ShareBtn/ShareBtn';
import BookingForm from 'components/UI/BookingForm/BookingForm';
import { Form } from 'react-final-form';
import arrayMutators from 'final-form-arrays';
import { useAuth } from 'hooks/useAuth';
import { axios_instance as axios } from 'apis/axios-instance';
import { MinusIcon, PlusIcon } from '@heroicons/react/outline';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { GetFlightTypeStructure, searchHotels } from 'apis/services/packages';
import { isEmpty } from 'lodash';
import { PopoverBtn } from 'components/UI';

export default function PackageDetailsPage({
  PkgDetails,
  PkgId,
  ID,
  DepartureAirport,
  ArrivalAirport,
  AircraftType,
  BusinessClassPrice,
  EconomyClassPrice,
}) {
  const { t } = useTranslation();
  const router = useRouter();
  const auth = useAuth();
  const [reqLoading, setReqLoading] = useState(false);
  const [seatSelect, setSeatSelect] = useState([]); // State to store selected seats
  const [selectedClass, setSelectedClass] = useState({ price: "", name: "" }); // State to store selected class

  console.log(
    '%csrc\\pages\\flightpackage\\[packageId]\\index.js:26 seatSelect',
    'color: #007acc;',
    selectedClass
  );

  const handleSeatClick = (seat) => {
    if (seat.status === 0) {
      setSeatSelect((prevSeatSelect) => {
        // Check if the seat is already selected
        const isSelected = prevSeatSelect.some((s) => s.id === seat.id);
        if (isSelected) {
          // If already selected, remove it from the selection
          return prevSeatSelect.filter((s) => s.id !== seat.id);
        } else {
          // If not selected, add it to the selection
          return [...prevSeatSelect, { id: seat.id }];
        }
      });
    }
  };

  const isSeatSelected = (seatId) => seatSelect.some((s) => s.id === seatId);

  console.log(
    '%csrc\\pages\\flightpackage\\[packageId]\\index.js:30 PkgDetails',
    'color: #007acc;',
    PkgDetails
  );

  const submitHandler = async (values) => {
   

    console.log(
      '%csrc\\pages\\hotelpackages\\[packageId]\\index.js:90 values',
      'color: #007acc;',
      {
        reservationHotelCompanions: values.reservationPackageCompanions,
        id: ID,
        seatSelect,
        price:selectedClass.price,
        className:selectedClass.name

      }
    );

    try {
      setReqLoading(true);
      const response = await axios.post('/Flight/AddFlightWebsiteReservation', {
        reservationHotelCompanions: values.reservationPackageCompanions,
        id: ID,
        seatSelect,
        price:selectedClass.price,
        className:selectedClass.name
      }, {
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
      // Handle the error
      const errorMsg = httpErrorHandler(
        error,
        t('Booking Failed. Please try again!', {
          ns: 'messages',
        })
      );
      toast.error(errorMsg);
    } finally {
      setReqLoading(false);
    }
  };

  return (
    <PageLayout>
      <div className="px-4 pt-6 pb-10 space-y-4">
        <div className="p-4 w-full bg-white rounded-md sm:flex sm:items-start sm:justify-between">
          <div>
            <h2 className="font-bold text-base md:text-lg xl:text-xl text-copy">
              {AircraftType}
            </h2>
            <div className="mt-2 flex items-center justify-between sm:flex-col sm:items-start sm:gap-2">
              <p className="text-copy text-sm font-medium xl:text-base">
                {/* {matchedDetails?.City} , {matchedDetails?.Country} */}
              </p>
              <p className="text-copy text-sm font-medium xl:text-base">
                {/* {calculateNights(startDate, endDate)} {t('Nights')} */}
              </p>
            </div>
          </div>
          <div className="mt-4 flex items-center justify-between gap-4">
            <ShareBtn />
          </div>
        </div>

        <div className="relative aspect-[12/9] sm:aspect-video lg:aspect-[3/1] rounded-md overflow-hidden">
          <Image
            alt="package cover"
            src={PkgDetails?.photo || '/f.jpg'}
            layout="fill"
            className="w-full h-full object-cover"
            priority
          />
        </div>
        <section className="py-2 px-3 bg-white rounded-md text-copy">
          <h3 className="text-sm md:text-base font-bold">{t('Flights Details')}</h3>
          <div className="mt-2">
            {/* {matchedDetails?.Description} */}
            <div className="flex flex-wrap justify-center px-8">
              <div className="px-16">
                <p className="font-bold first-letter:uppercase">Departure Airport</p>
                <p className="first-letter:uppercase">{DepartureAirport}</p>
              </div>
              <div className="px-16">
                <p className="font-bold first-letter:uppercase">Arrival Airport</p>
                <p className="first-letter:uppercase">{ArrivalAirport}</p>
              </div>
            </div>
          </div>
        </section>
        {isEmpty(PkgDetails.roomTypes) ? null : (
          <section className="py-4 px-3 bg-white rounded-md text-copy">
            <h3 className="text-sm md:text-base font-bold">{t('Select Room Type')}</h3>

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
                <section className="py-2 px-3 bg-white rounded-md text-copy ">
                  <h3 className="text-sm md:text-base font-bold">{t('Select Class')}</h3>
                  <div className="mt-2 flex gap-4 justify-center">
                    <label className='px-10'>
                      <input
                        type="radio"
                        name="BusinessClass"
                        value={BusinessClassPrice}
                        checked={selectedClass.price === BusinessClassPrice}
                        onChange={() => setSelectedClass({ price: BusinessClassPrice, name: 'Business Class' })}
                        className="mr-2"
                      />
                      Business Class Price: <span className='font-bold'>{BusinessClassPrice}</span>
                    </label>
                    <label className='px-10'>
                      <input
                        type="radio"
                        name="EconomyClass"
                        value={EconomyClassPrice}
                        checked={selectedClass.price === EconomyClassPrice}
                        onChange={() => setSelectedClass({ price: EconomyClassPrice, name: 'Economy Class' })}
                        className="mr-2"
                      />
                      Economy Class Price: <span className='font-bold'>{EconomyClassPrice}</span>
                    </label>
                  </div>
                </section>
                <section className="py-2 px-3 bg-white rounded-md text-copy ">
                  <h3 className="text-sm md:text-base font-bold">{t('Select Seats')}</h3>
                  <div className="p-4">
                    {PkgDetails.rows.map((row, rowIndex) => (
                      <div key={rowIndex} className={`grid grid-cols-${PkgDetails.columns.length} gap-2 mb-2 mx-100`}>
                        {row.seats.map((seat, seatIndex) => (
                          <div
                            key={seatIndex}
                            className={`text-center p-2 rounded-lg cursor-pointer 
                              ${seat.status === 0 ? 'bg-green-200' : ''}
                              ${seat.status === 1 ? 'bg-yellow-200' : ''}
                              ${seat.status === 2 ? 'bg-red-200' : ''}
                              ${isSeatSelected(seat.id) ? '!bg-blue-500 !text-white' : ''}
                              hover:bg-blue-200`}
                            onClick={() => handleSeatClick(seat)}
                          >
                            {seat.name}
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                </section>
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

  let PkgId, ID, DepartureAirport, ArrivalAirport, AircraftType, BusinessClassPrice, EconomyClassPrice;

  if (packageId.includes('&')) {
    const params = new URLSearchParams(packageId);
    PkgId = params.get('packageId');
    ID = params.get('ID');
    DepartureAirport = params.get('DepartureAirport');
    ArrivalAirport = params.get('ArrivalAirport');
    AircraftType = params.get('AircraftType');
    BusinessClassPrice = params.get('BusinessClassPrice');
    EconomyClassPrice = params.get('EconomyClassPrice');
  }

  let resToSend;
  try {
    const response = await GetFlightTypeStructure(PkgId, locale);
    console.log('%csrc\\pages\\flightpackage\\[packageId]\\index.js:213 object', 'color: #007acc;', response);
    if (response.data && response.data?.Data) {
      resToSend = response.data.Data;
    } else {
      throw new Error('not found');
    }
  } catch (error) {
    console.log('%csrc\\pages\\flightpackage\\[packageId]\\index.js:213 object', 'color: #007acc;', error);

    return {
      notFound: true,
    };
  }

  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'messages'])),
      PkgDetails: resToSend,
      PkgId,
      ID,
      DepartureAirport,
      ArrivalAirport,
      AircraftType,
      BusinessClassPrice,
      EconomyClassPrice,
    },
  };
}
