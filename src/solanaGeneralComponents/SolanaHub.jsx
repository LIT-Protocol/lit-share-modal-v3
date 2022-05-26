import React from 'react'
import SolanaSingleCondition from "../chainComponents/solana/SolanaSingleCondition";
import SolanaMultipleConditions from "./SolanaMultipleConditions";
import SolanaReviewConditions from "./solanaReviewConditions/SolanaReviewConditions";

const SolanaHub = ({ displayPage, humanizedUnifiedAccessControlConditions,unifiedAccessControlConditions }) => {
  return (
    <div>
      {displayPage === "single" && <SolanaSingleCondition/>}
      {displayPage === "multiple" && (
        <SolanaMultipleConditions
          humanizedUnifiedAccessControlConditions={
            humanizedUnifiedAccessControlConditions
          }
          unifiedAccessControlConditions={
            unifiedAccessControlConditions
          }
        />
      )}
      {displayPage === "review" && (
        <SolanaReviewConditions
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

export default SolanaHub;
