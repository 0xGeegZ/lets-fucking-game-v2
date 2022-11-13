import BigNumber from 'bignumber.js'
import { ChainId } from '@pancakeswap/sdk'
import erc20ABI from 'config/abi/erc20.json'
import masterchefABI from 'config/abi/masterchef.json'
import nonBscVault from 'config/abi/nonBscVault.json'
import multicall, { multicallv2 } from 'utils/multicall'
import { verifyBscNetwork } from 'utils/verifyBscNetwork'
import { isChainTestnet } from 'utils/wagmi'
import { SerializedGame } from '../types'

export const fetchGameUserAllowances = async (
  account: string,
  gamesToFetch: SerializedGame[],
  chainId: number,
  proxyAddress?: string,
) => {
  const isBscNetwork = verifyBscNetwork(chainId)

  const calls = gamesToFetch.map((game) => {
    const contractAddress = game.address
    return { address: contractAddress, name: 'allowance', params: [account, proxyAddress] }
  })

  const rawLpAllowances = await multicall<BigNumber[]>(erc20ABI, calls, chainId)
  const parsedLpAllowances = rawLpAllowances.map((lpBalance) => {
    return new BigNumber(lpBalance).toJSON()
  })

  return parsedLpAllowances
}

export const fetchGameUserTokenBalances = async (account: string, gamesToFetch: SerializedGame[], chainId: number) => {
  const calls = gamesToFetch.map((game) => {
    const contractAddress = game.address
    return {
      address: contractAddress,
      name: 'balanceOf',
      params: [account],
    }
  })

  const rawTokenBalances = await multicall(erc20ABI, calls, chainId)
  const parsedTokenBalances = rawTokenBalances.map((tokenBalance) => {
    return new BigNumber(tokenBalance).toJSON()
  })
  return parsedTokenBalances
}

export const fetchGameUserStakedBalances = async (account: string, gamesToFetch: SerializedGame[], chainId: number) => {
  const isBscNetwork = verifyBscNetwork(chainId)

  const calls = gamesToFetch.map((game) => {
    return {
      address: account,
      name: 'userInfo',
      params: [game.id],
    }
  })

  const rawStakedBalances = await multicallv2({
    abi: isBscNetwork ? masterchefABI : nonBscVault,
    calls,
    chainId,
    options: { requireSuccess: false },
  })
  const parsedStakedBalances = rawStakedBalances.map((stakedBalance) => {
    return new BigNumber(stakedBalance[0]._hex).toJSON()
  })
  return parsedStakedBalances
}

export const fetchGameUserEarnings = async (account: string, gamesToFetch: SerializedGame[], chainId: number) => {
  const isBscNetwork = verifyBscNetwork(chainId)
  const multiCallChainId = isChainTestnet(chainId) ? ChainId.BSC_TESTNET : ChainId.BSC
  const userAddress = account

  const calls = gamesToFetch.map((game) => {
    return {
      address: account,
      name: 'pendingCake',
      params: [game.id, userAddress],
    }
  })

  const rawEarnings = await multicallv2({ abi: masterchefABI, calls, chainId: multiCallChainId })
  const parsedEarnings = rawEarnings.map((earnings) => {
    return new BigNumber(earnings).toJSON()
  })
  return parsedEarnings
}
