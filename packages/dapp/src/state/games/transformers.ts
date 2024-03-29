import { formatEther } from '@ethersproject/units'

import { parseBytes32String } from '@ethersproject/strings'
import { arrayify } from '@ethersproject/bytes'
import { ZERO_ADDRESS } from 'config/constants'
import moment from 'moment'
import { SerializedGame, SerializedPrizeData, SerializedWinnerData } from '../types'

// parse a name or symbol from a token response
const BYTES32_REGEX = /^0x[a-fA-F0-9]{64}$/

function parseStringOrBytes32(str: string | undefined, bytes32: string | undefined, defaultValue: string): string {
  return str && str.length > 0
    ? str
    : // need to check for proper bytes string and valid terminator
    bytes32 && BYTES32_REGEX.test(bytes32) && arrayify(bytes32)[31] === 0
    ? parseBytes32String(bytes32)
    : defaultValue
}

export const gameBaseTransformer = (gameData, gamePlayers, gameCreatorAmounts, gameTreasuryAmounts) => {
  return (game, index): SerializedGame => {
    const { deployedAddress: address, itemCreationAmount } = game
    const [
      [
        {
          gameId,
          name,
          versionId,
          epoch,
          maxPlayers,
          playTimeRange,
          remainingPlayersCount,
          playerAddressesCount,
          registrationAmount,
          encodedCron,
          isInProgress,
          isPaused,
          creator,
          admin,
          creatorFee,
          treasuryFee,
        },
      ],
    ] = gameData[index]

    const [[playerAddresses]] = gamePlayers[index]
    const [[creatorAmount]] = gameCreatorAmounts[index]
    const [[treasuryAmount]] = gameTreasuryAmounts[index]

    return {
      id: gameId.toNumber(),
      name: parseStringOrBytes32('', name, 'Game'),
      versionId: versionId?.toNumber(),
      epoch: epoch.toNumber(),
      maxPlayers: maxPlayers.toNumber(),
      remainingPlayersCount: remainingPlayersCount.toNumber(),
      playerAddressesCount: playerAddressesCount.toNumber(),
      playTimeRange: playTimeRange.toNumber(),
      registrationAmount: formatEther(`${registrationAmount}`),
      itemCreationAmount: formatEther(`${itemCreationAmount}`),
      creatorFee: creatorFee.toNumber(),
      creatorAmount: creatorAmount.toString(),
      treasuryFee: treasuryFee.toNumber(),
      treasuryAmount: treasuryAmount.toString(),
      isInProgress,
      isRegistering: !isInProgress && maxPlayers.toNumber() !== playerAddressesCount.toNumber(),
      isPaused,
      isDeleted: false,
      address,
      creator,
      admin,
      prizepool: '0',
      encodedCron: encodedCron.toString(),
      playerAddresses,
      prizes: [],
      lastRoundWinners: [],
    }
  }
}

export const gameExtendedTransformer = (gamePrizes, gameWinners) => {
  return (game, index): SerializedGame => {
    const [[rawPrizes]] = gamePrizes[index]
    const prizes: SerializedPrizeData[] = rawPrizes.map((prize) => {
      const { amount, position } = prize
      return {
        amount: formatEther(`${amount}`),
        position: position.toNumber(),
      }
    })
    const prizepool = prizes.reduce((acc, prize) => acc + +prize.amount, 0)
    const [[rawWinners]] = gameWinners[index]

    const winners: SerializedWinnerData[] = rawWinners.map((winner) => {
      const { epoch, playerAddress, amountWon, position, prizeClaimed } = winner
      return {
        epoch: epoch.toNumber(),
        playerAddress: playerAddress.toString(),
        amountWon: formatEther(`${amountWon}`),
        position: position.toNumber(),
        prizeClaimed,
      }
    })

    return {
      ...game,
      prizepool: `${prizepool}`,
      prizes,
      lastRoundWinners: winners,
    }
  }
}

export const gameFullTransformer = (gamePrizes /* , gamePlayersData */) => {
  return (game, index): SerializedGame => {
    const [[rawPrizes]] = gamePrizes[index]
    const prizes: SerializedPrizeData[] = rawPrizes.map((prize) => {
      const { amount, position } = prize
      return {
        amount: formatEther(`${amount}`),
        position: position.toNumber(),
      }
    })
    const prizepool = prizes.reduce((acc, prize) => acc + +prize.amount, 0)

    // const [[{ gamePlayer: rawPlayers }]] = gamePlayersData[index]
    // const players = rawPlayers.map((player) => {
    //   const {
    //     hasLost,
    //     hasPlayedRound,
    //     isSplitOk,
    //     playerAddress: address,
    //     position,
    //     roundCount,
    //     roundRangeLowerLimit,
    //     roundRangeUpperLimit,
    //   } = player
    //   return {
    //     hasLost,
    //     hasPlayedRound,
    //     isSplitOk,
    //     address,
    //     position,
    //     roundCount,
    //     roundRangeLowerLimit,
    //     roundRangeUpperLimit,
    //   }
    // })

    return {
      ...game,
      prizepool: `${prizepool}`,
      prizes,
      // players,
    }
  }
}

export const gamePlayerDataTransformer = (gamesPlayerData, account) => {
  return (game, index): SerializedGame => {
    const playerData = gamesPlayerData[index]

    const isPlaying = playerData.address !== ZERO_ADDRESS

    const fromRange = moment.unix(+playerData.roundRangeLowerLimit)
    const toRange = moment.unix(+playerData.roundRangeUpperLimit)
    const isInRange = moment().isBetween(fromRange, toRange)

    return {
      ...game,
      playerData,
      userData: {
        isPlaying,
        isCreator: game.creator === account,
        isAdmin: game.admin === account,
        isInTimeRange: isInRange,
        nextFromRange: fromRange.toString(),
        nextToRange: toRange.toString(),
        isCanVoteSplitPot: game.isInProgress && game.playerAddressesCount <= game.maxPlayers * 0.5,
        isLoosing: moment().isAfter(moment(toRange)) && moment(fromRange).isSame(moment(), 'day'),
      },
    }
  }
}
