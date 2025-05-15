import { useState, useEffect } from "react";

import { CustomDateRange } from "components/UI";
import { useConfig } from "hooks/useConfig";

import Link from "next/link";
import {
  LocationMarkerIcon,
  MinusIcon,
  PlusIcon,
} from "@heroicons/react/outline";
import differenceInDays from "date-fns/differenceInDays";
import addDays from "date-fns/addDays";
import subDays from "date-fns/subDays";
import format from "date-fns/format";
import { useTranslation } from "next-i18next";

const HomeSearchForm = () => {
  const { t } = useTranslation();
  const config = useConfig();
  const [noOfNights, setNoOfNights] = useState(0);
  const [ranges, setRanges] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 1),
      key: "selection",
    },
  ]);
  const [country, setCountry] = useState("");

  const addDayHandler = () => {
    setRanges((prevState) => [
      {
        startDate: prevState[0].startDate,
        endDate: addDays(prevState[0].endDate, 1),
        key: "selection",
      },
    ]);
  };

  const removeDayHandler = () => {
    setRanges((prevState) => [
      {
        startDate: prevState[0].startDate,
        endDate: subDays(prevState[0].endDate, 1),
        key: "selection",
      },
    ]);
  };

  useEffect(() => {
    if (ranges[0].endDate && ranges[0].startDate) {
      setNoOfNights(differenceInDays(ranges[0].endDate, ranges[0].startDate));
    }
  }, [ranges]);

  return (
    <>
      {/* <section className="mx-3 mt-6 sm:hidden">
        <div className="mb-2 bg-white rounded-md">
          <div className="ltr:pr-3 rtl:pl-3 flex items-center justify-between">
            <select
              name="country"
              className="py-3 w-full text-sm font-medium border-none bg-transparent text-inputGray focus:ring-0"
              value={country}
              onChange={e => {
                setCountry(e.target.value);
              }}
            >
              <option value="">{t('Country')}</option>
              {config.tables && config.tables.fromCountries
                ? config.tables.fromCountries.map(country => (
                    <option key={country.id} value={country.id}>
                      {country.value}
                    </option>
                  ))
                : null}
            </select>

            <LocationMarkerIcon className="w-5 h-5 text-inputGray" />
          </div>

          <hr className="border-gray-100" />

          <CustomDateRange ranges={ranges} setRanges={setRanges} />

          <hr className="border-gray-100" />

          <div className="px-3 py-3 text-sm font-medium text-inputGray flex items-center justify-between">
            <span>{t('Nights')}</span>

            <div className="flex items-center gap-3">
              <button
                type="button"
                className="p-1 rounded-full bg-zinc-100"
                onClick={addDayHandler}
              >
                <PlusIcon className="w-5 h-5" />
              </button>
              <span className="font-semibold">{noOfNights}</span>
              <button
                type="button"
                className="p-1 rounded-full bg-zinc-100"
                onClick={() => {
                  noOfNights <= 0 ? null : removeDayHandler();
                }}
              >
                <MinusIcon className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        <Link
          href={{
            pathname: '/tourism',
            query: {
              countryId: country,
              startDate: format(ranges[0].startDate, 'yyyy-MM-dd'),
              endDate: format(ranges[0].endDate, 'yyyy-MM-dd'),
            },
          }}
        >
          <a className="flex items-center justify-center w-full bg-main text-white font-medium rounded-md py-2">
            {t('Search')}
          </a>
        </Link>
      </section> */}

      <section className="hidden mx-3 md:mx-8 lg:mx-16 mt-6 lg:mt-10 bg-white rounded-md sm:grid grid-cols-3x1-0.75 gap-2">
        <div className="ltr:pr-3 rtl:pl-3 flex items-center justify-between ltr:border-r rtl:border-l">
          <select
            name="country"
            className="py-3 w-full text-sm font-medium border-none bg-transparent text-inputGray focus:ring-0"
            value={country}
            onChange={(e) => {
              setCountry(e.target.value);
            }}
          >
            <option value="">{t("Country")}</option>
            {config?.tables && config?.tables?.fromCountries
              ? config?.tables?.fromCountries?.map((country) => (
                  <option key={country?.id} value={country?.id}>
                    {country?.value}
                  </option>
                ))
              : null}
          </select>

          <LocationMarkerIcon className="w-5 h-5 text-inputGray" />
        </div>

        <CustomDateRange ranges={ranges} setRanges={setRanges} />

        <div className="px-3 py-2 text-sm font-medium text-inputGray flex items-center justify-between">
          <span>{t("Nights")}</span>

          <div className="flex items-center gap-3">
            <button
              type="button"
              className="p-1 rounded-full bg-zinc-100"
              onClick={addDayHandler}
            >
              <PlusIcon className="w-5 h-5" />
            </button>
            <span className="font-semibold">{noOfNights}</span>
            <button
              type="button"
              className="p-1 rounded-full bg-zinc-100"
              onClick={() => {
                noOfNights <= 0 ? null : removeDayHandler();
              }}
            >
              <MinusIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
        <Link
          href={{
            pathname: "/tourism",
            query: {
              country,
              startDate: format(ranges[0].startDate, "yyyy-MM-dd"),
              endDate: format(ranges[0].endDate, "yyyy-MM-dd"),
            },
          }}
        >
          <a className="flex items-center justify-center w-full bg-main text-white font-medium ltr:rounded-r-md rtl:rounded-l-md">
            {t("Search")}
          </a>
        </Link>
      </section>
    </>
  );
};

export default HomeSearchForm;
