// TODO: In the UI, handle the case of failed request.
// can i use useEffect hook to render something different based on the response without affecting the server-side rendering?!

import { useState, useEffect } from "react";

import { PageLayout } from "components/layout";
import { FiltersPane, CustomModal, ResultsSection } from "components/UI";
import { useConfig } from "hooks/useConfig";
import { searchPackages } from "apis/services/packages";

import toast from "react-hot-toast";
import { AdjustmentsIcon } from "@heroicons/react/outline";
import { Form, Field } from "react-final-form";
import { useRouter } from "next/router";
import { isEmpty } from "lodash";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

export default function Tourism({ response }) {
  const { t } = useTranslation();
  const config = useConfig();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [priceRange, setPriceRange] = useState();

  const toggleModal = () => {
    setIsOpen((prevState) => !prevState);
  };

  const submitHandler = async (values) => {
    if (priceRange && priceRange.length === 2) {
      values.minPrice = priceRange[0];
      values.maxPrice = priceRange[1];
    }
    router.push({
      pathname: "/tourism",
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
      <PageLayout pageTitle={t("Tourism Packages")}>
        <section className="relative w-full h-32 md:h-48 lg:h-60 bg-tourism bg-cover bg-bottom bg-no-repeat">
          <div className="bg-main/50 w-full h-full flex items-center">
            <h2 className="px-6 md:px-8 lg:px-16 text-2xl md:text-3xl lg:text-4xl text-white font-bold">
              {t("Packages")}
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
            <form onSubmit={handleSubmit} id="tourism_form">
              <div className="px-3 pb-4 md:pb-6 lg:pb-8 md:px-6 lg:px-8 mx-4 sm:mx-auto mt-4 md:mt-6 lg:mt-8 gap-4 flex">
                <FiltersPane
                  isOpen={false}
                  tables={config.tables}
                  reset={() => {
                    reset();
                    router.replace({
                      pathname: "/tourism",
                      query: {},
                    });
                  }}
                  submitting={submitting}
                  pristine={pristine}
                  minPrice={10}
                  maxPrice={100000}
                  setPriceRange={setPriceRange}
                  disabledSlider={!values.rangeToggle}
                  formId="tourism_form"
                />

                <div className=" w-full sm:w-10/12">
                  <div className="p-4 mx-auto bg-white rounded-md sm:flex sm:items-center sm:justify-between sm:gap-3 md:gap-2">
                    <p className="font-medium text-sm text-copy">
                      <span className="font-bold text-main">
                        {response ? response.length : 0}
                      </span>{" "}
                      {t("packages found")}
                    </p>

                    <div className="mt-4 sm:mt-0 flex items-center justify-between">
                      <button
                        className="sm:hidden px-4 py-1 text-main border-2 border-main rounded-lg flex gap-2 items-center font-medium hover:bg-main hover:text-white text-sm"
                        type="button"
                        onClick={toggleModal}
                      >
                        <AdjustmentsIcon className="w-5 h-5 rotate-90" />
                        <span>{t("Filters")}</span>
                      </button>
                    </div>
                  </div>

                  <ResultsSection Packages={response} isLoading={isLoading} />
                </div>
              </div>

              <CustomModal isOpen={isOpen} toggleModalHandler={toggleModal}>
                <FiltersPane
                  isOpen={true}
                  tables={config.tables}
                  reset={reset}
                  submitting={submitting}
                  pristine={pristine}
                  minPrice={200}
                  maxPrice={400}
                  setPriceRange={setPriceRange}
                  disabledSlider={!values.rangeToggle}
                  inModal={true}
                  toggleModal={toggleModal}
                  formId="tourism_form"
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
  // console.log(query);

  let updatedQuery;

  if (isEmpty(query)) {
    updatedQuery = null;
  } else {
    updatedQuery = query;
  }

  let resToSend = null;
  try {
    const response = await searchPackages(updatedQuery, locale);
    if (response?.data.Items?.Items) {
      resToSend = response.data.Items.Items;
    }
  } catch (error) {
    console.log(error, "er");
    resToSend = [];
  }

  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "messages"])),
      response: resToSend,
    },
  };
}
