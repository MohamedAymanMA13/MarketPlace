import { PageLayout } from 'components/layout';
import {
  TextField,
  DateField,
  PasswordField,
  PassportPhotoField,
} from 'components/form';
import CRDataForm from 'components/UI/CRDataForm/CRDataForm';

import { required } from 'utils/helpers/validation.helpers';
import { addCompany } from 'apis/services/company-register';
import { httpErrorHandler } from 'utils/helpers/apis.helpers';

import { useRouter } from 'next/router';
import { Field, Form } from 'react-final-form';
import arrayMutators from 'final-form-arrays';
import toast from 'react-hot-toast';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
// import { serialize } from 'object-to-formdata';

function crFilesHandler(crFilesArray, formData) {
  const newFileTypeIds = [];
  const newFiles = [];

  crFilesArray.forEach(fileObj => {
    newFileTypeIds.push(fileObj.fileTypeId);
    newFiles.push(fileObj.file);
  });

  for (let i = 0; i < newFileTypeIds.length; i++) {
    const element = newFileTypeIds[i];
    formData.append('newFileTypeIds', element);
  }

  for (let i = 0; i < newFiles.length; i++) {
    const element = newFiles[i];
    formData.append('newFiles', element);
  }

  // return { newFileNames, newFiles };
}

export default function AddCompany() {
  const { t } = useTranslation(['common', 'messages']);
  const router = useRouter();
  const submitHandler = async values => {
    console.log(values);

    const valuesToSubmit = new FormData();
    const clonedValues = { ...values };
    const entries = Object.entries(clonedValues);

    for (let i = 0; i < entries.length; i++) {
      const element = entries[i];
      const key = element[0];
      const value = element[1];

      if (key === 'crFiles') {
        crFilesHandler(values.crFiles, valuesToSubmit);
      } else {
        valuesToSubmit.append(key, value);
      }
    }
    valuesToSubmit.append('companyType', 'travel');
    valuesToSubmit.append('statusId', '3');

    for (var pair of valuesToSubmit.entries()) {
      console.log(pair[0] + ', ' + pair[1]);
    }

    try {
      const response = await addCompany(valuesToSubmit);

      if (response.data.data) {
        toast.success(
          t(
            'Your company is successfully added and currently under reviewing!',
            {
              ns: 'messages',
            }
          )
        );

        router.push('/');
      }
    } catch (error) {
      const errorMsg = httpErrorHandler(
        error,
        t('Failed to add company!', {
          ns: 'messages',
        })
      );
      toast.error(errorMsg);
    }
  };

  return (
    <PageLayout pageTitle={t('Add your company now!')}>
      <div className="relative w-full h-32 md:h-48 lg:h-60 bg-com bg-cover bg-center bg-no-repeat">
        <div className="bg-main/50 w-full h-full flex items-center">
          <h2 className="px-6 md:px-8 lg:px-16 text-2xl md:text-3xl  lg:text-4xl text-white font-bold">
            {t('Company Registration')}
          </h2>
        </div>
      </div>

      <div className="px-3 py-4">
        <Form
          onSubmit={submitHandler}
          initialValues={{ crFiles: [{}] }}
          mutators={{
            ...arrayMutators,
          }}
          render={({
            handleSubmit,
            submitting,
            pristine,
            values,
            form: { reset },
          }) => (
            <form onSubmit={handleSubmit} className="flex flex-col">
              <section className="mt-2 p-5 w-full bg-white rounded-md">
                <h2 className="text-copy font-bold text-sm md:text-base lg:text-xl">
                  {t("Enter Your Company's Information")}
                </h2>

                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 xl:gap-5">
                  <div>
                    <label className="text-copy truncate font-medium text-xs 2xl:text-sm">
                      {t('Company Logo')}
                    </label>
                    <Field
                      name="companyLogo"
                      component={PassportPhotoField}
                      labelText="Upload company logo"
                      validate={required}
                    />
                  </div>

                  {/* <div></div> */}
                  <div className="xl:hidden"></div>
                  <div className="col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-2 md:gap-3">
                    <div>
                      <Field
                        name="arCompanyName"
                        component={TextField}
                        label="Company Name in Arabic"
                        validate={required}
                      />
                    </div>

                    <div>
                      <Field
                        name="enCompanyName"
                        component={TextField}
                        label="Company Name in English"
                        validate={required}
                      />
                    </div>

                    <div className="xl:col-span-2">
                      <Field
                        name="licenseNo"
                        component={TextField}
                        label="License No."
                        validate={required}
                      />
                    </div>

                    <div>
                      <Field
                        name="licenseDate"
                        component={DateField}
                        label="License Date"
                        validate={required}
                      />
                    </div>

                    <div>
                      <Field
                        name="licenseExpiryDate"
                        component={DateField}
                        label="License Expiry"
                        validate={required}
                      />
                    </div>

                    <div className="xl:col-span-2">
                      <Field
                        name="commRegNo"
                        component={TextField}
                        label="Commercial Reg No."
                        validate={required}
                      />
                    </div>

                    <div>
                      <Field
                        name="regIssueDate"
                        component={DateField}
                        label="Reg Issue Date"
                        validate={required}
                      />
                    </div>

                    <div>
                      <Field
                        name="regExpiryDate"
                        component={DateField}
                        label="Reg Expiry Date"
                        validate={required}
                      />
                    </div>

                    <div>
                      <Field
                        name="ibanWallet"
                        component={TextField}
                        label="IBAN Wallet"
                        validate={required}
                      />
                    </div>

                    <div>
                      <Field
                        name="website"
                        component={TextField}
                        label="Website"
                        validate={required}
                      />
                    </div>

                    <div>
                      <Field
                        name="email"
                        component={TextField}
                        label="Email"
                        validate={required}
                      />
                    </div>

                    <div>
                      <Field
                        name="userPassword"
                        component={PasswordField}
                        placeholder="Password"
                        label="Password"
                        validate={required}
                      />
                    </div>
                  </div>
                </div>
              </section>

              <section className="mt-5 p-5 w-full bg-white rounded-md">
                <h2 className="text-copy font-bold text-sm md:text-base lg:text-xl">
                  {t('CR Data')}
                </h2>

                <CRDataForm />
              </section>

              <button
                type="submit"
                className="mt-5 py-2 font-medium text-white text-sm bg-main rounded-md flex items-center justify-center gap-1 w-full sm:w-max sm:px-8 sm:self-end"
              >
                {t('Register')}
              </button>
            </form>
          )}
        />
      </div>
    </PageLayout>
  );
}

export async function getServerSideProps(context) {
  const { locale } = context;
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'messages'])),
    },
  };
}
