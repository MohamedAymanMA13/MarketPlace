import {
  TextField,
  DateField,
  FileUploadField,
  SelectField,
} from 'components/form';

import { useConfig } from 'hooks/useConfig';
import { required } from 'utils/helpers/validation.helpers';

import { Field } from 'react-final-form';
import { FieldArray } from 'react-final-form-arrays';
import { XIcon, PlusIcon } from '@heroicons/react/solid';
import { useTranslation } from 'next-i18next';

const CRDataForm = () => {
  const { t } = useTranslation();
  const config = useConfig();

  return (
    <FieldArray name="crFiles">
      {({ fields }) => (
        <>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 xl:gap-5">
            <div>
              <Field
                name="crNo"
                component={TextField}
                label="CR No."
                validate={required}
              />
            </div>

            <div>
              <Field
                name="crExpiryDate"
                component={DateField}
                label="CR Expiry Date"
                validate={required}
              />
            </div>

            <button
              type="button"
              className="py-1 font-medium text-white text-sm bg-main rounded-md flex items-center justify-center gap-1 h-[34px] w-full col-span-2 md:col-auto md:mt-7 sm:w-max sm:px-8"
              onClick={() => fields.push(undefined)}
            >
              <PlusIcon className="h-4 w-4" />
              {fields.length === 0 ? (
                <span>{t('Add File')}</span>
              ) : (
                <span>{t('Add Another File')}</span>
              )}
            </button>
          </div>

          <div className="mt-5 space-y-2">
            {fields.map((line, index) => (
              <div
                key={index}
                className="grid grid-cols-1 sm:grid-cols-3 xl:grid-cols-4 gap-3 xl:gap-5"
              >
                <div>
                  <Field
                    name={`${line}.fileTypeId`}
                    component={SelectField}
                    label="File name"
                    firstNoOption="Select file name"
                    options={config.tables?.attachmentTypes || []}
                    validate={required}
                  />
                </div>

                <div className="sm:mt-6">
                  <Field
                    name={`${line}.file`}
                    component={FileUploadField}
                    classes="w-full"
                  />
                </div>

                <div className="sm:mt-4 flex gap-2 items-center">
                  <button
                    type="button"
                    className="p-1 2xl:p-2 border rounded-lg 2xl:rounded-10 text-red-600 border-red-600 disabled:cursor-not-allowed disabled:opacity-50"
                    onClick={() => {
                      fields.remove(index);
                    }}
                  >
                    <XIcon className="h-4 w-4 2xl:h-5 2xl:w-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </FieldArray>
  );
};

export default CRDataForm;
