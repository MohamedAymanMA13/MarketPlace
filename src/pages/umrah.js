import { useState, useEffect } from 'react';

import { PageLayout } from 'components/layout';
import { FiltersPane, CustomModal, ResultsSection } from 'components/UI';
import { useConfig } from 'hooks/useConfig';
import { axios_instance as axios } from 'apis/axios-instance';
import { searchPackages } from 'apis/services/packages';

import { AdjustmentsIcon } from '@heroicons/react/outline';
import { Form, Field } from 'react-final-form';
import { useRouter } from 'next/router';
import { isEmpty } from 'lodash';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

export default function Umrah({ response }) {
  const { t } = useTranslation();
  const config = useConfig();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [priceRange, setPriceRange] = useState([0, 1000]);

  const toggleModal = () => {
    setIsOpen(prevState => !prevState);
  };

  const submitHandler = async values => {
    console.log(values);
    const clonedValues = { ...values };
    const valuesToSubmit = {
      packageType: 2,
      offset: 0,
      limit: 1000,
    };
    const entries = Object.entries(clonedValues);
    for (let i = 0; i < entries.length; i++) {
      const element = entries[i];
      const _key = element[0];
      const _value = element[1];

      if (Array.isArray(_value)) {
        valuesToSubmit[_key] = _value.join(',');
      } else {
        valuesToSubmit[_key] = _value;
      }
    }

    if (values.rangeToggle) {
      valuesToSubmit.minPrice = priceRange[0];
      valuesToSubmit.maxPrice = priceRange[1];
    }
    console.log(valuesToSubmit);

    router.push({
      pathname: '/umrah',
      query: valuesToSubmit,
    });
  };

  useEffect(() => {
    if (isLoading && response) {
      setIsLoading(false);
    }
  }, [isLoading, response]);

  return (
    <>
      <PageLayout pageTitle={t('Umrah Packages')}>
        <section className="relative w-full h-32 md:h-48 lg:h-60 bg-umrah bg-cover bg-bottom bg-no-repeat">
          <div className="bg-main/50 w-full h-full flex items-center">
            <h2 className="px-6 md:px-8 lg:px-16 text-2xl md:text-3xl  lg:text-4xl text-white font-bold">
              {t('Umrah')}
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
            <form onSubmit={handleSubmit} id="umrah_form">
              <div className="px-3 pb-4 md:pb-6 lg:pb-8 md:px-6 lg:px-8 mx-4 sm:mx-auto mt-4 md:mt-6 lg:mt-8 gap-4 grid grid-cols-1 sm:grid-cols-[208px_1fr] md:grid-cols-[240px_1fr] lg:grid-cols-[288px_1fr]">
                <FiltersPane
                  isOpen={false}
                  tables={config.tables}
                  reset={reset}
                  submitting={submitting}
                  pristine={pristine}
                  minPrice={response.MinPrice}
                  maxPrice={response.MaxPrice}
                  setPriceRange={setPriceRange}
                  disabledSlider={!values.rangeToggle}
                  formId="umrah_form"
                />

                <div>
                  <div className="p-4 mx-auto max-w-sm sm:max-w-full bg-white rounded-md sm:flex sm:items-center sm:justify-between sm:gap-3 md:gap-2">
                    <p className="font-medium text-sm text-copy">
                      <span className="font-bold text-main">
                        {response && response?.Packages
                          ? response?.Packages.length
                          : 0}
                      </span>{' '}
                      {t('packages found')}
                    </p>

                    <div className="mt-4 sm:mt-0 flex items-center justify-between">
                      <button
                        className="sm:hidden px-4 py-1 text-main border-2 border-main rounded-lg flex gap-2 items-center font-medium hover:bg-main hover:text-white text-sm"
                        type="button"
                        onClick={toggleModal}
                      >
                        <AdjustmentsIcon className="w-5 h-5 rotate-90" />
                        <span>{t('Filters')}</span>
                      </button>

                      <div className="flex gap-2 items-center">
                        <label
                          htmlFor="orderBy"
                          className="hidden sm:block text-copy font-medium text-xs"
                        >
                          {t('Sort by')}:
                        </label>
                        <Field
                          name="orderBy"
                          id="orderBy"
                          component="select"
                          className="py-[5px] text-sm rounded-lg text-inputGray focus:border-main"
                        >
                          <option value="">{t('Select filter')}</option>
                          <option value="1">{t('Price: Low to High')}</option>
                          <option value="2">{t('Price: High to Low')}</option>
                        </Field>
                      </div>
                    </div>
                  </div>

                  <ResultsSection
                    Packages={response?.Packages}
                    isLoading={isLoading}
                    // success={success}
                  />
                </div>
              </div>

              <CustomModal isOpen={isOpen} toggleModalHandler={toggleModal}>
                <FiltersPane
                  isOpen={true}
                  tables={config.tables}
                  reset={reset}
                  submitting={submitting}
                  pristine={pristine}
                  minPrice={response.MinPrice}
                  maxPrice={response.MaxPrice}
                  setPriceRange={setPriceRange}
                  disabledSlider={!values.rangeToggle}
                  inModal={true}
                  toggleModal={toggleModal}
                  formId="umrah_form"
                />
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
      packageType: 2,
      offset: 0,
      limit: 1000,
    };
  } else {
    updatedQuery = query;
  }

  // console.log({ query, updatedQuery });

  let resToSend;
  try {
    const response = await searchPackages(updatedQuery, locale);

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
