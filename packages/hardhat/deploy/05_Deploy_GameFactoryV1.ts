import { ethers } from 'hardhat'
import { DeployFunction } from 'hardhat-deploy/types'
import { HardhatRuntimeEnvironment } from 'hardhat/types'

import { gameConfig } from '../config/gameConfig'
import { delay } from '../helpers/delay'

const func: DeployFunction = async function ({
  deployments,
  getChainId,
  getNamedAccounts,
}: HardhatRuntimeEnvironment) {
  const { deploy, log } = deployments

  const { deployer: deployerAddress } = await getNamedAccounts()
  const chainId = await getChainId()

  const isLocalDeployment = chainId === '31337' || chainId === '1337'
  const deployer = await ethers.getSigner(deployerAddress)

  const { GAME_CREATION_AMOUNT, AUTHORIZED_REGISTRATION_AMOUNTS } =
    gameConfig[chainId]

  if (!GAME_CREATION_AMOUNT)
    throw new Error('No game config found for chain id', chainId)

  const options = {
    from: deployerAddress,
    nonce: 'pending',
    log: true,
  }

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

  const { address: gameAddress } = await deployments.get('GameV1')

  const { address: cronUpkeepAddress } = await deployments.get('CronUpkeep')

  const itemCreationAmount = GAME_CREATION_AMOUNT

  const authorizedAmounts = AUTHORIZED_REGISTRATION_AMOUNTS.map((amount) =>
    ethers.utils.parseEther(`${amount}`)
  )

  log('Deploying GameFactoryV1 contract')
  const gameFactoryArgs = [
    gameAddress,
    cronUpkeepAddress,
    itemCreationAmount,
    authorizedAmounts,
  ]

  const {
    address: gameFactoryAddress,
    newlyDeployed: gameFactoryNewlyDeployed,
    receipt: { gasUsed: gameFactoryGasUsed },
  } = await deploy('GameFactoryV1', {
    ...options,
    ...helpersLibraries,
    args: gameFactoryArgs,
  })

  if (gameFactoryNewlyDeployed)
    log(
      `✅ Contract GameFactoryV1 deployed at ${gameFactoryAddress} using ${gameFactoryGasUsed} gas`
    )

  log('Adding GameFactoryV1 to Keeper delegators')
  const { address: cronExternalAddress } = await deployments.get('CronExternal')
  const cronLibraries = {
    libraries: {
      Cron: cronExternalAddress,
    },
  }

  try {
    const { interface: cronUpkeepInterface } = await ethers.getContractFactory(
      'CronUpkeep',
      cronLibraries
    )

    const cronUpkeep = new ethers.Contract(
      cronUpkeepAddress,
      cronUpkeepInterface,
      deployer
    )
    cronUpkeep.addDelegator(gameFactoryAddress)
  } catch (error) {
    log(
      '[ERROR] When adding GameFactoryV1 to Keeper delegators, trying without Cron library'
    )

    const { interface: cronUpkeepInterface } = await ethers.getContractFactory(
      'CronUpkeep'
    )

    const cronUpkeep = new ethers.Contract(
      cronUpkeepAddress,
      cronUpkeepInterface,
      deployer
    )
    cronUpkeep.addDelegator(gameFactoryAddress)
  }

  if (isLocalDeployment || !gameFactoryNewlyDeployed) return

  log(`🕦 Waiting before verification...`)
  await delay(30 * 1000)
  try {
    log(`✅ Verifying contract GameFactoryV1`)
    await hre.run('verify:verify', {
      address: gameFactoryAddress,
      constructorArguments: gameFactoryArgs,
    })
    log(`🕧 Waiting post verification...`)
    await delay(10 * 1000)
  } catch (error) {
    console.error('Error during contract verification', error.message)
  }
}

func.tags = ['all', 'test', 'dev', 'staging', 'prod', 'game-factory']
func.dependencies = ['game', 'keeper']

export default func
