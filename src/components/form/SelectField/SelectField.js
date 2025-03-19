import { useTranslation } from 'next-i18next';

const SelectField = ({
  label,
  labelFontSize = 'text-xs 2xl:text-sm',
  input,
  meta,
  disabled,
  options,
  optionsFontSize,
  firstNoOption,
  displayPropName = 'value',
  onChangeCustom, // New prop for custom onChange handler
}) => {
  const { t } = useTranslation();

  const handleChange = (event) => {
    const value = event.target.value;
    input.onChange(value); // Call react-final-form's onChange
    if (onChangeCustom) {
      onChangeCustom(value); // Call the custom onChange handler passed from the parent
    }
  };

  return (
    <>
      <label className={`text-copy truncate font-medium ${labelFontSize}`}>
        {t(label)}
      </label>

      <select
        {...input}
        className={`mt-1 form__input `}
        disabled={disabled}
        onChange={handleChange} // Use the custom handleChange function
      >
        {firstNoOption ? <option value="">{t(firstNoOption)}</option> : null}
        {options?.map(option => (
          <option key={option.id || option.ID || option.Id} value={option.id || option.ID || option.Id}>
            {option[displayPropName] || option.Value}
          </option>
        ))}
      </select>

      {meta ? (
        <p className="mt-1 text-red-400 font-normal text-xs">
          {meta.touched ? t(meta.error) : ''}
        </p>
      ) : null}
    </>
  );
};

export default SelectField;
