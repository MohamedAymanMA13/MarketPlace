// import PropTypes from 'prop-types';
import { useTranslation } from 'next-i18next';

const DateField = ({
  label,
  labelFontSize = 'text-xs 2xl:text-sm',
  placeholder,
  input,
  meta,
  disabled,
  min,
  max,
}) => {
  const { t } = useTranslation();

  return (
    <>
      <label
        className={`text-copy truncate font-medium ${labelFontSize}`}
        // htmlFor={input.name}
      >
        {t(label)}
      </label>
      <input
        {...input}
        type="date"
        placeholder={placeholder}
        className={`mt-1 form__input ${
          disabled ? 'cursor-not-allowed bg-gray-100' : ''
        }`}
        // id={input.name}
        disabled={disabled}
        min={min}
        max={max}
      />

      <p className="mt-1 text-red-400 font-normal text-xs">
        {meta.touched ? t(meta.error) : ''}
      </p>
    </>
  );
};

// DateField.propTypes = {
//   label: PropTypes.string,
//   placeholder: PropTypes.string,
//   meta: PropTypes.object,
//   disabled: PropTypes.bool,
// };

export default DateField;
