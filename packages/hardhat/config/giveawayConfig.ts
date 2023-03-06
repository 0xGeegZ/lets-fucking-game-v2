// GIVEAWAY CONFIG : UPDATE DEFAULT CONFIG FROM HARDHAT PACKAGE THEN COPY CHANGE TO DAPP BY COMPILING OR DEPLOYING CONTRACT
import { BigNumber } from '@ethersproject/bignumber'
import { parseEther } from '@ethersproject/units'

export const range = (start, end) =>
  Array.from(Array(end + 1).keys()).slice(start)

const randomNumber = () => {
  return Math.floor(Math.random() * (10000 - 1) + 1)
}

export interface GiveawayConfig {
  NAME_DEFAULT: string
  NAME_MIN_LENGTH: number
  NAME_MAX_LENGTH: number

  IMAGE_DEFAULT: string
  IMAGE_MIN_LENGTH: number
  IMAGE_MAX_LENGTH: number

  USER_ID_DEFAULT: BigNumber
  TWEET_ID_DEFAULT: BigNumber

  END_TIMESTAMP_DEFAULT: BigNumber
  END_TIMESTAMP_MAX: BigNumber

  RETWEET_MAX_COUNT_DEFAULT: number

  GIVEAWAY_AMOUNT_DEFAULT: BigNumber
  AUTHORIZED_GIVEAWAY_AMOUNTS: Array<number>

  ENCODED_CRON_DEFAULT: string

  PRIZETYPE: Array<string>

  TREASURY_FEE_DEFAULT: number
  TREASURY_FEE_MIN: number
  TREASURY_FEE_MAX: number
  AUTHORIZED_TREASURY_FEE: Array<number>

  API_BASE_URL_DEFAULT: string
}
export const defaultGiveawayConfig: GiveawayConfig = {
  NAME_DEFAULT: `GIVEAWAY MVP #${randomNumber()}`,
  NAME_MIN_LENGTH: 3,
  NAME_MAX_LENGTH: 32,

  IMAGE_DEFAULT: `https://random.imagecdn.app/500/150`,
  IMAGE_MIN_LENGTH: 3,
  IMAGE_MAX_LENGTH: 32,

  USER_ID_DEFAULT: BigNumber.from('1600890226578169856'),
  TWEET_ID_DEFAULT: BigNumber.from('1600893161114828800'),

  // 3 days
  END_TIMESTAMP_DEFAULT: BigNumber.from(
    new Date(new Date().setDate(new Date().getDate() + 3)).getTime()
  ),
  // 10 days
  END_TIMESTAMP_MAX: BigNumber.from(
    new Date(new Date().setDate(new Date().getDate() + 10)).getTime()
  ),

  RETWEET_MAX_COUNT_DEFAULT: 0,

  GIVEAWAY_AMOUNT_DEFAULT: parseEther('0.0001'),
  AUTHORIZED_GIVEAWAY_AMOUNTS: [
    0, 0.05, 0.1, 0.25, 0.5, 0.75, 1, 1.5, 2, 5, 10,
  ],

  ENCODED_CRON_DEFAULT: '0 * * * *',

  PRIZETYPE: ['ERC20', 'ERC721', 'ERC1155'],

  TREASURY_FEE_DEFAULT: 300,
  TREASURY_FEE_MIN: 0,
  TREASURY_FEE_MAX: 100,
  AUTHORIZED_TREASURY_FEE: [...range(3, 10)],

  API_BASE_URL_DEFAULT: 'https://giveaway.lfgames.workers.dev',
}

export const giveawayConfig: Record<string, GiveawayConfig | null> = {
  '31337': {
    ...defaultGiveawayConfig,
    API_BASE_URL_DEFAULT: 'http://127.0.0.1:8787',
  },
  '1337': {
    ...defaultGiveawayConfig,
    API_BASE_URL_DEFAULT: 'http://127.0.0.1:8787',
  },
  '56': {
    ...defaultGiveawayConfig,
    GIVEAWAY_AMOUNT_DEFAULT: parseEther('0.5'),
    AUTHORIZED_GIVEAWAY_AMOUNTS: [
      0, 0.05, 0.1, 0.25, 0.5, 0.75, 1, 1.5, 2, 5, 10,
    ],
  },
  '97': {
    ...defaultGiveawayConfig,
    GIVEAWAY_AMOUNT_DEFAULT: parseEther('0.01'),
  },
  '5': {
    ...defaultGiveawayConfig,
    GIVEAWAY_AMOUNT_DEFAULT: parseEther('0.05'),
  },
  '80001': {
    ...defaultGiveawayConfig,
    GIVEAWAY_AMOUNT_DEFAULT: parseEther('0.01'),
    // GIVEAWAY_AMOUNT_DEFAULT: parseEther('50'),
    AUTHORIZED_GIVEAWAY_AMOUNTS: [0, 0.0001, 0.5, 1, 2, 5, 10, 100, 200, 250],
  },
  '250': {
    ...defaultGiveawayConfig,
    GIVEAWAY_AMOUNT_DEFAULT: parseEther('0.5'),
  },
  '4002': {
    ...defaultGiveawayConfig,
    GIVEAWAY_AMOUNT_DEFAULT: parseEther('0.5'),
    AUTHORIZED_GIVEAWAY_AMOUNTS: [0, 0.05, 0.5, 0.75, 1, 1.5, 2, 5, 10],
  },
}

export const developmentChains = ['hardhat', 'localhost']
