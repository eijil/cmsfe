import React, { useState, useEffect } from 'react';
import { aesDecryptResponse } from '@cmsfe/tools/service';
import JsonView from '@uiw/react-json-view';
export default () => {
  const defaultValue =
    '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';

  const [res, setRes] = useState('');
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    const decryptedValue = aesDecryptResponse(defaultValue);
    setRes(decryptedValue);
  }, []);

  const handleInputChange = async (e) => {
    const encryptedValue = e.target.value;
    setInputValue(encryptedValue);
    const decryptedValue = await aesDecryptResponse(encryptedValue);
    setRes(decryptedValue);
  };

  return (
    <div className="flex w-full flex-col lg:flex-row">
      <div className="card  rounded-box grid flex-grow place-items-center">
        <textarea
          defaultValue={defaultValue}
          onChange={handleInputChange}
          className="textarea textarea-bordered textarea-lg w-full h-full max-w-xs"
        ></textarea>
      </div>
      <div className="divider lg:divider-horizontal divider-info">out</div>
      <div className="card  rounded-box grid  flex-grow place-items-center">
        <JsonView value={res} displayDataTypes={false} collapsed={2} />
      </div>
    </div>
  );
};
