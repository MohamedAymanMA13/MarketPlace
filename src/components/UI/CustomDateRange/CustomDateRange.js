import { useState } from 'react';

import { DateRange } from 'react-date-range';
import * as locales from 'react-date-range/dist/locale';
import { CalendarIcon } from '@heroicons/react/outline';
import format from 'date-fns/format';
import useOnclickOutside from 'react-cool-onclickoutside';
import { useRouter } from 'next/router';

const dateOptions = {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
};

const CustomDateRange = ({ ranges, setRanges }) => {
  const { locale } = useRouter();
  const [isShowing, setIsShowing] = useState(false);

  const ref = useOnclickOutside(() => {
    setIsShowing(false);
  });

  return (
    <div className="relative flex items-center">
      <div
        className="py-2 px-3 sm:px-0 ltr:sm:pl-1 ltr:sm:pr-4 rtl:sm:pr-1 rtl:sm:pl-4 w-full text-sm font-medium bg-transparent text-inputGray flex items-center justify-between border-gray-200 ltr:border-r rtl:border-l border-t-0 border-b-0 ltr:border-l-0 rtl:border-r-0"
        onClick={() => setIsShowing(prevState => !prevState)}
      >
        {locale === 'ar' ? (
          <span>
            {new Date(ranges[0].startDate).toLocaleDateString(
              'ar-EG',
              dateOptions
            )}{' '}
            -{' '}
            {new Date(ranges[0].endDate).toLocaleDateString(
              'ar-EG',
              dateOptions
            )}
          </span>
        ) : (
          <span>
            {format(ranges[0].startDate, 'MMM d, yyyy')} -{' '}
            {format(ranges[0].endDate, 'MMM d, yyyy')}
          </span>
        )}

        <CalendarIcon className="w-5 h-5 text-inputGray" />
      </div>

      <div
        className={
          isShowing
            ? 'absolute top-14 left-1/2 -translate-x-1/2 sm:left-0 sm:translate-x-0 z-10 shadow-lg'
            : 'hidden'
        }
        ref={ref}
      >
        <DateRange
          editableDateInputs={true}
          onChange={item => {
            setRanges([item.selection]);
          }}
          moveRangeOnFirstSelection={false}
          ranges={ranges}
          months={2}
          rangeColors={['#5C48C1']}
          locale={locale === 'ar' ? locales.arSA : locales.enUS}
        />
      </div>
    </div>
  );
};

export default CustomDateRange;
