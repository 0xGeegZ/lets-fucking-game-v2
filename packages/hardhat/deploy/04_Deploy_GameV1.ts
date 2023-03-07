import { ethers } from 'hardhat'
import { HardhatRuntimeEnvironment } from 'hardhat/types'
import { DeployFunction } from 'hardhat-deploy/types'

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

  const options = {
    from: deployerAddress,
    nonce: 'pending',
    log: true,
  }

  log('Deploying GameV1 contract')
  const { address: tokenHelpersAddress } = await deployments.get('TokenHelpers')
  const helpersLibraries = {
    libraries: {
      TokenHelpers: tokenHelpersAddress,
    },
  }

  const gameArgs = [[], []]

  const {
    address: gameAddress,
    newlyDeployed: gameNewlyDeployed,
    receipt: { gasUsed: gameGasUsed },
  } = await deploy('GameV1', {
    ...options,
    ...helpersLibraries,
    args: gameArgs,
  })

  if (gameNewlyDeployed)
    log(
      `✅ Contract GameV1 deployed at ${gameAddress} using ${gameGasUsed} gas`
    )

  log('Adding GameV1 to Keeper delegators')
  const { address: cronExternalAddress } = await deployments.get('CronExternal')
  const cronLibraries = {
    libraries: {
      Cron: cronExternalAddress,
    },
  }

  const { address: cronUpkeepAddress } = await deployments.get('CronUpkeep')

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
    cronUpkeep.addDelegator(gameAddress)
  } catch (error) {
    log(
      '[ERROR] When adding GameV1 to Keeper delegators, trying without Cron library'
    )

    const { interface: cronUpkeepInterface } = await ethers.getContractFactory(
      'CronUpkeep'
    )

    const cronUpkeep = new ethers.Contract(
      cronUpkeepAddress,
      cronUpkeepInterface,
      deployer
    )
    cronUpkeep.addDelegator(gameAddress)
  }

  if (isLocalDeployment || !gameNewlyDeployed) return

  log(`🕦 Waiting before verification...`)
  await delay(30 * 1000)
  try {
    log(`✅ Verifying contract GameV1`)
    await hre.run('verify:verify', {
      address: gameAddress,
      constructorArguments: gameArgs,
    })
    log(`🕧 Waiting post verification...`)
    await delay(10 * 1000)
  } catch (error) {
    console.error('Error during contract verification', error.message)
  }
}

func.tags = ['all', 'test', 'dev', 'staging', 'prod', 'game']
func.dependencies = ['keeper']

export default func
