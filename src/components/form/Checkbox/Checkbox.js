const Checkbox = ({ label }) => {
  return (
    <div className="flex items-center gap-1">
      <input
        id="days"
        name="days"
        type="checkbox"
        className="w-4 h-4 rounded"
      />
      <label className="text-inputGray text-sm font-medium" htmlFor="days">
        {label}
      </label>
    </div>
  );
};

export default Checkbox;
