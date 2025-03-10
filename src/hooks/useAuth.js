import { useState, useContext, createContext } from 'react';

import { httpErrorHandler } from 'utils/helpers/apis.helpers';
import { signUp, signIn } from 'apis/services/auth';

import { useRouter } from 'next/router';
import toast from 'react-hot-toast';
import { useTranslation } from 'next-i18next';

const authContext = createContext();

function useProvideAuth() {
  const { t } = useTranslation('messages');
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const signInHandler = async (values, cb) => {
    setIsLoading(true);

    try {
      const response = await signIn(values);
      if (response.data.Data) {
        setIsLoading(false);
        setUser({ ...response.data.Data, loggedIn: true });
        localStorage.setItem(
          'loggedInUser',
          JSON.stringify({ ...response.data.Data, loggedIn: true })
        );
        toast.success(<b>{t('Welcome Back!')}</b>);
        cb();
      }
    } catch (error) {
      setIsLoading(false);
      const errorMsg = httpErrorHandler(error, t('Login Failed!'));
      toast.error(errorMsg);
    }
  };

  const signOut = () => {
    setUser(null);
    localStorage.removeItem('loggedInUser');
    toast.success(t('Successfully logged out!'));
    router.push('/');
  };

  const signUpHandler = async (values, cb) => {
    setIsLoading(true);

    try {
      const response = await signUp(values);
      if (response.data.Data) {
        setIsLoading(false);
        toast.success(<b>{t('Account Successfully Created!')}</b>);
        router.push('/sign-in');
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      const errorMsg = httpErrorHandler(
        error,
        t('Failed to create an account! Please try again later.')
      );
      toast.error(errorMsg);
    }
  };

  return {
    user,
    setUser,
    isLoading,
    signInHandler,
    signOut,
    signUpHandler,
  };
}

export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
  return useContext(authContext);
};
