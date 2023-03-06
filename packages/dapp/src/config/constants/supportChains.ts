import { ChainId } from '@pancakeswap/sdk'
import { chainId } from 'wagmi'

export const SUPPORT_ONLY_BSC = [ChainId.BSC]
export const SUPPORT_GAMES = [ChainId.BSC, ChainId.FANTOM, ChainId.POLYGON, ChainId.ETHEREUM]

export const SUPPORT_GAMES_TEST = [
  ChainId.FANTOM_TESTNET,
  ChainId.BSC_TESTNET,
  ChainId.MUMBAI,
  ChainId.GOERLI,
  process.env.NODE_ENV === 'development' && ChainId.HARDHAT,
]
