import { PageLayout } from 'components/layout';

import { terms } from 'utils/constants/static.constants';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

export default function Terms({ response }) {
  const { t } = useTranslation();

  return (
    <PageLayout pageTitle={t('Terms & Conditions')}>
      <section className="relative w-full h-32 md:h-48 lg:h-60 bg-terms bg-cover bg-center bg-no-repeat">
        <div className="bg-main/30 w-full h-full flex items-center">
          <h2 className="px-6 md:px-8 lg:px-16 text-2xl md:text-3xl lg:text-4xl text-white font-bold">
            {t('Terms & Conditions')}
          </h2>
        </div>
      </section>

      <section className="mt-10 mx-auto max-w-md sm:max-w-xl md:max-w-2xl lg:max-w-4xl xl:max-w-6xl w-full bg-white rounded-md">
        <div className="p-5 md:p-7 space-y-3 md:space-y-5">
          <div className="text-copy">
            <h3 className="text-base 2xl:text-lg font-bold">
              {t('Booking Conditions')}
            </h3>
            <p className="mt-2 text-sm lg:text-base font-medium whitespace-pre-line">
              {response.bc}
            </p>
          </div>

          <div className="text-copy">
            <h3 className="text-base 2xl:text-lg font-bold">
              {t('Trips Conditions')}
            </h3>
            <p className="mt-2 text-sm lg:text-base font-medium whitespace-pre-line">
              {response.tc}
            </p>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}

export async function getStaticProps(context) {
  const { locale } = context;

  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'messages'])),
      response: terms[locale],
    },
  };
}
