import { AvatarIcon, PackageIcon } from 'components/Icons';

import Link from 'next/link';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { HeartIcon, LogoutIcon } from '@heroicons/react/outline';
import { ChevronDownIcon } from '@heroicons/react/solid';
import { useTranslation } from 'next-i18next';

const SignedInMenu = ({ auth }) => {
  const { t } = useTranslation();

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button className="min-w-max text-sm font-semibold text-main flex items-center justify-between">
          <span>{t('Hi, ') + auth.user.FullName}</span>
          <ChevronDownIcon className="w-4 h-4" />
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Content
        sideOffset={10}
        className="p-4 rounded-md bg-white shadow-lg flex flex-col ltr:font-poppins rtl:font-noto min-w-[275px]"
      >
        <div className="flex items-center gap-4">
          <AvatarIcon className="flex-shrink-0 h-10 w-10" />
          <p className="text-base font-semibold text-copy">
            {auth.user.FullName}
          </p>
        </div>
        <hr className="my-4" />

        <div className="space-y-5">
          <Link href="/my-bookings">
            <a className="text-sm font-semibold text-copy flex items-center gap-3 hover:text-main">
              <PackageIcon className="h-5 w-5 flex-shrink-0 text-main" />
              {t('My Bookings')}
            </a>
          </Link>

          <Link href="/hotel-bookings">
              <a className="text-sm font-semibold text-copy flex items-center gap-3 hover:text-main">
                <PackageIcon className="h-5 w-5 flex-shrink-0 text-main" />
                {t('My Hotels Bookings')}
              </a>
            </Link>

          <Link href="/flight-bookings">
            <a className="text-sm font-semibold text-copy flex items-center gap-3 hover:text-main">
              <PackageIcon className="h-5 w-5 flex-shrink-0 text-main" />
              {t('My Flight Bookings')}
            </a>
          </Link>
            
          <Link href="/bookings-catering">
              <a className="text-sm font-semibold text-copy flex items-center gap-3 hover:text-main">
                <PackageIcon className="h-5 w-5 flex-shrink-0 text-main" />
                {t('My Catring Bookings')}
              </a>
          </Link>
          {/* <Link href="/my-favorites">
            <a className="text-sm font-semibold text-copy flex items-center gap-3 hover:text-main">
              <HeartIcon className="h-5 w-5 flex-shrink-0 text-main" />
              {t('My Favorites')}
            </a>
          </Link> */}
        </div>

        <hr className="my-4" />

        <button
          type="button"
          className="flex items-center gap-3 text-sm font-semibold text-copy"
          onClick={auth.signOut}
        >
          <LogoutIcon className="h-5 w-5 flex-shrink-0 text-main" />
          <span>{t('Logout')}</span>
        </button>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};

export default SignedInMenu;
