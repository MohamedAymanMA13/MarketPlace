import { PageLayout } from 'components/layout';
import { MobileIcon, PinIcon } from 'components/Icons';
import { InfoIcon, ContactForm } from 'components/UI';

import { MailIcon } from '@heroicons/react/outline';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

export default function ContactUs() {
  const { t } = useTranslation();
  return (
    <PageLayout pageTitle={t('Contact Us')}>
      <section className="relative w-full h-32 md:h-48 lg:h-60 bg-contact bg-cover bg-center bg-no-repeat">
        <div className="bg-main/30 w-full h-full flex items-center">
          <h2 className="px-6 md:px-8 lg:px-16 text-2xl md:text-3xl lg:text-4xl text-white font-bold">
            {t('Contact Us')}
          </h2>
        </div>
      </section>

      <div className="mx-5 lg:mx-8 py-8 lg:py-12 grid grid-cols-1 gap-4 lg:gap-6 lg:grid-cols-[2fr_4fr]">
        <section className="p-4 bg-white rounded-md grid grid-cols-[1fr_1fr_2fr] gap-4 lg:grid-cols-1">
          <InfoIcon
            icon={<MobileIcon className="h-8 w-8 md:h-10 md:w-10" />}
            mainLabel={t('Hotline')}
            subLabel="18777"
          />

          <InfoIcon
            icon={<MailIcon className="h-8 w-8 md:h-10 md:w-10 text-main" />}
            mainLabel={t('Email')}
            subLabel="info@gts.com"
          />

          <InfoIcon
            icon={<PinIcon className="h-8 w-8 md:h-10 md:w-10" />}
            mainLabel={t('Company Address')}
            subLabel="9 Obour buildings in Salah Salem St. , Heliopolis, Cairo, Egypt"
          />
        </section>

        <section className="p-4 bg-white rounded-md">
          <h3 className="text-copy font-bold text-base md:text-lg lg:text-xl">
            {t('Leave a message below, and we will contact soon')}
          </h3>

          <ContactForm />
        </section>
      </div>
    </PageLayout>
  );
}

export async function getStaticProps(context) {
  const { locale } = context;

  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'messages'])),
    },
  };
}
