import { useState } from 'react';

import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/outline';
import { useTranslation } from 'react-i18next';

const ExpandableSection2 = ({ title, answer, additionalClasses }) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const toggleState = () => setIsOpen(prevState => !prevState);

  return (
    <section
      className={`${additionalClasses} w-full rounded-md ${
        isOpen ? 'py-3 h-full' : 'pt-3 h-12'
      }`}
    >
      <div className="flex items-center justify-between">
        <h2 className="text-copy font-semibold text-base lg:text-lg">
          {t(title)}
        </h2>

        <button
          type="button"
          className="p-1 rounded-full bg-main text-white"
          onClick={toggleState}
        >
          {isOpen ? (
            <ChevronUpIcon className="h-5 w-5 lg:h-6 lg:w-6" />
          ) : (
            <ChevronDownIcon className="h-5 w-5 lg:h-6 lg:w-6" />
          )}
        </button>
      </div>

      <div className={`${isOpen ? 'block mt-3' : 'hidden'}`}>
        <p className="text-copy text-sm lg:text-base font-medium">{answer}</p>
      </div>
    </section>
  );
};

export default ExpandableSection2;
