import { useTranslation } from 'next-i18next';

const TextArea = ({
  label,
  labelFontSize = 'text-xs 2xl:text-sm',
  placeholder,
  input,
  meta,
  disabled,
  rows,
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
      <textarea
        {...input}
        // id={input.name}
        className={`mt-1 form__input ${
          disabled ? 'cursor-not-allowed bg-gray-100' : ''
        }`}
        placeholder={t(placeholder)}
        disabled={disabled}
        rows={rows}
      />

      <p className="mt-1 text-red-400 font-normal text-xs">
        {meta && meta.touched ? t(meta.error) : ''}
      </p>
    </>
  );
};

export default TextArea;
