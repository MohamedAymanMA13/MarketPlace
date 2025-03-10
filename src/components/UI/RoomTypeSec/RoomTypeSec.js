import { moneyRenderer } from 'utils/helpers/general.helpers';

import { CheckIcon } from '@heroicons/react/solid';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';

const RoomTypeSec = ({ pricingDetails }) => {
  const { t } = useTranslation();
  const router = useRouter();

  return (
    <div className="px-6 py-4 bg-bg rounded-md grid grid-cols-[1fr_3fr_1fr] items-center gap-5">
      <p className="text-base xl:text-xl font-bold">
        {pricingDetails.roomType}
      </p>

      <div className="flex items-center flex-wrap gap-4">
        {pricingDetails.facilities.map((fac, i) => (
          <p key={i} className="flex items-center gap-1 text-sm font-medium">
            <CheckIcon className="w-4 h-4 text-main" />
            {fac}
          </p>
        ))}
      </div>

      <div className="flex flex-col items-center gap-2">
        <p className="text-main text-lg font-bold">
          {moneyRenderer(
            router.locale,
            pricingDetails.currency,
            pricingDetails.price
          )}
        </p>

        <Link
          href={{
            pathname: `${router.asPath}/new-booking`,
            query: {
              roomType: pricingDetails.id,
            },
          }}
        >
          <a className="block py-2 sm:px-8 w-full bg-main text-white font-medium text-sm text-center rounded-md">
            {t('Book Now')}
          </a>
        </Link>
      </div>
    </div>
  );
};

export default RoomTypeSec;
