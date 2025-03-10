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
import {GetCateringById} from 'apis/services/packages';
import { isEmpty } from 'lodash';
import addDays from 'date-fns/addDays';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'
import { PopoverBtn } from 'components/UI';

export default function PackageDetailsPage({ PkgDetails,optionsFontSize }) {
  const { t } = useTranslation();
  const router = useRouter();
  const auth = useAuth();
  const [reqLoading, setReqLoading] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(addDays(new Date(), 1));
  const [items, setItems] = useState([]);
  const [itemsCombo, setItemsCombo] = useState([]);

  useEffect(() => {
    if (PkgDetails?.CateringCategories) {
      const initialItems = PkgDetails.CateringCategories.flatMap(category =>
        category.items.map(item => ({
          id: item.ID,
          quantity: 0,
        }))
      );
      setItems(initialItems);
    }

    if (PkgDetails?.CateringCombos) {
      const initialCombos = PkgDetails.CateringCombos.map(combo => ({
        id: combo.ID,
        quantity: 0,
      }));
      setItemsCombo(initialCombos);
    }
  }, [PkgDetails]);

  const incrementItem = (id) => {
    setItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decrementItem = (id) => {
    setItems(prevItems =>
      prevItems.map(item =>
        item.id === id && item.quantity > 0 ? { ...item, quantity: item.quantity - 1 } : item
      )
    );
  };

  const incrementCombo = (id) => {
    setItemsCombo(prevCombos =>
      prevCombos.map(combo =>
        combo.id === id ? { ...combo, quantity: combo.quantity + 1 } : combo
      )
    );
  };

  const decrementCombo = (id) => {
    setItemsCombo(prevCombos =>
      prevCombos.map(combo =>
        combo.id === id && combo.quantity > 0 ? { ...combo, quantity: combo.quantity - 1 } : combo
      )
    );
  };

  const filteredItems = items.filter(item => item.quantity > 0);
  const filteredCombos = itemsCombo.filter(combo => combo.quantity > 0);

  const submitHandler = async values => {
    console.log('%csrc\pages\cateringpackages\[packageId]\index.js:95 {...values, id: PkgDetails.ID ,startDate, endDate}', 'color: #007acc;', {
      CateringCombos: filteredCombos,
      CateringItems: filteredItems,
      id: PkgDetails.ID,
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
    });
  
    try {
      setReqLoading(true);
      const response = await axios.post('/Catering/AddCateringWebsiteReservation', {
        CateringCombos: filteredCombos,
        CateringItems: filteredItems,
        id: PkgDetails.ID,
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
      }, {
        headers: {
          authorization: 'Bearer ' + auth.user.AccessToken,
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
        <div className="p-4 w-full bg-white rounded-md sm:flex sm:items-start sm:justify-between">
          <div>
            <h2 className="font-bold text-base md:text-lg xl:text-xl text-copy">
              {PkgDetails?.Name}
            </h2>
          </div>
          <div className="mt-4 flex items-center justify-between gap-4">
            <ShareBtn  />
          </div>
        </div>

        <div className="relative aspect-[12/9] sm:aspect-video lg:aspect-[3/1] rounded-md overflow-hidden">
          <Image
            alt="package cover"
            src={`${PkgDetails?.CompanyLogo}` || '/bg5.jpg'}
            layout="fill"
            className="w-full h-full "
            priority
          />
        </div>
        <section className="py-2 px-3 bg-white rounded-md text-copy">
          <h3 className="text-sm md:text-base font-bold">
            {t('Catering Details')}
          </h3>
          <div className="mt-2">
            Phone : {PkgDetails?.TelephoneNumber}
          </div>
          <div className="mt-2">
            Website : {PkgDetails?.Website}
          </div>
          <div className="mt-2">
            Email : {PkgDetails?.Email}
          </div>
          <div className="mt-2">
            Facebook : {PkgDetails?.Facebook}
          </div>
          <div className="mt-2">
            Instagram : {PkgDetails?.Instagram}
          </div>
          <div className="mt-2">
            cities : {' '}
            {PkgDetails?.FK_Cities?.map((city , i) => (
              <span key={i}>
                {city?.Value} , {' '}
              </span>
            ))}
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
               <section className="py-2 px-3 bg-white rounded-md text-copy" >
                  <h3 className="text-sm md:text-base font-bold">
                    {t('Choose Date')}
                  </h3>
                  <div className='w-full flex flex-wrap items-center justify-center'>
                    <div className='w-1/4 px-1'>
                      <label className='text-copy truncate font-medium text-xs 2xl:text-sm'>{t('from date')}</label>
                      <DatePicker
                        selected={startDate}
                        disabled={!auth.user?.loggedIn}
                        onChange={(date) => setStartDate(date)}
                        selectsStart
                        startDate={startDate}
                        endDate={endDate}
                        className={`mt-1 form__input ${optionsFontSize || ''}`}
                        wrapperClassName='react-datepicker-wrapper'
                      />
                    </div>
                    <div className='w-1/4 px-1'>
                      <label className='text-copy truncate font-medium text-xs 2xl:text-sm'>{t('to Date')}</label>
                      <DatePicker
                        selected={endDate}
                        disabled={!auth.user?.loggedIn}
                        onChange={(date) => setEndDate(date)}
                        selectsEnd
                        startDate={startDate}
                        endDate={endDate}
                        minDate={startDate}
                        className={`mt-1 form__input ${optionsFontSize || ''}`}
                        wrapperClassName='react-datepicker-wrapper'
                      />
                    </div>
                  </div>
                </section>

                <section className="py-2 px-3 bg-white rounded-md text-copy">
                  <h3 className="text-sm md:text-base font-bold">
                    {t('Catering Category')}
                  </h3>
                  {PkgDetails?.CateringCategories?.map((category) => (
                    <div key={category?.ID} className="mb-8">
                      <h2 className="text-center text-sm font-bold mb-4"> {category?.Category}</h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 ">
                        {category?.items?.map((item) => (
                          <div key={item?.ID} className="max-w-sm rounded overflow-hidden shadow-lg mx-4 my-4 flex flex-col">
                            <a className="block relative aspect-[10/5] sm:aspect-[10/6]">
                                <Image
                                  alt={`${item?.item} cover`}
                                  src={`${item?.img}` || '/bg3.jpg'}
                                  layout="fill"
                                  className="w-full h-full object-cover"
                                />
                              </a>
                              <div className="p-4 flex-1">
                                <h3 className="text-lg font-semibold"> {item?.item}</h3>
                                <p className="text-gray-700">{item?.Description}</p>
                              </div>
                              <div className="p-4 mt-auto flex items-center justify-between">
                                <p className="text-main text-lg font-bold">
                                  Price: {item?.Price}
                                </p>
                                <div className="text-copy text-sm flex items-center gap-1">
                                  <button 
                                    onClick={() => decrementItem(item.ID)}
                                    disabled={!auth.user?.loggedIn}
                                    className="text-gray-500 border p-2"
                                  >
                                    <MinusIcon className="h-5 w-5" />
                                  </button>
                                  <span className="mx-4 text-main text-lg font-bold">{items.find(i => i.id === item.ID)?.quantity || 0}</span>
                                  <button 
                                    onClick={() => incrementItem(item.ID)}
                                    disabled={!auth.user?.loggedIn}
                                    className="text-gray-500 border p-2"
                                  >
                                    <PlusIcon className="h-5 w-5" />
                                  </button>
                                </div>
                              </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </section>

                <section className="py-2 px-3 bg-white rounded-md text-copy">
                  <h3 className="text-sm md:text-base font-bold">
                    {t('Catering Combo')}
                  </h3>
                    <div  className="mb-8">
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 ">
                      {PkgDetails?.CateringCombos.map((combo) => (
                        <div key={combo?.ID} className="max-w-sm rounded overflow-hidden shadow-lg mx-4 my-4 flex flex-col">
                          <a className="block relative aspect-[10/5] sm:aspect-[10/6]">
                            <Image
                              alt={`${combo?.Name} cover`}
                              src={`${combo?.Photo}` || '/bg3.jpg'}
                              layout="fill"
                              className="w-full h-full object-cover"
                            />
                          </a>
                          <div className="p-4 flex-1">
                            <h3 className="text-lg font-semibold"> {combo?.Name}</h3>
                            {combo?.items?.map((item) => (
                              
                                <p className="text-gray-700" key={item?.ID}>{item?.item}</p>
                              
                            ))}
                          </div>
                          <div className="p-4 mt-auto flex items-center justify-between">
                            <p className="text-main text-lg font-bold">
                              Price: {combo?.Price}
                            </p>
                            <div className="text-copy text-sm flex items-center gap-1">
                              <button 
                                onClick={() => decrementCombo(combo.ID)}
                                className="text-gray-500 border p-2"
                                disabled={!auth.user?.loggedIn}
                              >
                                <MinusIcon className="h-5 w-5" />
                              </button>
                              <span className="mx-4 text-main text-lg font-bold">{itemsCombo.find(i => i.id === combo.ID)?.quantity || 0}</span>
                              <button 
                                onClick={() => incrementCombo(combo.ID)}
                                disabled={!auth.user?.loggedIn}
                                className="text-gray-500 border p-2"
                              >
                                <PlusIcon className="h-5 w-5" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                      </div>
                    </div>
                    {auth.user?.loggedIn ? 
                      <div className="sm:self-end flex gap-4 items-center justify-center">
                        <button
                          type="button"
                          onClick={handleSubmit} // Call handleSubmit here
                          className="py-2 sm:px-8 lg:px-28 mt-4 w-full max-w-xs sm:max-w-none self-center sm:w-fit bg-main text-white font-medium text-sm text-center rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
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
    const response = await GetCateringById(PkgId, locale);

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

    },
  };
}

