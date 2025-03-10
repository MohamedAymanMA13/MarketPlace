import { useState, useEffect } from 'react';

import { PageLayout } from 'components/layout';
import { FiltersPane, CustomModal, ResultsSectionHotel } from 'components/UI';
import { useConfig } from 'hooks/useConfig';
import { axios_instance as axios } from 'apis/axios-instance';
import { searchCatering} from 'apis/services/packages';
import { GetCountries, GetCities  } from 'apis/services/config';
import {
  HomeSearchForm,
} from 'components/UI';
import { AdjustmentsIcon } from '@heroicons/react/outline';
import { Form, Field } from 'react-final-form';
import { useRouter } from 'next/router';
import { isEmpty } from 'lodash';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import {
  TextField,
  DateField,
  FileUploadField,
  SelectField,
} from 'components/form';
import {
  LocationMarkerIcon,
  MinusIcon,
  PlusIcon,
} from '@heroicons/react/outline';
import { CustomDateRange } from 'components/UI';
import addDays from 'date-fns/addDays';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'

export default function Catering({ response,optionsFontSize }) {
  const { t } = useTranslation();
  const config = useConfig();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [cities, setCities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const Cuisine = [
    { ID: 'International', Value: 'International' },
    { ID: 'Egyptian', Value: 'Egyptian' },
    { ID: 'Italian', Value: 'Italian' },
    { ID: 'Asian', Value: 'Asian' },
    { ID: 'oriental', Value: 'oriental' }
  ];
  useEffect(() => {
    if (selectedCountry) {
      async function fetchCities() {
        try {
          const response = await GetCities(selectedCountry);
          setCities(response.data?.Data);
        } catch (error) {
          console.error('Error fetching cities:', error);
        }
      }
      fetchCities();
    } else {
      setCities([]); 
    }
  }, [selectedCountry]);

  const toggleModal = () => {
    setIsOpen(prevState => !prevState);
  };

  const submitHandler = async (values) => {
    console.log('Form Submitted:', values);


    router.push({
      pathname: '/catering',
      query: values,
    });
  };

  useEffect(() => {
    if (isLoading && response) {
      setIsLoading(false);
    }
  }, [isLoading, response]);

  return (
    <>
      <PageLayout pageTitle={t('Catering Packages')}>
        <section className="relative w-full h-32 md:h-48 lg:h-60 bg-catering bg-cover bg-bottom bg-no-repeat">
          <div className="bg-main/50 w-full h-full flex items-center">
            <h2 className="px-6 md:px-8 lg:px-16 text-2xl md:text-3xl  lg:text-4xl text-white font-bold">
              {t('Catering')}
            </h2>
          </div>
        </section>

        <Form
          onSubmit={submitHandler}
          initialValues={{}}
          render={({
            handleSubmit,
            submitting,
            pristine,
            values,
            form: { reset },
          }) => (
            <form onSubmit={handleSubmit} id="hotel_form">
              <div className="px-3 pb-4 md:pb-6 lg:pb-8 md:px-6 lg:px-8 mx-4 sm:mx-auto mt-4 md:mt-6 lg:mt-8 gap-4 grid grid-cols-1 sm:grid-cols-[208px_1fr] md:grid-cols-[240px_1fr] lg:grid-cols-[288px_1fr]">
              <section
                className={`py-4 px-3 md:px-4 sm:block bg-white shadow-sm rounded-md h-max flex flex-col ${
                  isOpen ? 'w-72' : 'hidden'
                }`}
              >
                <h3 className="font-bold text-sm md:text-base lg:text-lg">
                  {t('Filters')}
                </h3>
                  <div>
                  <div>
                    <div className="mt-2 space-y-2">
                      <Field
                        name="country"
                        component={SelectField}
                        label="Country"
                        options={config.tables?.fromCountries}
                        firstNoOption="Select Countries"
                        onChangeCustom={(value) => setSelectedCountry(value)}
                      />
                    </div>
                    <div className="mt-2 space-y-2">
                      <Field
                        name="city"
                        component={SelectField}
                        label="Cities"
                        firstNoOption="Select Cities"
                        options={cities}
                        // validate={required}
                      />
                    </div>
                    <div className="mt-2 space-y-2">
                      <Field
                        name="coverage"
                        component={SelectField}
                        label="Coverage"
                        firstNoOption="Select Coverage"
                        options={config.tables?.coverages}
                        // validate={required}
                      />
                    </div>
                    <div className="mt-2 space-y-2">
                      <Field
                        name="cuisine"
                        component={SelectField}
                        label="Cuisine"
                        firstNoOption="Select Cuisine"
                        options={Cuisine}
                        // validate={required}
                      />
                    </div>

                  </div>
                </div>
                <button
                  className="py-1 mt-6 w-3/4 self-center sm:w-full bg-main text-white font-medium text-sm text-center rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
                  type="submit"
                >
                  {t('Search')}
                </button>
                <button
                  type="button"
                  className="py-1 mt-3 w-3/4 self-center sm:w-full bg-white text-red-500 border border-red-500 font-medium text-sm text-center rounded-md hover:bg-red-500 hover:text-white"
                  onClick={reset}
                >
                  {t('Reset')}
                </button>
              </section>

                <div>
                  {/* <div className="p-4 mx-auto max-w-sm sm:max-w-full bg-white rounded-md sm:flex sm:items-center sm:justify-between sm:gap-3 md:gap-2">
                    <div className='w-full flex flex-wrap '>
                        <div className='w-1/4 px-1'>
                          <Field
                            name="country"
                            component={SelectField}
                            label="Countries"
                            options={config.tables?.fromCountries}
                            firstNoOption="Select Countries"
                            onChangeCustom={(value) => setSelectedCountry(value)}
                          />
                        </div>
                        <div className='w-1/4 px-1'>
                          <Field
                            name="city"
                            component={SelectField}
                            label="Cities"
                            firstNoOption="Select Cities"
                            options={cities}
                          />
                        </div>
                        <div className='w-1/4 px-1'>
                          <Field
                            name="coverage"
                            component={SelectField}
                            label="Coverage"
                            firstNoOption="Select Coverage"
                            options={config.tables?.coverages}
                          />
                        </div>
                        <div className='w-1/4 px-1'>
                          <Field
                            name="cuisine"
                            component={SelectField}
                            label="Cuisine"
                            firstNoOption="Select Cuisine"
                            options={Cuisine}
                          />
                        </div>

                        <div className='w-full px-1 py-1 mt-6 flex justify-end place-content-end		'>
                          <button
                            className=" w-32 h-8 bg-main text-white font-medium text-sm text-center rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
                            type="submit"
                          >
                            {t('Search')}
                          </button>
                        </div>
                        
                    </div>
                  </div> */}

                  {/* {JSON.stringify(response)} */}
                  <ResultsSectionHotel
                    Packages={response}
                    isLoading={isLoading}
                    // success={success}
                  />
                </div>
              </div>

              <CustomModal isOpen={isOpen} toggleModalHandler={toggleModal}>
                <section
                  className={`py-4 px-3 md:px-4 sm:block bg-white shadow-sm rounded-md h-max flex flex-col ${
                    isOpen ? 'w-72' : 'hidden'
                  }`}
                >
                  <h3 className="font-bold text-sm md:text-base lg:text-lg">
                    {t('Filters')}
                  </h3>
                    <div>
                    <div>
                      <div className="mt-2 space-y-2">
                        <Field
                          name="country"
                          component={SelectField}
                          label="Country"
                          options={config.tables?.fromCountries}
                          firstNoOption="Select Countries"
                          onChangeCustom={(value) => setSelectedCountry(value)}
                        />
                      </div>
                      <div className="mt-2 space-y-2">
                        <Field
                          name="city"
                          component={SelectField}
                          label="Cities"
                          firstNoOption="Select Cities"
                          options={cities}
                          // validate={required}
                        />
                      </div>
                      <div className="mt-2 space-y-2">
                        <Field
                          name="coverage"
                          component={SelectField}
                          label="Coverage"
                          firstNoOption="Select Coverage"
                          options={config.tables?.coverages}
                          // validate={required}
                        />
                      </div>
                      <div className="mt-2 space-y-2">
                        <Field
                          name="cuisine"
                          component={SelectField}
                          label="Cuisine"
                          firstNoOption="Select Cuisine"
                          options={Cuisine}
                          // validate={required}
                        />
                      </div>

                    </div>
                  </div>
                  <button
                    className="py-1 mt-6 w-3/4 self-center sm:w-full bg-main text-white font-medium text-sm text-center rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
                    type="submit"
                  >
                    {t('Search')}
                  </button>
                  <button
                    type="button"
                    className="py-1 mt-3 w-3/4 self-center sm:w-full bg-white text-red-500 border border-red-500 font-medium text-sm text-center rounded-md hover:bg-red-500 hover:text-white"
                    onClick={reset}
                  >
                    {t('Reset')}
                  </button>
                </section>
              </CustomModal>
            </form>
          )}
        />
      </PageLayout>
    </>
  );
}

export async function getServerSideProps(context) {
  const { query, locale } = context;
  let updatedQuery;

  if (isEmpty(query)) {
    updatedQuery = {

    };
  } else {
    updatedQuery = query;
  }

  let resToSend;
  try {
    const response = await searchCatering(updatedQuery, locale);
    if (response.data && response.data?.Data) {
      resToSend = response.data.Data;
    }
  } catch (error) {
    resToSend = [];
  }

  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'messages'])),
      response: resToSend,
    },
  };
}

