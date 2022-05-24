import React, { useContext, useState } from 'react';
import EthereumMultipleChooseAccess from "../chainComponents/ethereum/ethereumConditionCreationFlow/EthereumMultipleChooseAccess";
import EthereumSelectWallet from "../chainComponents/ethereum/ethereumConditionCreationFlow/EthereumSelectWallet";
import EthereumSelectGroup from "../chainComponents/ethereum/ethereumConditionCreationFlow/EthereumSelectGroup";
import EthereumSelectDAO from "../chainComponents/ethereum/ethereumConditionCreationFlow/EthereumSelectDAO";
import EthereumSelectPOAP from "../chainComponents/ethereum/ethereumConditionCreationFlow/EthereumSelectPOAP";
import EthereumSelectNFT from "../chainComponents/ethereum/ethereumConditionCreationFlow/EthereumSelectNFT";
import { ShareModalContext } from "../shareModal/createShareContext.js";
import LitFooter from "../reusableComponents/litFooter/LitFooter";

const EthereumMultipleCreateCondition = ({ endOfCreateCondition, isNested, nestedIndex }) => {
  const { handleUpdateAccessControlConditions } = useContext(ShareModalContext);
  const [selectPage, setSelectPage] = useState('chooseAccess');

  const coordinateUpdateAccessControl = (acc) => {
    if (isNested) {
      handleUpdateAccessControlConditions(acc, true, nestedIndex)
    } else {
      handleUpdateAccessControlConditions(acc);
    }
    setSelectPage('chooseAccess');
    endOfCreateCondition();
  }

  if (selectPage === 'chooseAccess') {
    return <>
      <EthereumMultipleChooseAccess setSelectPage={setSelectPage} isNested={isNested}/>
      {/*<div className={'lsm-flex lsm-flex-row lsm-bg-white lsm-justify-between lsm-width lsm-h-12 lsm-my-4 lsm-absolute lsm-bottom-0'}>*/}
      {/*  <LitBackButton onClick={() => endOfCreateCondition(false)}/>*/}
      {/*  /!* <LitNextButton disableConditions={false} onClick={() => console.log('HEY HEY')}/> *!/*/}
      {/*</div>*/}
      <LitFooter backAction={() => endOfCreateCondition(false)}/>
    </>
  }

  return (
    <div className={'lsm-width'}>
      {(() => {
        switch (selectPage) {
          case 'wallet':
            return <EthereumSelectWallet setSelectPage={setSelectPage}
                                         handleUpdateAccessControlConditions={coordinateUpdateAccessControl}/>
          case 'nft':
            return <EthereumSelectNFT setSelectPage={setSelectPage}
                                      handleUpdateAccessControlConditions={coordinateUpdateAccessControl}/>
          case 'group':
            return <EthereumSelectGroup setSelectPage={setSelectPage}
                                        handleUpdateAccessControlConditions={coordinateUpdateAccessControl}/>
          case 'dao':
            return <EthereumSelectDAO setSelectPage={setSelectPage}
                                      handleUpdateAccessControlConditions={coordinateUpdateAccessControl}/>
          case 'poap':
            return <EthereumSelectPOAP setSelectPage={setSelectPage}
                                       handleUpdateAccessControlConditions={coordinateUpdateAccessControl}/>
        }
      })()
      }
    </div>
  )
};

export default EthereumMultipleCreateCondition;
