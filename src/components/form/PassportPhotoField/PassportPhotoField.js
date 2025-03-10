/* eslint-disable @next/next/no-img-element */
import { useState, useEffect } from 'react';
import { useTranslation } from 'next-i18next';

import { scanPassport } from 'apis/services/bookings';
import { httpErrorHandler } from 'utils/helpers/apis.helpers';
import toast from 'react-hot-toast';

const PassportPhotoField = ({
  input: { value, onChange, ...input },
  passportUrl,
  parentComp,
  labelText = 'Upload Passport Photo',
  meta,
  change,
  comp,
}) => {
  const { t } = useTranslation();
  const [selectedPassport, setSelectedPassport] = useState('');
  const [encodedPassport, setEncodedPassport] = useState('');

  const readPassportHandler = async encodedPhoto => {
    // try {
    //   const response = await scanPassport({
    //     userId: 29494,
    //     base64StringPassImage: encodedPhoto,
    //   });

    //   if (response.data.data) {
    //     const _res = response.data.data;
    //     console.log(_res);
    //     change(`${comp}.fullName`, `${_res.givenName} ${_res.surName}`);
    //     change(`${comp}.passportNo`, _res.passportNo);
    //   }
    // } catch (error) {
    //   const errorMsg = httpErrorHandler(error, 'Failed to Read your passport!');
    //   toast.error(errorMsg);
    // }
  };

  const fileReaderHandler = file => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = e => {
      // console.log(e.target.result);
      setEncodedPassport(e.target.result);
      readPassportHandler(
        e.target.result.replace(/^data:image\/[a-z]+;base64,/, '')
      );
    };
  };

  // * this handles the selection of a photo from the dialogue box
  const changeHandler = e => {
    console.log(e.target.files);
    if (e.target.files && e.target.files.length > 0) {
      setSelectedPassport(URL.createObjectURL(e.target.files[0]));
      fileReaderHandler(e.target.files[0]);
    } else {
      setSelectedPassport('');
      setEncodedPassport('');
      change(`${comp}.fullName`, '');
      change(`${comp}.passportNo`, '');
    }

    // ! Make sure to revoke the data uris to avoid memory leaks
  };

  useEffect(() => {
    if (passportUrl && !value && !meta.touched) {
      console.log(' 🎈 passportUrl NO value');
      change(input.name, passportUrl);
      setSelectedPassport(passportUrl);
    }
  }, [passportUrl, value, change, input.name, meta.touched]);

  return (
    <>
      <div className="relative w-full h-40 md:h-52 xl:h-60 flex flex-col justify-between">
        <div className="relative overflow-hidden bg-bg rounded-t-md h-full w-full">
          <input
            {...input}
            id={`${input.name}_${parentComp}`}
            className="absolute bg-transparent w-px h-px"
            type="file"
            accept=".png, .jpg, .jpeg"
            onChange={e => {
              changeHandler(e);
              onChange(e.target.files[0]);
            }}
          />

          <div className="w-full h-full flex items-center justify-center">
            {passportUrl && !selectedPassport && !meta.touched ? (
              <img
                className="w-full h-full object-cover"
                src={passportUrl}
                alt="passport"
              />
            ) : selectedPassport ? (
              <img
                className="w-full h-full object-cover"
                src={selectedPassport}
                alt="passport"
              />
            ) : (
              <img className="" src="/ph.svg" alt="placeholder" />
            )}
          </div>
        </div>

        <label
          htmlFor={`${input.name}_${parentComp}`}
          className="py-1 rounded-b-md text-xs bg-main text-white text-center cursor-pointer"
        >
          {t(labelText)}
        </label>
      </div>

      <p className="mt-1 text-red-400 font-normal text-xs">
        {meta.touched ? t(meta.error) : ''}
      </p>
    </>
  );
};

export default PassportPhotoField;
