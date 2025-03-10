const TravelCompanyIcon = ({
  className = 'h-4 w-4 2xl:h-5 2xl:w-5 flex-shrink-0',
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 26 24"
      className={className}
      fill="currentColor"
    >
      <g>
        <path d="M22.647 3.608h-5.556V.798a.8.8 0 0 0-.8-.8H9.065a.8.8 0 0 0-.8.8v2.811H2.711A2.714 2.714 0 0 0 0 6.32v11.061a2.714 2.714 0 0 0 2.711 2.711h19.936a2.714 2.714 0 0 0 2.711-2.711V6.32a2.714 2.714 0 0 0-2.711-2.712ZM9.863 1.595H15.5v2.013H9.863Zm-5.452 16.9h-1.7A1.117 1.117 0 0 1 1.6 17.381V6.32a1.117 1.117 0 0 1 1.116-1.116h1.7Zm14.942 0H6.006V5.204h13.346v13.293Zm4.411-1.116a1.117 1.117 0 0 1-1.116 1.116h-1.7V5.204h1.7a1.117 1.117 0 0 1 1.116 1.116Z" />
      </g>
    </svg>
  );
};

export default TravelCompanyIcon;
