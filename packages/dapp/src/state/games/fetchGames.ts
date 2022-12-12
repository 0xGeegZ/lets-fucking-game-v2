import { getGameFactoryContract } from 'utils/contractHelpers'
import { GameFactoryV1 } from 'config/types/typechain'
import { Factory } from 'config/types/typechain/contracts/games/GameFactoryV1'

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
  const gameFactoryContract: GameFactoryV1 = getGameFactoryContract(chainId)
  const gamesToFetch: Factory.ItemStructOutput[] = await gameFactoryContract.getDeployedGames()

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
}

export default fetchGames
