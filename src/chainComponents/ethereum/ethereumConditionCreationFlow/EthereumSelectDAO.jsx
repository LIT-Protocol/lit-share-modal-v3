import React, { useEffect, useMemo, useState } from 'react';
import LitReusableSelect from "../../../reusableComponents/litReusableSelect/LitReusableSelect";
import LitInput from "../../../reusableComponents/litInput/LitInput";
import LitJsSdk from "lit-js-sdk";

const EthereumSelectDAO = ({ updateUnifiedAccessControlConditions, submitDisabled }) => {
  const [DAOAddress, setDAOAddress] = useState("");
  const [subChain, setSubChain] = useState({});

  useEffect(
    () =>
      setSubChain({
        name: "Ethereum",
        id: "ethereum",
        value: "ethereum",
      }),
    []
  );

  useEffect(() => {
    if (DAOAddress.length && subChain.value) {
      handleSubmit()
    }
    submitDisabled(!subChain['value'] || !DAOAddress.length)
  }, [DAOAddress, subChain]);


  const ethereumChainOptions = useMemo(
    () =>
      Object.keys(LitJsSdk.LIT_CHAINS).map((item) => {
        return {
          label: LitJsSdk.LIT_CHAINS[item].name,
          id: item,
          value: item,
        };
      }),
    []
  );

  const handleSubmit = () => {
    const unifiedAccessControlConditions = [
      {
        conditionType: 'evmBasic',
        contractAddress: DAOAddress,
        standardContractType: "MolochDAOv2.1",
        chain: subChain.value,
        method: "members",
        parameters: [":userAddress"],
        returnValueTest: {
          comparator: "=",
          value: "true",
        },
      },
    ];

    updateUnifiedAccessControlConditions(unifiedAccessControlConditions);
  };

  return (
    <div className={'lsm-condition-container'}>
      <h3 className={'lsm-condition-prompt-text'}>Which DAO's
        members should be able to access this asset?</h3>
      <h3 className={'lsm-condition-prompt-text'}>Select
        blockchain:</h3>
      <LitReusableSelect options={ethereumChainOptions}
                         label={'Select blockchain'}
                         option={subChain}
                         setOption={setSubChain}
      />
      <h3 className={'lsm-condition-prompt-text'}>Add DAO
        contract address:</h3>
      <LitInput value={DAOAddress} setValue={setDAOAddress}/>
      <p className={'lsm-condition-prompt-text'}>Lit
        Gateway currently supports DAOs using the MolochDAOv2.1 contract (includes
        DAOhaus)</p>
    </div>
  );
};

export default EthereumSelectDAO;
