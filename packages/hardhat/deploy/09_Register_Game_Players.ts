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
  const [...players] = (await ethers.getSigners()).slice(1, 10)

  if (!players.length) return log('No players finded from signers')

  const deployer = await ethers.getSigner(deployerAddress)

  const chainId = await getChainId()

  const { REGISTRATION_AMOUNT_DEFAULT } = gameConfig[chainId]
  if (!REGISTRATION_AMOUNT_DEFAULT)
    throw new Error('No game config found for chain id', chainId)

  const { address: tokenHelpersAddress } = await deployments.get('TokenHelpers')
  const helpersLibrariesG = {
    libraries: {
      TokenHelpers: tokenHelpersAddress,
    },
  }

  const { interface: gameInterface } = await ethers.getContractFactory(
    'GameV1',
    helpersLibrariesG
  )

  const { address: keeperHelpersAddress } = await deployments.get(
    'KeeperHelpers'
  )
  const helpersLibrariesGF = {
    libraries: {
      KeeperHelpers: keeperHelpersAddress,
      TokenHelpers: tokenHelpersAddress,
    },
  }

  const { address: gameFactoryAddress } = await deployments.get('GameFactoryV1')

  const { interface: gameFactoryInterface } = await ethers.getContractFactory(
    'GameFactoryV1',
    helpersLibrariesGF
  )

  const gameFactory = new ethers.Contract(
    gameFactoryAddress,
    gameFactoryInterface,
    deployer
  )

  log('Register 9 players to free game')
  const { deployedAddress: freeGameDeployedAddress } = await gameFactory.items(
    '1'
  )

  const freeGame = new ethers.Contract(
    freeGameDeployedAddress,
    gameInterface,
    deployer
  )

  await Promise.all(
    players.map((player) => {
      return freeGame.connect(player).registerForGame()
    })
  )
  log(`✅ 9 players registered to free game`)

  log('Register 9 players to payable game')
  const { deployedAddress: payableGameDeployedAddress } =
    await gameFactory.items('0')

  const payableGame = new ethers.Contract(
    payableGameDeployedAddress,
    gameInterface,
    deployer
  )

  await Promise.all(
    players.map((player) =>
      payableGame
        .connect(player)
        .registerForGame({ value: REGISTRATION_AMOUNT_DEFAULT })
    )
  )
  log(`✅ 9 players registered to payable game`)
}

func.tags = ['all', 'dev', 'staging', 'register-game-players']
func.dependencies = ['create-games']

export default func
