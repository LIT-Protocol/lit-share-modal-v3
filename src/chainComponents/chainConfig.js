import ethLogo from "../assets/chainLogos/ethLogo.svg";
import ftmLogo from "../assets/chainLogos/ftmLogo.svg";
import polygonLogo from "../assets/chainLogos/polygonLogo.svg";
import xdaiLogo from "../assets/chainLogos/xdaiLogo.svg";
import bnbLogo from "../assets/chainLogos/bnbLogo.svg";
import arbitrumLogo from "../assets/chainLogos/arbitrumLogo.svg";
import avalancheLogo from "../assets/chainLogos/avalancheLogo.svg";
import harmonyLogo from "../assets/chainLogos/harmonyLogo.svg";
import cronosLogo from "../assets/chainLogos/cronosLogo.svg";
import celoLogo from "../assets/chainLogos/celoLogo.svg";
import auroraLogo from "../assets/chainLogos/auroraLogo.svg";
import kovanLogo from "../assets/chainLogos/kovanLogo.png";
import goerliLogo from "../assets/chainLogos/goerliLogo.png";
import optimismLogo from "../assets/chainLogos/optimismLogo.jpeg";
import solanaLogo from "../assets/chainLogos/solanaLogo.svg";
import {ethereumTypesConfig, ethereumNoPOAPTypesConfig} from "./ethereum/ethereumTypesConfig";
import {solanaTypesConfig} from "./solana/solanaTypesConfig";

import {utils} from 'ethers';

const chainConfig = {
  ethereum: {
    value: 'ethereum',
    label: 'Ethereum',
    logo: ethLogo,
    abbreviation: 'eth',
    types: ethereumTypesConfig,
    addressValidator: (walletAddress) => utils.isAddress(walletAddress)
  },
  polygon: {
    value: 'polygon',
    label: 'Polygon',
    logo: polygonLogo,
    abbreviation: 'matic',
    types: ethereumNoPOAPTypesConfig,
    addressValidator: (walletAddress) => true
  },
  solana: {
    value: 'solana',
    label: 'Solana',
    logo: solanaLogo,
    abbreviation: 'Sol',
    types: solanaTypesConfig,
    addressValidator: (walletAddress) => true
  },
  fantom: {
    value: 'fantom',
    label: 'Fantom',
    logo: ftmLogo,
    abbreviation: 'ftm',
    types: ethereumNoPOAPTypesConfig,
    addressValidator: (walletAddress) => true
  },
  xdai: {
    value: 'xdai',
    label: 'xDai',
    logo: xdaiLogo,
    abbreviation: 'stake',
    types: ethereumTypesConfig,
    addressValidator: (walletAddress) => true
  },
  bsc: {
    value: 'bsc',
    label: 'Binance Smart Chain',
    logo: bnbLogo,
    abbreviation: 'bsc',
    types: ethereumNoPOAPTypesConfig,
    addressValidator: (walletAddress) => true
  },
  arbitrum: {
    value: 'arbitrum',
    label: 'Arbitrum',
    logo: arbitrumLogo,
    abbreviation: 'arbitrum',
    types: ethereumNoPOAPTypesConfig,
    addressValidator: (walletAddress) => true
  },
  avalanche: {
    value: 'avalanche',
    label: 'Avalanche',
    logo: avalancheLogo,
    abbreviation: 'avax',
    types: ethereumNoPOAPTypesConfig,
    addressValidator: (walletAddress) => true
  },
  fuji: {
    value: 'fuji',
    label: 'Avalanche FUJI Testnet',
    logo: avalancheLogo,
    abbreviation: 'fuji',
    types: ethereumNoPOAPTypesConfig,
    addressValidator: (walletAddress) => true
  },
  harmony: {
    value: 'harmony',
    label: 'Harmony',
    logo: harmonyLogo,
    abbreviation: 'one',
    types: ethereumNoPOAPTypesConfig,
    addressValidator: (walletAddress) => true
  },
  kovan: {
    value: 'kovan',
    label: 'Kovan',
    logo: kovanLogo,
    abbreviation: 'kovan',
    types: ethereumNoPOAPTypesConfig,
    addressValidator: (walletAddress) => true
  },
  mumbai: {
    value: 'mumbai',
    label: 'Mumbai',
    logo: polygonLogo,
    abbreviation: 'mumbai',
    types: ethereumNoPOAPTypesConfig,
    addressValidator: (walletAddress) => true
  },
  goerli: {
    value: 'goerli',
    label: 'Goerli',
    logo: goerliLogo,
    abbreviation: 'goerli',
    types: ethereumNoPOAPTypesConfig,
    addressValidator: (walletAddress) => true
  },
  ropstein: {
    value: 'ropstein',
    label: 'Ropstein',
    logo: ethLogo,
    abbreviation: 'ropstein',
    types: ethereumNoPOAPTypesConfig,
    addressValidator: (walletAddress) => true
  },
  rinkeby: {
    value: 'rinkeby',
    label: 'Rinkeby',
    logo: ethLogo,
    abbreviation: 'rinkeby',
    types: ethereumNoPOAPTypesConfig,
    addressValidator: (walletAddress) => true
  },
  cronos: {
    value: 'cronos',
    label: 'Cronos',
    logo: cronosLogo,
    abbreviation: 'cro',
    types: ethereumNoPOAPTypesConfig,
    addressValidator: (walletAddress) => true
  },
  optimism: {
    value: 'optimism',
    label: 'Optimism',
    logo: optimismLogo,
    abbreviation: 'op',
    types: ethereumNoPOAPTypesConfig,
    addressValidator: (walletAddress) => true
  },
  celo: {
    value: 'celo',
    label: 'Celo',
    logo: celoLogo,
    abbreviation: 'celo',
    types: ethereumNoPOAPTypesConfig,
    addressValidator: (walletAddress) => true
  },
  aurora: {
    value: 'aurora',
    label: 'Aurora',
    logo: auroraLogo,
    abbreviation: 'aoa',
    types: ethereumNoPOAPTypesConfig,
    addressValidator: (walletAddress) => true
  },
}

export {
  chainConfig
};