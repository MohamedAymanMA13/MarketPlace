import { StarIcon } from '@heroicons/react/solid';

const FilledStars = ({ starsCount }) => {
  return (
    <div className="flex">
      {starsCount
        ? new Array(+starsCount)
            .fill('star')
            .map((star, i) => (
              <StarIcon key={i} className="w-4 h-4 text-yellow-500" />
            ))
        : null}
    </div>
  );
};

export default FilledStars;
