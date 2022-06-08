import React, { useContext, useState,useEffect } from 'react';
import { ShareModalContext } from "../../../shareModal/createShareContext.js";
import LitFooter from "../../../reusableComponents/litFooter/LitFooter";
import LitInput from "../../../reusableComponents/litInput/LitInput";
import LitCheckbox from "../../../reusableComponents/litCheckbox/LitCheckbox";

const SolanaSelectGroup = ({ updateUnifiedAccessControlConditions, submitDisabled }) => {
  const context = useContext(ShareModalContext);
  const [amount, setAmount] = useState("");
  const [contractAddress, setContractAddress] = useState("");
  const [isMetaplexCollection, setIsMetaplexCollection] = useState(false);

  useEffect(() => {
    submitDisabled(!amount || !contractAddress.length);
    handleSubmit();

  }, [amount, contractAddress])

  const handleSubmit = async () => {
    if (contractAddress && contractAddress.length) {

      if (isMetaplexCollection) {
        const unifiedAccessControlConditions = [
          {
            conditionType: 'solRpc',
            method: "balanceOfMetaplexCollection",
            params: [contractAddress],
            chain: 'solana',
            returnValueTest: {
              key: "",
              comparator: ">=",
              value: amount,
            },
          },
        ];

        updateUnifiedAccessControlConditions(unifiedAccessControlConditions);
      } else {
        // const unifiedAccessControlConditions = [
        //   {
        //     conditionType: 'solRpc',
        //     method: "GetTokenAccountsByOwner",
        //     params: [
        //       ":userAddress",
        //       {
        //         programId: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
        //       },
        //       {
        //         encoding: "jsonParsed",
        //       },
        //     ],
        //     chain: 'solana',
        //     returnValueTest: {
        //       key: `$[?(@.account.data.parsed.info.mint == "${contractAddress}")].account.data.parsed.info.tokenAmount.amount`,
        //       comparator: ">",
        //       value: "0",
        //     },
        //   },
        // ];

        const unifiedAccessControlConditions = [
          {
            conditionType: 'solRpc',
            method: "balanceOfMetaplexCollection",
            params: ["FfyafED6kiJUFwEhogyTRQHiL6NguqNg9xcdeoyyJs33"],
            chain: 'solana',
            returnValueTest: {
              key: "",
              comparator: ">=",
              value: amount,
            },
          },
        ];

        updateUnifiedAccessControlConditions(unifiedAccessControlConditions);
      }
    }
  }

  return (
    <div className={'lsm-condition-container'}>
      <h3 className={'lsm-condition-prompt-text'}>Which group
        should be able to access this asset?</h3>
      <LitCheckbox value={isMetaplexCollection}
                   setValue={setIsMetaplexCollection}
                   label={'This is an NFT collection on Metaplex'}
      />
      <h3 className={'lsm-condition-prompt-text'}>Enter token/NFT contract address:</h3>
      <LitInput value={contractAddress}
                setValue={setContractAddress}
                placeholder={'NFT or group address'}
      />
      <h3 className={'lsm-condition-prompt-text'}>How many tokens
        does the wallet need to own?</h3>
      <input value={amount} onChange={(e) => setAmount(e.target.value)} placeholder={'##'}
             className={'lsm-border-brand-4 lsm-input'}/>
    </div>
  );
};

export default SolanaSelectGroup;
