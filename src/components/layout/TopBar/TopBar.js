import { useState, useEffect } from 'react';

import { SignedInMenu } from 'components/UI';
import LangSwitcher from './LangSwitcher/LangSwitcher';
import NavMenu from './NavMenu/NavMenu';
import { useAuth } from 'hooks/useAuth';

import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { MenuAlt1Icon, UserIcon, LoginIcon } from '@heroicons/react/outline';
import { useTranslation } from 'next-i18next';

const TopBar = () => {
  const { t } = useTranslation();
  const [isMenuShown, setIsMenuShown] = useState(false);
  const { pathname, asPath } = useRouter();
  const auth = useAuth();

  const toggleMenuHandler = () => setIsMenuShown(prevState => !prevState);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    if (!auth.user) {
      console.log(' GG ');
      const user = localStorage.getItem('loggedInUser');
      auth.setUser(JSON.parse(user));
    }
  }, [auth]);

  return (
    <div className="px-4 py-3 lg:py-3 w-full flex items-center justify-between">
      <Link href="/">
        <a className="relative h-8 w-20 lg:h-10 lg:w-28">
          <Image
            alt="company logo"
            src="/logo1.png"
            layout="fill"
            className="object-contain"
            priority
          />
        </a>
      </Link>

      <button type="button" className="md:hidden" onClick={toggleMenuHandler}>
        <MenuAlt1Icon className="w-5 h-5 -rotate-180 text-main" />
      </button>

      <div className="hidden md:flex items-center md:gap-6 lg:gap-8 xl:gap-10">
        <Link href="/tourism">
          <a
            className={`nav__item nav__link ${
              pathname === '/tourism'
                ? 'text-main nav__link--active'
                : 'text-copy'
            }`}
          >
            {t('Tourism')}
          </a>
        </Link>

        <Link href="/umrah">
          <a
            className={`nav__item nav__link ${
              pathname === '/umrah'
                ? 'text-main nav__link--active'
                : 'text-copy'
            }`}
          >
            {t('Umrah')}
          </a>
        </Link>
{/* ------------------------------------------------------------------------------------- */}
        <Link href="/hotels">
          <a
            className={`nav__item nav__link ${
              pathname === '/hotels'
                ? 'text-main nav__link--active'
                : 'text-copy'
            }`}
          >
            {t('Hotels')}
          </a>
        </Link>
        <Link href="/flights">
          <a
            className={`nav__item nav__link ${
              pathname === '/flights'
                ? 'text-main nav__link--active'
                : 'text-copy'
            }`}
          >
            {t('Flights')}
          </a>
        </Link>
        
        <Link href="/catering">
          <a
            className={`nav__item nav__link ${
              pathname === '/catering'
                ? 'text-main nav__link--active'
                : 'text-copy'
            }`}
          >
            {t('Catering')}
          </a>
        </Link>

        <Link href="/transportation">
          <a
            className={`nav__item nav__link ${
              pathname === '/transportation'
                ? 'text-main nav__link--active'
                : 'text-copy'
            }`}
          >
            {t('Transportation')}
          </a>
        </Link>
        <Link href="http://gammats.com:7005/">
          <a
            className={`nav__item nav__link ${
              pathname === '/transportation'
                ? 'text-main nav__link--active'
                : 'text-copy'
            }`}
          >
            {t('Events')}
          </a>
        </Link>
{/* ------------------------------------------------------------------------------------- */}

        {/* <a
          href="http://gammats.com:8002/Hotels"
          className="nav__item nav__link text-copy"
        >
          {t('Hotels')}
        </a>

        <a
          href="http://gammats.com:8002/flights/Return"
          className="nav__item nav__link text-copy whitespace-nowrap"
        >
          {t('Flights')}
        </a> */}

        {/* <Link href="/b2b">
          <a className="py-1 lg:py-2 px-6 lg:px-8 block text-center w-full font-medium text-white bg-main rounded-md">
            B2B
          </a>
        </Link> */}

        <div className="h-6 w-2 bg-gray-300"></div>

        {auth.user?.loggedIn ? (
          <SignedInMenu auth={auth} />
        ) : (
          <Link
            href={{
              pathname: '/sign-in',
              query: {
                from: asPath,
              },
            }}
          >
            <a
              className={`flex items-center gap-1 nav__item nav__link ${
                pathname === '/sign-in'
                  ? 'text-main nav__link--active'
                  : 'text-copy'
              }`}
            >
              <LoginIcon className="w-4 h-4 lg:w-5 lg:h-5" />
              <span className="whitespace-nowrap">{t('Login')}</span>
            </a>
          </Link>
        )}
          {/* <Link href="http://gammats.com:8011/">
            <a
              className={`flex items-center gap-1 nav__item nav__link ${
                pathname === '/sign-in'
                  ? 'text-main nav__link--active'
                  : 'text-copy'
              }`}
            >
              <LoginIcon className="w-4 h-4 lg:w-5 lg:h-5" />
              <span className="whitespace-nowrap">{t('Login')}</span>
            </a>
          </Link> */}

        <LangSwitcher />
      </div>

      <NavMenu
        isMenuShown={isMenuShown}
        toggleMenuHandler={toggleMenuHandler}
      />
    </div>
  );
};

export default TopBar;
