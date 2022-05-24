import React, { useContext, useState } from 'react';
import { ShareModalContext } from "../createShareContext.js";
import LitChainSelector from "../../reusableComponents/litChainSelector/LitChainSelector";
import LitChooseAccessButton from "../../reusableComponents/litChooseAccessButton/LitChooseAccessButton";
import { conditionTypeData } from "../helpers/shareModalDefaults";
import LitFooter from "../../reusableComponents/litFooter/LitFooter";

const MultipleAddCondition = ({selectPage, setSelectPage, isNested = false, coordinateUpdateAccessControl, endOfCreateCondition}) => {
  const {
    setDisplayedPage,
    chain,
    showChainSelector
  } = useContext(ShareModalContext);

  const getRenderedConditionOption = () => {
    if (selectPage === 'chooseAccess') {
      let allowedNestedConditions = [];

      if (isNested === true) {
        Object.keys(chain.conditionTypes).forEach((c, i) => {
          if (!chain['disallowNesting'] || !chain['disallowNesting'].find(n => n === c)) {
            allowedNestedConditions.push(<LitChooseAccessButton key={i} onClick={() => setSelectPage(c)}
                                                                label={conditionTypeData[c].label}
                                                                img={conditionTypeData[c].img}/>)
          }
        })
      } else {
        Object.keys(chain.conditionTypes).forEach((c, i) => {
            allowedNestedConditions.push(<LitChooseAccessButton key={i} onClick={() => setSelectPage(c)}
                                                                label={conditionTypeData[c].label}
                                                                img={conditionTypeData[c].img}/>)
        })
      }
      return (
        <div className={'lsm-multiple-condition-rendering-options-container'}>
          <h3 className={'lsm-multiple-condition-select-prompt'}>Choose who can
            access this:</h3>
          { allowedNestedConditions.map((c, i) => {
            return c
          })
          }
        </div>
      )
    } else {
      const ConditionHolder = chain.conditionTypes[selectPage];
      return <ConditionHolder setSelectPage={setSelectPage}
                              handleUpdateAccessControlConditions={endOfCreateCondition}/>
    }
  }

  return (
    <div className={'lsm-multiple-condition-select-container'}>
      {showChainSelector && (
        <LitChainSelector />
      )}
      {!!chain && !!setSelectPage && (
        getRenderedConditionOption()
      )}
      {selectPage === 'chooseAccess' && (
        <LitFooter
          backAction={() => {
            setDisplayedPage('multiple');
          }}
        />
      )}
    </div>
  )

};

export default MultipleAddCondition;
