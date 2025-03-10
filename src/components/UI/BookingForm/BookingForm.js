import CompanionForm from './CompanionForm/CompanionForm';
import { useAuth } from 'hooks/useAuth';
import { Spinner } from '..';

import { FieldArray } from 'react-final-form-arrays';
import { MinusIcon, PlusIcon } from '@heroicons/react/outline';
import { useTranslation } from 'next-i18next';

const BookingForm = ({
  handleSubmit,
  reqLoading,
  submitting,
  pristine,
  change,
}) => {
  const { t } = useTranslation();

  return (
    <form onSubmit={handleSubmit} className="space-y-4 flex flex-col">
      <div className="px-4 pt-1 pb-4 w-full bg-white rounded-md">
        <FieldArray name="reservationPackageCompanions">
          {({ fields }) => (
            <>
              <div className="py-3 text-sm font-medium text-inputGray flex items-center justify-between md:max-w-xs">
                <span>{t('No. of Travellers')}</span>

                <div className="flex items-center gap-3">

                  <button
                    type="button"
                    disabled={fields.length === 1}
                    className={`p-1 rounded-full bg-zinc-100 disabled:opacity-50 disabled:cursor-not-allowed`}
                    onClick={() => {
                      fields.remove(fields.length - 1);
                    }}
                  >
                    <MinusIcon className="w-5 h-5" />
                  </button>
                  <span className="font-semibold">{fields.length}</span>
                  <button
                    type="button"
                    className="p-1 rounded-full bg-zinc-100"
                    onClick={() => fields.push({})}
                  >
                    <PlusIcon className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {fields.map((comp, i) => (
                <article key={i}>
                  {i >= 1 ? <hr className="my-4" /> : null}
                  {i === 0 ? (
                    <h3 className="text-sm lg:text-base text-main font-bold">
                      {t('Main Traveller')}
                    </h3>
                  ) : (
                    <h3 className="text-sm lg:text-base text-copy font-bold">
                      {t('Companion')} {i}
                    </h3>
                  )}

                  <CompanionForm comp={comp} index={i} change={change} />
                </article>
              ))}
            </>
          )}
        </FieldArray>
      </div>

      <div className="sm:self-end flex gap-4 items-center justify-center">
        {/* <button type="button" onClick={() => form.reset()}>
              Reset
            </button> */}

        <button
          type="submit"
          className="py-2 sm:px-8 lg:px-28 mt-4 w-full max-w-xs sm:max-w-none self-center sm:w-fit bg-main text-white font-medium text-sm text-center rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={submitting || pristine}
        >
          {reqLoading ? (
            <Spinner className="animate-spin h-5 w-5" />
          ) : (
            t('Book Now')
          )}
        </button>
      </div>
    </form>
  );
};

export default BookingForm;
