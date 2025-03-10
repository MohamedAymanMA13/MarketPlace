import { PageLayout } from 'components/layout';
import { TextField, PasswordField } from 'components/form';
import { Spinner } from 'components/UI';

import { useAuth } from 'hooks/useAuth';
import {
  required,
  emailAddress,
  composeValidators,
  samePassword,
} from 'utils/helpers/validation.helpers';

import Link from 'next/link';
import { Form, Field } from 'react-final-form';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

export default function SignUp() {
  const { t } = useTranslation();
  const auth = useAuth();

  const onSubmit = async values => {
    console.log({ values });
    delete values.confirmPassword;
    auth.signUpHandler(values);
  };

  return (
    <PageLayout pageTitle={t('Sign Up')}>
      <div className="px-4 pt-6 lg:pt-8 pb-16 mx-auto max-w-sm md:max-w-md">
        <section className="px-4 py-6 w-full bg-white rounded-md flex flex-col items-center">
          <h2 className="font-bold text-base md:text-lg lg:text-xl text-copy">
            {t('Create an Account')}
          </h2>

          <p className="mt-2 text-copy text-sm font-medium">
            {t('Already have an account?')}{' '}
            <Link href="/sign-in">
              <a className="text-main underline">{t('Sign In')}</a>
            </Link>
          </p>

          <Form
            onSubmit={onSubmit}
            render={({ handleSubmit, form, submitting, pristine, values }) => (
              <form onSubmit={handleSubmit} className="w-full max-w-xs">
                <div className="mt-5 w-full max-w-xs space-y-2">
                  <div className="flex flex-col w-full">
                    <Field
                      name="firstName"
                      component={TextField}
                      placeholder="First Name"
                      validate={required}
                    />
                  </div>

                  <div className="flex flex-col w-full">
                    <Field
                      name="lastName"
                      component={TextField}
                      placeholder="Last Name"
                      validate={required}
                    />
                  </div>

                  <div className="flex flex-col w-full">
                    <Field
                      name="phoneNo"
                      component={TextField}
                      placeholder="Phone No."
                      validate={required}
                    />
                  </div>

                  <div className="flex flex-col w-full">
                    <Field
                      name="userName"
                      component={TextField}
                      placeholder="User Name"
                      validate={required}
                    />
                  </div>

                  <div className="flex flex-col w-full">
                    <Field
                      name="email"
                      component={TextField}
                      placeholder="Email"
                      validate={composeValidators(required, emailAddress)}
                    />
                  </div>

                  <div className="flex flex-col w-full">
                    <Field
                      name="password"
                      component={PasswordField}
                      placeholder="Password"
                      validate={required}
                    />
                  </div>

                  <div className="flex flex-col w-full">
                    <Field
                      name="confirmPassword"
                      component={PasswordField}
                      placeholder="Confirm Password"
                      validate={composeValidators(required, samePassword)}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="py-[10px] sm:px-12 lg:px-28 mt-6 w-full bg-main text-white font-medium text-sm rounded-md flex justify-center"
                >
                  {auth.isLoading ? (
                    <Spinner
                      className="animate-spin h-5 w-5"
                      sizeClasses="animate-spin h-6 w-6"
                    />
                  ) : (
                    <span className="whitespace-nowrap">
                      {t('Create Account')}
                    </span>
                  )}
                </button>
              </form>
            )}
          />
        </section>
      </div>
    </PageLayout>
  );
}

export async function getStaticProps(context) {
  const { locale } = context;

  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'messages'])),
    },
  };
}
