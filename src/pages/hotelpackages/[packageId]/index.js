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
import { URLSearchParams } from 'next/dist/compiled/@edge-runtime/primitives/url';

export default function PackageDetailsPage({ PkgDetails, Id ,startDate, endDate}) {
  const { t } = useTranslation();
  const router = useRouter();
  const auth = useAuth();

  const [detailsValue, setDetailsValue] = useState([]);
  // const [matchedDetails, setMatchedDetails] = useState(null);
  // const [numberOfRooms, setNumberOfRooms] = useState(PkgDetails.map(() => 0));
  const [reqLoading, setReqLoading] = useState(false);

  // const valuesToSubmit = {
  //   hotelName: -1,
  //   location: 0,
  //   rating: -1,
  //   from_date: startDate,
  //   to_date: endDate,
  // };

  useEffect(() => {
    async function fetchDetails() {
      try {
        const response = await axios.get(`/Hotel/${Id}/rooms-pricing-for-reservation?checkin=${startDate}&checkout=${endDate}`)
        setDetailsValue(response.data?.data);
      } catch (error) {
        console.error('Error fetching details:', error);
      }
    }
    fetchDetails();
  }, []);
console.log(detailsValue,'detailsValue')
  // useEffect(() => {
  //   const foundDetail = detailsValue.find(detail => detail.ID === parseInt(PkgId));
  //   if (foundDetail) {
  //     setMatchedDetails(foundDetail);
  //   }
  // }, [detailsValue, PkgId]);

  const getStarRating = (rating) => {
      return rating
  };
  const calculateNights = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const timeDiff = end - start;
    const nights = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
    return nights;
  };
  const NumberOfNight =calculateNights(startDate, endDate)

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


    useEffect(async () => {
      console.log("herre")
      const res = await axios.get(`/Hotel/${Id}/rooms-pricing-for-reservation?checkin=${startDate}&checkout=${endDate}`)
      console.log(res, "res")

    } ,[])


  try {
    setReqLoading(true);
    const response = await axios.post('/Hotel/AddHotelWebsiteReservation', {reservationHotelCompanions :values.reservationPackageCompanions, hotelID : matchedDetails.ID , roomTypes ,startDate, endDate}, {
      headers: {
        authorization: 'Bearer ' + auth.user.AccessToken,
      },
    });
    if (response.data.Data) {
      router.push('/'); 
    } else {
      toast.error(response.data.Message);  
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



const [selectedRooms, setSelectedRooms] = useState([]);

useEffect(() => {
    if (detailsValue) {
        setSelectedRooms(
          detailsValue.map((room) => ({
                id: room.Id,
                count: 0,
                extras: [],
                RoomPrice: room.OriginalTotalPrice,
                ExtraBedPrice: room.ExtraBedPrice,
                LunchPrice: room.LunchPrice,
                DinnerPrice: room.DinnerPrice,
            }))
        );
    }
}, [detailsValue]);

const updateCount = (id, change) => {
    setSelectedRooms(prevRooms =>
        prevRooms.map(room =>
            room.id === id ? { ...room, count: Math.max(0, room.count + change) } : room
        )
    );
};

const toggleExtra = (roomId, extra) => {
    setSelectedRooms(prevRooms =>
        prevRooms.map(room =>
            room.id === roomId
                ? {
                    ...room,
                    extras: room.extras.includes(extra)
                        ? room.extras.filter(e => e !== extra) // Remove if exists
                        : [...room.extras, extra], // Add if not exists
                }
                : room
        )
    );
};

const calculateTotalPrice = (room) => {
    const selectedRoom = selectedRooms.find(r => r.id === room.Id);
    if (!selectedRoom) return room.OriginalTotalPrice || 0;

    const basePrice = room.OriginalTotalPrice || 0;
    const selectedExtras = selectedRoom.extras;
    const extraCost = selectedExtras.reduce((sum, extra) => {
        const extraValue = room[extra];
        return sum + (typeof extraValue === 'number' ? extraValue : 0);
    }, 0);

    return (basePrice + extraCost) * selectedRoom.count;
};

const services = ['ExtraBedPrice', 'LunchPrice', 'DinnerPrice'];

  return (
    <PageLayout >
      <div className="px-4 pt-6 pb-10 space-y-4">
        <div className="p-4 w-full bg-white rounded-md sm:flex sm:items-start sm:justify-between">
          <div>
            <StarRating filledStars={getStarRating(PkgDetails?.HotelDetails?.Rating)} />
            <h2 className="font-bold text-base md:text-lg xl:text-xl text-copy">
              {PkgDetails?.HotelDetails?.Name}
            </h2>
            <div className="mt-2 flex items-center justify-between sm:flex-col sm:items-start sm:gap-2">
              <p className="text-copy text-sm font-medium xl:text-base">
                {PkgDetails?.HotelDetails?.CityName} , {PkgDetails?.HotelDetails?.CountryName}
              </p>
              <p className="text-copy text-sm font-medium xl:text-base">
                {calculateNights(startDate, endDate)} {t('Nights')}
              </p>
            </div>
          </div>
        </div>
        <div className="relative aspect-[12/9] sm:aspect-video lg:aspect-[3/1] rounded-md overflow-hidden">
          <Image
            alt="package cover"
            src={`http://gammats.com:7009/be/${PkgDetails?.HotelDetails?.Paths[0]}` || '/bg5.jpg'}
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
            <span className='font-bold'>Address</span> : {PkgDetails?.HotelDetails?.Address}
          </div>
          <div className="mt-2">
            <span className='font-bold'>Closest Landmark</span> : {PkgDetails?.HotelDetails?.ClosestLandmark1}
          </div>
          <div className="mt-2">
            <span className='font-bold'>Website</span> : {PkgDetails?.HotelDetails?.Website}
          </div>
          <div className="mt-2">
            <span className='font-bold'>Description</span> : {PkgDetails?.HotelDetails?.Description}
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
              <div className=" rounded-xl bg-white py-5 px-4">
                <h1 className="font-bold mb-2">Seasons</h1>
        {detailsValue?.length ? (
          detailsValue.map((room) => {
            const selectedRoom = selectedRooms.find(r => r.id === room.Id) || {
              count: 1,
              extras: ['ExtraBedPrice' , 'LunchPrice' , 'DinnerPrice'] ,
            }

            return (
              <div key={room.Id} className="p-4 mb-4 border rounded-xl bg-[#F0EDF5] shadow-sm">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-sm ">
                    {room.RoomType} {t('Room')}
                  </h3>
                  <div className="flex gap-4 flex-wrap">
                    {services.map(service => {
                      const isActive = selectedRoom.extras.includes(service )
                      const color = isActive
                        ? 'bg-[#6a55a0]  text-white  border-[#6a55a0]  border-white'
                        : 'bg-[#F0EDF5] text-[#6A55A0] border-[#6A55A0] hover:bg-[#6a55a0] hover:text-white'

                      return (
                        <button
                          key={service}
                          type="button"
                          className={`border px-4 py-2 rounded-xl text-sm ${color}`}
                          onClick={() =>
                            toggleExtra(
                              room.Id,
                              service
                            )
                          }>
                          {service.replace('Price', '')}
                          <br />
                          {room[service]} {t('EGP/Night')}
                        </button>
                      )
                    })}
                  </div>
                  <div className="flex w-[150px] justify-center items-center flex-col ">
                    <p className="text-sm ">{t('Total Price')}</p>
                    <span className="text-sm py-1 font-bold">
                      {calculateTotalPrice(room)} {t('EGP/Night')}
                    </span>
                    <div className="flex justify-center items-center">
                      <div className="flex items-center gap-2">
                        <button className="" type="button" onClick={() => updateCount(room.Id, -1)}>
                          {/* <img src={minus} alt="minus" className="mx-1 w-7 h-7" /> */}
                          -
                        </button>
                        <span className=" text-sm">{selectedRoom.count}</span>
                        <button className="" type="button" onClick={() => updateCount(room.Id, 1)}>
                          {/* <img src={plus} alt="plus" className="mx-1 w-7 h-7" /> */}
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })
        ) : (
          <p className="text-center text-gray-500">{t('No rooms available')}</p>
        )}
      </div>
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

  let PkgId, startDate, endDate, Id;

  if (packageId.includes('&')) {
    const params = new URLSearchParams(packageId);
    PkgId = params.get('packageId');
    startDate = params.get('fromDate');
    endDate = params.get('toDate');
    Id = params.get('Id');
  }



  let resToSend;
  try {
    const response = await GetHotelDetailsWebsiteContent(PkgId);

    if (response.data && response.data?.Items) {
      resToSend = response.data.Items;
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
      Id
    },
  };
}

