import { ethers } from 'hardhat'
import { DeployFunction } from 'hardhat-deploy/types'
import { HardhatRuntimeEnvironment } from 'hardhat/types'

import { giveawayConfig } from '../config/giveawayConfig'
import { networkConfig } from '../config/networkConfig'
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

  const currentGiveawayConfig = giveawayConfig[chainId]
  if (!currentGiveawayConfig)
    throw new Error('No giveaway config found for chain id', chainId)

  let linkTokenAddress: string
  // TODO load oracle & jobId
  if (chainId === '31337' || chainId === '1337') {
    const linkToken = await deployments.get('LinkToken')
    linkTokenAddress = linkToken.address
  } else {
    linkTokenAddress = networkConfig[chainId].linkToken as string
  }

  if (!linkTokenAddress)
    throw new Error('Link token address not found for chainId', chainId)

  const deployer = await ethers.getSigner(deployerAddress)

  const options = {
    from: deployerAddress,
    nonce: 'pending',
    log: true,
  }

  const {
    TREASURY_FEE_DEFAULT: treasuryFee,
    ENCODED_CRON_DEFAULT: encodedCron,
    API_BASE_URL_DEFAULT: apiBaseUrl,
  } = currentGiveawayConfig

  const jobId = ethers.utils.hexlify(
    ethers.utils.toUtf8Bytes('7223acbd01654282865b678924126013')
  )

  log('Deploying GiveawayV1 contract')
  const { address: cronUpkeepAddress } = await deployments.get('CronUpkeep')
  const { address: cronExternalAddress } = await deployments.get('CronExternal')
  const cronLibraries = {
    libraries: {
      Cron: cronExternalAddress,
    },
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

  // const keeperArgs = [
  //   cronUpkeepAddress,
  //   'refreshActiveGiveawayStatus()',
  //   encodedCron,
  // ]

  // const {
  //   address: keeperAddress,
  //   newlyDeployed: keeperNewlyDeployed,
  //   receipt: { gasUsed: keeperGasUsed },
  // } = await deploy('Keeper', {
  //   ...options,
  //   ...cronLibraries,
  //   args: keeperArgs,
  // })

  // if (keeperNewlyDeployed)
  //   log(
  //     `✅ Contract Keeper deployed at ${keeperAddress} using ${keeperGasUsed} gas`
  //   )

  // log('Adding Keeper to Keeper delegators')
  // cronUpkeep.addDelegator(keeperAddress)

  // TODO Load it from config
  const giveawayArgs = [
    jobId,
    apiBaseUrl,
    '0xCC79157eb46F5624204f47AB42b3906cAA40eaB7',
    linkTokenAddress,
    treasuryFee,
    // cronUpkeepAddress,
    // keeperAddress,
    // encodedCron,
    [],
    [],
  ]

  const {
    address: giveawayAddress,
    newlyDeployed: giveawayNewlyDeployed,
    receipt: { gasUsed: giveawayGasUsed },
  } = await deploy('GiveawayV1', {
    ...options,
    ...helpersLibraries,
    args: giveawayArgs,
  })

  if (giveawayNewlyDeployed)
    log(
      `✅ Contract GiveawayV1 deployed at ${giveawayAddress} using ${giveawayGasUsed} gas`
    )

  log('Adding GiveawayV1 to Keeper delegators')
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
    cronUpkeep.addDelegator(giveawayAddress)
  } catch (error) {
    log(
      '[ERROR] When adding Keeper to Keeper delegators, trying without Cron library'
    )

    const { interface: cronUpkeepInterface } = await ethers.getContractFactory(
      'CronUpkeep'
    )

    const cronUpkeep = new ethers.Contract(
      cronUpkeepAddress,
      cronUpkeepInterface,
      deployer
    )
    cronUpkeep.addDelegator(giveawayAddress)
  }

  if (isLocalDeployment || !giveawayNewlyDeployed) return

  log(`🕦 Waiting before verification...`)
  await delay(30 * 1000)
  try {
    log(`✅ Verifying contract GiveawayV1`)
    await hre.run('verify:verify', {
      address: giveawayAddress,
      constructorArguments: giveawayArgs,
    })
    log(`🕧 Waiting post verification...`)
    await delay(10 * 1000)
  } catch (error) {
    console.error('Error during contract verification', error.message)
  }
}

func.tags = ['all', 'test', 'dev', 'staging', 'prod', 'giveaway']
func.dependencies = ['keeper']

export default func
