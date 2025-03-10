import { TextField, TextArea } from 'components/form';

import {
  required,
  onlyPositives,
  emailAddress,
  composeValidators,
} from 'utils/helpers/validation.helpers';

import { Form, Field } from 'react-final-form';
import { useTranslation } from 'next-i18next';

const ContactForm = () => {
  const { t } = useTranslation();
  const submitHandler = values => console.log(values);

  return (
    <Form
      onSubmit={submitHandler}
      render={({
        handleSubmit,
        submitting,
        pristine,
        values,
        form: { reset },
      }) => (
        <form onSubmit={handleSubmit}>
          <div className="mt-3 md:mt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col w-full">
              <Field
                name="fullName"
                component={TextField}
                label="Full Name"
                placeholder="Full Name"
                validate={required}
              />
            </div>

            <div className="flex flex-col w-full">
              <Field
                name="emailAddress"
                component={TextField}
                label="Email Address"
                placeholder="Email Address"
                validate={composeValidators(required, emailAddress)}
              />
            </div>

            <div className="flex flex-col w-full md:col-span-2">
              <Field
                name="subject"
                component={TextField}
                label="Subject"
                placeholder="Subject"
                validate={required}
              />
            </div>

            <div className="flex flex-col w-full md:col-span-2">
              <Field
                name="message"
                component={TextArea}
                label="Message"
                placeholder="Message"
                validate={required}
                rows={4}
              />
            </div>

            <button
              type="submit"
              className="py-2 w-full md:w-3/4 bg-main text-white font-medium text-sm text-center rounded-md md:col-start-2
              md:justify-self-end"
            >
              {t('Send Message')}
            </button>
          </div>
        </form>
      )}
    />
  );
};

export default ContactForm;
