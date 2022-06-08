import React, { Fragment, useContext, useEffect, useState } from 'react';
import Select from "react-select";

const typesOfPoapGate = [
  {
    label: "By POAP ID",
    id: "eventId",
    value: "=",
  },
  {
    label: "By POAP Name",
    id: "tokenURI",
    value: "=",
  },
];


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

const EthereumSelectPOAP = ({ updateUnifiedAccessControlConditions, submitDisabled }) => {
  const [poapGateType, setPoapGateType] = useState(typesOfPoapGate[0]);
  const [poapId, setPoapId] = useState("");
  const [poapName, setPoapName] = useState("");
  const [nameMatchCondition, setNameMatchCondition] = useState(matchConditionOptions[0]);

  useEffect(() => {
    if (!poapId.length || (!poapName.length || !nameMatchCondition)) {
      handleSubmit();
    }
    submitDisabled(poapGateType.id === 'eventId' ? !poapId.length : (!poapName.length || !nameMatchCondition));
  }, [poapGateType, poapId, poapName, nameMatchCondition]);


  const getComparator = (type) => {
    if (type === 'eventId') {
      return '=';
    } else {
      return nameMatchCondition.value;
    }
  }

  const handleSubmit = () => {
    const unifiedAccessControlConditions = [[
      {
        conditionType: 'evmBasic',
        contractAddress: "0x22C1f6050E56d2876009903609a2cC3fEf83B415",
        standardContractType: "POAP",
        chain: "xdai",
        method: poapGateType.id,
        parameters: [],
        returnValueTest: {
          comparator: getComparator(poapGateType.id),
          value: poapGateType.id === 'eventId' ? poapId : poapName,
        },
      },
      { operator: "or" },
      {
        conditionType: 'evmBasic',
        contractAddress: "0x22C1f6050E56d2876009903609a2cC3fEf83B415",
        standardContractType: "POAP",
        chain: "ethereum",
        method: poapGateType.id,
        parameters: [],
        returnValueTest: {
          comparator: getComparator(poapGateType.id),
          value: poapGateType.id === 'eventId' ? poapId : poapName,
        },
      },
    ]];

    console.log('unifiedAccessControlConditions', unifiedAccessControlConditions)

    updateUnifiedAccessControlConditions(unifiedAccessControlConditions);
  };

  return (
    <div className={'lsm-condition-container'}>
      <h3 className={'lsm-condition-prompt-text'}>Which POAP
        should be able to access this asset?</h3>
      <h3 className={'lsm-condition-prompt-text'}>How would you like to reference this POAP?</h3>
      <Select
        className={'lsm-reusable-select'}
        classNamePrefix={'lsm'}
        options={typesOfPoapGate}
        defaultValue={typesOfPoapGate[0]}
        isSeachable={false}
        onChange={(c) => setPoapGateType(c)}
      />
      {poapGateType.id === 'eventId' && (
        <Fragment>
          <h3
            className={'lsm-condition-prompt-text'}>
            POAP ID:</h3>
          <input type={'number'} value={poapId} onChange={(e) => setPoapId(e.target.value)}
                 className={'lsm-input'}/>
        </Fragment>
      )}
      {poapGateType.id === 'tokenURI' && (
        <Fragment>
          <h3 className={'lsm-condition-prompt-text'}>POAP Name:</h3>
          <input value={poapName} onChange={(e) => setPoapName(e.target.value)}
                 className={'lsm-border-brand-4 lsm-input'}/>
          <h3 className={'lsm-condition-prompt-text'}>Match
            conditions:</h3>
          <Select
            className={'lsm-reusable-select'}
            classNamePrefix={'lsm'}
            options={matchConditionOptions}
            defaultValue={matchConditionOptions[0]}
            isSeachable={false}
            onChange={(c) => setNameMatchCondition(c)}
          />
        </Fragment>
      )}
    </div>
  );
};

export default EthereumSelectPOAP;
