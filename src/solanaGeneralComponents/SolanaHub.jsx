import React from 'react'
import SolanaSingleCondition from "../chainComponents/solana/SolanaSingleCondition";
import SolanaMultipleConditions from "./SolanaMultipleConditions";
import SolanaReviewConditions from "./solanaReviewConditions/SolanaReviewConditions";

const SolanaHub = ({ displayPage, humanizedAccessControlConditions, accessControlConditions }) => {
  return (
    <div>
      {displayPage === "single" && <SolanaSingleCondition/>}
      {displayPage === "multiple" && (
        <SolanaMultipleConditions
          humanizedAccessControlConditions={
            humanizedAccessControlConditions
          }
          accessControlConditions={
            accessControlConditions
          }
        />
      )}
      {displayPage === "review" && (
        <SolanaReviewConditions
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

export default SolanaHub;
