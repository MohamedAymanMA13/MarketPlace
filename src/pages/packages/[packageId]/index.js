// TODO: update the image placeholder

import { useEffect } from 'react';

import { PageLayout } from 'components/layout';
import { RoomTypeSec, StarRating, Timeline } from 'components/UI';
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

  return (
    <PageLayout pageTitle={PkgDetails.PkgTitle}>
      <div className="px-4 pt-6 pb-10 space-y-4">
        <div className="p-4 w-full bg-white rounded-md sm:flex sm:items-start sm:justify-between">
          <div>
            <StarRating filledStars={PkgDetails.PkgClass} />
            <h2 className="font-bold text-base md:text-lg xl:text-xl text-copy">
              {PkgDetails.PkgTitle}
            </h2>

            <div className="mt-2 flex items-center justify-between sm:flex-col sm:items-start sm:gap-2">
              <p className="text-copy text-sm font-medium xl:text-base">
                {PkgDetails.NoOfNights} {t('Nights')}
              </p>
              <p className="text-main text-lg xl:text-2lg font-bold">
                {moneyRenderer(
                  router.locale,
                  PkgDetails.PkgCurrency,
                  PkgDetails.PkgPrice
                )}
              </p>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between gap-4">
            <HeartBtn
              isSignedIn={auth.user?.loggedIn}
              pkgId={PkgDetails.pkgId}
              auth={auth}
            />

            <ShareBtn  />

            <Link href={`${router.asPath}/new-booking`}>
              <a className="block py-2 sm:px-8 w-full bg-main text-white font-medium text-sm text-center rounded-md">
                {t('Book Now')}
              </a>
            </Link>
          </div>
        </div>

        <div className="relative aspect-[12/9] sm:aspect-video lg:aspect-[3/1] rounded-md overflow-hidden">
          <Image
            alt="package cover"
            src={PkgDetails.PkgPhoto || '/bg5.jpg'}
            layout="fill"
            className="w-full h-full object-cover"
            priority
          />
        </div>

        <section className="py-2 px-3 bg-white rounded-md text-copy">
          <h3 className="text-sm md:text-base font-bold">
            {t('Package Details')}
          </h3>

          <div className="mt-2">
            <Timeline tlDetails={PkgDetails.PkgDetails} />
          </div>
        </section>

        {isEmpty(PkgDetails.roomTypes) ? null : (
          <section className="py-4 px-3 bg-white rounded-md text-copy">
            <h3 className="text-sm md:text-base font-bold">
              {t('Select Room Type')}
            </h3>

            <div className="mt-3 space-y-5">
              {PkgDetails.roomTypes.map((room, i) => (
                <RoomTypeSec key={i} pricingDetails={room} />
              ))}
            </div>
          </section>
        )}

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

    if (response.data && response.data?.Data) {
      resToSend = response.data.Data;
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
