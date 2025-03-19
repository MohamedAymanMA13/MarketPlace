// TODO: update the image placeholder

import { useEffect } from 'react';

import { PageLayout } from 'components/layout';
import { ResultsSection, RoomTypeSec, StarRating, Timeline } from 'components/UI';
import HeartBtn from 'components/UI/HeartBtn/HeartBtn';
import ShareBtn from 'components/UI/ShareBtn/ShareBtn';

import { useAuth } from 'hooks/useAuth';
import { axios_instance as axios } from 'apis/axios-instance';
import { moneyRenderer } from 'utils/helpers/general.helpers';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { fetchPackageById } from 'apis/services/packages';
import { isEmpty } from 'lodash';
import ResultsSectionForTransportation from 'components/UI/ResultsSection/ResultsSectionForTransportation';

export default function PackageDetailsPage({ PkgDetails }) {
  const { t } = useTranslation();
  const router = useRouter();
  const auth = useAuth();

  useEffect(() => {
    if (typeof window === 'undefined') return;

    if (!auth.user) {
      console.log(' GG ');
      const user = localStorage.getItem('loggedInUser');
      auth.setUser(JSON.parse(user));
    }
  }, [auth]);
  const PkgCurrency = "EGP";
  const getStarRating = (rating) => {
    const match = rating?.match(/(\d+)\s*Star/);
    return match ? parseInt(match[1], 10) : 0; // Default to 0 if no match found
  };

  return (
    <PageLayout pageTitle={PkgDetails.Name}>
      <div className="px-4 pt-6 pb-10 space-y-4">
        <div className="relative aspect-[12/9] h-[400px] w-full object-cover sm:aspect-video lg:aspect-[3/1] rounded-md overflow-hidden">
          <Image
            alt="package cover"
            src={`http://gammats.com:7009/be/${PkgDetails.PackageImage}` || '/bg5.jpg'}
            layout="fill"
            className="w-full h-full object-cover"
            priority
          />
        </div>
        <section className="py-2 px-3 bg-white rounded-md text-copy">
          <h3 className="text-sm md:text-base font-bold">
            {t('Package Details')} {`(${PkgDetails.OriginCountryName} To ${PkgDetails.DestinationCountryName}) `}
          </h3>
          <div className="mt-2">
            <Timeline tlDetails={PkgDetails.packageAgendas} />
          </div>
        </section>
        {isEmpty(PkgDetails.roomTypes) ? null : (
          <section className="py-4 px-3 bg-white rounded-md text-copy">
            <h3 className="text-sm md:text-base font-bold">
              {t('Select Room Type')}
            </h3>

            <div className="mt-3 space-y-5">
              {PkgDetails.packageHotels.map((room, i) => (
                <RoomTypeSec key={i} pricingDetails={room} />
              ))}
            </div>
          </section>
        )}
        <div className='flex justify-start items-start'>

        <ResultsSection
                    Packages={PkgDetails}
                    forPackageDetails={true}
                  />
        <div className='flex flex-col flex-wrap'>

        <ResultsSectionForTransportation
                            kind="Flight"
                            Packages={PkgDetails}
                            forPackageDetails={true}
                            />
        <ResultsSectionForTransportation
                    kind="Transportation"
                    Packages={PkgDetails}
                    forPackageDetails={true}
                    />
                    </div>
                    </div>
        <section className="py-2 px-3 bg-white rounded-md text-copy">
          <h3 className="text-sm md:text-base font-bold">
            {t('Package Notes')}
          </h3>
          <div className="mt-2 font-medium text-xs md:text-sm">
            <p className="whitespace-pre-line leading-normal">
              {PkgDetails.Notes}
            </p>
          </div>
        </section>
        <section className="py-2 px-3 bg-white rounded-md text-copy">
          <h3 className="text-sm md:text-base font-bold">
            {t('Terms & Conditions')}
          </h3>
          <div className="mt-2 font-medium text-xs md:text-sm">
            <p className="whitespace-pre-line leading-normal">
              {PkgDetails.TermsConditions}
            </p>
          </div>
        </section>
        <div className="p-4 w-full bg-white rounded-md sm:flex sm:items-start sm:justify-between">
          <div className=" my-2 mx-auto  flex items-center justify-center gap-4">
            <Link className='w-[220px]' href={`${router.asPath}/new-booking`}>
              <a className="block py-2 w-[220px] sm:px-8  bg-main text-white font-medium text-sm text-center rounded-md">
                {t('Book Now')}
              </a>
            </Link>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}

export async function getServerSideProps(context) {
  const { params, locale } = context;
  // console.log(params);
  const packageId = params.packageId;

  let resToSend;
  try {
    const response = await fetchPackageById(packageId, locale);

    if (response.data && response.data?.Items) {
      resToSend = response.data.Items;
    } else {
      throw new Error('not found');
    }
  } catch (error) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'messages'])),
      PkgDetails: resToSend,
    },
  };
}
