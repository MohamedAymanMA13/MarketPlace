import { useEffect } from 'react';
import { useAuth } from 'hooks/useAuth';
import { AvatarIcon, PackageIcon } from 'components/Icons';

import {
  XIcon,
  UserIcon,
  HeartIcon,
  LogoutIcon,
  LoginIcon,
} from '@heroicons/react/outline';
import Link from 'next/link';
import Image from 'next/image';
import classNames from 'classnames';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

const NavMenu = ({ isMenuShown, toggleMenuHandler }) => {
  const { t } = useTranslation();
  const auth = useAuth();
  const { asPath } = useRouter();

  const menuClasses = classNames('inset-0 w-full h-screen bg-white', {
    absolute: isMenuShown,
    hidden: !isMenuShown,
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // if (!auth.user) {
    //   console.log(' GG ');
    //   const user = localStorage.getItem('loggedInUser');
    //   auth.setUser(JSON.parse(user));
    // }
  }, [auth]);

  return (
    <div className={menuClasses}>
      <div className="p-4 w-full flex items-center justify-between">
        <Link href="/">
          <a className="relative h-10 w-20">
            <Image
              alt="company logo"
              src="/logo.png"
              layout="fill"
              className="object-contain"
              priority
            />
          </a>
        </Link>

        <button type="button" onClick={toggleMenuHandler}>
          <XIcon className="w-5 h-5 text-main" />
        </button>
      </div>

      <div className="px-4 mt-4 space-y-5">
        {auth.user?.loggedIn ? (
          <div className="space-y-5">
            <p className="text-sm font-semibold text-main flex items-center gap-2">
              <UserIcon className="h-5 w-5" />
              {t('Hi, ') + auth.user.fullName}
            </p>

            <Link href="/my-bookings">
              <a className="text-sm font-semibold text-copy flex items-center gap-2 hover:text-main">
                <PackageIcon className="h-5 w-5 flex-shrink-0 text-main" />
                {t('My Bookings')}
              </a>
            </Link>

            <Link href="/hotel-bookings">
              <a className="text-sm font-semibold text-copy flex items-center gap-2 hover:text-main">
                <PackageIcon className="h-5 w-5 flex-shrink-0 text-main" />
                {t('My Hotels Bookings')}
              </a>
            </Link>

            <Link href="/bookings-catering">
              <a className="text-sm font-semibold text-copy flex items-center gap-2 hover:text-main">
                <PackageIcon className="h-5 w-5 flex-shrink-0 text-main" />
                {t('My Catring Bookings')}
              </a>
            </Link>hotel-bookings

            <Link href="/flight-bookings">
              <a className="text-sm font-semibold text-copy flex items-center gap-2 hover:text-main">
                <PackageIcon className="h-5 w-5 flex-shrink-0 text-main" />
                {t('My Flight Bookings')}
              </a>
            </Link>
            {/* <Link href="/my-favorites">
              <a className="text-sm font-semibold text-copy flex items-center gap-2 hover:text-main">
                <HeartIcon className="h-5 w-5 flex-shrink-0 text-main" />
                {t('My Favorites')}
              </a>
            </Link> */}

            <button
              type="button"
              className="flex items-center gap-2 text-sm font-semibold text-copy"
              onClick={auth.signOut}
            >
              <LogoutIcon className="h-5 w-5 flex-shrink-0 text-main" />
              <span>{t('Logout')}</span>
            </button>
          </div>
        ) : (
          <Link
            href={{
              pathname: '/sign-in',
              query: {
                from: asPath,
              },
            }}
          >
            <a className="flex items-center gap-1 text-copy hover:text-main font-medium">
              <LoginIcon className="w-4 h-4 lg:w-5 lg:h-5" />
              <span className="whitespace-nowrap">{t('Login')}</span>
            </a>
          </Link>
        )}

        <Link href="/b2b">
          <a className="py-2 block text-center w-full font-medium text-white bg-main rounded-md">
            B2B
          </a>
        </Link>

        <Link href="/tourism">
          <a className="flex items-center gap-1 text-copy hover:text-main font-medium">
            {t('Tourism')}
          </a>
        </Link>

        <Link href="/umrah">
          <a className="flex items-center gap-1 text-copy hover:text-main font-medium">
            {t('Umrah')}
          </a>
        </Link>

        <a
          href="http://gammats.com:8002/Hotels"
          className="block text-copy hover:text-main font-medium"
        >
          {t('Hotels')}
        </a>

        <a
          href="http://gammats.com:8002/flights/Return"
          className="block text-copy hover:text-main font-medium"
        >
          {t('Flights')}
        </a>
      </div>
    </div>
  );
};

export default NavMenu;
