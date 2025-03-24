import { createContext, useEffect, useState } from 'react';

import { httpErrorHandler } from 'utils/helpers/apis.helpers';
import { fetchConfigTables } from 'apis/services/config';

import toast from 'react-hot-toast';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';

export const ConfigContext = createContext();

export const ConfigProvider = ({ children }) => {
  const { t } = useTranslation('messages');
  const { locale } = useRouter();
  const [tables, setTables] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    const tablesFetcher = async () => {
      toast.promise(fetchConfigTables(locale), {
        loading: t('Fetching configuration tables...'),

        success: response => {
          if (response.data.data) {
            setTables(response.data.data);
            return <b>{t('Got the config tables')}</b>;
          }
        },

        error: error => {
          const errorMsg = httpErrorHandler(
            error,
            t('Failed to fetch tables!')
          );
          return errorMsg;
        },
      });
    };

    tablesFetcher();
  }, []);

  return (
    <ConfigContext.Provider value={{ tables, error }}>
      {children}
    </ConfigContext.Provider>
  );
};

