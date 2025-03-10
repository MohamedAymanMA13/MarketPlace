import { useState } from 'react';
// import PropTypes from 'prop-types';
import { EyeIcon, EyeOffIcon } from '@heroicons/react/solid';
import { useTranslation } from 'next-i18next';

const PasswordField = ({
  label,
  labelFontSize = 'text-xs 2xl:text-sm',
  placeholder,
  input,
  meta,
  disabled,
}) => {
  const [inputType, setInputType] = useState('password');
  const { t } = useTranslation();

  return (
    <>
      <label
        className={`text-copy truncate font-medium ${labelFontSize}`}
        // htmlFor={input.name}
      >
        {t(label)}
      </label>

      <div className="relative">
        <input
          {...input}
          type={inputType}
          placeholder={t(placeholder)}
          className={`mt-2 w-full form__input ${
            disabled ? 'cursor-not-allowed bg-gray-100' : ''
          }`}
          // id={input.name}
          disabled={disabled}
        />

        <button
          type="button"
          // className={`absolute top-2 transform translate-y-1/2 text-inputGray ${
          //   i18n.language === 'ar' ? 'left-3' : 'right-3'
          // }`}
          className={`absolute top-2 transform translate-y-1/2 text-inputGray ltr:right-3 rtl:left-3`}
          onClick={() => {
            setInputType(prevState => {
              if (prevState === 'password') {
                return 'text';
              }

              return 'password';
            });
          }}
        >
          {inputType === 'password' ? (
            <EyeOffIcon className="h-5 w-5" />
          ) : (
            <EyeIcon className="h-5 w-5" />
          )}
        </button>
      </div>

      <p className="mt-1 text-red-400 font-normal text-xs">
        {meta.touched ? t(meta.error) : ''}
      </p>
    </>
  );
};

// PasswordField.propTypes = {
//   label: PropTypes.string,
//   placeholder: PropTypes.string,
//   meta: PropTypes.object,
//   disabled: PropTypes.bool,
// };

export default PasswordField;
