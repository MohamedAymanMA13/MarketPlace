const InfoIcon = ({ icon, mainLabel, subLabel }) => {
  return (
    <div className="flex items-center gap-4">
      <div className="p-2 bg-bg rounded-full">{icon}</div>

      <div className="text-copy">
        <p className="text-base md:text-lg font-bold">{mainLabel}</p>
        <p className="text-sm md:text-base font-medium">{subLabel}</p>
      </div>
    </div>
  );
};

export default InfoIcon;
