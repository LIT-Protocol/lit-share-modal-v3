import React, { useContext, useState, useEffect } from 'react';
import { ShareModalContext } from "../../../shareModal/createShareContext.js";
import LitReusableSelect from "../../../reusableComponents/litReusableSelect/LitReusableSelect";
import LitJsSdk from "lit-js-sdk";
import LitFooter from "../../../reusableComponents/litFooter/LitFooter";
// import { utils } from 'ethers';
import LitInput from "../../../reusableComponents/litInput/LitInput";


const SolanaSelectWallet = ({ setSelectPage, handleUpdateUnifiedAccessControlConditions }) => {
  const { setDisplayedPage, flow } = useContext(ShareModalContext);
  const [walletAddress, setWalletAddress] = useState("");

  const handleSubmit = async () => {
    let resolvedAddress = walletAddress;

    const solRpcConditions = [
      {
        conditionType: 'solRpc',
        method: "",
        params: [":userAddress"],
        chain: 'solana',
        returnValueTest: {
          key: "",
          comparator: "=",
          value: resolvedAddress,
        },
      },
    ];

    handleUpdateUnifiedAccessControlConditions(solRpcConditions);

    if (flow === 'singleCondition') {
      setDisplayedPage('review');
    } else if (flow === 'multipleConditions') {
      setDisplayedPage('multiple');
    }
  };

  return (
    <div className={'lsm-condition-container'}>
      <h3 className={'lsm-condition-prompt-text'}>Which wallet
        should be able to access this asset?</h3>
      <h3 className={'lsm-condition-prompt-text'}>
        Add Wallet Address here:</h3>
      <LitInput value={walletAddress}
                setValue={setWalletAddress}
      />
      <LitFooter backAction={() => setSelectPage('chooseAccess')}
                 nextAction={() => handleSubmit()}
                 nextDisableConditions={(!walletAddress.length)}/>
    </div>
  );
}


export default SolanaSelectWallet;
