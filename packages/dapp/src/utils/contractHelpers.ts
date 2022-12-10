import type { Signer } from '@ethersproject/abstract-signer'
import type { Provider } from '@ethersproject/providers'
import { provider } from 'utils/wagmi'
import { Contract } from '@ethersproject/contracts'
import { CAKE } from '@pancakeswap/tokens'

// Addresses
import { getAddress, getGameFactoryV1Address, getMulticallAddress } from 'utils/addressHelpers'

import { GameFactoryV2, GameV1, GameV2, GiveawayV1 } from 'config/types/typechain'

// ABI
import bep20Abi from 'config/abi/erc20.json'
import erc721Abi from 'config/abi/erc721.json'
import cakeAbi from 'config/abi/cake.json'
import MultiCallAbi from 'config/abi/Multicall.json'
import erc721CollectionAbi from 'config/abi/erc721collection.json'

import internal from 'config/internal/internal.json'

// Types
import type { Erc20, Erc721, Cake, Multicall, Erc721collection } from 'config/abi/types'
import { ChainId } from '@pancakeswap/sdk'

export const getContract = ({
  abi,
  address,
  chainId = ChainId.BSC,
  signer,
}: {
  abi: any
  address: string
  chainId?: ChainId
  signer?: Signer | Provider
}) => {
  const signerOrProvider = signer ?? provider({ chainId })
  return new Contract(address, abi, signerOrProvider)
}

export const getBep20Contract = (address: string, signer?: Signer | Provider) => {
  return getContract({ abi: bep20Abi, address, signer }) as Erc20
}
export const getErc721Contract = (address: string, signer?: Signer | Provider) => {
  return getContract({ abi: erc721Abi, address, signer }) as Erc721
}

export const getGameFactoryContract = (chainId?: number, signer?: Signer | Provider) => {
  if (!internal[chainId || ChainId.BSC]) {
    console.error('No config found for this chain')
    return null
  }
  if (!internal[chainId || ChainId.BSC].GameFactoryV2) {
    console.error('No GameFactory found for this chain')
    return null
  }

  return getContract({
    abi: internal[chainId || ChainId.BSC].GameFactoryV2.abi,
    address: getGameFactoryV1Address(chainId),
    signer,
    chainId,
  }) as GameFactoryV2
}

export const getGameV1Contract = (address: string, chainId?: number, signer?: Signer | Provider) => {
  if (!internal[chainId || ChainId.BSC]) {
    console.error('No config found for this chain')
    return null
  }

  if (!internal[chainId || ChainId.BSC].GameV1) {
    console.error('No GameV1 found for this chain')
    return null
  }

  return getContract({
    abi: internal[chainId || ChainId.BSC].GameV1.abi,
    address,
    signer,
    chainId,
  }) as GameV1
}

export const getGameV2Contract = (address: string, chainId?: number, signer?: Signer | Provider) => {
  if (!internal[chainId || ChainId.BSC]) {
    console.error('No config found for this chain')
    return null
  }
  if (!internal[chainId || ChainId.BSC].GameV2) {
    console.error('No GameV2 found for this chain')
    return null
  }

  return getContract({
    abi: internal[chainId || ChainId.BSC].GameV2.abi,
    address,
    signer,
    chainId,
  }) as GameV2
}

export const getGiveawayV1Contract = (address: string, chainId?: number, signer?: Signer | Provider) => {
  if (!internal[chainId || ChainId.BSC]) {
    console.error('No config found for this chain')
    return null
  }
  if (!internal[chainId || ChainId.BSC].Giveaway) {
    console.error('No Giveaway found for this chain')
    return null
  }

  return getContract({
    abi: internal[chainId || ChainId.BSC].Giveaway.abi,
    address,
    signer,
    chainId,
  }) as GiveawayV1
}

export const getCakeContract = (signer?: Signer | Provider, chainId?: number) => {
  return getContract({
    abi: cakeAbi,
    address: chainId ? CAKE[chainId].address : CAKE[ChainId.BSC].address,
    signer,
  }) as Cake
}
// export const getMulticallContract = (chainId: ChainId) => {
//   return getContract({ abi: MultiCallAbi, address: getMulticallAddress(chainId), chainId }) as Multicall
// }
// TODO Guigui load multicall contract adress and ABIs directly from internal
export const getMulticallContract = (chainId: ChainId) => {
  if (internal[chainId])
    return getContract({
      abi: internal[chainId].MultiCall3.abi,
      address: internal[chainId].MultiCall3.address,
      chainId,
    }) as Multicall

  return getContract({ abi: MultiCallAbi, address: getMulticallAddress(chainId), chainId }) as Multicall
}

export const getErc721CollectionContract = (signer?: Signer | Provider, address?: string) => {
  return getContract({ abi: erc721CollectionAbi, address, signer }) as Erc721collection
}
