import React, { useContext, useState, Fragment } from 'react';
import { ShareModalContext } from "../createShareContext.js";
import LitChainSelector from "../../reusableComponents/litChainSelector/LitChainSelector";
import LitChooseAccessButton from "../../reusableComponents/litChooseAccessButton/LitChooseAccessButton";
import venn from "../../assets/venn.svg";
import LitFooter from "../../reusableComponents/litFooter/LitFooter";

const SingleConditionSelect = () => {
  const {
    handleUpdateUnifiedAccessControlConditions,
    setDisplayedPage,
    chain,
    setFlow,
    allowMultipleConditions,
  } = useContext(ShareModalContext);
  const [selectPage, setSelectPage] = useState('chooseAccess');
  const [unifiedAccessControlConditions, setUnifiedAccessControlConditions] = useState([]);
  const [submitDisabled, setSubmitDisabled] = useState(true);

  const coordinateUpdateAccessControl = () => {
    handleUpdateUnifiedAccessControlConditions(unifiedAccessControlConditions);
    setUnifiedAccessControlConditions([]);
    setSelectPage('chooseAccess');
    setDisplayedPage('review');
  }

  const backButtonAction = () => {
    setSelectPage('chooseAccess');
    setUnifiedAccessControlConditions([]);
  }

  const getRenderedConditionOption = () => {
    const conditionTypeData = chain.conditionTypeData;

    if (selectPage === 'chooseAccess') {
      return <div className={'lsm-single-condition-rendering-options-container'}>
        <h3 className={'lsm-single-condition-select-prompt'}>Choose who can
          access this:</h3>
        {
          Object.keys(chain.conditionTypes).map((c, i) => {
            return <LitChooseAccessButton key={i} onClick={() => setSelectPage(c)} label={conditionTypeData[c].label} img={conditionTypeData[c].img} />
          })
        }
      </div>
    } else {
      if (chain.conditionTypes[selectPage]) {
        const ConditionHolder = chain.conditionTypes[selectPage];
        return <ConditionHolder updateUnifiedAccessControlConditions={setUnifiedAccessControlConditions}
                                submitDisabled={setSubmitDisabled} />
      } else {
        setSelectPage('chooseAccess');
      }
    }
  }

  return (
    <div className={'lsm-single-condition-select-container'}>
      <LitChainSelector />
      {!!chain && !!setSelectPage && (
        <div className={'lsm-single-select-condition-display'}>
          {getRenderedConditionOption()}
        </div>
      )}
      {selectPage === 'chooseAccess' && allowMultipleConditions && (
        <button className={'lsm-single-condition-multiple-button'}
          onClick={() => {
          setFlow('multipleConditions');
          setDisplayedPage('multiple');
        }}>
          <img src={venn}/>
          <p
          className={''}>
          Gate with multiple conditions using AND/OR operators
          {/*Gate with multiple conditions*/}
          </p>
        </button>
      )}
      {selectPage !== 'chooseAccess' && (
        <LitFooter className={'lsm-single-condition-footer'}
                   backAction={backButtonAction}
                   nextAction={coordinateUpdateAccessControl}
                   disableNextButton={submitDisabled}/>
      )}
    </div>
  )

};

export default SingleConditionSelect;
