import { TextField } from 'components/form';

const CCSection = () => {
  return (
    <div className="p-4 w-full bg-white rounded-md">
      <h3 className="font-bold text-sm md:text-base lg:text-lg xl:text-xl text-copy">
        Enter Your Card Details
      </h3>

      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col w-full md:col-span-2 lg:col-auto">
          <TextField label="Cardholder's Name" />
        </div>

        <div className="flex flex-col w-full md:col-span-2 lg:col-auto">
          <TextField label="Card Number" />
        </div>

        <div className="flex flex-col w-full">
          <TextField label="Expiration Date" />
        </div>

        <div className="flex flex-col w-full">
          <TextField label="CVV Code" />
        </div>
      </div>
    </div>
  );
};

export default CCSection;
