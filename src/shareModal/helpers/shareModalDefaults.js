import { ethereumConfig } from '../../chainComponents/ethereum/ethereumData.js';
import { solanaConfig } from '../../chainComponents/solana/solanaData.js';

const defaultAllowedChainsObj = {
  ethereum: ethereumConfig,
  solana: solanaConfig
}

export {
  defaultAllowedChainsObj,
}
