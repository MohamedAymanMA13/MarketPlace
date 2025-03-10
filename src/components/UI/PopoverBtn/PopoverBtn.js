import * as Popover from '@radix-ui/react-popover';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

const PopoverBtn = ({ triggerElement }) => {
  const { t } = useTranslation();
  const router = useRouter();

  return (
    <Popover.Root>
      <Popover.Trigger asChild>{triggerElement}</Popover.Trigger>
      <Popover.Content side="top" sideOffset={5}>
        <div className="py-1 px-2 min-w-[175px] text-center ltr:font-poppins rtl:font-noto rounded-md bg-slate-800 text-white text-sm">
          <p>
            {t('Please')},{' '}
            <Link
              href={{
                pathname: '/sign-in',
                query: {
                  from: router.asPath,
                },
              }}
            >
              <a className="underline hover:text-sky-200">{t('sign in')}</a>
            </Link>{' '}
            {t('first')}!
          </p>
        </div>
      </Popover.Content>
    </Popover.Root>
  );
};

export default PopoverBtn;
