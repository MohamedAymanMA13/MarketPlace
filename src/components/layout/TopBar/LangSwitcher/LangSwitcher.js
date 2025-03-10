import Link from 'next/link';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { ChevronDownIcon } from '@heroicons/react/solid';
import { useRouter } from 'next/router';

const LangSwitcher = () => {
  const { locale, asPath } = useRouter();

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button className="text-sm text-copy flex items-center justify-between">
          {locale === 'ar' ? 'عربي' : 'EN'}
          <ChevronDownIcon className="w-4 h-4" />
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Content
        sideOffset={13}
        className="py-3 px-2 rounded-md bg-white shadow-lg flex flex-col ltr:font-poppins rtl:font-noto items-center space-y-3"
      >
        <Link href={asPath} locale="en">
          <a className="block py-1 px-5 text-center font-medium text-sm rounded-md hover:bg-bg hover:text-main">
            EN
          </a>
        </Link>

        <Link href={asPath} locale="ar">
          <a className="block py-1 px-5 text-center font-medium text-sm rounded-md hover:bg-bg hover:text-main">
            عربي
          </a>
        </Link>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};

export default LangSwitcher;
