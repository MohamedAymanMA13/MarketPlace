import { DocumentAddIcon } from '@heroicons/react/solid';
import { useTranslation } from 'next-i18next';

const FileUploadField = ({
  classes,
  name,
  fieldId,
  removeHandler,
  input: { value, onChange, ...input },
}) => {
  const { t } = useTranslation();

  return (
    <div className={`relative ${classes}`}>
      <input
        {...input}
        id={input.name}
        name={name}
        type="file"
        accept=".doc,.docx,.jpg, .jpeg, .png, .pdf, .xls, .xlsx"
        className="w-[1px] h-[1px] overflow-hidden absolute z-[-1] opacity-0"
        onChange={e => {
          onChange(e.target.files[0]);
        }}
      />

      <label
        htmlFor={input.name}
        className="py-2 pl-2 pr-8 block border border-[#B6B6B6] w-full cursor-pointer truncate text-xs font-medium text-copy rounded-[10px]"
      >
        {!value ? (
          t('Upload File')
        ) : (
          <span className="font-medium">{value?.name}</span>
        )}
      </label>

      <DocumentAddIcon className="pointer-events-none absolute top-1/2 -translate-y-1/2 h-5 w-5 text-copy right-2" />
    </div>
  );
};

export default FileUploadField;
