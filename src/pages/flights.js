import { useState, useEffect } from 'react';

import { PageLayout } from 'components/layout';
import { FiltersPane, CustomModal, ResultsSectionFlight } from 'components/UI';
import { useConfig } from 'hooks/useConfig';
import { axios_instance as axios } from 'apis/axios-instance';
import { searchFlights} from 'apis/services/packages';
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

export default function Flights({ response,optionsFontSize }) {
  const { t } = useTranslation();
  const config = useConfig();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(addDays(new Date(), 1));
  const [cities, setCities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);

console.log('%csrc\pages\flights.js:46 response', 'color: #007acc;', response);
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
  const today = new Date().toISOString().split('T')[0];
  const submitHandler = async (values) => {
    // Ensure values are being logged for debugging
    console.log('Submitting values:', values);
    
    // Call searchFlights with the values as queryParams
    const response = await searchFlights(values);
    
    // Handle the response as needed
    console.log('Search response:', response);
    
    router.push({
      pathname: '/flights',
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
      <PageLayout pageTitle={t('Flights Packages')}>
        <section className="relative w-full h-32 md:h-48 lg:h-60 bg-flight bg-cover bg-bottom bg-no-repeat">
          <div className="bg-main/50 w-full h-full flex items-center">
            <h2 className="px-6 md:px-8 lg:px-16 text-2xl md:text-3xl  lg:text-4xl text-white font-bold">
              {t('Flights')}
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
                      name="departureCountryId"
                      component={SelectField}
                      label="Countries from"
                      options={config.tables?.fromCountries}
                      firstNoOption="Select Countries from"
                    />
                    </div>
                    <div className="mt-2 space-y-2">
                    <Field
                      name="arrivalCountryId"
                      component={SelectField}
                      label="Countries to"
                      firstNoOption="Select Countries to"
                      options={config.tables?.fromCountries}
                      // validate={required}
                    />
                    </div>
                    <div className="mt-2 space-y-2">
                    <Field
                    name="date"
                    component={DateField}
                    label="Date"
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

                  {/* {JSON.stringify(response)} */}
                  <ResultsSectionFlight
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
                      name="departureCountryId"
                      component={SelectField}
                      label="Countries from"
                      options={config.tables?.fromCountries}
                      firstNoOption="Select Countries from"
                    />
                    </div>
                    <div className="mt-2 space-y-2">
                    <Field
                      name="arrivalCountryId"
                      component={SelectField}
                      label="Countries to"
                      firstNoOption="Select Countries to"
                      options={config.tables?.fromCountries}
                      // validate={required}
                    />
                    </div>
                    <div className="mt-2 space-y-2">
                      <Field
                      name="date"
                      component={DateField}
                      label="Date"
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
    updatedQuery = query;
  } else {
    updatedQuery = query;
  }


  // If no search parameters are provided, don't fetch any data
  // if (isEmpty(query)) {
  //   return {
  //     props: {
  //       ...(await serverSideTranslations(locale, ['common', 'messages'])),
  //       response: [], // Provide an empty response by default
  //     },
  //   };
  // }

  let resToSend;
  try {
    const response = await searchFlights(updatedQuery);
    if (response.data && response.data?.data) {
      resToSend = response.data.data;
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

