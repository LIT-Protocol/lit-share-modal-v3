import React, { useEffect, useState } from "react";
import LitInput from "../../../reusableComponents/litInput/LitInput";

const SolanaSelectNFT = ({
  updateUnifiedAccessControlConditions, submitDisabled
}) => {
  const [contractAddress, setContractAddress] = useState("");

  useEffect(() => {
    if (contractAddress.length) {
      handleSubmit();
    }
    submitDisabled(!contractAddress.length)
  }, [contractAddress]);

  const handleSubmit = () => {
    const unifiedAccessControlConditions = [
      {
        conditionType: "solRpc",
        method: "balanceOfToken",
        params: [contractAddress],
        chain: "solana",
        returnValueTest: {
          key: "$.amount",
          comparator: ">",
          value: "0",
        },
      },
    ];

    updateUnifiedAccessControlConditions(unifiedAccessControlConditions);
  };

  return (
    <div className={"lsm-condition-container"}>
      <h3 className={"lsm-condition-prompt-text"}>
        Which wallet should be able to access this asset?
      </h3>
      <h3 className={"lsm-condition-prompt-text"}>Enter the token address</h3>
      <LitInput value={contractAddress} setValue={setContractAddress} />
    </div>
  );
};

export default SolanaSelectNFT;
