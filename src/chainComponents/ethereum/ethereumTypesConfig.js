import EthereumSelectWallet from "./ethereumConditionCreationFlow/EthereumSelectWallet";
import EthereumSelectNFT from "./ethereumConditionCreationFlow/EthereumSelectNFT";
import EthereumSelectGroup from "./ethereumConditionCreationFlow/EthereumSelectGroup";
import EthereumSelectDAO from "./ethereumConditionCreationFlow/EthereumSelectDAO";
import EthereumSelectPOAP from "./ethereumConditionCreationFlow/EthereumSelectPOAP";
import POAP from "../../assets/POAP.svg";

const ethereumTypesConfig = {
  conditionTypeID: 'evmBasic',
  conditionTypes: {
    'wallet': EthereumSelectWallet,
    'nft': EthereumSelectNFT,
    'group': EthereumSelectGroup,
    'dao': EthereumSelectDAO,
    'poap': EthereumSelectPOAP
  },
  conditionTypeData: {
    wallet: { label: 'An Individual Wallet', img: null, requiresMultipleConditions: false},
    nft: { label: 'An Individual NFT', img: null, requiresMultipleConditions: false},
    group: { label: 'A Group of Token or NFT Holders', img: null, requiresMultipleConditions: false},
    dao: { label: 'DAO Members', img: null, requiresMultipleConditions: false},
    poap: { label: 'POAP Collectors', img: POAP, requiresMultipleConditions: true}
  },
  disallowNesting: ['poap']
}

const ethereumNoPOAPTypesConfig = {
  conditionTypeID: 'evmBasic',
  conditionTypes: {
    'wallet': EthereumSelectWallet,
    'nft': EthereumSelectNFT,
    'group': EthereumSelectGroup,
    'dao': EthereumSelectDAO,
  },
  conditionTypeData: {
    wallet: { label: 'An Individual Wallet', img: null, requiresMultipleConditions: false},
    nft: { label: 'An Individual NFT', img: null, requiresMultipleConditions: false},
    group: { label: 'A Group of Token or NFT Holders', img: null, requiresMultipleConditions: false},
    dao: { label: 'DAO Members', img: null, requiresMultipleConditions: false},
  },
  disallowNesting: []
}

export {
  ethereumTypesConfig,
  ethereumNoPOAPTypesConfig
}
