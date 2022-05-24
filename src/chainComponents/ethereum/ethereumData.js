import EthereumSelectWallet from "./ethereumConditionCreationFlow/EthereumSelectWallet";
import EthereumSelectNFT from "./ethereumConditionCreationFlow/EthereumSelectNFT";
import EthereumSelectGroup from "./ethereumConditionCreationFlow/EthereumSelectGroup";
import EthereumSelectDAO from "./ethereumConditionCreationFlow/EthereumSelectDAO";
import EthereumSelectPOAP from "./ethereumConditionCreationFlow/EthereumSelectPOAP";
import ethLogo from "../../assets/ethLogo.svg";

const ethereumConfig = {
  value: 'ethereum',
  label: 'Ethereum',
  logo: ethLogo,
  conditionTypes: {
    'wallet': EthereumSelectWallet,
    'nft': EthereumSelectNFT,
    'group': EthereumSelectGroup,
    'dao': EthereumSelectDAO,
    'poap': EthereumSelectPOAP
  },
  disallowNesting: ['poap']
}

export {
  ethereumConfig
}
