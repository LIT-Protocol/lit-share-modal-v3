import React, { useContext, useState, useEffect } from 'react';
import { ShareModalContext } from "../../../shareModal/createShareContext.js";
import LitInput from "../../../reusableComponents/litInput/LitInput";


const SolanaSelectWallet = ({ updateUnifiedAccessControlConditions, submitDisabled }) => {
  const { setDisplayedPage, flow } = useContext(ShareModalContext);
  const [walletAddress, setWalletAddress] = useState("");

  useEffect(() => {
    handleSubmit();
    submitDisabled(!walletAddress.length);
  }, [walletAddress])

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

    updateUnifiedAccessControlConditions(solRpcConditions);
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
    </div>
  );
}


export default SolanaSelectWallet;
