import React, { useState, useEffect } from "react";
import LitJsSdk from "lit-js-sdk";
import LitInput from "../../../reusableComponents/litInput/LitInput";

const EthereumSelectWallet = ({
  updateUnifiedAccessControlConditions,
  submitDisabled,
  chain,
}) => {
  const [walletAddress, setWalletAddress] = useState("");
  const [addressIsValid, setAddressIsValid] = useState(false);

  useEffect(() => {
    handleSubmit();
    const checkIfAddressIsValid = chain.addressValidator(walletAddress);
    setAddressIsValid(checkIfAddressIsValid);
    submitDisabled(!walletAddress.length || !checkIfAddressIsValid);
  }, [chain, walletAddress]);

  const handleSubmit = async () => {
    let resolvedAddress = walletAddress;

    if (walletAddress.includes(".")) {
      // do domain name lookup
      try {
        resolvedAddress = await LitJsSdk.lookupNameServiceAddress({
          chain: chain["value"],
          name: walletAddress,
        });
      } catch (err) {
        alert(
          "Error connecting.  If using mobile, use the Metamask Mobile Browser to connect."
        );
        return;
      }
      if (!resolvedAddress) {
        // ADD_ERROR_HANDLING
        console.log("failed to resolve ENS address");
        return;
      }
    }

    const unifiedAccessControlConditions = [
      {
        conditionType: "evmBasic",
        contractAddress: "",
        standardContractType: "",
        chain: chain["value"],
        method: "",
        parameters: [":userAddress"],
        returnValueTest: {
          comparator: "=",
          value: resolvedAddress,
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
      <h3 className={"lsm-condition-prompt-text"}>
        Add Wallet Address or Blockchain Domain (e.g. ENS) here:
      </h3>
      <LitInput
        value={walletAddress}
        setValue={setWalletAddress}
        errorMessage={addressIsValid ? null : "Address is invalid"}
      />
    </div>
  );
};

export default EthereumSelectWallet;
