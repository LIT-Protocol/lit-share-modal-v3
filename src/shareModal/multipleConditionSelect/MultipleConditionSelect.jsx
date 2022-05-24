import React, { useContext, useState, Fragment } from 'react';
import LitFooter from "../../reusableComponents/litFooter/LitFooter";
import { ShareModalContext } from "../createShareContext";
import MultipleConditionsEditor from "./MultipleConditionsEditor";
import MultipleAddCondition from "./MultipleAddCondition";
import LitConfirmationModal from "../../reusableComponents/litConfirmationModal/LitConfirmationModal";

const MultipleConditionSelect = ({ humanizedAccessControlConditions, accessControlConditions }) => {
  const {
    setDisplayedPage,
    setFlow,
    displayedPage,
    resetModal,
    handleUpdateAccessControlConditions
  } = useContext(ShareModalContext);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [showAddCondition, setShowAddCondition] = useState(false);
  const [isNested, setIsNested] = useState(false);
  const [nestedIndex, setNestedIndex] = useState(null);

  const [selectPage, setSelectPage] = useState('chooseAccess');

  const handleConfirmGoBack = (modalResponse) => {
    if (modalResponse === 'yes') {
      resetModal();
    }

    setShowConfirmationModal(false);
  }

  const coordinateUpdateAccessControl = (accessControlConditions) => {
    handleUpdateAccessControlConditions(accessControlConditions, isNested, nestedIndex);
    setSelectPage('chooseAccess');
    setDisplayedPage('multiple');
  }

  const createCondition = (isNested = false, nestedIndex = null) => {
    setIsNested(isNested);
    setNestedIndex(nestedIndex);
    setShowAddCondition(true);
  }

  const endOfCreateCondition = (accessControlConditions) => {
    coordinateUpdateAccessControl(accessControlConditions)
    setIsNested(false);
    setNestedIndex(null);
    setShowAddCondition(false);
  }

  return (
    <div>
      {displayedPage === 'multiple' && (
        <Fragment>
          <MultipleConditionsEditor humanizedAccessControlConditions={humanizedAccessControlConditions}
                                    createCondition={createCondition}
          />
          <LitFooter
            backAction={() => {
              if (humanizedAccessControlConditions.length < 1) {
                setFlow('singleCondition');
                setDisplayedPage('single');
              } else {
                setShowConfirmationModal(true);
              }
            }}
            nextAction={() => setDisplayedPage('review')}
            nextDisableConditions={!humanizedAccessControlConditions || !humanizedAccessControlConditions.length}
          />
        </Fragment>
      )}
      {displayedPage === 'multiple-add' && (
        <MultipleAddCondition selectPage={selectPage}
                              setSelectPage={setSelectPage}
                              isNested={isNested}
                              endOfCreateCondition={endOfCreateCondition}/>
      )}
      <LitConfirmationModal showConfirmationModal={showConfirmationModal}
                            onClick={handleConfirmGoBack}/>
    </div>
  )
}

export default MultipleConditionSelect;
