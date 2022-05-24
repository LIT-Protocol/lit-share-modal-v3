const makeNFTCondition = ({ chain, selectedToken, tokenId }) => {
  return {
    contractAddress: selectedToken.value,
    standardContractType: "ERC721",
    chain: chain.value,
    method: "ownerOf",
    parameters: [tokenId],
    returnValueTest: {
      comparator: "=",
      value: ":userAddress",
    },
  }
}

const makeWalletCondition = ({ chain, resolvedAddress }) => {
  return {
    contractAddress: "",
    standardContractType: "",
    chain: chain.value,
    method: "",
    parameters: [":userAddress"],
    returnValueTest: {
      comparator: "=",
      value: resolvedAddress,
    },
  }
}

const makeGroupCondition = ({ chain, contractType, contractAddress, amount }) => {
  return {
    contractAddress: contractAddress,
    standardContractType: contractType,
    chain: chain.value,
    method: "balanceOf",
    parameters: [":userAddress"],
    returnValueTest: {
      comparator: ">=",
      value: amount.toString(),
    },
  }
}

const makeErc1155GroupCondition = ({ contractAddress, chain, contractType, erc1155TokenId, amount }) => {
  return {
    contractAddress: contractAddress,
    standardContractType: contractType,
    chain: chain.value,
    method: "balanceOf",
    parameters: [":userAddress", erc1155TokenId],
    returnValueTest: {
      comparator: ">=",
      value: amount.toString(),
    },
  }
}

const makePOAPCondition = ({ matchCondition, POAPName }) => {
  return [
    {
      contractAddress: "0x22C1f6050E56d2876009903609a2cC3fEf83B415",
      standardContractType: "POAP",
      chain: "xdai",
      method: "tokenURI",
      parameters: [],
      returnValueTest: {
        comparator: matchCondition.value,
        value: POAPName,
      },
    },
    { operator: "or" },
    {
      contractAddress: "0x22C1f6050E56d2876009903609a2cC3fEf83B415",
      standardContractType: "POAP",
      chain: "ethereum",
      method: "tokenURI",
      parameters: [],
      returnValueTest: {
        comparator: matchCondition.value,
        value: POAPName,
      },
    },
  ]
}

const makeDAOCondition = ({ DAOAddress }) => {
  return {
    contractAddress: DAOAddress,
    standardContractType: "MolochDAOv2.1",
    chain: chain.value,
    method: "members",
    parameters: [":userAddress"],
    returnValueTest: {
      comparator: "=",
      value: "true",
    },
  }
}

export {
  makeNFTCondition,
  makeWalletCondition,
  makeGroupCondition,
  makeErc1155GroupCondition,
  makePOAPCondition,
  makeDAOCondition
}
