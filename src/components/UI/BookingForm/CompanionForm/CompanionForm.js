import { TextField, PassportPhotoField } from 'components/form';
import {
  required,
  onlyPositives,
  emailAddress,
} from 'utils/helpers/validation.helpers';

import { Field, useFormState } from 'react-final-form';

const CompanionForm = ({ comp, index, change }) => {
  const formState = useFormState();
  // console.log(formState);

  return (
    <div className="mt-4 lg:grid-cols-[0.5fr_1fr]">
      {/* <div>
        <Field
          name={`${comp}.passportImageFile`}
          component={PassportPhotoField}
          // passportUrl={
          //   formState.values.reservationPackageCompanions[index]
          //     .passportImageUrl
          // }
          validate={required}
          change={change}
          comp={comp}
        />
      </div> */}

      <div className="gap-4 grid grid-cols-1 lg:grid-cols-2 lg:content-start">
        <div className="flex flex-col w-full">
          <Field
            name={`${comp}.fullName`}
            component={TextField}
            label="Full Name"
            placeholder="Full Name"
            validate={required}
          />
        </div>

        <div className="flex flex-col w-full">
          <Field
            name={`${comp}.PassportNumber`}
            label="Passport No."
            component={TextField}
            placeholder="Passport No."
            validate={required}
          />
        </div>

        <div className="flex flex-col w-full">
          <Field
            name={`${comp}.emailAddress`}
            label="Email Address"
            component={TextField}
            placeholder="Email Address"
            validate={required}
            // validate={emailAddress}
          />
        </div>

        <div className="flex flex-col w-full">
          <Field
            name={`${comp}.phoneNo`}
            label="Phone No."
            component={TextField}
            placeholder="Phone No."
            validate={required}
          />
        </div>
      </div>
    </div>
  );
};

export default CompanionForm;
