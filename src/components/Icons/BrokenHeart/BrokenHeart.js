const BrokenHeart = ({
  className = 'h-4 w-4 2xl:h-5 2xl:w-5 flex-shrink-0',
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      fill="currentColor"
      viewBox="0 0 151 151"
    >
      <path d="M151.025 41.322c-3.02-33.727-32.143-37.806-53.604-28.115L84.736 49.251l25.848-8.195-20.493 30.807 22.639-9.369-41.358 64.31 12.105-44.136-16.645 9.581 14.629-31.776-18.47.627 6.088-37.19C50.285 3.481 4.14-1.623.289 41.316c-5.719 63.925 75.369 101.375 75.369 101.375s81.083-37.45 75.367-101.369z" />
    </svg>
  );
};

export default BrokenHeart;
