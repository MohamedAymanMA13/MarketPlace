import { TripCard } from 'components/UI';

import { removeFromFavorite } from 'apis/services/favorites';
import { httpErrorHandler } from 'utils/helpers/apis.helpers';

import { XIcon } from '@heroicons/react/outline';
import toast from 'react-hot-toast';
import { useTranslation } from 'next-i18next';

const FavCard = ({ fav, auth, favFetcher }) => {
  const { t } = useTranslation('messages');

  const _remover = async () => {
    try {
      const response = await removeFromFavorite(
        fav.pkgId,
        auth.user.accessToken
      );

      if (response.data.data) {
        toast.success(t('Successfully removed from favorites!'));
        favFetcher();
      }
    } catch (error) {
      const errorMsg = httpErrorHandler(
        error,
        t('Failed to remove from favorites!')
      );
      toast.error(errorMsg);
    }
  };

  return (
    <TripCard
      additionalClasses="w-full max-w-sm sm:w-72 sm:max-w-none"
      imgAspectRatio="aspect-[10/5] sm:aspect-[10/6]"
      pkgDetails={fav}
    >
      <button
        type="button"
        className="p-1 absolute ltr:right-2 rtl:left-2 top-2 bg-white rounded-full text-red-600"
        onClick={_remover}
      >
        <XIcon className="w-5 h-5" />
      </button>
    </TripCard>
  );
};

export default FavCard;
