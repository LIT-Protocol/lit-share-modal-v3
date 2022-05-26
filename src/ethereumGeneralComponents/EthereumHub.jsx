import React from 'react'
import SingleConditionOptions from "../shareModal/singleConditionSelect/SingleConditionOptions";
import EthereumMultipleConditions from "./EthereumMultipleConditions";
import EthereumReviewConditions from "./ethereumReviewConditions/EthereumReviewConditions";

const EthereumHub = ({ displayedPage, humanizedUnifiedAccessControlConditions,unifiedAccessControlConditions }) => {
  return (
    <div>
      {displayedPage === "single" && <SingleConditionOptions/>}
      {displayedPage === "multiple" && (
        <EthereumMultipleConditions
          humanizedUnifiedAccessControlConditions={
            humanizedUnifiedAccessControlConditions
          }
         unifiedAccessControlConditions={
           unifiedAccessControlConditions
          }
        />
      )}
      {displayedPage === "review" && (
        <EthereumReviewConditions
          humanizedUnifiedAccessControlConditions={
            humanizedUnifiedAccessControlConditions
          }
         unifiedAccessControlConditions={
           unifiedAccessControlConditions
          }
        />
      )}
    </div>
  )
}

export default EthereumHub;
