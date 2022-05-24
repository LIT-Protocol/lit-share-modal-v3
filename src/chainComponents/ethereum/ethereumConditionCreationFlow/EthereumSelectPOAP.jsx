import React, { useContext, useState } from 'react';
import { ShareModalContext } from "../../../shareModal/createShareContext.js";
import LitSimpleDropdown from '../../../reusableComponents/litSimpleDropdown/LitSimpleDropdown';
import LitFooter from "../../../reusableComponents/litFooter/LitFooter";
import LitReusableSelect from "../../../reusableComponents/litReusableSelect/LitReusableSelect";
import Select from "react-select";

const matchConditionOptions = [
  {
    label: "Contains POAP Name",
    id: "contains",
    value: "contains",
  },
  {
    label: "Equals POAP Name exactly",
    id: "equals",
    value: "=",
  },
];

const EthereumSelectPOAP = ({ setSelectPage, handleUpdateAccessControlConditions }) => {
  const { setDisplayedPage, flow } = useContext(ShareModalContext);
  const [POAPName, setPOAPName] = useState("");
  const [matchCondition, setMatchCondition] = useState({});

  const handleSubmit = () => {
    const chain = "xdai";
    const accessControlConditions = [[
      {
        contractAddress: "0x22C1f6050E56d2876009903609a2cC3fEf83B415",
        standardContractType: "POAP",
        chain: "xdai",
        method: "tokenURI",
        parameters: [],
        returnValueTest: {
          comparator: matchCondition.value,
          value: POAPName,
        },
      },
      { operator: "or" },
      {
        contractAddress: "0x22C1f6050E56d2876009903609a2cC3fEf83B415",
        standardContractType: "POAP",
        chain: "ethereum",
        method: "tokenURI",
        parameters: [],
        returnValueTest: {
          comparator: matchCondition.value,
          value: POAPName,
        },
      },
    ]];

    handleUpdateAccessControlConditions(accessControlConditions);
    setSelectPage('chooseAccess');

    if (flow === 'singleCondition') {
      setDisplayedPage('review');
    } else if (flow === 'multipleConditions') {
      setDisplayedPage('multiple');
    }
  };

  return (
    <div className={'lsm-condition-container'}>
      <h3 className={'lsm-condition-prompt-text'}>Which POAP
        should be able to access this asset?</h3>
      <h3 className={'lsm-condition-prompt-text'}>POAP Name:</h3>
      <input value={POAPName} onChange={(e) => setPOAPName(e.target.value)}
             className={'lsm-border-brand-4 lsm-input'}/>
      <h3 className={'lsm-condition-prompt-text'}>Match
        conditions:</h3>
      <Select
        className={'lsm-reusable-select'}
        classNamePrefix={'lsm'}
        options={matchConditionOptions}
        isSeachable={false}
        onChange={(c) => setMatchCondition(c)}
      />
      <LitFooter backAction={() => setSelectPage('chooseAccess')}
                 nextAction={handleSubmit}
                 nextDisableConditions={(!POAPName.length || !matchCondition.label)}/>
    </div>
  );
};

export default EthereumSelectPOAP;
