import { PageLayout } from 'components/layout';

import { aboutUs } from 'utils/constants/static.constants';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

export default function AboutUs({ response }) {
  const { t } = useTranslation();

  return (
    <PageLayout pageTitle={t('About Us')}>
      <section className="relative w-full h-32 md:h-48 lg:h-60 bg-about bg-cover bg-center bg-no-repeat">
        <div className="bg-main/30 w-full h-full flex items-center">
          <h2 className="px-6 md:px-8 lg:px-16 text-2xl md:text-3xl lg:text-4xl text-white font-bold">
            {t('About Us')}
          </h2>
        </div>
      </section>

      <section className="mt-10 mx-auto max-w-md sm:max-w-xl md:max-w-2xl lg:max-w-4xl xl:max-w-6xl w-full bg-white rounded-md">
        <div className="p-5 md:p-7">
          <h3 className="text-copy text-base 2xl:text-lg font-bold">
            {response.title}
          </h3>

          <div className="mt-3 space-y-2 text-copy text-sm lg:text-base font-medium">
            <p>{response.content[0]}</p>

            <p>{response.content[1]}</p>
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
      response: aboutUs[locale],
    },
  };
}
