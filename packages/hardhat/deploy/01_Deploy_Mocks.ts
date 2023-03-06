import { DeployFunction } from 'hardhat-deploy/types'
import { HardhatRuntimeEnvironment } from 'hardhat/types'

const func: DeployFunction = async function ({
  deployments,
  getNamedAccounts,
}: HardhatRuntimeEnvironment) {
  const { deploy } = deployments
  const { deployer } = await getNamedAccounts()

  await deploy('LinkToken', { from: deployer, nonce: 'pending', log: true })
}

func.tags = ['all', 'test', 'dev', 'mocks']

export default func
