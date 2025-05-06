// TODO: In the UI, handle the case of failed request.
// can i use useEffect hook to render something different based on the response without affecting the server-side rendering?!

import { PageLayout } from "components/layout";
import {
  TopCarousel,
  HomeSearchForm,
  CardsCarousel,
  NewsletterSection,
} from "components/UI";
import { PackageIcon, TravelCompanyIcon } from "components/Icons";
import { fetchHomeData } from "apis/services/packages";
import { Form, Field } from "react-final-form";
import {
  TextField,
  DateField,
  FileUploadField,
  SelectField,
  StarsCheckbox,
} from "components/form";
import { UserIcon } from "@heroicons/react/outline";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { useEffect, useState } from "react";
import addDays from "date-fns/addDays";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useConfig } from "hooks/useConfig";
import { GetCountries, GetCities } from "apis/services/config";
import { useRouter } from "next/router";

export default function Home({ response, optionsFontSize }) {
  const { t } = useTranslation();
  const [formVisible, setFormVisible] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(addDays(new Date(), 1));
  const [cities, setCities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const config = useConfig();
  const router = useRouter();

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
  const submitHandler = async (values) => {
    console.log("Form Submitted:", values);
    const valuesToSubmit = {
      cityId: values.cityId,
      countryId: values.countryId,
      ratings: values.ratings || [1, 2, 3, 4, 5],
      checkIn: startDate.toISOString(),
      checkOut: endDate.toISOString(),
      // numberOfRooms,
    };


    // console.log('Form valuesToSubmit:', valuesToSubmit);

    router.push({
      pathname: "/hotels",
      query: valuesToSubmit,
    });
  };
  console.log("%csrcpagesindex.js:84 response", "color: #007acc;", response);
  useEffect(() => {
    // This effect toggles the form visibility based on the response
    if (response?.carouselData?.CarouselImages) {
      setFormVisible(true); // Show the form if response is received
    } else {
      setFormVisible(false); // Hide the form if no response
    }
  }, [response]);

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
    <PageLayout pageTitle={t("Home Page")}>
      <div className="relative " style={{ height: "100vh" }}>
        <TopCarousel
          className="h-full"
          Packages={response?.carouselData?.CarouselImages}
        />

        {formVisible && (
          <div className="absolute w-full md:w-[40%] inset-0 flex">
            <div className="bg-slate-500 bg-opacity-55 p-8 rounded-lg px-7 md:px-20 w-full shadow-lg">
              <div className="w-full">
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
                      <div>
                        <section>
                          <h3 className="text-white font-bold text-sm md:text-base lg:text-lg">
                            {t("Choose Your Destination")}
                          </h3>
                          <div>
                            <div>
                              <div className="mt-2 space-y-2">
                                <label
                                  className={`text-white truncate font-medium text-sm 2xl:text-sm`}
                                >
                                  {t("Country")}
                                </label>
                                <Field
                                  name="countryId"
                                  component={SelectField}
                                  // label="Countries"
                                  options={config.tables?.fromCountries}
                                  firstNoOption="Select Countries"
                                  onChangeCustom={(value) =>
                                    setSelectedCountry(value)
                                  }
                                />
                              </div>
                              <div className="mt-2 space-y-2">
                                <label
                                  className={`text-white truncate font-medium text-sm 2xl:text-sm`}
                                >
                                  {t("Cities")}
                                </label>
                                <Field
                                  name="location"
                                  component={SelectField}
                                  // label="Cities"
                                  firstNoOption="Select Cities"
                                  options={cities}
                                  // validate={required}
                                />
                              </div>
                              <div className="flex">
                                <div className="w-1/2  mt-2 space-y-2">
                                  <label className="text-white truncate font-medium text-sm 2xl:text-sm">
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
                                <div className="w-1/2 ml-1 mt-2 space-y-2">
                                  <label className="text-white truncate font-medium text-sm 2xl:text-sm">
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

                              <div className="mt-2 space-y-2">
                                <p className="text-white truncate font-medium text-sm 2xl:text-sm">
                                  {t("Package Class")}
                                </p>
                                <div className="mt-2 space-y-2">
                                  {rating?.map((item) => (
                                    <Field
                                      name="rating"
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
                            className="py-1 mt-6  self-center w-full bg-main text-white font-medium text-sm text-center rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
                            type="submit"
                          >
                            {t("Search")}
                          </button>
                          <button
                            type="button"
                            className="py-1 mt-3 self-center w-full bg-white text-red-500 border border-red-500 font-medium text-sm text-center rounded-md hover:bg-red-500 hover:text-white"
                            onClick={reset}
                          >
                            {t("Reset")}
                          </button>
                        </section>
                      </div>
                    </form>
                  )}
                />
              </div>
            </div>
          </div>
        )}
      </div>
      <section className="my-10 md:my-16 flex flex-col items-center">
        <h2 className="font-bold text-copy md:text-lg lg:text-2xl">
          {t("About Us")}
        </h2>
        <p className="text-center">
          {response?.carouselData?.CarouselDescription}
        </p>

        {/* <p>{t('Defined as a global network the future technologies that provides innovative tools and smart solutions for Tourism Hail and Umrah rituals')}</p> */}
        {/* <p>{t('and Religious landmarks and Historical tourism sector services using the latest artificial intelligence technologies, electronic payment')}</p>
        <p>{t('methods, digital marketing and technical')}</p>
         */}
        {/* <div className="flex w-full justify-center my-7 space-x-6">
          <div className="flex flex-col items-center w-4/12">
            <img
              className="h-52 w-52 rounded-full"
              src="/catering2.jpg"
              alt="Catering"
            />
            <p className="font-medium text-main text-sm md:text-base lg:text-lg text-center my-2">{t('Catering Service')}</p>
          </div>
          <div className="flex flex-col items-center w-4/12">
            <img
              className="h-52 w-52 rounded-full"
              src="/airplane.jpg"
              alt="Flight Booking"
            />
            <p className="font-medium text-main text-sm md:text-base lg:text-lg text-center my-2">{t('Flight Booking')}</p>
          </div>
          <div className="flex flex-col items-center w-4/12">
            <img
              className="h-52 w-52 rounded-full"
              src="/hotel3.jpg"
              alt="Hotel Booking"
            />
            <p className="font-medium text-main text-sm md:text-base lg:text-lg text-center my-2">{t('Hotel Booking')}</p>
          </div>
        </div> */}
      </section>
      {/* <HomeSearchForm /> */}

      <section className="mt-16 w-full">
        <h2 className="sr-only">{t("services we have")}</h2>
        <div className="relative w-full h-44 md:h-56 lg:h-60 xl:h-64 bg-services bg-cover bg-center bg-no-repeat">
          <div className="bg-main/70 w-full h-full flex items-center">
            <div className="mx-auto w-3/4 md:w-8/12 flex items-center justify-between">
              <div className="flex flex-col items-center text-white">
                <UserIcon className="w-14 h-14 md:w-16 md:h-16 lg:w-20 lg:h-20" />
                <p className="md:mt-2 lg:mt-4 font-bold text-lg md:text-xl lg:text-4xl">
                  {/* {response.TravelAgencies} */}
                </p>
                <p className="font-medium md:text-lg">{t("Agencies")}</p>
              </div>

              <div className="flex flex-col items-center text-white">
                <PackageIcon className="w-14 h-14 md:w-16 md:h-16 lg:w-20 lg:h-20" />
                <p className="md:mt-2 lg:mt-4 font-bold text-lg md:text-xl lg:text-4xl">
                  {/* {response.Packages} */}
                </p>
                <p className="font-medium md:text-lg">{t("Packages")}</p>
              </div>

              <div className="flex flex-col items-center text-white">
                <TravelCompanyIcon className="w-14 h-14 md:w-16 md:h-16 lg:w-20 lg:h-20" />
                <p className="md:mt-2 lg:mt-4 font-bold text-lg md:text-xl lg:text-4xl">
                  {/* {response.Trips} */}
                </p>
                <p className="font-medium md:text-lg">{t("Trips")}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-10 md:mt-16 flex flex-col items-center">
        <h3 className="font-medium text-main text-sm md:text-base lg:text-lg">
          {t("Offers")}
        </h3>
        <h2 className="font-bold text-copy md:text-lg lg:text-2xl">
          {t("Our Best Offers")}
        </h2>

        <div className="mt-6 w-full ">
          <CardsCarousel Packages={response?.data} />
        </div>
      </section>

      {/* <NewsletterSection /> */}
    </PageLayout>
  );
}

export async function getServerSideProps(context) {
  const { locale } = context;

  const response = await fetchHomeData(locale);
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "messages"])),
      response: response.data,
    },
  };
}
