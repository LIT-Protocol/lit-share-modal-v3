import React, { useContext, useEffect, useMemo, useState } from 'react';
import LitReusableSelect from "../../../reusableComponents/litReusableSelect/LitReusableSelect";
import { ShareModalContext } from "../../../shareModal/createShareContext.js";
import LitFooter from "../../../reusableComponents/litFooter/LitFooter";
import LitInput from "../../../reusableComponents/litInput/LitInput";
import LitJsSdk from "lit-js-sdk";

const EthereumSelectDAO = ({ setSelectPage, handleUpdateUnifiedAccessControlConditions }) => {
  const { setDisplayedPage, chainOptions, flow } = useContext(ShareModalContext);
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

    handleUpdateUnifiedAccessControlConditions(unifiedAccessControlConditions);

    if (flow === 'singleCondition') {
      setDisplayedPage('review');
    } else if (flow === 'multipleConditions') {
      setDisplayedPage('multiple');
    }
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
      <LitFooter backAction={() => setSelectPage('chooseAccess')}
                 nextAction={handleSubmit}
                 nextDisableConditions={(!subChain['value'] || !DAOAddress.length)}/>
    </div>
  );
};

export default EthereumSelectDAO;
