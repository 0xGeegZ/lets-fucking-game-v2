import { getGameFactoryContract } from 'utils/contractHelpers'
import { GameFactory } from 'config/types/typechain'

import { gameBaseTransformer, gameExtendedTransformer } from './transformers'

import {
  fetchPublicGamesData,
  fetchGamesTreasuryAmounts,
  fetchGamesCreatorAmounts,
  fetchGamesPlayersAddresses,
  fetchGamesPrizes,
  fetchGamesWinners,
  fetchGamesPlayersData,
} from './fetchGameData'
import { State, SerializedGame, DeserializedGame, DeserializedGameUserData } from '../types'

const fetchGames = async (chainId: number): Promise<SerializedGame[]> => {
  try {
    const gameFactoryContract: GameFactory = getGameFactoryContract(chainId)
    const gamesToFetch: GameFactory.GameStructOutput[] = await gameFactoryContract.getDeployedGames()
    console.log('🚀 ~ file: fetchGames.ts:21 ~ fetchGames ~ gamesToFetch', gamesToFetch)

    const [gameData, gamePlayers, gameCreatorAmounts, gameTreasuryAmounts] = await Promise.all([
      fetchPublicGamesData(gamesToFetch, chainId),
      fetchGamesPlayersAddresses(gamesToFetch, chainId),
      fetchGamesCreatorAmounts(gamesToFetch, chainId),
      fetchGamesTreasuryAmounts(gamesToFetch, chainId),
    ])
    const transformedGames = gamesToFetch.map(
      gameBaseTransformer(gameData, gamePlayers, gameCreatorAmounts, gameTreasuryAmounts),
    )

    const [gamePrizes, gameWinners] = await Promise.all([
      fetchGamesPrizes(transformedGames, chainId),
      fetchGamesWinners(transformedGames, chainId),
    ])
    const completeGames = transformedGames.map(gameExtendedTransformer(gamePrizes, gameWinners))
    return completeGames
  } catch (error) {
    console.log('🚀 ~ file: fetchGames.ts:22 ~ fetchGames ~ error', error)
    return []
  }
}

export default fetchGames
