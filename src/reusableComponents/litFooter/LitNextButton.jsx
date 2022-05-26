import React from 'react';

const LitNextButton = ({ disableConditions, onClick, label}) => {

  return (
    <button className={'lsm-next-button'}
            disabled={!!disableConditions ? disableConditions : false}
            onClick={onClick}>
      <span className={'lsm-next-label'}>{!label ? 'NEXT' : label}</span>
      <span className={'lsm-next-arrow'}>→</span>
    </button>
  );
};

export default LitNextButton;
