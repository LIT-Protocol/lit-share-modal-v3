import React, { useContext, useState } from 'react';
import { ShareModalContext } from "../createShareContext.js";
import LitChainSelector from "../../reusableComponents/litChainSelector/LitChainSelector";
import LitChooseAccessButton from "../../reusableComponents/litChooseAccessButton/LitChooseAccessButton";
import LitFooter from "../../reusableComponents/litFooter/LitFooter";

const MultipleAddCondition = ({selectPage, setSelectPage, isNested = false, coordinateUpdateAccessControl, endOfCreateCondition}) => {
  const {
    setDisplayedPage,
    chain,
  } = useContext(ShareModalContext);

  const getRenderedConditionOption = () => {
    const conditionTypeData = chain.conditionTypeData;

    if (selectPage === 'chooseAccess') {
      let allowedNestedConditions = [];

      if (isNested === true) {
        // conditions like POAP are already nested, so there is an option to prevent deeper nesting
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
        // if there is no nesting, return all conditions
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
      // check for existence of condition type before rendering it for user
      if (chain.conditionTypes[selectPage]) {
        const ConditionHolder = chain.conditionTypes[selectPage];
        return <ConditionHolder setSelectPage={setSelectPage}
                                handleUpdateUnifiedAccessControlConditions={endOfCreateCondition}/>
      } else {
        // if page type doesn't exist on this chain, redirect to choose access page
        setSelectPage('chooseAccess');
      }
    }
  }

  return (
    <div className={'lsm-multiple-condition-select-container'}>
      <LitChainSelector />
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
