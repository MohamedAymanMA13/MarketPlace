// TODO: update the image placeholder

import { useEffect,useState } from 'react';
import { PageLayout } from 'components/layout';
import { RoomTypeSec, StarRating, Timeline } from 'components/UI';
import HeartBtn from 'components/UI/HeartBtn/HeartBtn';
import ShareBtn from 'components/UI/ShareBtn/ShareBtn';
import BookingForm from 'components/UI/BookingForm/BookingForm';
import arrayMutators from 'final-form-arrays';
import { useAuth } from 'hooks/useAuth';
import { axios_instance as axios } from 'apis/axios-instance';
import {
  MinusIcon,
  PlusIcon,
} from '@heroicons/react/outline';
import Image from 'next/image';
import {Form, Field } from 'react-final-form';
import {
  TextField,
  DateField,
  FileUploadField,
  SelectField,
} from 'components/form';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { searchTransportation } from 'apis/services/packages';
import { isEmpty } from 'lodash';
import { PopoverBtn } from 'components/UI';
import addDays from 'date-fns/addDays';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css'


export default function PackageDetailsPage({ PkgDetails, PkgId,optionsFontSize }) {
  const { t } = useTranslation();
  const router = useRouter();
  const auth = useAuth();
  const [matchedDetails, setMatchedDetails] = useState({});
  const [reqLoading, setReqLoading] = useState(false);

const formatDateTime = (dateTime) => {
  const date = new Date(dateTime);
  const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
  const formattedDate = date.toLocaleDateString(undefined, options).replace(/\//g, '-');
  const formattedTime = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
  return ` ${formattedDate} , ${formattedTime}`;
};
console.log('%csrc\pages\transportationpackages\[packageId]\index.js:52 matchedDetails', 'color: #007acc;', matchedDetails);
  useEffect(() => {
    const foundDetail = PkgDetails.find(detail => detail.Id === parseInt(PkgId));
    if (foundDetail) {
      setMatchedDetails(foundDetail);
    }
  }, [PkgDetails, PkgId]);



  const submitHandler = async values => {
    console.log('%csrc\pages\cateringpackages\[packageId]\index.js:95 {...values, id: PkgDetails.ID ,startDate, endDate}', 'color: #007acc;', {
      NumberOfSeats:Number(values.NumberOfSeats),
      TransportationTravelId: Number(PkgId),
      Price:Number(matchedDetails.Price)

    });
  
    try {
      setReqLoading(true);
      const response = await axios.post('/Transportation/AddTransportationWebsiteReservation', {
        NumberOfSeats:Number(values.NumberOfSeats),
        TransportationTravelId: Number(PkgId),
        Price:Number(matchedDetails.Price)
      }, {
        headers: {
          authorization: 'Bearer ' + auth.user.Token,
        },
      });
  
      console.log('%csrc\pages\cateringpackages\[packageId]\index.js:99 response.data.Data', 'color: #007acc;', response.data.Data);
  
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
    <PageLayout >
      <div className="px-4 pt-6 pb-10 space-y-4">
        <div className="relative aspect-[12/5]  lg:aspect-[5/1] rounded-md overflow-hidden">
          <Image
            alt="package cover"
            src={matchedDetails?.HotelPagePhoto || '/transportationcards.jpg'}
            layout="fill"
            className="w-full h-full object-cover"
            priority
          />
        </div>
        <section className="py-2 px-3 bg-white rounded-md text-copy">
          <h3 className="text-sm md:text-base font-bold">
            {t('Transportation Details')}
          </h3>
          <div className="">
            <p className="flex flex-wrap  first-letter:uppercase font-bold  py-2 ">
             {t('Company Name')} : {matchedDetails?.CompanyName}
            </p>
            <p className="text-copy text-sm font-medium xl:text-base">
             <span className='font-semibold'>Address : </span>{matchedDetails?.Address}
            </p>
            <p className="text-copy text-sm font-medium xl:text-base">
             <span className='font-semibold'>Brand : </span>{matchedDetails?.Brand}
            </p>
            <div className="flex flex-wrap justify-center px-8 py-3">
              <div className="px-16">
                <p className="font-bold first-letter:uppercase">Departure</p>
                <p className="first-letter:uppercase">{matchedDetails?.FromCountryName} , {matchedDetails?.FromCityName}</p>
                <p className="first-letter:uppercase">{formatDateTime(matchedDetails?.DepartureDateTime)}</p>
              </div>
              <div className="px-16">
                <p className="font-bold first-letter:uppercase">Arrival</p>
                <p className="first-letter:uppercase">{matchedDetails?.ToCountryName} , {matchedDetails?.ToCityName}</p>
                <p className="first-letter:uppercase">{formatDateTime(matchedDetails?.ArrivalDateTime)}</p>
              </div>
            </div>
          </div>
        </section>

        <>
          <Form
            onSubmit={submitHandler}
            initialValues={{ }}
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

                <section className="py-2 px-3 bg-white rounded-md text-copy">
                  <h3 className="text-sm md:text-base font-bold">
                    {t('Seats')}
                  </h3>
                  <div className='w-full flex flex-wrap items-center justify-center'>
                    <div className='w-2/6'>
                      <Field
                        name="NumberOfSeats"
                        component={TextField}
                        label="No. Of Seats"
                        // validate={required}
                      />
                    </div>
                  </div>
                    {auth.user?.loggedIn ? 
                      <div className=" flex  items-center justify-center">
                        <div className='w-2/6'>
                          <button
                            type="button"
                            onClick={handleSubmit} // Call handleSubmit here
                            className="py-2 sm:px-8 lg:px-28 mt-4 w-full max-w-xs sm:max-w-none self-center  bg-main text-white font-medium text-sm text-center rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                            {reqLoading ? (
                              <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className='animate-spin h-5 w-5 mr-3 text-main'
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              ></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              ></path>
                            </svg>
                            ) : (
                              t('Book Now')
                            )}
                          </button>
                        </div>
                      </div>
                      :
                      <div className=" flex  items-center justify-center">
                        <div className='w-2/6'>
                          <PopoverBtn
                            triggerElement={
                              <button
                                type="button"
                                className="py-2 sm:px-8 lg:px-28 mt-4 w-full max-w-xs sm:max-w-none self-center  bg-main text-white font-medium text-sm text-center rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
                              >
                                {t('Book Now')}
                              </button>
                            }
                          />
                        </div>
                        
                    </div>
                    }                    
                </section>


             
                {/* <section className="py-2 px-3 bg-white rounded-md text-copy" >
                  <div className="mt-4 space-y-4 flex flex-col">
                    <BookingForm
                      handleSubmit={handleSubmit}
                      submitting={submitting}
                      pristine={pristine}
                      reqLoading={reqLoading}
                      change={change}
                    />
                  </div>
                </section> */}
              </>
            )}
          />
        </>
      </div>
    </PageLayout>
  );
}

export async function getServerSideProps(context) {
  const { params, locale } = context;
  // console.log(params);
  const PkgId = params.packageId;

  let resToSend;



  try {
    const response = await searchTransportation(PkgId ,locale);

    if (response.data && response.data?.data) {
      resToSend = response.data.data;
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
     
    },
  };
}

