import { PopoverBtn } from 'components/UI';
import { TextField } from 'components/form';

import * as Popover from '@radix-ui/react-popover';
import { ShareIcon } from '@heroicons/react/solid';
import { useTranslation } from 'next-i18next';

const TriggerElement = ({ t }) => (
  <button
    type="button"
    className="p-2 text-sm font-medium rounded-md text-main border border-main flex items-center gap-1"
  >
    <ShareIcon className="w-4 h-4" />
    <span className="whitespace-nowrap">{t('Send to a friend')}</span>
  </button>
);

const ShareBtn = ({ isSignedIn }) => {
  const { t } = useTranslation();

  return (
    <>
      {/* {isSignedIn ? (
        <Popover.Root>
          <Popover.Trigger>
            <TriggerElement t={t} />
          </Popover.Trigger>
          <Popover.Content side="bottom" sideOffset={5}>
            <div className="py-3 px-3 ltr:font-poppins rtl:font-noto rounded-md text-white text-sm shadow-lg bg-white min-w-[250px] space-y-4 flex flex-col">
              <div className="w-full">
                <TextField name="email" placeholder="Email Address" />
              </div>

              <button className="py-1 sm:px-8 bg-main text-white font-medium text-sm text-center rounded-md">
                {t('Send')}
              </button>
            </div>
          </Popover.Content>
        </Popover.Root>
      ) : (
        <PopoverBtn
          triggerElement={
            <div>
              <TriggerElement t={t} />
            </div>
          }
        />
      )} */}
       <Popover.Root>
          <Popover.Trigger>
            <TriggerElement t={t} />
          </Popover.Trigger>
          <Popover.Content side="bottom" sideOffset={5}>
            <div className="py-3 px-3 ltr:font-poppins rtl:font-noto rounded-md text-white text-sm shadow-lg bg-white min-w-[250px] space-y-4 flex flex-col">
              <div className="w-full">
                <TextField name="email" placeholder="Email Address" />
              </div>

              <button className="py-1 sm:px-8 bg-main text-white font-medium text-sm text-center rounded-md">
                {t('Send')}
              </button>
            </div>
          </Popover.Content>
        </Popover.Root>
    </>
  );
};

export default ShareBtn;
