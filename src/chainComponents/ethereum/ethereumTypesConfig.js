import EthereumSelectWallet from "./ethereumConditionCreationFlow/EthereumSelectWallet";
import EthereumSelectNFT from "./ethereumConditionCreationFlow/EthereumSelectNFT";
import EthereumSelectGroup from "./ethereumConditionCreationFlow/EthereumSelectGroup";
import EthereumSelectDAO from "./ethereumConditionCreationFlow/EthereumSelectDAO";
import EthereumSelectPOAP from "./ethereumConditionCreationFlow/EthereumSelectPOAP";
import EthereumSelectCask from "./ethereumConditionCreationFlow/EthereumSelectCask";
import POAP from "../../assets/POAP.svg";
import CASK from "../../assets/CASK.svg";

const ethereumTypesConfig = {
  conditionTypeID: 'evmBasic',
  conditionTypes: {
    'wallet': EthereumSelectWallet,
    'nft': EthereumSelectNFT,
    'group': EthereumSelectGroup,
    'dao': EthereumSelectDAO,
    'poap': EthereumSelectPOAP,
    'cask': EthereumSelectCask,
  },
  conditionTypeData: {
    wallet: { label: 'An Individual Wallet', img: null, requiresMultipleConditions: false},
    nft: { label: 'An Individual NFT', img: null, requiresMultipleConditions: false},
    group: { label: 'A Group of Token or NFT Holders', img: null, requiresMultipleConditions: false},
    dao: { label: 'DAO Members', img: null, requiresMultipleConditions: false},
    poap: { label: 'POAP Collectors', img: POAP, requiresMultipleConditions: true,
      supportedChains: ['ethereum','xdai']
    },
    cask: { label: 'Active Subscriber (Powered by Cask)', img: CASK, requiresMultipleConditions: false,
      supportedChains: ['polygon','avalanche','mumbai','fuji','fantom','aurora','xdai']
    }
  },
  disallowNesting: ['poap']
}

export {
  ethereumTypesConfig
}
