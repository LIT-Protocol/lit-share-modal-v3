import { ethereumConfig } from '../../chainComponents/ethereum/ethereumData.js';
import { solanaConfig } from '../../chainComponents/solana/solanaData.js';

import POAP from "../../assets/POAP.svg";

const defaultAllowedChainsObj = {
  ethereum: ethereumConfig,
  solana: solanaConfig
}

const conditionTypeData = {
  wallet: { label: 'An Individual Wallet', img: null, requiresMultipleConditions: false},
  nft: { label: 'An Individual NFT', img: null, requiresMultipleConditions: false},
  group: { label: 'A Group of Token or NFT Holders', img: null, requiresMultipleConditions: false},
  dao: { label: 'DAO Members', img: null, requiresMultipleConditions: false},
  poap: { label: 'POAP Collectors', img: POAP, requiresMultipleConditions: true}
}

export {
  defaultAllowedChainsObj,
  conditionTypeData
}
