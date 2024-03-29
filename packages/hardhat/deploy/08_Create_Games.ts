import { formatBytes32String } from '@ethersproject/strings'
import { ethers } from 'hardhat'
import { HardhatRuntimeEnvironment } from 'hardhat/types'

import { gameConfig } from '../config/gameConfig'

const func: DeployFunction = async function ({
  deployments,
  getChainId,
  getNamedAccounts,
}: HardhatRuntimeEnvironment) {
  const { log } = deployments

  const { deployer: deployerAddress } = await getNamedAccounts()

  const deployer = await ethers.getSigner(deployerAddress)
  const chainId = await getChainId()

  const currentGameConfig = gameConfig[chainId]
  if (!currentGameConfig)
    throw new Error('No game config found for chain id', chainId)

  const { address: keeperHelpersAddress } = await deployments.get(
    'KeeperHelpers'
  )
  const { address: tokenHelpersAddress } = await deployments.get('TokenHelpers')
  const helpersLibraries = {
    libraries: {
      KeeperHelpers: keeperHelpersAddress,
      TokenHelpers: tokenHelpersAddress,
    },
  }

  const name = formatBytes32String(currentGameConfig.NAME_DEFAULT)
  const itemCreationAmount = currentGameConfig.GAME_CREATION_AMOUNT
  const maxPlayers = currentGameConfig.PLAYERS_DEFAULT
  const playTimeRange = currentGameConfig.PLAY_TIME_RANGE_DEFAULT
  const registrationAmount = currentGameConfig.REGISTRATION_AMOUNT_DEFAULT
  const zeroRegistrationAmount = currentGameConfig.REGISTRATION_AMOUNT_FREE

  const freeGamePrizepool = currentGameConfig.PRIZEPOOL_NUMBER
  const freeGamePrizepoolAmount = currentGameConfig.PRIZEPOOL_AMOUNT

  const treasuryFee = currentGameConfig.TREASURY_FEE_DEFAULT
  const creatorFee = currentGameConfig.CREATOR_FEE_DEFAULT
  const encodedCron = currentGameConfig.ENCODED_CRON_DEFAULT

  const prizes = [
    {
      position: '1',
      amount: registrationAmount.mul(maxPlayers),
      standard: '0',
      contractAddress: '0x0000000000000000000000000000000000000000',
      tokenId: '1',
    },
  ]

  const updatedPrizes = []
  updatedPrizes.push({ ...prizes[0] })
  updatedPrizes.push({ ...prizes[0] })

  updatedPrizes[0].amount = ethers.utils.parseEther(`${freeGamePrizepool / 2}`)
  updatedPrizes[1].amount = ethers.utils.parseEther(`${freeGamePrizepool / 2}`)
  updatedPrizes[1].position = 2

  const freeGamePrizes = updatedPrizes

  const { address: gameFactoryAddress } = await deployments.get('GameFactoryV1')

  let gameFactoryInterface
  try {
    const { interface: gameFactoryInterfaceTmp } =
      await ethers.getContractFactory('GameFactoryV1', helpersLibraries)
    gameFactoryInterface = gameFactoryInterfaceTmp
  } catch (error) {
    log(
      '[ERROR] When loading GameFactoryV1 from contract factory, trying without dependencies library'
    )
    const { interface: gameFactoryInterfaceTmp } =
      await ethers.getContractFactory('GameFactoryV1')
    gameFactoryInterface = gameFactoryInterfaceTmp
  }

  const gameFactory = new ethers.Contract(
    gameFactoryAddress,
    gameFactoryInterface,
    deployer
  )

  try {
    log('Creating new payable game')
    await gameFactory.createNewGame(
      name,
      maxPlayers,
      playTimeRange,
      registrationAmount,
      treasuryFee,
      creatorFee,
      encodedCron,
      prizes,
      {
        value: itemCreationAmount,
      }
    )
    log(`✅ New payable game created`)
  } catch (error) {
    log(`❌ New payable game not created`, error)
  }

  try {
    log('Creating new free game')
    await gameFactory.createNewGame(
      name,
      maxPlayers,
      playTimeRange,
      zeroRegistrationAmount,
      treasuryFee,
      creatorFee,
      encodedCron,
      freeGamePrizes,
      {
        value: itemCreationAmount.add(freeGamePrizepoolAmount),
      }
    )
    log(`✅ New free game created`)
  } catch (error) {
    log(`❌ New free game not created`, error)
  }

  try {
    log('Creating new free game for 2 players')
    await gameFactory.createNewGame(
      name,
      2,
      playTimeRange,
      zeroRegistrationAmount,
      treasuryFee,
      creatorFee,
      '*/2 * * * *',
      // encodedCron,
      freeGamePrizes,
      { value: itemCreationAmount.add(freeGamePrizepoolAmount) }
    )
    log(`✅ New free game for 2 players created`)
  } catch (error) {
    log(`❌ New free game for 2 players not created`, error)
  }
}

func.tags = ['all', 'test', 'dev', 'staging', 'create-games']
func.dependencies = ['game-factory']

export default func
