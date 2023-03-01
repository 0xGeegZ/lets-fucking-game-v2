import { DeployFunction } from 'hardhat-deploy/types'
import { HardhatRuntimeEnvironment } from 'hardhat/types'

import { delay } from '../helpers/delay'

const func: DeployFunction = async function ({
  deployments,
  getChainId,
  getNamedAccounts,
}: HardhatRuntimeEnvironment) {
  const { deploy, log } = deployments
  const { deployer } = await getNamedAccounts()
  const chainId = await getChainId()

  const isLocalDeployment = chainId === '31337' || chainId === '1337'

  const options = {
    from: deployer,
    log: true,
  }

  const { address: cronExternalAddress } = await deployments.get('CronExternal')
  const libraries = {
    libraries: {
      Cron: cronExternalAddress,
    },
  }

  log('Deploying TokenHelpers library contract')
  const {
    address: tokenHelpersAddress,
    newlyDeployed: tokenHelpersNewlyDeployed,
    receipt: { gasUsed: tokenHelpersGasUsed },
  } = await deploy('TokenHelpers', {
    ...options,
  })

  if (tokenHelpersNewlyDeployed) {
    log(
      `✅ Contract TokenHelpers deployed at ${tokenHelpersAddress} using ${tokenHelpersGasUsed} gas`
    )
  }

  log('Deploying KeeperHelpers library contract')

  const {
    address: keeperHelpersAddress,
    newlyDeployed: keeperHelpersNewlyDeployed,
    receipt: { gasUsed: keeperHelpersGasUsed },
  } = await deploy('KeeperHelpers', {
    ...libraries,
    ...options,
  })

  if (keeperHelpersNewlyDeployed)
    log(
      `✅ Contract KeeperHelpers deployed at ${keeperHelpersAddress} using ${keeperHelpersGasUsed} gas`
    )

  if (
    isLocalDeployment ||
    !keeperHelpersNewlyDeployed ||
    !tokenHelpersNewlyDeployed
  )
    return

  await delay(30 * 1000)
  try {
    log(`✅ Verifying contract TokenHelpers`)
    await hre.run('verify:verify', {
      address: tokenHelpersAddress,
      constructorArguments: [],
    })
    await delay(10 * 1000)
  } catch (error) {
    console.error('Error during contract verification', error.message)
  }

  try {
    log(`✅ Verifying contract KeeperHelpers`)
    await hre.run('verify:verify', {
      address: keeperHelpersAddress,
      constructorArguments: [],
    })
    await delay(10 * 1000)
  } catch (error) {
    console.error('Error during contract verification', error.message)
  }
}

func.tags = ['all', 'test', 'dev', 'staging', 'prod', 'keeper']

export default func
