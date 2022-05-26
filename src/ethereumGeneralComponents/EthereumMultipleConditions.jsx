import React, { useContext, useState } from 'react';
import { ShareModalContext } from "../shareModal/createShareContext.js";
import EthereumMultipleCreateCondition from "./EthereumMultipleCreateCondition";
import LitConfirmationModal from "../reusableComponents/litConfirmationModal/LitConfirmationModal";
import LitMultipleConditionOrganizer
  from "../reusableComponents/litMultipeConditionOrganizer/LitMultipleConditionOrganizer";
import LitFooter from "../reusableComponents/litFooter/LitFooter";
import LitHeader from "../reusableComponents/litHeader/LitHeader";

const EthereumMultipleConditions = ({ humanizedUnifiedAccessControlConditions,unifiedAccessControlConditions }) => {
  const {
    setDisplayedPage,
    setFlow,
    resetModal,
    handleClose,
  } = useContext(ShareModalContext);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [showAddCondition, setShowAddCondition] = useState(false);
  const [isNested, setIsNested] = useState(false);
  const [nestedIndex, setNestedIndex] = useState(null);

  const handleConfirmGoBack = (modalResponse) => {
    if (modalResponse === 'yes') {
      resetModal();
    }

    setShowConfirmationModal(false);
  }

  const createCondition = (isNested = false, nestedIndex = null) => {
    setIsNested(isNested);
    setNestedIndex(nestedIndex);
    setShowAddCondition(true);
  }

  const endOfCreateCondition = () => {
    setIsNested(false);
    setNestedIndex(null);
    setShowAddCondition(false);
  }

  return (
    <>
      <LitHeader handleClose={handleClose}/>
      {!showAddCondition ? (
        <>
          <div className={'lsm-overflow-scroll lsm-pt-4 lsm-interior-scroll'}>
            <LitMultipleConditionOrganizer createCondition={createCondition}
                                           humanizedUnifiedAccessControlConditions={humanizedUnifiedAccessControlConditions}
                                          unifiedAccessControlConditions={unifiedAccessControlConditions}
            />
          </div>
          <LitFooter
            backAction={() => {
              if (humanizedUnifiedAccessControlConditions.length < 1) {
                setFlow('singleCondition');
                setDisplayedPage('single');
              } else {
                setShowConfirmationModal(true);
              }
            }}
            nextAction={() => setDisplayedPage('review')}
            nextDisableConditions={!humanizedUnifiedAccessControlConditions || !humanizedUnifiedAccessControlConditions.length}
          />
          <LitConfirmationModal showConfirmationModal={showConfirmationModal}
                                onClick={handleConfirmGoBack}/>
        </>
      ) : (
        <EthereumMultipleCreateCondition endOfCreateCondition={endOfCreateCondition}
                                         isNested={isNested}
                                         nestedIndex={nestedIndex}/>
      )}
    </>
  );
};

export default EthereumMultipleConditions;
