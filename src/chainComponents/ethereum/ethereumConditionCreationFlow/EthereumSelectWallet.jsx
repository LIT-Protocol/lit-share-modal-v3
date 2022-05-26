import React, { useContext, useState, useEffect, useMemo } from 'react';
import { ShareModalContext } from "../../../shareModal/createShareContext.js";
import LitReusableSelect from "../../../reusableComponents/litReusableSelect/LitReusableSelect";
import LitJsSdk from "lit-js-sdk";
import LitFooter from "../../../reusableComponents/litFooter/LitFooter";
import { utils } from 'ethers';
import LitInput from "../../../reusableComponents/litInput/LitInput";


const EthereumSelectWallet = ({ setSelectPage, handleUpdateUnifiedAccessControlConditions }) => {
  const { setDisplayedPage, flow } = useContext(ShareModalContext);
  const [walletAddress, setWalletAddress] = useState("");
  const [subChain, setSubChain] = useState({});
  const [addressIsValid, setAddressIsValid] = useState(false);

  useEffect(() => {
    const isValid = utils.isAddress(walletAddress);
    setAddressIsValid(isValid);
  }, [walletAddress])

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

  const handleSubmit = async () => {
    let resolvedAddress = walletAddress;

    if (walletAddress.includes(".")) {
      // do domain name lookup
      try {
        resolvedAddress = await LitJsSdk.lookupNameServiceAddress({
          chain: subChain.value,
          name: walletAddress,
        });
      } catch (err) {
        alert('Error connecting.  If using mobile, use the Metamask Mobile Browser to connect.')
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
        conditionType: 'evmBasic',
        contractAddress: "",
        standardContractType: "",
        chain: subChain.value,
        method: "",
        parameters: [":userAddress"],
        returnValueTest: {
          comparator: "=",
          value: resolvedAddress,
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
      <h3 className={'lsm-condition-prompt-text'}>Which wallet
        should be able to access this asset?</h3>
      <h3 className={'lsm-condition-prompt-text'}>Select
        blockchain:</h3>
      <LitReusableSelect options={ethereumChainOptions}
                         label={'Select blockchain'}
                         option={subChain}
                         setOption={setSubChain}
      />
      <h3 className={'lsm-condition-prompt-text'}>Add Wallet
        Address or Blockchain Domain (e.g. ENS, UNS) here:</h3>
      <LitInput value={walletAddress}
                setValue={setWalletAddress}
                errorMessage={addressIsValid ? null : 'Address is invalid'}
      />
      <LitFooter backAction={() => setSelectPage('chooseAccess')}
                 nextAction={() => handleSubmit()}
                 nextDisableConditions={(!subChain['label'] || !walletAddress.length || !addressIsValid)}/>
    </div>
  );
}


export default EthereumSelectWallet;
