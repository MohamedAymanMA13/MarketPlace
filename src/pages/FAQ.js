import { PageLayout } from 'components/layout';
import { ExpandableSection2 } from 'components/UI';

import { faqs } from 'utils/constants/static.constants';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { Fragment } from 'react';

export default function FAQ({ response }) {
  const { t } = useTranslation();

  return (
    <PageLayout pageTitle={t('FAQ')}>
      <section className="relative w-full h-32 md:h-48 lg:h-60 bg-faq bg-cover bg-center bg-no-repeat">
        <div className="bg-main/30 w-full h-full flex items-center">
          <h2 className="px-6 md:px-8 lg:px-16 text-2xl md:text-3xl lg:text-4xl text-white font-bold">
            {t('FAQs')}
          </h2>
        </div>
      </section>

      <section className="mt-10 mx-auto max-w-md sm:max-w-xl md:max-w-2xl lg:max-w-4xl xl:max-w-6xl w-full bg-white rounded-md">
        {response.map((res, i) => (
          <Fragment key={i}>
            {i >= 1 ? <hr className="my-2" /> : null}

            <ExpandableSection2
              additionalClasses="px-4"
              title={res.q}
              answer={res.a}
            />
          </Fragment>
        ))}
      </section>
    </PageLayout>
  );
}

FAQ;

export async function getStaticProps(context) {
  const { locale } = context;

  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'messages'])),
      response: faqs[locale],
    },
  };
}
