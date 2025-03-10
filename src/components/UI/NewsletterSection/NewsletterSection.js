import { useTranslation } from 'next-i18next';

const NewsletterSection = () => {
  const { t } = useTranslation();

  return (
    <section className="mt-16 p-4 md:p-6 lg:p-8 bg-main/20 flex flex-col items-center">
      <h3 className="font-medium text-main text-sm md:text-base lg:text-lg">
        {t('Newsletter')}
      </h3>
      <h2 className="font-bold text-copy md:text-lg lg:text-2xl">
        {t('Subscribe to Our Newsletter')}
      </h2>
      <div className="w-full max-w-sm sm:max-w-md md:hidden">
        <input
          type="text"
          placeholder={t('Enter Your Email')}
          className="mt-4 py-3 w-full rounded-md font-medium text-sm text-inputGray border-none"
        />
        <button className="py-2 mt-2 w-full bg-main text-white font-medium text-sm text-center rounded-md">
          {t('Subscribe')}
        </button>
      </div>

      <div className="mt-4 w-[28rem] lg:w-[34rem] xl:w-[40rem] hidden md:grid grid-cols-[1fr_0.5fr] bg-white rounded-md overflow-hidden">
        <input
          type="text"
          placeholder={t('Enter Your Email')}
          className="py-3 w-full rounded-md font-medium text-sm text-inputGray border-none"
        />
        <button className="w-full bg-main text-white font-medium text-base text-center">
          {t('Subscribe')}
        </button>
      </div>
    </section>
  );
};

export default NewsletterSection;
