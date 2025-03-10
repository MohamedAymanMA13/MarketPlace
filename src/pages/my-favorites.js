import { useEffect, useState, useCallback } from 'react';

import { PageLayout } from 'components/layout';
import { Spinner, CustomModal, ResultsSection, FavCard } from 'components/UI';

import { fetchUserFavorites } from 'apis/services/favorites';
import { useAuth } from 'hooks/useAuth';
import { httpErrorHandler } from 'utils/helpers/apis.helpers';
import toast from 'react-hot-toast';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { isEmpty } from 'lodash';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

export default function MyFavorites() {
  const { t } = useTranslation(['common', 'messages']);
  const [isLoading, setIsLoading] = useState(false);
  const [userFavorites, setUserFavorites] = useState({
    data: [],
    totalRow: 0,
  });
  const router = useRouter();
  const auth = useAuth();

  const _fetcher = useCallback(() => {
    setIsLoading(true);

    fetchUserFavorites(auth.user.accessToken, router.locale)
      .then(response => {
        if (response.data) {
          setUserFavorites({
            data: response.data.data,
            totalRow: response.data.totalRow,
          });
        }
        setIsLoading(false);
      })
      .catch(error => {
        setIsLoading(false);
        const errorMsg = httpErrorHandler(
          error,
          t('Failed to fetch favorites!', {
            ns: 'messages',
          })
        );
        toast.error(errorMsg);
      });
  }, [auth, router.locale, t]);

  // * This useEffect handles redirecting un-auth users to the login page.
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const localUser = localStorage.getItem('loggedInUser');
    if (!localUser && !auth.user) {
      console.log(' REPLACING ');
      router.replace({
        pathname: '/sign-in',
        query: {
          from: router.asPath,
        },
      });
    }
  }, [auth, router]);

  useEffect(() => {
    if (auth.user) {
      _fetcher();
    } else {
      console.log(' 📖 no fetching! ');
    }
  }, [auth, router, _fetcher]);

  return (
    <PageLayout pageTitle={t('My Favorites')}>
      <section className="relative w-full h-32 md:h-48 lg:h-60 bg-favs bg-cover bg-bottom bg-no-repeat">
        <div className="w-full h-full flex items-center">
          <h2 className="px-6 md:px-8 lg:px-16 text-2xl md:text-3xl lg:text-4xl text-white font-bold">
            {t('My Favorites')}
          </h2>
        </div>
      </section>

      {!auth.user || isLoading ? (
        <div className="w-full flex items-center justify-center h-screen">
          <Spinner className="animate-spin h-5 w-5 text-main" />
        </div>
      ) : !isLoading && isEmpty(userFavorites.data) ? (
        <div className="py-7 w-full bg-bg flex items-center justify-center">
          <p className="text-sm text-main font-medium">
            {t('No data available')}
          </p>
        </div>
      ) : (
        <div className="px-4 py-4 gap-4 flex flex-col sm:flex-row flex-wrap items-center justify-start">
          {userFavorites.data.map(fav => (
            <FavCard
              key={fav.pkgId}
              fav={fav}
              auth={auth}
              favFetcher={_fetcher}
            />
          ))}
        </div>
      )}
    </PageLayout>
  );
}

export async function getServerSideProps(context) {
  const { locale } = context;
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'messages'])),
    },
  };
}
