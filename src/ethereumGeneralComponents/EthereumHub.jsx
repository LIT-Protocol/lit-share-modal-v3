import React from 'react'
import SingleConditionOptions from "../shareModal/singleConditionSelect/SingleConditionOptions";
import EthereumMultipleConditions from "./EthereumMultipleConditions";
import EthereumReviewConditions from "./ethereumReviewConditions/EthereumReviewConditions";

const EthereumHub = ({ displayedPage, humanizedAccessControlConditions, accessControlConditions }) => {
  return (
    <div>
      {displayedPage === "single" && <SingleConditionOptions/>}
      {displayedPage === "multiple" && (
        <EthereumMultipleConditions
          humanizedAccessControlConditions={
            humanizedAccessControlConditions
          }
          accessControlConditions={
            accessControlConditions
          }
        />
      )}
      {displayedPage === "review" && (
        <EthereumReviewConditions
          humanizedAccessControlConditions={
            humanizedAccessControlConditions
          }
          accessControlConditions={
            accessControlConditions
          }
        />
      )}
    </div>
  )
}

export default EthereumHub;
