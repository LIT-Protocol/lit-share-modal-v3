import React, { useContext, useEffect, useMemo, useState } from 'react';
import LitReusableSelect from "../../../reusableComponents/litReusableSelect/LitReusableSelect";
import { ShareModalContext } from "../../../shareModal/createShareContext.js";
import LitTokenSelect from "../../../reusableComponents/litTokenSelect/LitTokenSelect";
import LitInput from "../../../reusableComponents/litInput/LitInput";
import { utils } from "ethers";
import LitJsSdk from "lit-js-sdk";

const EthereumSelectNFT = ({ updateUnifiedAccessControlConditions, submitDisabled }) => {
  const { setDisplayedPage, chainOptions, flow } = useContext(ShareModalContext);
  const [tokenId, setTokenId] = useState("");
  const [subChain, setSubChain] = useState({});
  const [selectedToken, setSelectedToken] = useState({});
  const [contractAddress, setContractAddress] = useState("");
  const [addressIsValid, setAddressIsValid] = useState(false);

  useEffect(() => {
    const isValid = utils.isAddress(contractAddress);
    setAddressIsValid(isValid);
    if (!!contractAddress) {
      handleSubmit();
    }
    submitDisabled(!subChain.label || !tokenId.length || !selectedToken)
  }, [subChain, tokenId, contractAddress])

  useEffect(() => {
    if (selectedToken === null) {
      setContractAddress('');
    }
    if (selectedToken?.['value'] === 'ethereum') {
      setContractAddress('');
    }
    if (selectedToken?.['value'] && utils.isAddress(selectedToken?.['value'])) {
      setContractAddress(selectedToken['value']);
    }
  }, [selectedToken]);


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
        contractAddress: contractAddress,
        standardContractType: "ERC721",
        chain: subChain?.['value'],
        method: "ownerOf",
        parameters: [tokenId],
        returnValueTest: {
          comparator: "=",
          value: ":userAddress",
        },
      },
    ];

    updateUnifiedAccessControlConditions(unifiedAccessControlConditions);
  };

  return (
    <div className={'lsm-condition-container'}>
      <h3 className={'lsm-condition-prompt-text'}>Which NFT's
        should be able to access this asset?</h3>
      <h3 className={'lsm-condition-prompt-text'}>Select
        blockchain:</h3>
      <LitReusableSelect options={ethereumChainOptions}
                         label={'Select blockchain'}
                         option={subChain}
                         setOption={setSubChain}
      />
      <h3 className={'lsm-condition-prompt-text'}>Select
        token or
        enter contract address</h3>
      <LitTokenSelect option={selectedToken}
                      label={(!selectedToken || !selectedToken['label']) ? 'Search for a token/NFT' : selectedToken.label}
                      selectedToken={selectedToken}
                      setSelectedToken={setSelectedToken}
      />
      <h3
        className={'lsm-condition-prompt-text'}>Contract Address</h3>
      <LitInput value={contractAddress}
                setValue={setContractAddress}
                errorMessage={addressIsValid ? null : 'Address is invalid'}
                placeholder={'ERC721 Address'}
      />
      <h3 className={'lsm-condition-prompt-text'}>
        Add Token ID</h3>
      <LitInput value={tokenId}
                setValue={setTokenId}
      />
    </div>
  );
};

export default EthereumSelectNFT;
