import React, { useContext, useState, useEffect } from 'react';
import { ShareModalContext } from "../../../shareModal/createShareContext.js";
import LitReusableSelect from "../../../reusableComponents/litReusableSelect/LitReusableSelect";
import LitJsSdk from "lit-js-sdk";
import LitFooter from "../../../reusableComponents/litFooter/LitFooter";
// import { utils } from 'ethers';
import LitInput from "../../../reusableComponents/litInput/LitInput";


const SolanaSelectWallet = ({ setSelectPage, handleUpdateAccessControlConditions }) => {
  const { setDisplayedPage, flow } = useContext(ShareModalContext);
  const [walletAddress, setWalletAddress] = useState("");
  const [chain, setChain] = useState({});
  // const [addressIsValid, setAddressIsValid] = useState(false);

  const chainOptions = [{
    name: "Solana",
    id: "solana",
    value: "solana",
  }]

  useEffect(
    () =>
      setChain({
        name: "Solana",
        id: "solana",
        value: "solana",
      }),
    []
  );

  // useEffect(() => {
  // const isValid = utils.isAddress(walletAddress);
  // setAddressIsValid(isValid);
  // }, [walletAddress])

  const handleSubmit = async () => {
    let resolvedAddress = walletAddress;

    // if (walletAddress.includes(".")) {
    //   // do domain name lookup
    //   try {
    //     resolvedAddress = await LitJsSdk.lookupNameServiceAddress({
    //       chain: chain.value,
    //       name: walletAddress,
    //     });
    //   } catch (err) {
    //     alert('Error connecting.  If using mobile, use the Metamask Mobile Browser to connect.')
    //     return;
    //   }
    //   if (!resolvedAddress) {
    //     // ADD_ERROR_HANDLING
    //     console.log("failed to resolve ENS address");
    //     return;
    //   }
    // }

    const solRpcConditions = [
      {
        method: "",
        params: [":userAddress"],
        chain: 'solana',
        returnValueTest: {
          key: "",
          comparator: "=",
          value: resolvedAddress,
        },
      },
    ];

    handleUpdateAccessControlConditions(solRpcConditions);

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
      <h3 className={'lsm-select-label lsm-text-title-gray lsm-font-segoe lsm-text-base lsm-font-light'}>Select
        blockchain:</h3>
      <LitReusableSelect options={chainOptions}
                         label={'Select blockchain'}
                         option={chain}
                         setOption={setChain}
                         turnOffSearch={true}
      />
      <h3 className={'lsm-select-label lsm-text-title-gray lsm-font-segoe lsm-text-base lsm-font-light'}>
        Add Wallet Address here:</h3>
      <LitInput value={walletAddress}
                setValue={setWalletAddress}
      />
      <p
        className={'lsm-text-sm lsm-w-full lsm-cursor-pointer md:lsm-text-base lsm-mb-4 lsm-mt-8 lsm-text-brand-4 lsm-text-left lsm-font-segoe lsm-font-light'}
        onClick={() => setSelectPage('nft')}>Grant Access on NFT Ownership</p>
      <LitFooter backAction={() => setSelectPage('chooseAccess')}
                 nextAction={() => handleSubmit()}
                 nextDisableConditions={(!chain['name'] || !walletAddress.length)}/>
    </div>
  );
}


export default SolanaSelectWallet;
