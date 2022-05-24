import React, { useContext, useEffect, useState } from 'react';
import LitReusableSelect from "../../../reusableComponents/litReusableSelect/LitReusableSelect";
import { ShareModalContext } from "../../../shareModal/createShareContext.js";
import LitTokenSelect from "../../../reusableComponents/litTokenSelect/LitTokenSelect";
import LitFooter from "../../../reusableComponents/litFooter/LitFooter";
import LitInput from "../../../reusableComponents/litInput/LitInput";
import { utils } from "ethers";

const SolanaSelectNFT = ({ setSelectPage, handleUpdateAccessControlConditions }) => {
  const { setDisplayedPage, chainOptions, flow } = useContext(ShareModalContext);
  const [tokenId, setTokenId] = useState("");
  const [chain, setChain] = useState(null);
  const [selectedToken, setSelectedToken] = useState(null);
  const [addressIsValid, setAddressIsValid] = useState(false);

  useEffect(() => {
    const isValid = utils.isAddress(tokenId);
    setAddressIsValid(isValid);
  }, [tokenId])

  const handleSubmit = () => {
    const accessControlConditions = [
      {
        contractAddress: selectedToken.value,
        standardContractType: "ERC721",
        chain: chain.value,
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
    <div className={'lsm-select-container lsm-bg-white'}>
      <h3 className={'lsm-select-prompt lsm-text-title-gray lsm-font-segoe lsm-text-base lsm-font-light'}>Which wallet
        should be able to access this asset?</h3>
      {/*<h3 className={'lsm-select-label lsm-text-title-gray lsm-font-segoe lsm-text-base lsm-font-light'}>Select*/}
      {/*  blockchain:</h3>*/}
      {/*<LitReusableSelect options={chainOptions}*/}
      {/*                   label={'Select blockchain'}*/}
      {/*                   option={chain}*/}
      {/*                   setOption={setChain}*/}
      {/*                   turnOffSearch={true}*/}
      {/*/>*/}
      <div className={'lsm-w-full'}>
        <h3 className={'lsm-select-label lsm-text-title-gray lsm-font-segoe lsm-text-base lsm-font-light'}>Select
          token or
          enter contract address</h3>
        {/*<LitTokenSelect option={selectedToken}*/}
        {/*                label={(!selectedToken || !selectedToken['label']) ? 'Search for a token/NFT' : selectedToken.label}*/}
        {/*                selectedToken={selectedToken}*/}
        {/*                setSelectedToken={setSelectedToken}*/}
        {/*/>*/}
        <LitInput value={selectedToken}
                  setValue={setSelectedToken}
        />
      </div>
      <div className={'lsm-w-full'}>
        <h3 className={'lsm-select-label lsm-text-title-gray lsm-font-segoe lsm-text-base lsm-font-light'}>
          Add Token ID</h3>
        <LitInput value={tokenId}
                  setValue={setTokenId}
        />
      </div>
      <p
        className={'lsm-text-sm md:lsm-text-base lsm-w-full lsm-mt-8 lsm-cursor-pointer lsm-mb-4 lsm-text-brand-4 lsm-text-left lsm-font-segoe lsm-font-light'}
        onClick={() => setSelectPage('wallet')}>
        Grant Access to Wallet or
        Blockchain Domain</p>
      <LitFooter backAction={() => setSelectPage('chooseAccess')}
                 nextAction={handleSubmit}
                 nextDisableConditions={(!chain || !tokenId.length || !selectedToken)}/>
    </div>
  );
};

export default SolanaSelectNFT;
