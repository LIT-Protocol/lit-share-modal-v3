import React, { useContext, useEffect, useState } from 'react';
import { ShareModalContext } from "../../../shareModal/createShareContext.js";
import LitFooter from "../../../reusableComponents/litFooter/LitFooter";
import LitInput from "../../../reusableComponents/litInput/LitInput";
import { utils } from "ethers";

const SolanaSelectNFT = ({ setSelectPage, handleUpdateUnifiedAccessControlConditions }) => {
  const { setDisplayedPage, flow } = useContext(ShareModalContext);
  const [contractAddress, setContractAddress] = useState("");
  const [tokenId, setTokenId] = useState("");
  const [addressIsValid, setAddressIsValid] = useState(false);

  useEffect(() => {
    const isValid = utils.isAddress(tokenId);
    setAddressIsValid(isValid);
  }, [tokenId])

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

    handleUpdateUnifiedAccessControlConditions(unifiedAccessControlConditions);
    setSelectPage('chooseAccess');

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
      <LitFooter backAction={() => setSelectPage('chooseAccess')}
                 nextAction={handleSubmit}
                 nextDisableConditions={(!tokenId.length || !contractAddress.length)}/>
    </div>
  );
};

export default SolanaSelectNFT;
