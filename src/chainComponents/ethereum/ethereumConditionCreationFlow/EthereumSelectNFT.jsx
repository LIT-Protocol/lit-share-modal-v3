import React, { useContext, useEffect, useMemo, useState } from 'react';
import LitReusableSelect from "../../../reusableComponents/litReusableSelect/LitReusableSelect";
import { ShareModalContext } from "../../../shareModal/createShareContext.js";
import LitTokenSelect from "../../../reusableComponents/litTokenSelect/LitTokenSelect";
import LitFooter from "../../../reusableComponents/litFooter/LitFooter";
import LitInput from "../../../reusableComponents/litInput/LitInput";
import { utils } from "ethers";
import LitJsSdk from "lit-js-sdk";

const EthereumSelectNFT = ({ setSelectPage, handleUpdateAccessControlConditions }) => {
  const { setDisplayedPage, chainOptions, flow } = useContext(ShareModalContext);
  const [tokenId, setTokenId] = useState("");
  const [subChain, setSubChain] = useState({});
  const [selectedToken, setSelectedToken] = useState({});
  const [addressIsValid, setAddressIsValid] = useState(false);

  useEffect(() => {
    const isValid = utils.isAddress(tokenId);
    setAddressIsValid(isValid);
  }, [tokenId])

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
    const accessControlConditions = [
      {
        contractAddress: selectedToken.value,
        standardContractType: "ERC721",
        subChain: chain.value,
        method: "ownerOf",
        parameters: [tokenId],
        returnValueTest: {
          comparator: "=",
          value: ":userAddress",
        },
      },
    ];

    handleUpdateAccessControlConditions(accessControlConditions);
    setSelectPage('chooseAccess');
    if (flow === 'singleCondition') {
      setDisplayedPage('review');
    } else if (flow === 'multipleConditions') {
      setDisplayedPage('multiple');
    }
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
      <h3 className={'lsm-condition-prompt-text'}>
        Add Token ID</h3>
      <LitInput value={tokenId}
                setValue={setTokenId}
      />
      <LitFooter backAction={() => setSelectPage('chooseAccess')}
                 nextAction={handleSubmit}
                 nextDisableConditions={(!subChain.label || !tokenId.length || !selectedToken)}/>
    </div>
  );
};

export default EthereumSelectNFT;
