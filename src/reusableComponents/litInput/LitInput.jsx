import React from 'react';

const LitInput = ({
                    value,
                    setValue,
                    errorMessage = null,
                    placeholder = ''
                  }) => {
  return (
    <div className={`lsm-input-container`}>
      <input placeholder={placeholder}
             value={value}
             onChange={(e) => setValue(e.target.value)}
             className={'lsm-input'}/>
      <p className={'lsm-input-error'}>
        {(errorMessage && value.length) ? errorMessage : ''}</p>
    </div>
  );
};

export default LitInput;
