import { TripCard, Spinner } from "..";
import { isEmpty } from "lodash";
import TransportaitonCard from "../TripCard/TransportaitonCard";

const ResultsSectionForTransportation = ({
  Packages,
  isLoading,
  forPackageDetails,
  kind,
}) => {
  return (
    <div className="mt-4 gap-4 flex flex-col sm:flex-row flex-wrap items-center justify-start">
      {isLoading ? (
        <div className="my-10 w-full flex items-center justify-center">
          <Spinner />
        </div>
      ) : isEmpty(Packages) ? (
        <p className="my-10 w-full text-sm lg:text-base text-center text-main font-semibold">
          No packages available!
        </p>
      ) : (
        <div className="flex flex-col">
          {kind === "Flight" && (
            <h1 className="font-black mb-2 mx-2 text-base">
              {"Flight Details"}
            </h1>
          )}
          {kind === "Transportation" && (
            <h1 className="font-black mb-2 mx-2 text-base">
              {"Transportation Details"}
            </h1>
          )}
          <div className="flex flex-wrap ">
            {kind === "Flight"
              ? Packages?.packageFlights?.map((pkg) => (
                  <TransportaitonCard
                    kind={kind}
                    key={pkg.Id}
                    additionalClasses="w-72 asd mb-2  md:w-full md:max-w-none p-0"
                    imgAspectRatio="aspect-[10/5] sm:aspect-[10/6]"
                    PkgDetails={pkg}
                    forPackageDetails={forPackageDetails}
                  />
                ))
              : Packages?.packageTransportations?.map((pkg) => (
                  <TransportaitonCard
                    kind={kind}
                    key={pkg.Id}
                    additionalClasses="w-72  mb-2   md:w-full md:max-w-none p-0"
                    imgAspectRatio="aspect-[10/5] sm:aspect-[10/6]"
                    PkgDetails={pkg}
                    forPackageDetails={forPackageDetails}
                  />
                ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ResultsSectionForTransportation;
