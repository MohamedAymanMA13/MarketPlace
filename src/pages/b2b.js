import { PageLayout } from 'components/layout';

import Image from 'next/image';
import Link from 'next/link';

const B2B = () => {
  return (
    <PageLayout pageTitle="B2B">
      <section className="w-full">
        <div className="relative w-full h-32 md:h-48 lg:h-60 bg-b2b bg-cover bg-center bg-no-repeat">
          <div className="bg-main/50 w-full h-full flex items-center">
            <h2 className="px-6 md:px-8 lg:px-16 text-2xl md:text-3xl  lg:text-4xl text-white font-bold">
              B2B
            </h2>
          </div>
        </div>

        <div className="mt-6 md:mt-8 lg:mt-16 px-4 md:px-8 lg:px-16 pb-16 bg-bg space-y-16">
          <div className="flex flex-col md:flex-row gap-4 md:gap-6 lg:gap-12 items-center md:items-start">
            <div className="relative w-full aspect-square max-w-xs sm:max-w-sm rounded-md overflow-hidden">
              <Image
                src="/pkg.jpg"
                layout="fill"
                className="object-center"
                alt="pkg portal"
              />
            </div>

            <div className="text-center md:text-justify">
              <h3 className="text-copy font-medium md:text-lg lg:text-xl">
                You can make your package in easy way
              </h3>
              <p className="mt-2 text-xs sm:text-sm xl:text-base text-copy">
                You will enter the basic information of your package, And then
                put the activitiesand the services you will provide and divide
                them in to the days which you specified in the basic information
                of the package, it will guarantee that you willnever forget any
                service you want to put in this package, And it will be shown as
                the program of the trip.
              </p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row-reverse gap-4 md:gap-6 lg:gap-12 items-center md:items-start">
            <div className="relative w-full aspect-square max-w-xs sm:max-w-sm rounded-md overflow-hidden">
              <Image
                src="/pkg.jpg"
                layout="fill"
                className="object-center"
                alt="pkg portal"
              />
            </div>

            <div className="text-center md:text-justify">
              <h3 className="text-copy font-medium md:text-lg lg:text-xl">
                Very Useful Dashboard
              </h3>
              <p className="mt-2 text-xs sm:text-sm xl:text-base text-copy">
                You will enter the basic information of your package, And then
                put the activitiesand the services you will provide and divide
                them in to the days which you specified in the basic information
                of the package, it will guarantee that you willnever forget any
                service you want to put in this package, And it will be shown as
                the program of the trip.
              </p>
            </div>
          </div>

          <section className="mx-auto py-6 px-8 bg-white rounded-md shadow-sm max-w-lg lg:max-w-xl">
            <h2 className="text-copy font-bold text-center">
              You can now add your company to the portal
            </h2>

            <Link href="/add-company">
              <a className="block py-2 mt-4 w-full bg-main text-white font-medium text-sm text-center rounded-md">
                Add Your Company Now!
              </a>
            </Link>
          </section>
        </div>
      </section>
    </PageLayout>
  );
};

export default B2B;
