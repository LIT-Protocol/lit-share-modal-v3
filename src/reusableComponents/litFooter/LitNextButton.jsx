import React from 'react';

const LitNextButton = ({ disableConditions, onClick, label}) => {

  return (
    <button className={'lsm-next-button'}
            disabled={!!disableConditions ? disableConditions : false}
            onClick={onClick}>
        {!label ? 'NEXT' : label}
      <span className={'lsm-next-arrow'}>→</span>
    </button>
  );
};

export default LitNextButton;
