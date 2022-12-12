/* eslint-disable camelcase */
import { ChainId } from '@pancakeswap/sdk'
import chunk from 'lodash/chunk'
import { multicallv2 } from 'utils/multicall'
import internal from 'config/internal/internal.json'
import { Factory } from 'config/types/typechain/contracts/games/GameFactoryV1'

import { fetchGamePlayersData } from './fetchGamePlayerData'

export const fetchPublicGamesData = async (
  games: Factory.ItemStructOutput[],
  chainId = ChainId.BSC,
): Promise<any[]> => {
  const gameCalls = games.map((game) => {
    return {
      address: game.deployedAddress,
      name: 'getGameData',
    }
  })
  const chunkSize = gameCalls.length / games.length

  const gameMultiCallResult = await multicallv2({
    abi: internal[chainId || ChainId.BSC].GameV1.abi,
    calls: gameCalls,
    chainId,
  })

  // TODO use useSWRMulticall ??
  // const { data: gameMultiCallResult } = useSWRMulticall(internal[chainId || ChainId.BSC].GameV1.abi, gameCalls)

  return chunk(gameMultiCallResult, chunkSize)
}

export const fetchGamesCreatorAmounts = async (
  games: Factory.ItemStructOutput[],
  chainId = ChainId.BSC,
): Promise<any[]> => {
  const gameCalls = games.map((game) => {
    return {
      address: game.deployedAddress,
      name: 'creatorAmount',
    }
  })
  const chunkSize = gameCalls.length / games.length

  const gameMultiCallResult = await multicallv2({
    abi: internal[chainId || ChainId.BSC].GameV1.abi,
    calls: gameCalls,
    chainId,
  })

  return chunk(gameMultiCallResult, chunkSize)
}

export const fetchGamesTreasuryAmounts = async (
  games: Factory.ItemStructOutput[],
  chainId = ChainId.BSC,
): Promise<any[]> => {
  const gameCalls = games.map((game) => {
    return {
      address: game.deployedAddress,
      name: 'treasuryAmount',
    }
  })
  const chunkSize = gameCalls.length / games.length

  const gameMultiCallResult = await multicallv2({
    abi: internal[chainId || ChainId.BSC].GameV1.abi,
    calls: gameCalls,
    chainId,
  })

  return chunk(gameMultiCallResult, chunkSize)
}

export const fetchGamesPlayersAddresses = async (
  games: Factory.ItemStructOutput[],
  chainId = ChainId.BSC,
): Promise<any[]> => {
  const gameCalls = games.map((game) => {
    return {
      address: game.deployedAddress,
      name: 'getPlayerAddresses',
    }
  })
  const chunkSize = gameCalls.length / games.length

  const gameMultiCallResult = await multicallv2({
    abi: internal[chainId || ChainId.BSC].GameV1.abi,
    calls: gameCalls,
    chainId,
  })

  return chunk(gameMultiCallResult, chunkSize)
}

export const fetchGamesPlayersData = async (games: any[], chainId = ChainId.BSC): Promise<any[]> => {
  const chunks = await Promise.all(games.map((game) => fetchGamePlayersData(game, chainId)))

  return chunks
}

export const fetchGamesPrizes = async (games: any[], chainId = ChainId.BSC): Promise<any[]> => {
  const gameCalls = games.map((game) => {
    return {
      address: game.address,
      name: 'getPrizes',
      params: [game.epoch],
    }
  })
  const chunkSize = gameCalls.length / games.length

  const gameMultiCallResult = await multicallv2({
    abi: internal[chainId || ChainId.BSC].GameV1.abi,
    calls: gameCalls,
    chainId,
  })

  return chunk(gameMultiCallResult, chunkSize)
}

export const fetchGamesWinners = async (games: any[], chainId = ChainId.BSC): Promise<any[]> => {
  const gameCalls = games.map((game) => {
    const epoch = game.epoch ? game.epoch - 1 : game.epoch
    return {
      address: game.address,
      name: 'getWinners',
      params: [epoch],
    }
  })
  const chunkSize = gameCalls.length / games.length

  const gameMultiCallResult = await multicallv2({
    abi: internal[chainId || ChainId.BSC].GameV1.abi,
    calls: gameCalls,
    chainId,
  })

  return chunk(gameMultiCallResult, chunkSize)
}
