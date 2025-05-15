import { useEffect, useState } from "react";
import { PageLayout } from "components/layout";
import { RoomTypeSec, StarRating, Timeline } from "components/UI";
import HeartBtn from "components/UI/HeartBtn/HeartBtn";
import ShareBtn from "components/UI/ShareBtn/ShareBtn";
import BookingForm from "components/UI/BookingForm/BookingForm";
import { Form } from "react-final-form";
import arrayMutators from "final-form-arrays";
import { useAuth } from "hooks/useAuth";
import { axios_instance as axios } from "apis/axios-instance";
import { MinusIcon, PlusIcon } from "@heroicons/react/outline";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { GetFlightTypeStructure, searchHotels } from "apis/services/packages";
import { isEmpty } from "lodash";
import { PopoverBtn } from "components/UI";

export default function PackageDetailsPage({
  PkgDetails,
  PkgId,
  ID,
  DepartureAirport,
  ArrivalAirport,
  AircraftType,
  BusinessClassPrice,
  EconomyClassPrice,
  ArrivalDateTime,
  DepartureDateTime,
}) {
  const { t } = useTranslation();
  const router = useRouter();
  const auth = useAuth();
  const [reqLoading, setReqLoading] = useState(false);
  const [selectedClass, setSelectedClass] = useState({ price: "", name: "" });

  const formatDateTime = (dateTime) => {
    const date = new Date(dateTime);
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    const formattedDate = date
      .toLocaleDateString(undefined, options)
      .replace(/\//g, "-");
    const formattedTime = date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
    return ` ${formattedDate} , ${formattedTime}`;
  };

  const submitHandler = async (values) => {
    console.log(
      "%csrc\\pages\\hotelpackages\\[packageId]\\index.js:90 values",
      "color: #007acc;",
      {
        ReservationFlightCompanions: values.reservationPackageCompanions,
        FlightTravelId: Number(ID),
        Price: Number(selectedClass.price),
        ClassName: selectedClass.name,
      }
    );

    try {
      setReqLoading(true);
      const response = await axios.post(
        "/Reservations/flight/MarketPlace",
        {
          ReservationFlightCompanions: values.reservationPackageCompanions,
          FlightTravelId: +ID,
          Price: +selectedClass.price,
          ClassName: selectedClass.name,
        },
        {
          headers: {
            authorization: "Bearer " + auth.user.Token,
          },
        }
      );
      if (
        response.data.Message ===
        "Flight Reservation Has Been Created Successfully"
      ) {
        router.push("/"); // Redirect to homepage
      } else {
        toast.error(response.data.Message); // Show error message
      }
    } catch (error) {
      // Handle the error
      const errorMsg = httpErrorHandler(
        error,
        t("Booking Failed. Please try again!", {
          ns: "messages",
        })
      );
      toast.error(errorMsg);
    } finally {
      setReqLoading(false);
    }
  };
  console.log(
    "%csrcpages\flightpackage[packageId]index.js:91 ArrivalDateTime",
    "color: #007acc;",
    ArrivalDateTime
  );
  return (
    <PageLayout>
      <div className="px-4 pt-6 pb-10 space-y-4">
        {/* <div className="p-4 w-full bg-white rounded-md sm:flex sm:items-start sm:justify-between">
          <div>
            <h2 className="font-bold text-base md:text-lg xl:text-xl text-copy">
              {AircraftType}
            </h2>
          </div>
          <div className="mt-4 flex items-center justify-between gap-4">
            <ShareBtn />
          </div>
        </div> */}

        <div className="relative aspect-[12/5]  lg:aspect-[5/1] rounded-md overflow-hidden">
          <Image
            alt="package cover"
            src={PkgDetails?.photo || "/f.jpg"}
            layout="fill"
            className="w-full h-full object-cover"
            priority
          />
        </div>
        <section className="py-2 px-3 bg-white rounded-md text-copy">
          <h3 className="text-sm md:text-base font-bold">
            {t("Flights Details")}
          </h3>
          <div className="my-2">
            <div className="flex flex-wrap  md:justify-start first-letter:uppercase font-bold v">
              {AircraftType}
            </div>
            <div className="flex flex-wrap justify-center ">
              <div className="w-full  md:text-start">
                <p className="font-bold first-letter:uppercase">
                  Departure Airport
                </p>
                <p className="first-letter:uppercase">{DepartureAirport}</p>
                <p className="first-letter:uppercase">
                  {formatDateTime(DepartureDateTime)}
                </p>
              </div>
              <div className="w-full  md:text-start">
                <p className="font-bold first-letter:uppercase">
                  Arrival Airport
                </p>
                <p className="first-letter:uppercase">{ArrivalAirport}</p>
                <p className="first-letter:uppercase">
                  {formatDateTime(ArrivalDateTime)}
                </p>
              </div>
            </div>
          </div>
        </section>
        <>
          <Form
            onSubmit={submitHandler}
            initialValues={{ reservationPackageCompanions: [{}] }}
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
                <section className="py-2 px-3 bg-white rounded-md text-copy ">
                  <h3 className="text-sm md:text-base font-bold">
                    {t("Select Class")}
                  </h3>
                  <div className="my-2 flex flex-col md:flex-row gap-4 justify-center">
                    <label className="">
                      <input
                        type="radio"
                        name="BusinessClass"
                        value={BusinessClassPrice}
                        checked={selectedClass.price === BusinessClassPrice}
                        onChange={() =>
                          setSelectedClass({
                            price: BusinessClassPrice,
                            name: "Business Class",
                          })
                        }
                        className="mr-2"
                      />
                      Business Class Price:{" "}
                      <span className="font-bold">{BusinessClassPrice}</span>
                    </label>
                    <label className="">
                      <input
                        type="radio"
                        name="EconomyClass"
                        value={EconomyClassPrice}
                        checked={selectedClass.price === EconomyClassPrice}
                        onChange={() =>
                          setSelectedClass({
                            price: EconomyClassPrice,
                            name: "Economy Class",
                          })
                        }
                        className="mr-2"
                      />
                      Economy Class Price:{" "}
                      <span className="font-bold">{EconomyClassPrice}</span>
                    </label>
                  </div>
                </section>
                <section className="py-2 px-3 bg-white rounded-md text-copy">
                  {auth.user?.loggedIn ? (
                    <div className="my-2 space-y-4 flex flex-col">
                      <BookingForm
                        handleSubmit={handleSubmit}
                        submitting={submitting}
                        pristine={pristine}
                        reqLoading={reqLoading}
                        change={change}
                      />
                    </div>
                  ) : (
                    <div className="sm:self-end flex gap-4 items-center justify-center my-2">
                      <PopoverBtn
                        triggerElement={
                          <button
                            type="button"
                            className="py-2 sm:px-8 lg:px-28 mt-4 w-full  sm:max-w-none self-center sm:w-fit bg-main text-white font-medium text-sm text-center rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            {t("Book Now")}
                          </button>
                        }
                      />
                    </div>
                  )}
                </section>
              </>
            )}
          />
        </>
      </div>
    </PageLayout>
  );
}

export async function getServerSideProps(context) {
  const { query, locale } = context;
  let { packageId } = query;

  let PkgId,
    ID,
    DepartureAirport,
    ArrivalAirport,
    AircraftType,
    BusinessClassPrice,
    EconomyClassPrice,
    DepartureDateTime,
    ArrivalDateTime;

  if (packageId.includes("&")) {
    const params = new URLSearchParams(packageId);
    PkgId = params.get("packageId");
    ID = params.get("ID");
    DepartureAirport = params.get("DepartureAirport");
    ArrivalAirport = params.get("ArrivalAirport");
    AircraftType = params.get("AircraftType");
    BusinessClassPrice = params.get("BusinessClassPrice");
    EconomyClassPrice = params.get("EconomyClassPrice");
    DepartureDateTime = params.get("DepartureDateTime");
    ArrivalDateTime = params.get("ArrivalDateTime");
  }

  let resToSend;
  // try {
  //   const response = await GetFlightTypeStructure(PkgId, locale);
  //   console.log('%csrc\\pages\\flightpackage\\[packageId]\\index.js:213 object', 'color: #007acc;', response);
  //   if (response.data && response.data?.Data) {
  //     resToSend = response.data.Data;
  //   } else {
  //     throw new Error('not found');
  //   }
  // } catch (error) {
  //   console.log('%csrc\\pages\\flightpackage\\[packageId]\\index.js:213 object', 'color: #007acc;', error);

  //   return {
  //     notFound: true,
  //   };
  // }

  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "messages"])),
      // PkgDetails: resToSend,
      PkgId,
      ID,
      DepartureAirport,
      ArrivalAirport,
      AircraftType,
      BusinessClassPrice,
      EconomyClassPrice,
      DepartureDateTime,
      ArrivalDateTime,
    },
  };
}
