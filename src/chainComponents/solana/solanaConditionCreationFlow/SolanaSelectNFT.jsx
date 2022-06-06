import React, { useContext, useEffect, useState } from 'react';
import { ShareModalContext } from "../../../shareModal/createShareContext.js";
import LitFooter from "../../../reusableComponents/litFooter/LitFooter";
import LitInput from "../../../reusableComponents/litInput/LitInput";
import { utils } from "ethers";

const SolanaSelectNFT = ({ updateUnifiedAccessControlConditions, submitDisabled }) => {
  const { setDisplayedPage, flow } = useContext(ShareModalContext);
  const [contractAddress, setContractAddress] = useState("");
  const [tokenId, setTokenId] = useState("");
  const [addressIsValid, setAddressIsValid] = useState(false);

  useEffect(() => {
    const isValid = utils.isAddress(tokenId);
    setAddressIsValid(isValid);

    handleSubmit();
    submitDisabled(!tokenId.length || !contractAddress.length);
  }, [tokenId, contractAddress])

  const handleSubmit = () => {
    const unifiedAccessControlConditions = [
      {
        conditionType: 'solRpc',
        method: "GetTokenAccountsByOwner",
        params: [
          ":userAddress",
          {
            programId: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
          },
          {
            encoding: "jsonParsed",
          },
        ],
        chain: 'solana',
        returnValueTest: {
          key: `$[?(@.account.data.parsed.info.mint == "${contractAddress}")].account.data.parsed.info.tokenAmount.amount`,
          comparator: ">",
          value: "0",
        },
      },
    ];

    updateUnifiedAccessControlConditions(unifiedAccessControlConditions);
  };

  return (
    <div className={'lsm-condition-container'}>
      <h3 className={'lsm-condition-prompt-text'}>Which wallet
        should be able to access this asset?</h3>
        <h3 className={'lsm-condition-prompt-text'}>Select
          token or
          enter contract address</h3>
        <LitInput value={contractAddress}
                  setValue={setContractAddress}
        />
        <h3 className={'lsm-condition-prompt-text'}>
          Add Token ID</h3>
        <LitInput value={tokenId}
                  setValue={setTokenId}
        />
    </div>
  );
};

export default SolanaSelectNFT;
