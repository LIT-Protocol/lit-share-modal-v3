import React from 'react';
import LitBackButton from "./LitBackButton";
import LitNextButton from "./LitNextButton";

const LitFooter = ({ backAction = null,
                     nextAction = null,
                     nextDisableConditions = null,
                     backgroundColor = 'lsm-bg-white',
                     nextButtonLabel = null }) => {
  return (
    <div className={`${backgroundColor} lsm-lit-footer`}>
      {!!backAction && (
        <LitBackButton onClick={backAction} backgroundColor={backgroundColor}/>
      )}
      {!!nextAction && (
        <LitNextButton disableConditions={nextDisableConditions} onClick={nextAction} label={nextButtonLabel}/>
      )}
    </div>
  );
};

export default LitFooter;
