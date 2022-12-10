import fs from 'fs'
import { HardhatRuntimeEnvironment } from 'hardhat/types'
import { DeployFunction } from 'hardhat-deploy/types'

import { saveContractData } from '../helpers/saveContractData'

const func: DeployFunction = async function ({
  deployments,
  getChainId,
}: HardhatRuntimeEnvironment) {
  const { deploy, log } = deployments

  const chainId = await getChainId()
  const game = await deployments.get('GameV2')
  const gameFactory = await deployments.get('GameFactoryV2')

  const multiCall3 = await deployments.get('Multicall3')

  const cronExternal = await deployments.get('CronExternal')
  const cronUpkeep = await deployments.get('CronUpkeep')

  saveContractData({
    [chainId]: {
      GameFactoryV2: {
        address: gameFactory.address,
        libraries: gameFactory.libraries || {},
        transactionHash: gameFactory.transactionHash,
        abi: gameFactory.abi,
      },
      GameV2: {
        address: game.address,
        libraries: game.libraries || {},
        transactionHash: game.transactionHash,
        abi: game.abi,
      },
      CronExternal: {
        address: cronExternal.address,
        libraries: cronExternal.libraries || {},
        transactionHash: cronExternal.transactionHash,
        abi: cronExternal.abi,
      },
      CronUpkeep: {
        address: cronUpkeep.address,
        libraries: cronUpkeep.libraries || {},
        transactionHash: cronUpkeep.transactionHash,
        abi: cronUpkeep.abi,
      },
      MultiCall3: {
        address: multiCall3.address,
        libraries: multiCall3.libraries || {},
        transactionHash: multiCall3.transactionHash,
        abi: multiCall3.abi,
      },
    },
  })

  // Copy contract data to the dapp
  await fs.copyFileSync(
    'build/internal.json',
    '../dapp/src/config/internal/internal.json'
  )
  log('✅ Contracts data was copied to the dapp')

  // Copy game configuration to the dapp
  await fs.copyFileSync(
    'config/gameConfig.ts',
    '../dapp/src/config/internal/gameConfig.ts'
  )
  log('✅ Multi Chain game config data was copied to the dapp')

  // Copy giveaway configuration to the dapp
  await fs.copyFileSync(
    'config/giveawayConfig.ts',
    '../dapp/src/config/internal/giveawayConfig.ts'
  )
  log('✅ Multi Chain giveaway config data was copied to the dapp')
}

func.tags = ['all', 'dev', 'staging', 'prod', 'save-contract-data']
func.dependencies = [
  'multicall',
  'keeper',
  'game-implementation',
  'game-factory',
]

export default func
