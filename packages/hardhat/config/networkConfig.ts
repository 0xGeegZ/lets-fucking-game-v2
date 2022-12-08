//  * All testnets config : https://docs.chain.link/any-api/testnet-oracles/
//  * Goerli Testnet details:
//  *  - Link Token: 0x326C977E6efc84E512bB9C30f76E30c160eD06FB
//  *  - Oracle: 0xCC79157eb46F5624204f47AB42b3906cAA40eaB7 (Chainlink DevRel)
//  *  - jobId: 7223acbd01654282865b678924126013
//  * Mumbai Testnet details :
//  *  - Link Token: 0x326C977E6efc84E512bB9C30f76E30c160eD06FB
//  *  - Oracle: 0x816BA5612d744B01c36b0517B32b4FcCb9747009
//  *  - jobId: 72bd0768b5c84706a548061c75c35ecc

export const networkConfig: Record<
  string,
  {
    name: string
    linkToken?: string
    fee: string
    fundAmount: string
    oracleToken?: string
    requestJobId?: string
  }
> = {
  '31337': {
    name: 'hardhat',
    fee: '100000000000000000',
    fundAmount: '1000000000000000000',
  },
  '1337': {
    name: 'localhost',
    fee: '100000000000000000',
    fundAmount: '1000000000000000000',
  },
  '56': {
    name: 'bnb',
    linkToken: '0x404460C6A5EdE2D891e8297795264fDe62ADBB75',
    fee: '100000000000000000',
    fundAmount: '1000000000000000000',
  },
  '97': {
    name: 'bnb_testnet',
    linkToken: '0x84b9B910527Ad5C03A9Ca831909E21e236EA7b06',
    fee: '100000000000000000',
    fundAmount: '1000000000000000000',
  },
  '5': {
    name: 'goerli',
    linkToken: '0x63bfb2118771bd0da7a6936667a7bb705a06c1ba',
    fee: '100000000000000000',
    fundAmount: '1000000000000000000',
  },
  '80001': {
    name: 'mumbai',
    linkToken: '0x326C977E6efc84E512bB9C30f76E30c160eD06FB',
    fee: '100000000000000',
    fundAmount: '100000000000000',
  },
}

export const developmentChains = ['hardhat', 'localhost']
