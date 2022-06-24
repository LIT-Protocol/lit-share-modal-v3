import React, {useContext, useEffect, useMemo, useState, Fragment} from 'react';
import {ethers, utils} from "ethers";
import LitJsSdk from "lit-js-sdk";
import LitTokenSelect from "../../../reusableComponents/litTokenSelect/LitTokenSelect";
import LitInput from "../../../reusableComponents/litInput/LitInput";
import {logDevError} from "../../../shareModal/helpers/helperFunctions";

const EthereumSelectGroup = ({updateUnifiedAccessControlConditions, submitDisabled, chain}) => {
  const [amount, setAmount] = useState("");
  const [selectedToken, setSelectedToken] = useState({});
  const [contractAddress, setContractAddress] = useState("");
  const [contractType, setContractType] = useState("");
  const [erc1155TokenId, setErc1155TokenId] = useState("");
  const [erc1155TokenIdIsValid, setErc1155TokenIdIsValid] = useState(false);
  const [addressIsValid, setAddressIsValid] = useState(false);

  useEffect(() => {
    if (selectedToken === null) {
      setContractAddress('');
      setContractType('');
    }
    if (selectedToken?.['value'] === 'ethereum') {
      setContractAddress('');
    }
    if (selectedToken?.['value'] && utils.isAddress(selectedToken?.['value'])) {
      setContractAddress(selectedToken['value']);
    }
    if (selectedToken?.['standard']) {
      setContractType(selectedToken['standard'].toUpperCase());
    }
  }, [selectedToken]);

  useEffect(() => {
    if (contractAddress.length && !!selectedToken && (contractAddress !== selectedToken['value'])) {
      setSelectedToken({});
    }

    const contractIsValid = chain.addressValidator(contractAddress);
    setAddressIsValid(contractIsValid);
  }, [contractAddress]);

  useEffect(() => {
    const erc1155IsValid = utils.isAddress(erc1155TokenId);
    setErc1155TokenIdIsValid(erc1155IsValid);
  }, [erc1155TokenId])

  useEffect(() => {
    const itIsValid = isValid();
    handleSubmit();

    submitDisabled(itIsValid);
  }, [amount, addressIsValid, contractAddress, chain, selectedToken, contractType, erc1155TokenId]);


  const isValid = () => {
    if (selectedToken?.['value'] === 'ethereum') {
      return !amount;
    }
    return !amount ||
      !addressIsValid ||
      !contractAddress.length ||
      !contractType.length ||
      (contractType === 'ERC1155' && !erc1155TokenId.length)
  }

  const checkEthereum = () => {
    // ethereum
    const amountInWei = ethers.utils.parseEther(amount);
    const unifiedAccessControlConditions = [
      {
        conditionType: 'evmBasic',
        contractAddress: "",
        standardContractType: "",
        chain: chain['value'],
        method: "eth_getBalance",
        parameters: [":userAddress", "latest"],
        returnValueTest: {
          comparator: ">=",
          value: amountInWei.toString(),
        },
      },
    ];
    saveCondition(unifiedAccessControlConditions);
  }

  const checkERC1155 = () => {
    const unifiedAccessControlConditions = [
      {
        conditionType: 'evmBasic',
        contractAddress: contractAddress,
        standardContractType: contractType,
        chain: chain['value'],
        method: "balanceOf",
        parameters: [":userAddress", erc1155TokenId],
        returnValueTest: {
          comparator: ">=",
          value: amount.toString(),
        },
      },
    ];
    saveCondition(unifiedAccessControlConditions);
  }

  const checkERC721 = () => {
    const unifiedAccessControlConditions = [
      {
        conditionType: 'evmBasic',
        contractAddress: contractAddress,
        standardContractType: contractType,
        chain: chain['value'],
        method: "balanceOf",
        parameters: [":userAddress"],
        returnValueTest: {
          comparator: ">=",
          value: amount.toString(),
        },
      },
    ];
    saveCondition(unifiedAccessControlConditions);
  }

  const checkERC20 = async () => {
    let decimals = 0;
    let unifiedAccessControlConditions;
    try {
      decimals = await LitJsSdk.decimalPlaces({
        chain: chain['value'],
        contractAddress: contractAddress,
      });
    } catch (e) {
      // context.setError(e);
      logDevError(e)
    }

    let amountInBaseUnit;
    try {
      amountInBaseUnit = ethers.utils.parseUnits(amount, decimals);
    } catch (err) {
      logDevError(err)
    }


    try {
      unifiedAccessControlConditions = [
        {
          conditionType: 'evmBasic',
          contractAddress: contractAddress,
          standardContractType: contractType,
          chain: chain['value'],
          method: "balanceOf",
          parameters: [":userAddress"],
          returnValueTest: {
            comparator: ">=",
            value: amountInBaseUnit.toString(),
          },
        },
      ];
    } catch (err) {
      logDevError(err);
      return;
    }
    saveCondition(unifiedAccessControlConditions);
  }

  const saveCondition = (uacc) => {
    updateUnifiedAccessControlConditions(uacc);
  }

  const handleSubmit = async () => {
    if (isValid()) {
      return;
    }


    if (selectedToken && selectedToken.value === "ethereum") {
      checkEthereum();
    } else if (contractType === "ERC1155") {
      checkERC1155();
    } else if (contractType === "ERC721") {
      checkERC721();
    } else if (contractType === "ERC20") {
      await checkERC20();
    }
    // if (contractAddress && contractAddress.length) {
    //   let unifiedAccessControlConditions;
    //
    //   let tokenType;
    //
    //   if (selectedToken && selectedToken.standard?.toLowerCase() === "erc721") {
    //     tokenType = "erc721";
    //   } else if (selectedToken && selectedToken.decimals) {
    //     tokenType = "erc20";
    //   } else {
    //     // if we don't already know the type, try and get decimal places.  if we get back 0 or the request fails then it's probably erc721.
    //
    //     let decimals = 0;
    //     try {
    //       decimals = await LitJsSdk.decimalPlaces({
    //         conditionType: 'ethereum',
    //         // contractAddress: selectedToken?.['value'],
    //         contractAddress: contractAddress,
    //       });
    //     } catch (e) {
    //       context.setError(e);
    //       console.log(e);
    //     }
    //
    //     if (decimals == 0) {
    //       tokenType = "erc721";
    //     } else {
    //       tokenType = "erc20";
    //     }
    //   }
    //   let amountInBaseUnit;
    //
    //   if (tokenType == "erc721") {
    //     // erc721
    //     unifiedAccessControlConditions = [
    //       {
    //         conditionType: 'evmBasic',
    //         contractAddress: selectedToken.value,
    //         standardContractType: "ERC721",
    //         chain: subChain?.['value'],
    //         method: "balanceOf",
    //         parameters: [":userAddress"],
    //         returnValueTest: {
    //           comparator: ">=",
    //           value: amount.toString(),
    //         },
    //       },
    //     ];
    //     updateUnifiedAccessControlConditions(unifiedAccessControlConditions);
    //   } else {
    //     // erc20 token
    //     if (selectedToken?.decimals) {
    //       try {
    //         amountInBaseUnit = ethers.utils.parseUnits(
    //           amount,
    //           selectedToken.decimals
    //         );
    //       } catch (err) {
    //         logDevError(err);
    //       }
    //     } else if (selectedToken?.['value']) {
    //       // need to check the contract for decimals
    //       // this will auto switch the chain to the selected one in metamask
    //       let decimals = 0;
    //       try {
    //         decimals = await LitJsSdk.decimalPlaces({
    //           chain: 'ethereum',
    //           contractAddress: selectedToken?.['value'],
    //         });
    //       } catch (e) {
    //         context.setError(e);
    //         logDevError(e);
    //       }
    //       amountInBaseUnit = ethers.utils.parseUnits(amount, decimals);
    //     }
    //
    //     console.log('---> amountInBaseUnit: ', amountInBaseUnit)
    //
    //     unifiedAccessControlConditions = [
    //       {
    //         conditionType: 'evmBasic',
    //         contractAddress: selectedToken.value,
    //         standardContractType: "ERC20",
    //         chain: subChain?.['value'],
    //         method: "balanceOf",
    //         parameters: [":userAddress"],
    //         returnValueTest: {
    //           comparator: ">=",
    //           value: amountInBaseUnit.toString(),
    //         },
    //       },
    //     ];
    //     updateUnifiedAccessControlConditions(unifiedAccessControlConditions);
    //   }
    // }
  };

  const handleChangeContractType = (value) => {
    setContractType(value);
  };

  return (
    <div className={'lsm-condition-container'}>
      <h3 className={'lsm-condition-prompt-text'}>Which group
        should be able to access this asset?</h3>
      <h3 className={'lsm-condition-prompt-text'}>Select
        token/NFT or enter contract address:</h3>
      <LitTokenSelect option={selectedToken}
                      label={(!selectedToken || !selectedToken['label']) ? 'Search for a token/NFT' : selectedToken.label}
                      selectedToken={selectedToken}
                      setSelectedToken={setSelectedToken}
                      allowEthereum={true}
      />
      {selectedToken?.['value'] !== 'ethereum' && (
        <Fragment>
          <h3
            className={'lsm-condition-prompt-text'}>Contract Address</h3>
          <LitInput value={contractAddress}
                    disabled={selectedToken?.['value']}
                    setValue={setContractAddress}
                    errorMessage={addressIsValid ? null : 'Address is invalid'}
                    placeholder={'ERC20 or ERC721 or ERC1155 address'}
          />
          {(!!contractAddress.length && addressIsValid) && (
            <div className={''}>
              <h3
                className={'lsm-condition-prompt-text'}>Token
                Contract Type:</h3>
              <span onChange={(e) => handleChangeContractType(e.target.value)}
                    className={'lsm-radio-container'}>
                <div>
                  <input disabled={selectedToken?.['standard'] && selectedToken?.standard === contractType} readOnly
                         checked={contractType === 'ERC20'} type="radio" id="erc20"
                         name="addressType"
                         value="ERC20"/>
                  <label className={'lsm-radio-label'} htmlFor="erc20">ERC20</label>
                </div>

                <div>
                  <input disabled={selectedToken?.['standard'] && selectedToken?.standard === contractType} readOnly
                         checked={contractType === 'ERC721'} type="radio" id="erc721" name="addressType"
                         value="ERC721"/>
                  <label className={'lsm-radio-label'}
                         htmlFor="erc721">ERC721</label>
                </div>

                <div>
                  <input disabled={selectedToken?.['standard'] && selectedToken?.standard === contractType} readOnly
                         checked={contractType === 'ERC1155'} type="radio" id="erc1155" name="addressType"
                         value="ERC1155"/>
                  <label className={'lsm-radio-label'}
                         htmlFor="erc1155">ERC1155</label>
                </div>
              </span>
            </div>
          )}
          {(!!contractAddress.length && contractType === 'ERC1155') && (
            <LitInput value={erc1155TokenId} setValue={setErc1155TokenId}
                      errorMessage={erc1155TokenIdIsValid ? null : 'ERC1155 token id is invalid'}
                      placeholder={'ERC1155 Token Id'}
            />
          )}
        </Fragment>
      )}
      <h3 className={'lsm-condition-prompt-text'}>How many tokens
        does the wallet need to own?</h3>
      <LitInput value={amount} setValue={e => setAmount(e)}
                errorMessage={isNaN(parseFloat(amount)) ? 'Must be a number' : null}
                placeholder={'##'}
      />
    </div>
  );
};

export default EthereumSelectGroup;
