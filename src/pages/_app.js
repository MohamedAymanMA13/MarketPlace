import '../../styles/globals.css';
import '../../styles/additional.css';
import 'rc-slider/assets/index.css';
import '../../styles/date-range-style.css';
import '../../styles/date-range-theme.css';

// import 'react-date-range/dist/styles.css'; // main css file
// import 'react-date-range/dist/theme/default.css'; // theme css file

import { useEffect } from 'react';
import { ProvideAuth } from 'hooks/useAuth';
import { ConfigProvider } from 'contexts/ConfigContext';
import { Toaster } from 'react-hot-toast';
import { appWithTranslation } from 'next-i18next';
import { useRouter } from 'next/router';

function MyApp({ Component, pageProps }) {
  const { locale } = useRouter();

  useEffect(() => {
    document.documentElement.dir = locale === 'ar' ? 'rtl' : 'ltr';
  }, [locale]);

  return (
    <ProvideAuth>
      <ConfigProvider>
        <Component {...pageProps} />

        <Toaster
          position="bottom-right"
          containerClassName="text-sm 2xl:text-base ltr:font-poppins rtl:font-noto"
        />
      </ConfigProvider>
    </ProvideAuth>
  );
}

export default appWithTranslation(MyApp);
