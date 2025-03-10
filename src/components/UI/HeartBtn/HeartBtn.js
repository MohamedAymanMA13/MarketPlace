import { useState, useEffect } from 'react';

import { axios_instance as axios } from 'apis/axios-instance';
import { httpErrorHandler } from 'utils/helpers/apis.helpers';
import { PopoverBtn } from 'components/UI';
import { BrokenHeart } from 'components/Icons';

import { HeartIcon } from '@heroicons/react/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/solid';
import toast from 'react-hot-toast';
import { useTranslation } from 'next-i18next';

const HeartBtn = ({ isSignedIn, pkgId, auth }) => {
  const { t } = useTranslation(['common', 'messages']);
  const [isFav, setIsFav] = useState(false);

  const addToFavorite = async () => {
    try {
      const response = await axios.post(
        `/FavouritePackage/AddToFavourites?packageId=${pkgId}`,
        {},
        {
          headers: {
            authorization: 'Bearer ' + auth.user.accessToken,
          },
        }
      );

      if (response.data.data) {
        setIsFav(true);
      }
    } catch (error) {
      const errorMsg = httpErrorHandler(
        error,
        t('Failed to add to favorites!', {
          ns: 'messages',
        })
      );
      toast.error(errorMsg);
    }
  };

  const removeFavorite = async () => {
    try {
      const response = await axios.delete(`/FavouritePackage?id=${pkgId}`, {
        headers: {
          authorization: 'Bearer ' + auth.user.accessToken,
        },
      });

      if (response.data.data) {
        setIsFav(false);
      }
    } catch (error) {
      const errorMsg = httpErrorHandler(
        error,
        t('Failed to remove favorites!', {
          ns: 'messages',
        })
      );
      toast.error(errorMsg);
    }
  };

  // This useEffect sets the initial state of the heart button
  useEffect(() => {
    const checkIsFav = async () => {
      try {
        const response = await axios.get(
          `/FavouritePackage/HasInFavourites?packageId=${pkgId}`,
          {
            headers: {
              authorization: 'Bearer ' + auth.user.accessToken,
            },
          }
        );

        if (response.data.data) {
          setIsFav(true);
        }
      } catch (error) {
        const errorMsg = httpErrorHandler(
          error,
          t('Failed to fetch favorites!', {
            ns: 'messages',
          })
        );
        toast.error(errorMsg);
      }
    };

    if (auth.user && auth.user.accessToken) {
      console.log('%c In useEffect ', 'color: teal');
      checkIsFav();
    }
  }, [auth, pkgId]);

  let toRender;

  if (isSignedIn) {
    if (isFav) {
      toRender = (
        <button
          type="button"
          className="p-2 group bg-gray-200 rounded-md"
          onClick={removeFavorite}
        >
          <HeartIconSolid className="block group-hover:hidden w-5 h-5 text-red-600" />

          <BrokenHeart className="hidden group-hover:block w-5 h-5 text-red-600" />
        </button>
      );
    } else {
      toRender = (
        <button
          type="button"
          className="p-2 group bg-gray-200 rounded-md"
          onClick={addToFavorite}
        >
          <HeartIcon className="w-5 h-5 group-hover:text-red-600" />
        </button>
      );
    }
  } else {
    toRender = (
      <PopoverBtn
        triggerElement={
          <button type="button" className="p-2 group bg-gray-200 rounded-md">
            <HeartIcon className="w-5 h-5 group-hover:text-red-600" />
          </button>
        }
      />
    );
  }

  return <>{toRender}</>;
};

export default HeartBtn;
