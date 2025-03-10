import { Fragment } from 'react';

import { BusIcon, HotelsIcon, PlaneIcon } from 'components/Icons';

import { format } from 'date-fns';
import { useTranslation } from 'next-i18next';

const Timeline = ({ tlDetails }) => {
  const { t } = useTranslation();

  return (
    <div className="ltr:timeline__ltr rtl:timeline__rtl relative my-0 mx-auto ltr:font-poppins rtl:font-noto">
      {tlDetails.map((d, i) => (
        <Fragment key={i}>
          <div className="ltr:wrapper__date--ltr rtl:wrapper__date--rtl py-3 ltr:pr-5 rtl:pl-5 relative w-2/5 md:w-1/5">
            <p className="relative text-base ltr:text-right rtl:text-left text-main font-semibold">
              {format(new Date(d.day), 'dd/LL/uuuu')}
            </p>
          </div>

          {d.services.map((service, i) => (
            <div
              key={i}
              className="ltr:wrapper__time--ltr rtl:wrapper__time--rtl relative py-3 px-4 w-full"
            >
              <p className="ltr:pr-3 ltr:md:pr-5 rtl:pl-3 rtl:md:pl-5 text-copy text-sm font-medium ltr:text-right rtl:text-left">
                {service.time}
              </p>

              <p className="ltr:pl-3 ltr:md:pl-5 rtl:pr-3 rtl:md:pr-5 text-copy w-full text-sm font-medium">
                <span>
                  {service.type === 'Flight' ? (
                    <PlaneIcon className="w-5 h-5 text-main" />
                  ) : service.type === 'Hotel' ? (
                    <HotelsIcon className="w-5 h-5 text-main" />
                  ) : service.type === 'Transportation' ? (
                    <BusIcon className="w-5 h-5 text-main" />
                  ) : null}
                </span>
                <span className="max-w-3xl">{service.details}</span>
              </p>
            </div>
          ))}
        </Fragment>
      ))}
    </div>
  );
};

export default Timeline;
