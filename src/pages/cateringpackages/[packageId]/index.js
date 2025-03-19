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
        category.CateringCategoryItems.map(item => ({
          id: item.Id,
          quantity: 0,
        }))
      );
      setItems(initialItems);
    }

    if (PkgDetails?.CateringCombos) {
      const initialCombos = PkgDetails.CateringCombos.map(combo => ({
        id: combo.Id,
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
      id: PkgDetails.Id,
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
    });
  
    try {
      setReqLoading(true);
      const response = await axios.post('/Catering/AddCateringWebsiteReservation', {
        CateringCombos: filteredCombos,
        CateringItems: filteredItems,
        id: PkgDetails.Id,
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
      }, {
        headers: {
          authorization: 'Bearer ' + auth.user.AccessToken,
        },
      });
  
      console.log('%csrc\pages\cateringpackages\[packageId]\index.js:99 response.data.Data', 'color: #007acc;', response.data.data);
  
      if (response.data.data) {
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

       
        <section className="py-2 px-3 bg-white rounded-md text-copy">
        <div className="relative w-[200px] mb-3 h-[200px] aspect-[12/9] sm:aspect-video lg:aspect-[3/1] rounded-md overflow-hidden">
          <Image
            alt="package cover"
            src={`http://gammats.com:7009/be/${PkgDetails?.Photo}` || '/bg5.jpg'}
            layout="fill"
            className=" w-[400px] h-[400px] min-h-fit "
            priority
            width={'400px'}
            height={'400px'}
          />
        </div>
          <h3 className="text-sm md:text-base font-bold">
            {t('Catering Details')}
          </h3>
          <div className="mt-2">
            Phone : {PkgDetails?.PhoneNumber}
          </div>
          <div className="mt-2">
            Website : {PkgDetails?.Website}
          </div>
          <div className="mt-2">
            Email : {PkgDetails?.Email}
          </div>
          <div className="mt-2">
            Facebook : {PkgDetails?.FacebookLink}
          </div>
          <div className="mt-2">
            Instagram : {PkgDetails?.InstagramLink}
          </div>
          <div className="mt-2">
            cities : {' '}
            {PkgDetails?.CateringCities?.map((city , i) => (
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
               {/* <section className="py-2 px-3 bg-white rounded-md text-copy" >
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
                </section> */}

                <section className="py-2 px-3 bg-white rounded-md text-copy">
                  <h3 className="text-sm md:text-base font-bold">
                    {t('Catering Category')}
                  </h3>
                  {PkgDetails?.CateringCategories?.map((category) => (
                    <div key={category?.Id} className="mb-8">
                      <h2 className="text-center text-sm font-bold mb-4"> {category?.Name}</h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 ">
                        {category?.CateringCategoryItems?.map((item) => (
                          <div key={item?.Id} className="max-w-sm rounded overflow-hidden shadow-lg mx-4 my-4 flex flex-col">
                            <a className="block relative aspect-[10/5] sm:aspect-[10/6]">
                                <Image
                                  alt={`${item?.item} cover`}
                                  src={`http://gammats.com:7009/be/${item?.Photo}` || '/bg3.jpg'}
                                  layout="fill"
                                  className="w-full h-full object-cover"
                                />
                              </a>
                              <div className="p-4 flex-1">
                                <h3 className="text-lg font-semibold"> {item?.Name}</h3>
                                <p className="text-gray-700">{item?.Description}</p>
                              </div>
                              <div className="p-4 mt-auto flex items-center justify-between">
                                <p className="text-main text-lg font-bold">
                                  Price: {item?.Price}
                                </p>
                                {/* <div className="text-copy text-sm flex items-center gap-1">
                                  <button 
                                    onClick={() => decrementItem(item.Id)}
                                    disabled={!auth.user?.loggedIn}
                                    className="text-gray-500 border p-2"
                                  >
                                    <MinusIcon className="h-5 w-5" />
                                  </button>
                                  <span className="mx-4 text-main text-lg font-bold">{items.find(i => i.id === item.Id)?.quantity || 0}</span>
                                  <button 
                                    onClick={() => incrementItem(item.Id)}
                                    disabled={!auth.user?.loggedIn}
                                    className="text-gray-500 border p-2"
                                  >
                                    <PlusIcon className="h-5 w-5" />
                                  </button>
                                </div> */}
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
                    {<div  className="mb-8">
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 ">
                      {PkgDetails?.CateringCombos.map((combo) => (
                        <div key={combo?.iD} className="max-w-sm rounded overflow-hidden shadow-lg mx-4 my-4 flex flex-col">
                          <a className="block relative aspect-[10/5] sm:aspect-[10/6]">
                            <Image
                              alt={`${combo?.Name} cover`}
                              src={`http://gammats.com:7009/be/${combo?.Photo}` || '/bg3.jpg'}
                              layout="fill"
                              className="w-full h-full object-cover"
                            />
                          </a>
                          <div className="p-4 flex-1">
                            <h3 className="text-lg font-semibold"> {combo?.Name}</h3>
                            {combo?.CateringComboItems?.map((item) => (
                              
                                <p className="text-gray-700" key={item?.Id}>{item?.Name}</p>
                              
                            ))}
                          </div>
                          <div className="p-4 mt-auto flex items-center justify-between">
                            <p className="text-main text-lg font-bold">
                              Price: {combo?.Price}
                            </p>
                            {/* <div className="text-copy text-sm flex items-center gap-1">
                              <button 
                                onClick={() => decrementCombo(combo.id)}
                                className="text-gray-500 border p-2"
                                disabled={!auth.user?.loggedIn}
                              >
                                <MinusIcon className="h-5 w-5" />
                              </button>
                              <span className="mx-4 text-main text-lg font-bold">{itemsCombo.find(i => i.id === combo.id)?.quantity || 0}</span>
                              <button 
                                onClick={() => incrementCombo(combo.Id)}
                                disabled={!auth.user?.loggedIn}
                                className="text-gray-500 border p-2"
                              >
                                <PlusIcon className="h-5 w-5" />
                              </button>
                            </div> */}
                          </div>
                        </div>
                      ))}
                      </div>
                    </div>}
                    



                    
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

