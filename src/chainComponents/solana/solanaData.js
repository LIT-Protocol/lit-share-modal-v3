import SolanaSelectWallet from "./solanaConditionCreationFlow/SolanaSelectWallet";
import SolanaSelectNFT from "./solanaConditionCreationFlow/SolanaSelectNFT";
import SolanaSelectGroup from "./solanaConditionCreationFlow/SolanaSelectGroup";
import solanaLogo from "../../assets/solanaLogo.svg";

const solanaConfig = {
  value: 'solana',
  label: 'Solana',
  logo: solanaLogo,
  abbreviation: 'Sol',
  conditionTypes: {
    'wallet': SolanaSelectWallet,
    'nft': SolanaSelectNFT,
    'group': SolanaSelectGroup,
  },
  conditionTypeData: {
    wallet: { label: 'An Individual Wallet', img: null, requiresMultipleConditions: false},
    nft: { label: 'An Individual NFT', img: null, requiresMultipleConditions: false},
    group: { label: 'A Group of NFT Holders', img: null, requiresMultipleConditions: false},
  },
  doNotAllowForNested: []
}

export {
  solanaConfig
}
