import { PageLayout } from 'components/layout';
import { TextField, PasswordField } from 'components/form';
import { Spinner } from 'components/UI';

import { useAuth } from 'hooks/useAuth';
import {
  required,
  emailAddress,
  composeValidators,
} from 'utils/helpers/validation.helpers';

import Link from 'next/link';
import { useRouter } from 'next/router';
import { Form, Field } from 'react-final-form';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

export default function SignIn() {
  const { t } = useTranslation();
  const auth = useAuth();
  const router = useRouter();

  const onSubmit = async values => {
    console.log({ values });
    auth.signInHandler(values, () => {
      const from = router.query.from || '/';
      console.log({ from });
      router.push(from, undefined, {
        locale: router.locale,
      });
    });
  };

  return (
    <PageLayout pageTitle={t('Sign In')}>
      <div className="px-4 pt-6 lg:pt-8 pb-16 mx-auto max-w-sm md:max-w-md">
        <section className="px-4 py-6 w-full bg-white rounded-md flex flex-col items-center">
          <h2 className="font-bold text-base md:text-lg lg:text-xl text-copy">
            {t('Sign in to your account')}
          </h2>

          <p className="mt-2 text-copy text-sm font-medium">
            {t("Don't have an account?")}{' '}
            <Link href="/sign-up">
              <a className="text-main underline">{t('Sign Up')}</a>
            </Link>
          </p>

          <Form
            onSubmit={onSubmit}
            render={({ handleSubmit, form, submitting, pristine, values }) => (
              <form onSubmit={handleSubmit} className="mt-5 w-full max-w-xs">
                <div className="flex flex-col w-full">
                  <Field
                    name="username"
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

                <p className="mt-2 text-copy text-sm font-medium hover:text-main hover:underline text-right">
                  <Link href="/sign-up">
                    <a>{t('Forget Your Password?')}</a>
                  </Link>
                </p>

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
                    <span>{t('Sign In')}</span>
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
