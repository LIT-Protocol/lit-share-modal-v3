import SolanaSelectWallet from "./solanaConditionCreationFlow/SolanaSelectWallet";
import SolanaSelectNFT from "./solanaConditionCreationFlow/SolanaSelectNFT";
import SolanaSelectGroup from "./solanaConditionCreationFlow/SolanaSelectGroup";
import solanaLogo from "../../assets/solanaLogo.svg";

const solanaConfig = {
  value: 'solana',
  label: 'Solana',
  logo: solanaLogo,
  conditionTypes: {
    'wallet': SolanaSelectWallet,
    'nft': SolanaSelectNFT,
    'group': SolanaSelectGroup,
  },
  doNotAllowForNested: []
}

export {
  solanaConfig
}
