import { ethers, run } from 'hardhat'
import { DeployFunction } from 'hardhat-deploy/types'
import { HardhatRuntimeEnvironment } from 'hardhat/types'

import { networkConfig } from '../config/networkConfig'
import { autoFundCheck } from '../helpers/autoFundCheck'

const func: DeployFunction = async function ({
  deployments,
  getChainId,
}: HardhatRuntimeEnvironment) {
  const { get } = deployments
  const chainId = await getChainId()
  let linkTokenAddress: string

  if (chainId === '31337' || chainId === '1337') {
    const linkToken = await get('LinkToken')
    linkTokenAddress = linkToken.address
  } else {
    linkTokenAddress = networkConfig[chainId].linkToken as string
  }

  const CronUpkeep = await deployments.get('CronUpkeep')
  const cronUpkeep = await ethers.getContractAt(
    'CronUpkeep',
    CronUpkeep.address
  )
  if (await autoFundCheck(cronUpkeep.address, chainId, linkTokenAddress)) {
    await run('fund-link', {
      contract: cronUpkeep.address,
      linkaddress: linkTokenAddress,
    })
  }

  const Giveaway = await deployments.get('GiveawayV1')
  const giveaway = await ethers.getContractAt('GiveawayV1', Giveaway.address)
  if (await autoFundCheck(giveaway.address, chainId, linkTokenAddress)) {
    await run('fund-link', {
      contract: giveaway.address,
      linkaddress: linkTokenAddress,
    })
  }
}

func.tags = ['all', 'test', 'dev', 'fund-link']
func.dependencies = ['keeper']

export default func
