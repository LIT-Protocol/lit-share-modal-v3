import React, { useContext, useEffect, useState } from "react";
import { ShareModalContext } from "../../../shareModal/createShareContext.js";
import LitFooter from "../../../reusableComponents/litFooter/LitFooter";
import LitInput from "../../../reusableComponents/litInput/LitInput";
import { utils } from "ethers";

const SolanaSelectNFT = ({
  setSelectPage,
  handleUpdateUnifiedAccessControlConditions,
}) => {
  const { setDisplayedPage, flow } = useContext(ShareModalContext);
  const [contractAddress, setContractAddress] = useState("");
  const [addressIsValid, setAddressIsValid] = useState(false);

  useEffect(() => {
    const isValid = utils.isAddress(contractAddress);
    setAddressIsValid(isValid);
  }, [contractAddress]);

  const handleSubmit = () => {
    const unifiedAccessControlConditions = [
      {
        conditionType: "solRpc",
        method: "balanceOfToken",
        params: [contractAddress],
        chain: "solana",
        returnValueTest: {
          key: "$.amount",
          comparator: ">",
          value: "0",
        },
      },
    ];

    handleUpdateUnifiedAccessControlConditions(unifiedAccessControlConditions);
    setSelectPage("chooseAccess");

    if (flow === "singleCondition") {
      setDisplayedPage("review");
    } else if (flow === "multipleConditions") {
      setDisplayedPage("multiple");
    }
  };

  return (
    <div className={"lsm-condition-container"}>
      <h3 className={"lsm-condition-prompt-text"}>
        Which wallet should be able to access this asset?
      </h3>
      <h3 className={"lsm-condition-prompt-text"}>Enter the token address</h3>
      <LitInput value={contractAddress} setValue={setContractAddress} />
      <LitFooter
        backAction={() => setSelectPage("chooseAccess")}
        nextAction={handleSubmit}
        nextDisableConditions={!contractAddress.length}
      />
    </div>
  );
};

export default SolanaSelectNFT;
