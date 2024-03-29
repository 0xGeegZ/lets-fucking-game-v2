import BigNumber from 'bignumber.js'
import { BIG_ZERO } from 'utils/bigNumber'
import { createSelector } from '@reduxjs/toolkit'
import _isEmpty from 'lodash/isEmpty'
import {
  State,
  SerializedGame,
  DeserializedGame,
  DeserializedGameUserData,
  DeserializedPrizeData,
  DeserializedWinnerData,
  DeserializedGamePlayerData,
} from '../types'

const deserializeGameUserData = (game: SerializedGame): DeserializedGameUserData => {
  return {
    isPlaying: game?.userData ? game.userData.isPlaying : false,
    isCreator: game?.userData ? game.userData.isCreator : false,
    isAdmin: game?.userData ? game.userData.isAdmin : false,
    nextFromRange: game?.userData ? game.userData.nextFromRange : '',
    nextToRange: game?.userData ? game.userData.nextToRange : '',
    isCanVoteSplitPot: game?.userData ? game.userData.isCanVoteSplitPot : false,
    isInTimeRange: game?.userData ? game.userData.isInTimeRange : false,
    isLoosing: game?.userData ? game.userData.isLoosing : false,
  }
}

const deserializeGamePlayerData = (game: SerializedGame): DeserializedGamePlayerData => {
  return {
    playerAddress: game?.playerData ? game.playerData.playerAddress : '',
    roundRangeLowerLimit: game?.playerData ? new BigNumber(game.playerData.roundRangeLowerLimit) : BIG_ZERO,
    roundRangeUpperLimit: game?.playerData ? new BigNumber(game.playerData.roundRangeUpperLimit) : BIG_ZERO,
    hasPlayedRound: game?.playerData ? game.playerData.hasPlayedRound : false,
    roundCount: game?.playerData ? new BigNumber(game.playerData.roundCount) : BIG_ZERO,
    position: game?.playerData ? new BigNumber(game.playerData.position) : BIG_ZERO,
    hasLost: game?.playerData ? game.playerData.hasLost : false,
    isSplitOk: game?.playerData ? game.playerData.isSplitOk : false,
  }
}

const deserializeGamePrize = (game: SerializedGame): DeserializedPrizeData[] => {
  return game?.prizes?.map((prize) => {
    return {
      amount: prize?.amount ? new BigNumber(prize.amount) : BIG_ZERO,
      position: prize?.position ? new BigNumber(prize.position) : BIG_ZERO,
    }
  })
}

const deserializeGameWinner = (game: SerializedGame): DeserializedWinnerData[] => {
  return game?.lastRoundWinners?.map((winner) => {
    return {
      epoch: winner?.epoch ? new BigNumber(winner.epoch) : BIG_ZERO,
      playerAddress: winner?.playerAddress ? winner.playerAddress : '',
      amountWon: winner?.amountWon ? new BigNumber(winner.amountWon) : BIG_ZERO,
      position: winner?.position ? new BigNumber(winner.position) : BIG_ZERO,
      prizeClaimed: winner?.prizeClaimed ? winner.prizeClaimed : false,
    }
  })
}

const deserializeGame = (game: SerializedGame): DeserializedGame => {
  const {
    id,
    name,
    versionId,
    epoch,
    isPaused,
    isInProgress,
    isRegistering,
    isDeleted,
    maxPlayers,
    playTimeRange,
    remainingPlayersCount,
    playerAddressesCount,
    itemCreationAmount,
    registrationAmount,
    address,
    prizepool,
    encodedCron,
    creator,
    admin,
    treasuryFee,
    treasuryAmount,
    creatorFee,
    creatorAmount,
    playerAddresses,
  } = game

  return {
    id: id ? new BigNumber(id) : BIG_ZERO,
    name,
    versionId: versionId ? new BigNumber(versionId) : BIG_ZERO,
    epoch: epoch ? new BigNumber(epoch) : BIG_ZERO,
    isPaused,
    isInProgress,
    isRegistering,
    isDeleted,
    playTimeRange: playTimeRange ? new BigNumber(playTimeRange) : BIG_ZERO,
    maxPlayers: maxPlayers ? new BigNumber(maxPlayers) : BIG_ZERO,
    remainingPlayersCount: remainingPlayersCount ? new BigNumber(remainingPlayersCount) : BIG_ZERO,
    playerAddressesCount: playerAddressesCount ? new BigNumber(playerAddressesCount) : BIG_ZERO,
    itemCreationAmount: itemCreationAmount ? new BigNumber(itemCreationAmount) : BIG_ZERO,
    registrationAmount: registrationAmount ? new BigNumber(registrationAmount) : BIG_ZERO,
    address,
    prizepool: prizepool ? new BigNumber(prizepool) : BIG_ZERO,
    encodedCron,
    creator,
    admin,
    treasuryFee: treasuryFee ? new BigNumber(treasuryFee) : BIG_ZERO,
    // treasuryAmount: treasuryAmount ? new BigNumber(treasuryAmount) : BIG_ZERO,
    treasuryAmount,
    creatorFee: creatorFee ? new BigNumber(creatorFee) : BIG_ZERO,
    // creatorAmount: creatorAmount ? new BigNumber(creatorAmount) : BIG_ZERO,
    creatorAmount,
    playerAddresses,
    prizes: deserializeGamePrize(game),
    lastRoundWinners: deserializeGameWinner(game),
    userData: deserializeGameUserData(game),
    playerData: deserializeGamePlayerData(game),
  }
}

const selectGameByKey = (key: string, value: string | number) => (state: State) =>
  state.games.data.find((f) => f[key] === value)

export const makeGameFromIdSelector = (id: number) =>
  createSelector([selectGameByKey('id', id)], (game) => deserializeGame(game))

export const makeUserGameFromIdSelector = (id: number) =>
  createSelector([selectGameByKey('id', id)], (game) => deserializeGameUserData(game))

export const makePlayerGameFromIdSelector = (id: number) =>
  createSelector([selectGameByKey('id', id)], (game) => deserializeGameUserData(game))

export const gameSelector = () =>
  createSelector(
    (state: State) => state.games,
    (games) => {
      const deserializedGamesData = games.data.map(deserializeGame)
      const { loadArchivedGamesData, userDataLoaded, loadingKeys } = games

      return {
        loadArchivedGamesData,
        userDataLoaded,
        loadingKeys,
        data: deserializedGamesData,
      }
    },
  )
