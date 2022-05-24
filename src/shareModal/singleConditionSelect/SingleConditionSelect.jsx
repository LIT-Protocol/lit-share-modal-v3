import React, { useContext, useState, Fragment } from 'react';
import { ShareModalContext } from "../createShareContext.js";
import LitChainSelector from "../../reusableComponents/litChainSelector/LitChainSelector";
import LitChooseAccessButton from "../../reusableComponents/litChooseAccessButton/LitChooseAccessButton";
import { conditionTypeData } from "../helpers/shareModalDefaults";
import venn from "../../assets/venn.svg";

const SingleConditionSelect = () => {
  const {
    handleUpdateAccessControlConditions,
    setDisplayedPage,
    chain,
    flow,
    setFlow,
    allowMultipleConditions,
    showChainSelector,
  } = useContext(ShareModalContext);
  const [selectPage, setSelectPage] = useState('chooseAccess');

  const coordinateUpdateAccessControl = (accessControlConditions) => {
    handleUpdateAccessControlConditions(accessControlConditions);
    setSelectPage('chooseAccess');
    setDisplayedPage('review');
  }

  const getRenderedConditionOption = () => {
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
      const ConditionHolder = chain.conditionTypes[selectPage];
      return <ConditionHolder setSelectPage={setSelectPage}
                              handleUpdateAccessControlConditions={coordinateUpdateAccessControl}/>
    }
  }

  return (
    <div className={'lsm-single-condition-select-container'}>
      {showChainSelector && (
        <LitChainSelector />
      )}
      {!!chain && !!setSelectPage && (
        <Fragment>
          {getRenderedConditionOption()}
        </Fragment>
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
    </div>
  )

};

export default SingleConditionSelect;
