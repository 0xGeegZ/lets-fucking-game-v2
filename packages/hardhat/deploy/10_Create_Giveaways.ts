import { ethers } from 'hardhat'
import { HardhatRuntimeEnvironment } from 'hardhat/types'

import { giveawayConfig } from '../config/giveawayConfig'

const func: DeployFunction = async function ({
  deployments,
  getChainId,
  getNamedAccounts,
}: HardhatRuntimeEnvironment) {
  const { log } = deployments

  const { deployer: deployerAddress } = await getNamedAccounts()

  const deployer = await ethers.getSigner(deployerAddress)
  const chainId = await getChainId()

  const currentGiveawayConfig = giveawayConfig[chainId]
  if (!currentGiveawayConfig)
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

  const name = currentGiveawayConfig.NAME_DEFAULT
  const image = currentGiveawayConfig.IMAGE_DEFAULT
  const userId = currentGiveawayConfig.USER_ID_DEFAULT
  const tweetId = currentGiveawayConfig.TWEET_ID_DEFAULT
  const endTimestamp = currentGiveawayConfig.END_TIMESTAMP_DEFAULT
  const retweetMaxCount = currentGiveawayConfig.RETWEET_MAX_COUNT_DEFAULT
  const giveawayAmount = currentGiveawayConfig.GIVEAWAY_AMOUNT_DEFAULT

  const prizes = [
    {
      position: '1',
      amount: giveawayAmount,
      standard: '0',
      contractAddress: '0x0000000000000000000000000000000000000000',
      tokenId: '1',
    },
  ]

  const { address: giveawayAddress } = await deployments.get('GiveawayV1')

  let giveawayInterface
  try {
    const { interface: giveawayInterfaceTmp } = await ethers.getContractFactory(
      'GiveawayV1',
      helpersLibraries
    )
    giveawayInterface = giveawayInterfaceTmp
  } catch (error) {
    log(
      '[ERROR] When loading GiveawayV1 from contract factory, trying without dependencies library'
    )
    const { interface: giveawayInterfaceTmp } = await ethers.getContractFactory(
      'GiveawayV1'
    )
    giveawayInterface = giveawayInterfaceTmp
  }

  const giveaway = new ethers.Contract(
    giveawayAddress,
    giveawayInterface,
    deployer
  )

  log('Creating new giveaway')
  await giveaway.createGiveaway(
    name,
    image,
    userId,
    tweetId,
    endTimestamp,
    retweetMaxCount,
    prizes,
    { value: giveawayAmount }
  )
  log(`✅ New giveaway created`)

  // TODO add giveaway to delegators when implemented
}

func.tags = ['all', 'test', 'dev', 'staging', 'create-giveaways']
func.dependencies = ['giveaway']

export default func
