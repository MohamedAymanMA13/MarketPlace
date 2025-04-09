import { useState, useEffect } from "react";

import { PageLayout } from "components/layout";
import { FiltersPane, CustomModal, ResultsSectionHotel } from "components/UI";
import { useConfig } from "hooks/useConfig";
import { axios_instance as axios } from "apis/axios-instance";
import { searchHotels } from "apis/services/packages";
import { GetCountries, GetCities } from "apis/services/config";
import { HomeSearchForm } from "components/UI";
import { AdjustmentsIcon } from "@heroicons/react/outline";
import { Form, Field } from "react-final-form";
import { useRouter } from "next/router";
import { isEmpty } from "lodash";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import {
  TextField,
  DateField,
  FileUploadField,
  SelectField,
  StarsCheckbox,
} from "components/form";
import {
  LocationMarkerIcon,
  MinusIcon,
  PlusIcon,
} from "@heroicons/react/outline";
import { CustomDateRange } from "components/UI";
import addDays from "date-fns/addDays";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function Hotels({ response, optionsFontSize }) {
  const { t } = useTranslation();
  const config = useConfig();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(addDays(new Date(), 1));
  const rating = [
    {
      id: 1,
      value: "1",
    },
    {
      id: 2,
      value: "2",
    },
    {
      id: 3,
      value: "3",
    },
    {
      id: 4,
      value: "4",
    },
    {
      id: 5,
      value: "5",
    },
  ];
  const toggleModal = () => {
    setIsOpen((prevState) => !prevState);
  };
  const submitHandler = async (values) => {
    console.log("Form Submitted:", values);
    console.log(values.ratings, "values.rating");
    const valuesToSubmit = {
      cityId: values.cityId,
      countryId: values.countryId,
      ratings: values.ratings || [1, 2, 3, 4, 5],
      checkIn: startDate.toISOString(),
      checkOut: endDate.toISOString(),
      // numberOfRooms,
    };

    console.log("Form valuesToSubmit:", valuesToSubmit);

    router.push({
      pathname: "/hotels",
      query: valuesToSubmit,
    });
  };

  useEffect(() => {
    if (isLoading && response) {
      setIsLoading(false);
    }
  }, [isLoading, response]);
  const [cities, setCities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  useEffect(() => {
    if (selectedCountry) {
      async function fetchCities() {
        try {
          const response = await GetCities(selectedCountry);
          setCities(response.data?.data);
        } catch (error) {
          console.error("Error fetching cities:", error);
        }
      }
      fetchCities();
    } else {
      setCities([]);
    }
  }, [selectedCountry]);

  return (
    <>
      <PageLayout pageTitle={t("Hotels Packages")}>
        <section className="relative w-full h-32 md:h-48 lg:h-60 bg-hotel bg-cover bg-bottom bg-no-repeat">
          <div className="bg-main/50 w-full h-full flex items-center">
            <h2 className="px-6 md:px-8 lg:px-16 text-2xl md:text-3xl  lg:text-4xl text-white font-bold">
              {t("Hotels")}
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
                    isOpen ? "w-72" : "w-full"
                  }`}
                >
                  <h3 className="font-bold text-sm md:text-base lg:text-lg">
                    {t("Filters")}
                  </h3>
                  <div>
                    <div>
                      <div className="mt-2 space-y-2">
                        <Field
                          name="countryId"
                          component={SelectField}
                          label="Country"
                          options={config.tables?.fromCountries}
                          firstNoOption="Select Countries"
                          onChangeCustom={(value) => setSelectedCountry(value)}
                        />
                      </div>
                      <div className="mt-2 space-y-2">
                        <Field
                          name="cityId"
                          component={SelectField}
                          label="Cities"
                          firstNoOption="Select Cities"
                          options={cities}
                          // validate={required}
                        />
                      </div>
                      <div className="mt-2 space-y-2">
                        <label className="text-copy truncate font-medium text-xs 2xl:text-sm">
                          {t("Check-in Date")}
                        </label>
                        <DatePicker
                          selected={startDate}
                          onChange={(date) => setStartDate(date)}
                          selectsStart
                          startDate={startDate}
                          endDate={endDate}
                          className={`mt-1 form__input ${
                            optionsFontSize || ""
                          }`}
                          wrapperClassName="react-datepicker-wrapper"
                        />
                      </div>
                      <div className="mt-2 space-y-2">
                        <label className="text-copy truncate font-medium text-xs 2xl:text-sm">
                          {t("Check-out Date")}
                        </label>
                        <DatePicker
                          selected={endDate}
                          onChange={(date) => setEndDate(date)}
                          selectsEnd
                          startDate={startDate}
                          endDate={endDate}
                          minDate={startDate}
                          className={`mt-1 form__input ${
                            optionsFontSize || ""
                          }`}
                          wrapperClassName="react-datepicker-wrapper"
                        />
                      </div>
                      <div className="mt-2 space-y-2">
                        <p className="text-copy truncate font-medium text-xs 2xl:text-sm">
                          {t("Package Class")}
                        </p>
                        <div className="mt-2 space-y-2">
                          {rating?.map((item) => (
                            <Field
                              name="ratings"
                              component={StarsCheckbox}
                              key={item.id}
                              starsCount={+item.value}
                              type="checkbox"
                              value={+item.value}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  <button
                    className="py-1 mt-6 w-3/4 self-center sm:w-full bg-main text-white font-medium text-sm text-center rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
                    type="submit"
                  >
                    {t("Search")}
                  </button>
                  <button
                    type="button"
                    className="py-1 mt-3 w-3/4 self-center sm:w-full bg-white text-red-500 border border-red-500 font-medium text-sm text-center rounded-md hover:bg-red-500 hover:text-white"
                    onClick={() => {
                      reset();
                      router.replace({
                        pathname: "/hotels",
                        query: {
                          checkIn: startDate.toISOString(),
                          checkOut: endDate.toISOString(),
                        },
                      });
                    }}
                  >
                    {t("Reset")}
                  </button>
                </section>

                <div>
                  <div className="p-4 mx-auto  sm:max-w-full bg-white rounded-md sm:flex sm:items-center sm:justify-between sm:gap-3 md:gap-2">
                    <div className="w-full flex flex-wrap ">
                      {/* <div className='w-1/4 px-1'>
                          <Field
                            name="Countries"
                            component={SelectField}
                            label="Country"
                            options={config.tables?.fromCountries}
                            firstNoOption="Select Countries"
                            onChangeCustom={(value) => setSelectedCountry(value)}
                          />
                        </div>
                        <div className='w-1/4 px-1'>
                          <Field
                            name="location"
                            component={SelectField}
                            label="Cities"
                            firstNoOption="Select Cities"
                            options={cities}
                          />
                        </div>
                         */}
                      <div className="md:w-1/4 w-1/2 px-1">
                        <label className="text-copy truncate font-medium text-xs 2xl:text-sm">
                          {t("Check-in Date")}
                        </label>
                        <DatePicker
                          selected={startDate}
                          onChange={(date) => setStartDate(date)}
                          selectsStart
                          startDate={startDate}
                          endDate={endDate}
                          className={`mt-1 form__input ${
                            optionsFontSize || ""
                          }`}
                          wrapperClassName="react-datepicker-wrapper"
                        />
                      </div>
                      <div className="md:w-1/4 w-1/2 px-1">
                        <label className="text-copy truncate font-medium text-xs 2xl:text-sm">
                          {t("Check-out Date")}
                        </label>
                        <DatePicker
                          selected={endDate}
                          onChange={(date) => setEndDate(date)}
                          selectsEnd
                          startDate={startDate}
                          endDate={endDate}
                          minDate={startDate}
                          className={`mt-1 form__input ${
                            optionsFontSize || ""
                          }`}
                          wrapperClassName="react-datepicker-wrapper"
                        />
                      </div>

                      <div className="w-full px-1 py-1 mt-6 flex justify-end place-content-end		">
                        <button
                          className=" md:w-48 w-full h-8 bg-main text-white font-medium text-sm text-center rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
                          type="submit"
                        >
                          {t("Check Available Hotel")}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* {JSON.stringify(response)} */}
                  <ResultsSectionHotel
                    Packages={response}
                    isLoading={isLoading}
                    startDate={startDate.toISOString()}
                    endDate={endDate.toISOString()}
                    // success={success}
                  />
                </div>
              </div>

              <CustomModal isOpen={isOpen} toggleModalHandler={toggleModal}>
                <section
                  className={`py-4 px-3 md:px-4 sm:block bg-white shadow-sm rounded-md h-max flex flex-col ${
                    isOpen ? "w-72" : "hidden"
                  }`}
                >
                  <h3 className="font-bold text-sm md:text-base lg:text-lg">
                    {t("Filters")}
                  </h3>
                  <div>
                    <div>
                      <div className="mt-2 space-y-2">
                        <Field
                          name="Countries"
                          component={SelectField}
                          label="Country"
                          options={config.tables?.fromCountries}
                          firstNoOption="Select Countries"
                          onChangeCustom={(value) => setSelectedCountry(value)}
                        />
                      </div>
                      <div className="mt-2 space-y-2">
                        <Field
                          name="location"
                          component={SelectField}
                          label="Cities"
                          firstNoOption="Select Cities"
                          options={cities}
                          // validate={required}
                        />
                      </div>
                      <div className="mt-2 space-y-2">
                        <label className="text-copy truncate font-medium text-xs 2xl:text-sm">
                          {t("Check-in Date")}
                        </label>
                        <DatePicker
                          selected={startDate}
                          onChange={(date) => setStartDate(date)}
                          selectsStart
                          startDate={startDate}
                          endDate={endDate}
                          className={`mt-1 form__input ${
                            optionsFontSize || ""
                          }`}
                          wrapperClassName="react-datepicker-wrapper"
                        />
                      </div>
                      <div className="mt-2 space-y-2">
                        <label className="text-copy truncate font-medium text-xs 2xl:text-sm">
                          {t("Check-out Date")}
                        </label>
                        <DatePicker
                          selected={endDate}
                          onChange={(date) => setEndDate(date)}
                          selectsEnd
                          startDate={startDate}
                          endDate={endDate}
                          minDate={startDate}
                          className={`mt-1 form__input ${
                            optionsFontSize || ""
                          }`}
                          wrapperClassName="react-datepicker-wrapper"
                        />
                      </div>
                    </div>
                  </div>
                  <button
                    className="py-1 mt-6 w-3/4 self-center sm:w-full bg-main text-white font-medium text-sm text-center rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
                    type="submit"
                  >
                    {t("Search")}
                  </button>
                  <button
                    type="button"
                    className="py-1 mt-3 w-3/4 self-center sm:w-full bg-white text-red-500 border border-red-500 font-medium text-sm text-center rounded-md hover:bg-red-500 hover:text-white"
                    onClick={() => {
                      reset();
                      router.replace({
                        pathname: "/hotels",
                        query: {
                          checkIn: startDate.toISOString(),
                          checkOut: endDate.toISOString(),
                        },
                      });
                    }}
                  >
                    {t("Reset")}
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

  // let resToSend = [];

  // try {
  //   if (isEmpty(query)) {
  //     const response = await searchHotels2(locale);
  //     if (response.data && response.data?.Data) {
  //       resToSend = response.data.Data;
  //     }
  //   } else {
  //     const response = await searchHotels(query, locale);
  //     if (response.data && response.data?.Data) {
  //       resToSend = response.data.Data;
  //     }
  //   }
  // } catch (error) {
  //   console.error('Error fetching hotels:', error);
  //   resToSend = [];
  // }

  let updatedQuery;

  if (isEmpty(query)) {
    updatedQuery = {
      hotelName: -1,
      location: 0,
      rating: -1,
    };
  } else {
    updatedQuery = query;
  }

  let resToSend;
  try {
    const response = await searchHotels(updatedQuery, locale);
    if (response.data && response?.data.Items) {
      resToSend = response?.data.Items;
    }
  } catch (error) {
    resToSend = [];
  }

  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "messages"])),
      response: resToSend,
    },
  };
}
