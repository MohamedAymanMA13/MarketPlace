// TODO: update the image placeholder

import { useEffect, useState } from "react";
import { PageLayout } from "components/layout";
import { RoomTypeSec, StarRating, Timeline } from "components/UI";
import HeartBtn from "components/UI/HeartBtn/HeartBtn";
import ShareBtn from "components/UI/ShareBtn/ShareBtn";
import BookingForm from "components/UI/BookingForm/BookingForm";
import { Field, Form } from "react-final-form";
import arrayMutators from "final-form-arrays";
import { useAuth } from "hooks/useAuth";
import { axios_instance as axios } from "apis/axios-instance";
import { MinusIcon, PlusIcon } from "@heroicons/react/outline";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import {
  GetHotelDetailsWebsiteContent,
  searchHotels,
} from "apis/services/packages";
import "react-datepicker/dist/react-datepicker.css";

import { isEmpty } from "lodash";
import { PopoverBtn } from "components/UI";
import { URLSearchParams } from "next/dist/compiled/@edge-runtime/primitives/url";
import { SelectField } from "components/form";
import DatePicker from "react-datepicker";

export default function PackageDetailsPage({
  PkgDetails,
  Id,
  startDate,
  endDate,
  optionsFontSize,
}) {
  const { t } = useTranslation();
  const router = useRouter();
  const auth = useAuth();

  const [detailsValue, setDetailsValue] = useState([]);
  // const [matchedDetails, setMatchedDetails] = useState(null);
  // const [numberOfRooms, setNumberOfRooms] = useState(PkgDetails.map(() => 0));
  const [reqLoading, setReqLoading] = useState(false);
  const [hotelReservationRooms, setHotelReservationRooms] = useState({});

  const [startDateState, setStartDateState] = useState(
    startDate ? new Date(startDate) : null
  );
  const [endDateState, setEndDateState] = useState(
    endDate ? new Date(endDate) : null
  );
  const [handleSubmit, setHandleSubmit] = useState(false);

  // const valuesToSubmit = {
  //   hotelName: -1,
  //   location: 0,
  //   rating: -1,
  //   from_date: startDate,
  //   to_date: endDate,
  // };
  // here
  useEffect(() => {
    async function fetchDetails() {
      try {
        // Format dates to ISO string format
        const formattedStartDate = startDateState
          ? startDateState.toISOString()
          : "";
        const formattedEndDate = endDateState ? endDateState.toISOString() : "";

        const response = await axios.get(
          `/Hotel/${Id}/rooms-pricing-for-reservation?checkin=${formattedStartDate}&checkout=${formattedEndDate}`
        );
        setDetailsValue(response.data?.data);
      } catch (error) {
        console.error("Error fetching details:", error);
      }
    }
    if (handleSubmit) {
      fetchDetails();
      setHandleSubmit(false);
    }
  }, [handleSubmit]);
  console.log(startDateState, "detailsValue");
  // useEffect(() => {
  //   const foundDetail = detailsValue.find(detail => detail.ID === parseInt(PkgId));
  //   if (foundDetail) {
  //     setMatchedDetails(foundDetail);
  //   }
  // }, [detailsValue, PkgId]);

  const getStarRating = (rating) => {
    return rating;
  };
  const calculateNights = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const timeDiff = end - start;
    const nights = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
    return nights;
  };
  const NumberOfNight = calculateNights(startDate, endDate);

  const incrementRooms = (index) => {
    setNumberOfRooms((prevRooms) =>
      prevRooms.map((rooms, i) =>
        i === index && rooms < PkgDetails[index].availableRooms
          ? rooms + 1
          : rooms
      )
    );
  };

  const decrementRooms = (index) => {
    setNumberOfRooms((prevRooms) =>
      prevRooms.map((rooms, i) =>
        i === index && rooms > 0 ? rooms - 1 : rooms
      )
    );
  };

  const submitHandler = async (values) => {
    console.log(
      "%csrcpageshotelpackages[packageId]index.js:84 detailsValue",
      "color: #007acc;",
      {
        ...hotelReservationRooms,
        reservationHotelCompanions: values.reservationPackageCompanions,
      }
    );
    try {
      setReqLoading(true);
      const response = await axios.post(
        "/Reservations/hotel/MarketPlace",

        {
          ...hotelReservationRooms,
          reservationHotelCompanions: values.reservationPackageCompanions,
        },
        {
          headers: {
            authorization: "Bearer " + auth.user.Token,
          },
        }
      );
      if (
        response.data.Message ===
        "Hotel Reservation Has Been Created Successfully"
      ) {
        router.push("/");
      } else {
        toast.error(response.data.Message);
      }
    } catch (error) {
      setReqLoading(false);
      const errorMsg = httpErrorHandler(
        error,
        t("Booking Failed. Please try again!", {
          ns: "messages",
        })
      );
      toast.error(errorMsg);
    }
  };

  // useEffect(() => {
  //   const fetchRoomPricing = async () => {
  //     const res = await axios.get(
  //       `/Hotel/${Id}/rooms-pricing-for-reservation?checkin=${startDateState}&checkout=${endDateState}`
  //     );
  //   };
  //   fetchRoomPricing();
  // }, [handleSubmit]);

  const [selectedRooms, setSelectedRooms] = useState([]);
  console.log(
    "%csrcpageshotelpackages[packageId]index.js:159 selectedRooms",
    "color: #007acc;",
    selectedRooms
  );
  useEffect(() => {
    if (detailsValue) {
      setSelectedRooms(
        detailsValue.map((room) => ({
          id: room.Id,
          count: 0,
          extras: [],
          RoomPrice: room.OriginalTotalPrice,
          ExtraBedPrice: room.ExtraBedPrice,
          LunchPrice: room.LunchPrice,
          DinnerPrice: room.DinnerPrice,
        }))
      );
    }
  }, [detailsValue]);

  const updateCount = (id, change) => {
    setSelectedRooms((prevRooms) =>
      prevRooms.map((room) =>
        room.id === id
          ? { ...room, count: Math.max(0, room.count + change) }
          : room
      )
    );
  };

  const toggleExtra = (roomId, extra) => {
    setSelectedRooms((prevRooms) =>
      prevRooms.map((room) =>
        room.id === roomId
          ? {
              ...room,
              extras: room.extras.includes(extra)
                ? room.extras.filter((e) => e !== extra) // Remove if exists
                : [...room.extras, extra], // Add if not exists
            }
          : room
      )
    );
  };

  const calculateTotalPrice = (room) => {
    const selectedRoom = selectedRooms.find((r) => r.id === room.Id);
    if (!selectedRoom) return room.OriginalTotalPrice || 0;

    const basePrice = room.OriginalTotalPrice || 0;
    const selectedExtras = selectedRoom.extras;
    const extraCost = selectedExtras.reduce((sum, extra) => {
      const extraValue = room[extra];
      return sum + (typeof extraValue === "number" ? extraValue : 0);
    }, 0);

    return (basePrice + extraCost) * selectedRoom.count;
  };
  const [choosenImage, setChoosenImage] = useState();
  const services = ["ExtraBedPrice", "LunchPrice", "DinnerPrice"];
  const updateHotelReservationRooms = () => {
    const HotelReservationRooms = selectedRooms.map((room) => {
      const basePrice = room.RoomPrice || 0;
      const selectedExtras = room.extras;
      const extraCost = selectedExtras.reduce((sum, extra) => {
        const extraValue = room[extra];
        return sum + (typeof extraValue === "number" ? extraValue : 0);
      }, 0);
      const totalPrice = (basePrice + extraCost) * room.count;

      return {
        // Id: 0,
        // HotelReservationId: queryParams.id || 0,
        HotelRoomId: room.id,
        RoomPrice: room.RoomPrice,
        DiscountPrice: 0,
        ExtraBedPrice: room.extras.includes("ExtraBedPrice")
          ? room.ExtraBedPrice || 0
          : 0,
        LunchPrice: room.extras.includes("LunchPrice")
          ? room.LunchPrice || 0
          : 0,
        DinnerPrice: room.extras.includes("DinnerPrice")
          ? room.DinnerPrice || 0
          : 0,
        TotalPrice: totalPrice,
        NumberOfRooms: room.count,
      };
    });

    setHotelReservationRooms({
      CheckInDate: startDateState,
      CheckoutDate: endDateState,
      HotelId: Number(Id) || 0,
      HotelReservationRooms,
    });
  };

  useEffect(() => {
    updateHotelReservationRooms();
    // setCompany(hotelReservationRooms)
  }, [selectedRooms]);
  console.log(
    "%csrcpageshotelpackages[packageId]index.js:253 hotelReservationRooms",
    "color: #007acc;",
    hotelReservationRooms
  );
  const submitHandler2 = async () => {
    if (startDateState && endDateState) {
      setHandleSubmit(true);
    }
  };
  return (
    <PageLayout>
      <div className="px-4 pt-6 pb-10 space-y-4">
        <div className="p-4 w-full bg-white rounded-md sm:flex sm:items-start sm:justify-between">
          <div>
            <StarRating
              filledStars={getStarRating(PkgDetails?.HotelDetails?.Rating)}
            />
            <h2 className="font-bold text-base md:text-lg xl:text-xl text-copy">
              {PkgDetails?.HotelDetails?.Name}
            </h2>
            <div className="mt-2 flex items-center justify-between sm:flex-col sm:items-start sm:gap-2">
              <p className="text-copy text-sm font-medium xl:text-base">
                {PkgDetails?.HotelDetails?.CityName} ,{" "}
                {PkgDetails?.HotelDetails?.CountryName}
              </p>
              <p className="text-copy text-sm font-medium xl:text-base">
                {calculateNights(startDate, endDate)} {t("Nights")}
              </p>
            </div>
          </div>
        </div>
        <div className="relative aspect-[12/9] sm:aspect-video lg:aspect-[3/1] rounded-md overflow-hidden">
          <Image
            alt="package cover"
            src={
              choosenImage ||
              `http://gammats.com:7010/be/${PkgDetails?.HotelDetails?.Paths[0]}` ||
              "/bg5.jpg"
            }
            layout="fill"
            className="w-full h-full object-cover"
            priority
          />
        </div>
        <div className="w-full  flex flex-wrap mt-4  rounded-xl">
          {PkgDetails?.HotelDetails?.Paths.map((ele) => {
            return (
              <div
                key={ele}
                className="md:w-20 md:h-20 w-15 h-15 me-4 cursor-pointer rounded-lg "
              >
                <Image
                  alt="package cover"
                  src={`http://gammats.com:7010/be/${ele}` || "/bg5.jpg"}
                  className="md:w-20 md:h-20 w-15 h-15 object-cover rounded-lg "
                  width={80}
                  onClick={() =>
                    setChoosenImage(`http://gammats.com:7010/be/${ele}`)
                  }
                  height={80}
                />
              </div>
            );
          })}
        </div>
        <section className="py-2 px-3 bg-white rounded-md text-copy">
          <h3 className="text-sm md:text-base font-bold">
            {t("Hotel Details")}
          </h3>
          <div className="mt-2">
            <span className="font-bold">Address</span> :{" "}
            {PkgDetails?.HotelDetails?.Address}
          </div>
          <div className="mt-2">
            <span className="font-bold">Closest Landmark</span> :{" "}
            {PkgDetails?.HotelDetails?.ClosestLandmark1}
          </div>
          <div className="mt-2">
            <span className="font-bold">Website</span> :{" "}
            <p className="break-words">{PkgDetails?.HotelDetails?.Website}</p>
          </div>
          <div className="mt-2">
            <span className="font-bold">Description</span> :{" "}
            {PkgDetails?.HotelDetails?.Description}
          </div>
        </section>
        {isEmpty(PkgDetails.roomTypes) ? null : (
          <section className="py-4 px-3 bg-white rounded-md text-copy">
            <h3 className="text-sm md:text-base font-bold">
              {t("Select Room Type")}
            </h3>

            <div className="mt-3 space-y-5">
              {PkgDetails.roomTypes.map((room, i) => (
                <RoomTypeSec key={i} pricingDetails={room} />
              ))}
            </div>
          </section>
        )}
        <>
          <>
            <div className="bg-white flex justify-center flex-col p-4 rounded-xl">
              <div className="flex justify-center">
                <div className="mt-2 me-3 space-y-2">
                  <label className="text-copy mb-0 pb-0 truncate font-medium text-xs 2xl:text-sm">
                    {t("Check-in Date")}
                  </label>
                  <DatePicker
                    selected={startDateState}
                    onChange={(date) => {
                      if (date) {
                        setStartDateState(date);
                      }
                    }}
                    selectsStart
                    startDate={startDateState}
                    endDate={endDateState}
                    dateFormat="yyyy-MM-dd"
                    className={`form__input ${optionsFontSize || ""}`}
                    wrapperClassName="react-datepicker-wrapper"
                  />
                </div>
                <div className="mt-2 space-y-2">
                  <label className="text-copy truncate font-medium text-xs 2xl:text-sm">
                    {t("Check-out Date")}
                  </label>
                  <DatePicker
                    selected={endDateState}
                    onChange={(date) => {
                      if (date) {
                        setEndDateState(date);
                      }
                    }}
                    selectsEnd
                    startDate={startDateState}
                    endDate={endDateState}
                    minDate={startDateState}
                    dateFormat="yyyy-MM-dd"
                    className={`form__input ${optionsFontSize || ""}`}
                    wrapperClassName="react-datepicker-wrapper"
                  />
                </div>
              </div>
              <button
                type="bottom"
                onClick={() => submitHandler2()}
                className="btn mt-3 primary sm:w-48 w-full mx-auto h-8 bg-main text-white font-medium text-sm text-center rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Submit
              </button>
            </div>
          </>
        </>
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
                {detailsValue.length >= 1 && (
                  <div className=" rounded-xl bg-white py-5 px-4">
                    <h1 className="font-bold mb-2">Seasons</h1>
                    {detailsValue?.length ? (
                      detailsValue.map((room) => {
                        const selectedRoom = selectedRooms.find(
                          (r) => r.id === room.Id
                        ) || {
                          count: 1,
                          extras: [
                            "ExtraBedPrice",
                            "LunchPrice",
                            "DinnerPrice",
                          ],
                        };

                        return (
                          <div
                            key={room.Id}
                            className="p-4 mb-4 border rounded-xl bg-[#F0EDF5] shadow-sm"
                          >
                            <div className="flex flex-col md:flex-row justify-between items-center mb-2">
                              <h3 className="text-sm mb-3 md:mb-0">
                                {room.RoomType} {t("Room")}
                              </h3>
                              <div className="flex gap-4 justify-center md:justify-between flex-wrap">
                                {services.map((service) => {
                                  const isActive =
                                    selectedRoom.extras.includes(service);
                                  const color = isActive
                                    ? "bg-[#6a55a0]  text-white  border-[#6a55a0]  border-white"
                                    : "bg-[#F0EDF5] text-[#6A55A0] border-[#6A55A0] hover:bg-[#6a55a0] hover:text-white";

                                  return (
                                    <button
                                      key={service}
                                      type="button"
                                      className={`border px-4 py-2 rounded-xl text-sm ${color}`}
                                      onClick={() =>
                                        toggleExtra(room.Id, service)
                                      }
                                    >
                                      {service.replace("Price", "")}
                                      <br />
                                      {room[service]} {t("EGP/Night")}
                                    </button>
                                  );
                                })}
                              </div>
                              <div className="flex mt-3 md:mt-0 w-full justify-around md:justify-center items-center flex-row md:w-[150px] md:flex-col ">
                                <p className="text-sm ">{t("Total Price")}</p>
                                <span className="text-sm py-1 font-bold">
                                  {calculateTotalPrice(room)} {t("EGP/Night")}
                                </span>
                                <div className="flex justify-center items-center">
                                  <div className="flex items-center gap-2">
                                    <button
                                      className=""
                                      type="button"
                                      onClick={() => updateCount(room.Id, -1)}
                                    >
                                      {/* <img src={minus} alt="minus" className="mx-1 w-7 h-7" /> */}
                                      -
                                    </button>
                                    <span className=" text-sm">
                                      {selectedRoom.count}
                                    </span>
                                    <button
                                      className=""
                                      type="button"
                                      onClick={() => updateCount(room.Id, 1)}
                                    >
                                      {/* <img src={plus} alt="plus" className="mx-1 w-7 h-7" /> */}
                                      +
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })
                    ) : (
                      <p className="text-center text-gray-500">
                        {t("No rooms available")}
                      </p>
                    )}
                    <section className="py-2 px-3 bg-white rounded-md text-copy">
                      {auth.user?.loggedIn && detailsValue.length >= 1 ? (
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
                                className="py-2 sm:px-8 lg:px-28 mt-4 w-full max-w-xs sm:max-w-none self-center sm:w-fit bg-main text-white font-medium text-sm text-center rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
                              >
                                {t("Book Now")}
                              </button>
                            }
                          />
                        </div>
                      )}
                    </section>
                  </div>
                )}
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

  let PkgId, startDate, endDate, Id;

  if (packageId.includes("&")) {
    const params = new URLSearchParams(packageId);
    PkgId = params.get("packageId");
    startDate = params.get("fromDate");
    endDate = params.get("toDate");
    Id = params.get("Id");
  }

  let resToSend;
  try {
    const response = await GetHotelDetailsWebsiteContent(PkgId);

    if (response.data && response.data?.Items) {
      resToSend = response.data.Items;
    } else {
      throw new Error("not found");
    }
  } catch (error) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "messages"])),
      PkgDetails: resToSend,
      PkgId,
      startDate,
      endDate,
      Id,
    },
  };
}
