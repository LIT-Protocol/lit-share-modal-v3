import React, { useContext, useState } from 'react';
import { ShareModalContext } from "../../../shareModal/createShareContext.js";
import LitFooter from "../../../reusableComponents/litFooter/LitFooter";
import LitInput from "../../../reusableComponents/litInput/LitInput";
import LitCheckbox from "../../../reusableComponents/litCheckbox/LitCheckbox";

const SolanaSelectGroup = ({ setSelectPage, handleUpdateUnifiedAccessControlConditions }) => {
  const context = useContext(ShareModalContext);
  const [amount, setAmount] = useState("");
  const [contractAddress, setContractAddress] = useState("");
  const [isMetaplexCollection, setIsMetaplexCollection] = useState(false);

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

        handleUpdateUnifiedAccessControlConditions(unifiedAccessControlConditions);
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

        handleUpdateUnifiedAccessControlConditions(unifiedAccessControlConditions);
      }


      if (context.flow === 'singleCondition') {
        context.setDisplayedPage('review');
      } else if (context.flow === 'multipleConditions') {
        context.setDisplayedPage('multiple');
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
      <LitFooter backAction={() => setSelectPage('chooseAccess')}
                 nextAction={handleSubmit}
                 nextDisableConditions={!amount ||
                 !contractAddress.length}/>
                 {/*TODO: see if there's a way to verify a solana address*/}
                 {/*(!selectedToken && !addressIsValid)}/>*/}
    </div>
  );
};

export default SolanaSelectGroup;
