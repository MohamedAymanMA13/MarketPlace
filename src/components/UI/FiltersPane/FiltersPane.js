import { Checkbox, StarsCheckbox } from "components/form";
import { LocationMarkerIcon } from "@heroicons/react/outline";
import { Field } from "react-final-form";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import dynamic from "next/dynamic";
import { useState } from "react";

const DynamicRange = dynamic(
  () => import("components/UI/CustomRange/CustomRange"),
  {
    ssr: false,
  }
);

const FiltersPane = ({
  isOpen,
  tables,
  reset,
  submitting,
  minPrice,
  maxPrice,
  setPriceRange,
  disabledSlider,
  inModal,
  toggleModal,
  formId,
}) => {
  const { t } = useTranslation();
  const router = useRouter();
  const [filters, setFilters] = useState({
    fromCountryId: "",
    toCountryId: "",
    travelAgencyId: "",
    packageType: "",
    offset: 0,
    limit: 10,
    // orderBy: 'price',
    minPrice: "",
    maxPrice: "",
    pkgClass: "",
    startDate: "",
    endDate: "",
  });

  const handleSubmit = (event) => {
    console.log(event, "event");
    event.preventDefault(); // Prevent default form submission

    const form = document.getElementById(formId);
    if (!form) {
      console.error("Form not found with ID:", formId);
      return;
    }

    const formData = new FormData(form);
    console.log(formData, "formData");
    const updatedFilters = {
      ...filters,
      fromCountryId: formData.get("fromCountryId") || "",
      toCountryId: formData.get("toCountryId") || "",
      travelAgencyId: formData.get("travelAgencyId") || "",
      packageType: formData.get("packageType") || "",
      minPrice: formData.get("minPrice") || "",
      maxPrice: formData.get("maxPrice") || "",
      pkgClass: formData.get("pkgClass") || "",
      startDate: formData.get("startDate") || "",
      endDate: formData.get("endDate") || "",
    };

    setFilters(updatedFilters);

    // Convert filters to query parameters with 'searchDTO.' prefix
    console.log(updatedFilters, "updatedFilters");
    // Update the URL with query parameters
    router.replace(
      {
        pathname: router.pathname,
        query: updatedFilters,
      },
      undefined,
      { shallow: true }
    );
  };

  return (
    <section
      className={`py-4 w-full sm:w-2/12 px-3 md:px-4 sm:block bg-white shadow-sm rounded-md h-max flex flex-col ${
        isOpen ? "w-full" : "hidden"
      }`}
    >
      <h3 className="font-bold text-sm md:text-base lg:text-lg">
        {t("Filters")}
      </h3>

      <div className="mt-3 space-y-5">
        <div className="relative w-full flex justify-between">
          <Field
            name="originCountryId"
            component="select"
            className="py-2 w-full text-sm font-medium bg-transparent text-inputGray border-[#B6B6B6] rounded-[10px]"
          >
            <option value="">{t("Departure Country")}</option>
            {tables?.fromCountries?.map((country) => (
              <option key={country.id} value={country.id}>
                {country.value}
              </option>
            ))}
          </Field>
        </div>

        {router.pathname !== "/umrah" && (
          <div className="relative w-full flex justify-between">
            <Field
              name="destinationCountryId"
              component="select"
              className="py-2 w-full text-sm font-medium bg-transparent text-inputGray border-[#B6B6B6] rounded-[10px]"
            >
              <option value="">{t("Destination Country")}</option>
              {tables?.toCountries?.map((country) => (
                <option key={country.id} value={country.id}>
                  {country.value}
                </option>
              ))}
            </Field>
          </div>
        )}

        {/* <Field
          name="travelAgencyId"
          component="select"
          className="py-2 w-full text-sm font-medium bg-transparent text-inputGray border-[#B6B6B6] rounded-[10px]"
        >
          <option value="">{t('Select Agency')}</option>
          {tables?.travelAgencies?.map(agency => (
            <option key={agency.id} value={agency.id}>
              {agency.value}
            </option>
          ))}
        </Field> */}

        <div>
          <div className="flex items-center justify-between">
            <h4 className="text-inputGray text-xs md:text-sm font-semibold">
              {t("Prices")}
            </h4>
            <Field
              name="rangeToggle"
              component="input"
              type="checkbox"
              className="w-4 h-4 rounded"
            />
          </div>
          <div className="mt-11">
            <DynamicRange
              minPrice={minPrice}
              maxPrice={maxPrice}
              disabledSlider={disabledSlider}
              setPriceRange={setPriceRange}
            />
          </div>
        </div>

        <div>
          {/* <h4 className="text-inputGray text-xs md:text-sm font-semibold">
            {t('Package Class')}
          </h4> */}
          <div className="mt-2 space-y-2">
            {tables?.classes?.map((item) => (
              <Field
                name="pkgClass"
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

      {inModal ? (
        <button
          type="button"
          className="py-1 mt-6 w-3/4 self-center sm:w-full bg-main text-white font-medium text-sm text-center rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={() => {
            handleSubmit();
            toggleModal();
          }}
        >
          {t("Apply")}
        </button>
      ) : (
        <button
          type="submit"
          className="py-1 mt-6 w-3/4 self-center sm:w-full bg-main text-white font-medium text-sm text-center rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
          // onClick={handleSubmit}
        >
          {t("Apply")}
        </button>
      )}

      <button
        type="button"
        className="py-1 mt-3 w-3/4 self-center sm:w-full bg-white text-red-500 border border-red-500 font-medium text-sm text-center rounded-md hover:bg-red-500 hover:text-white"
        onClick={reset}
      >
        {t("Reset")}
      </button>
    </section>
  );
};

export default FiltersPane;
