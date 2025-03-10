import { FilledStars } from 'components/UI';

const StarsCheckbox = ({ starsCount, input }) => {
  return (
    <label className="flex gap-1">
      <input {...input} className="w-4 h-4 rounded" />
      <FilledStars starsCount={starsCount} />
    </label>
  );
};

export default StarsCheckbox;
