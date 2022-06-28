import React, {useState, useEffect} from 'react';
import LitJsSdk from "lit-js-sdk";
import LitInput from "../../../reusableComponents/litInput/LitInput";

const EthereumSelectWallet = ({updateUnifiedAccessControlConditions, submitDisabled, chain}) => {
  const [walletAddress, setWalletAddress] = useState("");
  const [addressIsValid, setAddressIsValid] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    handleSubmit(walletAddress);
  }, [chain, walletAddress]);

  const handleSubmit = async (address) => {
    let resolvedAddress = address;

    if (address.toLowerCase().includes(".eth")) {
      setLoading(true);
      // do domain name lookup
      try {
        resolvedAddress = await LitJsSdk.lookupNameServiceAddress({
          chain: chain['value'],
          name: address,
        });
        setAddressIsValid(true);
      } catch (err) {
        setLoading(false);
        setErrorMessage("Failed to resolve ENS address");
        alert("Failed to resolve ENS address");
        return;
      }
      if (!resolvedAddress) {
        // ADD_ERROR_HANDLING
        setErrorMessage("Failed to resolve ENS address");
        setLoading(false);
        return;
      }
    }

    const checkIfAddressIsValid = chain.addressValidator(resolvedAddress);
    setAddressIsValid(checkIfAddressIsValid);

    if (!checkIfAddressIsValid) {
      setErrorMessage('Address is invalid');
    } else {
      setErrorMessage('');
    }

    submitDisabled(!resolvedAddress.length || !checkIfAddressIsValid)

    setLoading(false);


    const unifiedAccessControlConditions = [
      {
        conditionType: 'evmBasic',
        contractAddress: "",
        standardContractType: "",
        chain: chain['value'],
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
    <div className={'lsm-condition-container'}>
      <h3 className={'lsm-condition-prompt-text'}>Which wallet
        should be able to access this asset?</h3>
      <h3 className={'lsm-condition-prompt-text'}>Add Wallet
        Address or Blockchain Domain (e.g. ENS) here:</h3>
      <LitInput value={walletAddress}
                setValue={setWalletAddress}
        // errorMessage={addressIsValid ? null : 'Address is invalid'}
                errorMessage={errorMessage}
                loading={loading}
      />
    </div>
  );
}


export default EthereumSelectWallet;
