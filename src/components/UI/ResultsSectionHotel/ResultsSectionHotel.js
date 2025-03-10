import { TripCardHotel,TripCardCatering,TripCardTransportation, Spinner } from '..';
import { isEmpty } from 'lodash';
import { useRouter } from 'next/router';

const ResultsSectionHotel = ({ Packages,startDate,endDate, isLoading }) => {
  const router = useRouter();

  return (
    <div className="mt-4 gap-4 flex flex-col sm:flex-row flex-wrap items-stretch justify-start">
      {isLoading ? (
        <div className="my-10 w-full flex items-center justify-center">
          <Spinner />
        </div>
      ) : isEmpty(Packages) ? (
        <p className="my-10 w-full text-sm lg:text-base text-center text-main font-semibold">
          No packages available!
        </p>
      ) : router.pathname === '/hotels' ? (
        Packages?.map(pkg => (
          <TripCardHotel
            key={pkg.ID}
            additionalClasses="w-full max-w-sm sm:w-72 flex-grow"
            imgAspectRatio="aspect-[10/5] sm:aspect-[10/6]"
            PkgDetails={pkg}
            startDate={startDate}
            endDate={endDate}
          />
        ))
      ): router.pathname === '/catering' ? (
        Packages?.map(pkg => (
          <TripCardCatering
            key={pkg.ID}
            additionalClasses="w-full max-w-sm sm:w-72 flex-grow"
            imgAspectRatio="aspect-[10/5] sm:aspect-[10/6]"
            PkgDetails={pkg}
          />
        ))
      ):router.pathname === '/transportation' && (
        Packages?.map(pkg => (
          <TripCardTransportation
            key={pkg.ID}
            additionalClasses="w-full max-w-sm sm:w-72 flex-grow"
            imgAspectRatio="aspect-[10/5] sm:aspect-[10/6]"
            PkgDetails={pkg}
          />
        ))
      )

    }
    </div>
  );
};

export default ResultsSectionHotel;
