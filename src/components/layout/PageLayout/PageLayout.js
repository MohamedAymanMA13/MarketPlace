import { TopBar, Footer } from 'components/layout/index';
import StyleSwitcher from '../../StyleSwitcher'
import Head from 'next/head';
import Router, { useRouter } from 'next/router';

const PageLayout = ({ pageTitle, children }) => {
  const { asPath } = useRouter();
  return (
    <>
      <Head>
        <title>{pageTitle}</title>
      </Head>

      <header className="sticky top-0 z-20 bg-white ltr:font-poppins rtl:font-noto">
        <TopBar />
        <StyleSwitcher />
      </header>

      <main
        className="ltr:font-poppins rtl:font-noto bg-bg main__container"
        // className={`ltr:font-poppins rtl:font-noto bg-bg ${
        //   asPath === '/sign-in' ? 'main__container--auth' : ''
        // }`}
      >
        {children}
      </main>

      <footer
      // className={`${asPath === '/sign-in' ? 'layout__footer' : ''} `}
      // className={`${
      //   asPath === '/sign-in' ? 'absolute w-full bottom-0' : ''
      // } `}
      // className="absolute w-full bottom-0"
      >
        <Footer />
      </footer>
    </>
  );
};

export default PageLayout;
