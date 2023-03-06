# Let's Fucking Game

[![Let's Fucking Game Presentation](http://img.youtube.com/vi/vdYPN0rT-SM/0.jpg)](https://youtu.be/vdYPN0rT-SM "Let's Fucking Game Presentation")

## Description

LFG is a decentralized application that aims to revolutionize the way online contests are organized. The platform leverages smart contracts on the blockchain to provide a more secure and trustworthy way for people to participate in social media contests.

- Provides a transparent and secure dapp for hosting contests
- Eliminates the possibility of rigged or fake contests
- Offers classic giveaway contests and gamified contests to increase community engagement and participation
- Ensures fair contests and secure storage of prizes using smart contracts on the blockchain

In addition to a traditional contest with a draw for one or more winners, we thought of a more gamified approach that would determine the winner through a battle between participants. The goal was to create more engagement from the community and propose an innovative approach to organizing contests.

Originally created during the [ChainLink Hackathon Fall 2022](https://devpost.com/software/let-s-fucking-game-be-the-last-to-win-the-prize), we've continued to actively develop the project and have now shipped almost all the features on our roadmap :

- Add ERC20 tokens support
- Add ERC 721 token support for NFT
- Use Chainlink Data Feed to get some data from classical API (like Twitter)
- Interfacing our Giveaway Smart Contract to Twitter API
- Make contracts more generic to easily add more game types
- Adding classic giveaway contests on smart contract part (not on the frontend yet)

We're excited to present the latest version of Let's Fucking Game at the [Fantom Hackathon Q1 2023](https://fantomq12023.devpost.com/).

During this Hackathon, we mainly focus on the smart contract part and do not have the time to update the front end. It will be the next part of our development.

FANTOM Hackathon Q1 2023 version Release accessible [HERE](https://github.com/lets-fucking-game/lets-fucking-game-v2).

[👉 Check our Smart Contract Here](./packages/hardhat/)

[👉 Check our Dapp here](./packages/dapp/)

[👉 Check our Smart Contract Code Coverage 👈](https://htmlpreview.github.io/?https://github.com/lets-fucking-game/lets-fucking-game-v2/blob/dev/packages/hardhat/coverage/index.html)

## Contracts deployed on FANTOM TESTNET

**MAIN :**

- **GameFactory contract [0x5F8757a431A5c2fcA35DF8ac58Cb1FC23229079D](https://testnet.ftmscan.com/address/0x5F8757a431A5c2fcA35DF8ac58Cb1FC23229079D#code)** :
  Enables users to create games and register to play them. Users can create a new game by specifying various parameters, including the maximum number of players, registration amount, and prizes. The contract also includes functions for retrieving lists of deployed games and authorized amounts. The smart contract is modularized with multiple interfaces and abstracts for easier management of different game versions.
- **GameV1 BASE contract [0xEd5Efa65bE3F9670Ae29C9FdB945a7766963fF3C](https://testnet.ftmscan.com/address/0xEd5Efa65bE3F9670Ae29C9FdB945a7766963fF3C#code)** :
  Base contract for game versions. It includes various functions for initializing games, managing players, and distributing prizes. Some of the main methods include initialize, registerForGame, startGame, and playRound. The contract also specifies parameters such as the maximum number of players and prizes, as well as fees for the treasury and game creator.
- **GiveawayV1 BASE contract [0x01B87afE883Dc00C70C92755e2d219C63aaF4313](https://testnet.ftmscan.com/address/0x01b87afe883dc00c70c92755e2d219c63aaf4313#code)** :
  Base contract for giveaways. It includes functions for creating and managing giveaways, retrieving giveaway information, and selecting winners. Some of the main methods include createGiveaway, signUp, fulfillGiveawayWinner, and claimPrize. The contract also specifies parameters such as the minimum and maximum number of participants, the entry fee, and the prizes that will be distributed to winners.
- **CronUpkeep contract [0x1EE9D78849cA6053E3Dd5Af41a0e1e311508aB99](https://testnet.ftmscan.com/address/0x1EE9D78849cA6053E3Dd5Af41a0e1e311508aB99#code)** :
  The CronUpkeep smart contract is a keeper-compatible contract that runs various tasks on cron schedules. Users must use the encodeCronString() function to encode their cron jobs before setting them. It allows the creation, updating, and deletion of cron jobs. Additionally, it can check for an eligible cron job to run and execute it. The contract can be paused or unpaused, and a delegator can be added or removed.

**LIBRARIES :**

- **TokenHelpers contract [0x2EeD5D0e3A4A3Fc999BdE8A9Eb46ad1A5D210556](https://testnet.ftmscan.com/address/0x2EeD5D0e3A4A3Fc999BdE8A9Eb46ad1A5D210556#code)** :
  Library that includes methods for transferring funds, ERC20 and ERC721 tokens between addresses. It also includes methods for getting ERC721 token IDs and ERC20 token balances for a given account.
- **KeeperHelpers contracts [0x9AC49f429fa6AfF63B4B8FDE32a5CC1ABDbA97bF](https://testnet.ftmscan.com/address/0x9AC49f429fa6AfF63B4B8FDE32a5CC1ABDbA97bF#code)** : Library that provide a method to create a new keeper for a given cron job. Keepers are responsible for executing tasks on-chain and are triggered by cron schedules.

**UTILITIES :**

- **CronExternal contract [0xfC952f50c6EcDf621cE99138759c42E58468F34d](https://testnet.ftmscan.com/address/0xfC952f50c6EcDf621cE99138759c42E58468F34d#code)** :
  Utility that offer some functions to manipulate Unix-style cron format.
- **MulticallV3 contracts [0xdAfD0A4BDf6fe4590a9770e904e8d88575C04280](https://testnet.ftmscan.com/address/0xdAfD0A4BDf6fe4590a9770e904e8d88575C04280#code)** :
  Utility smart contract that enables batched read-only calls to multiple functions in one transaction, reducing gas costs and improving efficiency. It allows users to retrieve the results of multiple function calls with a single contract call.

## Inspiration

LFG was inspired by the need for transparency and fairness in online contests. We recognized that many contests on social media platforms were often fake or rigged, leaving participants with no chance of winning. By leveraging the power of decentralization, we wanted to create a platform that could offer a more secure and trustworthy way for people to participate in online contests.

## What it does

LFG provides a transparent and secure dapp for hosting two types of contests: classic giveaway contests and gamified contests.

Classic Giveaway Contests:
Participants can join a classic giveaway contest and know that they have a fair chance of winning. The platform eliminates the possibility of rigged or fake contests, providing a more trustworthy experience for participants. The classic giveaway contests are transparent and secure, making it easier for organizers to host giveaways without worrying about the authenticity of the results.

Gamified Contests:
Provide a fun and interactive experience for participants, increasing community engagement and participation. These contests can be free or paid, depending on the preferences of the creator and the players. In free games, the creator deposits the total prize pool of the game, while in paid games, the prize pool is composed of the players' registration fees. This creates a more competitive environment and can lead to larger prize pools.

## How it works

Classic Giveaway Contests:

- Contest creators first create a tweet and then use LFG to create the contest, entering the contest rules.
- Participants can join the contest as they traditionally do on social media platforms. For example, if the contest is on Twitter and requires participants to retweet a tweet, they should do so.
- The winner(s) are determined automatically by the smart contract, and the prize will be claimable after verification with their Twitter account using the Twitter API.

Gamified games :

- Players interact with the game's smart contract once per day during a randomly selected time slot.
- The last remaining players share the prizes according to the prize pool's distribution.
- When the number of players drops to below 50%, one player can vote to split the pot between the remaining players. If all remaining players agree to split the pot, the pot is fairly distributed between them.
- During the game configuration, the creator have the ability to choose the time slots as well as the winners' structure to allow for more or fewer players to win more or less of the prize pool.

## How we built it

LFG was built using a variety of technologies, including Ethereum smart contracts, Solidity, Web3.js, and React. We also integrated Chainlink's keeper to manage games daily tasks and Chainlink Data Feed to interact with the twitter API. The development process involved several iterations and testing phases to ensure that the platform was secure and user-friendly.

Here are our stack details :

Mono Repo boilerplate crafted from multiple other boilerplates. This help us to bootstrap this project in the best conditions :

- [Hackbg Monorepo Boilerplate](https://github.com/hackbg/chainlink-fullstack/): For the monorepo configuration
- [Emretepedev Boilerplate](https://github.com/emretepedev/solidity-hardhat-typescript-boilerplate) : For the Smart Contract Project configuration
- [PancakeSwap Frontend](https://github.com/pancakeswap/pancake-frontend) : For the front end project configuration and UI kit

This help us to create a well structured project with a good potential of scalability

- Smart contract : Solidity, Hardhat and ChainLink Keeper
  - Generic architecture
  - Can manage easily deployments with Hardhat Deploy
  - Can manage multiple chains with different contracts configurations
  - Automatically generate types for Front End
- Front end : Used Nextjs and Etherjs to develop a cross chain dapp
  - Can easily scale to millions of daily users thanks to PancakeSwap frontend architecture
  - Can easily manage multiple chains
  - "Event driven architecture" to make the interface more reactive
- API : Cloudflare Workers to interact with the Twitter API
  - We store on chain the strict minimum of data to keep all the data on chain
  - Serverless architecture for an easy deployment and scalability

[👉 Check our Smart Contract Code Coverage](https://htmlpreview.github.io/?https://github.com/lets-fucking-game/lets-fucking-game-v2/blob/dev/packages/hardhat/coverage/index.html)

## Challenges we ran into

During the development of LFG, we encountered several challenges that required careful attention and problem-solving skills.

One of the main challenges we faced was ensuring the security of the smart contracts. We had to take several precautions to prevent any vulnerabilities that could be exploited by malicious actors. This required a thorough understanding of smart contract security and the use of best practices in contract development and testing.

Another challenge was integrating external data feeds using Chainlink's oracle system. This required a thorough understanding of how the system worked and careful attention to ensure that the data being used was accurate and reliable.

Finally, we encountered some challenges in the cross-chain administration of the project.

Overall, these challenges highlight the complexity of developing a secure and trustworthy decentralized platform, and the need for careful planning and attention to detail in order to ensure its success.

## Accomplishments that we're proud of

Throughout the development process of LFG, we encountered several challenges that required careful attention and problem-solving skills. Despite these challenges, we are proud to have accomplished several notable achievements:

Firstly, we're proud of creating a platform that provides a more secure and trustworthy way for people to participate in online contests. With LFG's decentralized approach and smart contract technology, participants can be confident that the contests are fair and transparent, and the prizes are stored securely.

We're also proud of integrating a gamified approach to contests, which we believe will increase engagement and participation from the community. By providing a fun and engaging way to participate in contests, we hope to create a more vibrant and active community on the LFG platform.

Finally, we're proud of our team's dedication and hard work in developing LFG from its initial concept to its current state. We believe that LFG has the potential to revolutionize the way online contests are organized and create new opportunities for people to participate in a more secure and fair way.

From a technical perspective, we're proud of the code coverage of our smart contracts. The smart contracts are more than 80% covered in tests, and this is probably our biggest pride. We have also created an interface for the games and a generic system that will allow us to easily evolve the protocol by adding new kind of contests in the future. Finally, the boilerplate we used offers a very quick analysis of our smart contracts with Slither and Mythril, which allowed us to respect the best design pattern and the main security standards.

## What we learned

Working on LFG was a valuable learning experience for our team, especially considering that four of the five team members had never been initiated to web3 before this project. We learned a lot about web3, both in terms of smart contracts, Hardhat, and interfacing with etherJs.

We also gained a better understanding of how to architect a project for cross-chain administration and manipulated the hardhat deploy plugin, which made it easier to manage deployments and tests using fixtures.

## What's next for LFG

Moving forward, we plan to continue to improve and develop the LFG platform, with the ultimate goal of launching it into production and making it available to a wider audience.

To achieve this goal, we plan to conduct a thorough audit of the platform to ensure its security and reliability and make any necessary improvements before launching. We believe that this will help us gain the trust of our users and create a more robust and reliable platform.

If we are fortunate enough to win this hackathon, we plan to use the prize money to organize contests with NFT communities to further develop and promote the LFG platform. We believe that this will not only provide valuable exposure for our platform but also help to foster a more vibrant and active NFT community.

In the future, we plan to work on improving the architecture of the smart contracts, particularly to optimize them and optimize gas costs. Additionally, we would like to use Ethereum Push Notification to improve the user experience and explore the possibility of adding ChainLink VRF to randomize the daily time range generation in a better way.

Overall, our team is committed to developing a platform that provides real value to users and leverages the power of blockchain technology to create a more secure, transparent, and trustworthy online contest experience. We're excited to continue working on this project and exploring new ways to innovate and improve in the future.

Following the recent announcement by Chainlink on March 1st 2023 regarding their new feature called [ChainLink Function](https://blog.chain.link/introducing-chainlink-functions/), we have decided to enhance our smart contract that interact with Twitter API thanks to Chainlink Data Feed. By using Chainlink Function, our goal is to make the contract more generic, enabling us to easily add new social media platform through their API in the future.

## Built with

Primary :

- [TypeScript](https://www.typescriptlang.org)
- [Solidity](https://docs.soliditylang.org/en/v0.8.17/)
- [Next.js](https://nextjs.org)
- [Hardhat](https://hardhat.org)
- [Ethers.js](https://docs.ethers.io/v5/)
- [Chainlink Keeper](https://docs.chain.link/docs/chainlink-automation/introduction/)
- [TypeChain](https://github.com/dethcrypto/TypeChain)

Secondary :

- React Hooks for Data Fetching with [SWR](https://swr.vercel.app/)
- State Management with [Redux](https://react-redux.js.org/)
- Hooking with [Wagmi](https://github.com/wagmi-dev/wagmi)
- Securing with [Mythril](https://github.com/ConsenSys/mythril)
- Analyzing with [Slither](https://github.com/crytic/slither)
- Coverage with [Solidity Coverage](https://github.com/sc-forks/solidity-coverage)
- Linting with [Solhint](https://github.com/protofire/solhint)
- Linting with [ESLint](https://eslint.org)
- Formatting with [Prettier](https://prettier.io)
- Designing with [Emotion](https://emotion.sh/docs/introduction)

Deployment :

- Deploying with [Vercel](https://vercel.com/)
- Containerization with [Docker Compose](https://docs.docker.com/compose/)
- CI / CD with [Github Action](https://github.com/features/actions)

# Quick Start

## Requirements

- [Node](https://nodejs.org/en/download/)
- [Yarn](https://classic.yarnpkg.com/en/docs/install/#mac-stable)
- [Git](https://git-scm.com/downloads)
- [Docker](https://www.docker.com/)

### Clone the repo

```bash
git clone https://github.com/lets-fucking-game/lets-fucking-game
cd lets-fucking-game
```

### Install all dependencies

```bash
yarn install      # install deps
yarn run build    # install solc and other tools in the docker image
```

Don't forget to copy the .env.example file to a file named .env, and then edit it to fill in the details.

### Start up the local Hardhat network and deploy all contracts

```bash
yarn chain
```

### Startup the dapp

In a second terminal start up the local development server run the front-end app:

```bash
yarn dev
```

### Metamask configuration

To interact with the local network, follow this step-by-step guide on how to use [MetaMask with a Hardhat node](https://support.chainstack.com/hc/en-us/articles/4408642503449-Using-MetaMask-with-a-Hardhat-node).

If you've set the mnemonic from MetaMask the first 20 accounts will be funded with ETH.

## Environment Variables

To make setting environment variables easier there are `.env.example` files in the `hardhat` and `dapp` workspaces. You can copy them to new `.env` files and replace the values with your own.

#### Hardhat

| Name                          | Description                                                                                                                                                                                                                        |
| ----------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `NETWORK_RPC_URL`             | One key by RCP network (see env.example). Required to deploy to public networks. Obtain from [Infura's site](https://infura.io).                                                                                                   |
| `DEPLOYER_WALLET_PRIVATE_KEY` | The private key of the account which will send the deployment transaction. The account must have enough ETH to deploy the contracts, as well as LINK which can be obtained from [Chainlink's faucets](https://faucets.chain.link). |
| `ETHERSCAN_API_KEY`           | Your Etherscan API key to verify contract code on Etherscan.                                                                                                                                                                       |

#### Front-end

| Name                     | Description                       |
| ------------------------ | --------------------------------- |
| `NEXT_PUBLIC_INFURA_KEY` | Read-only mode and WalletConnect. |

## Deploy Contracts

This will run the deploy scripts to a local Hardhat network:

```bash
yarn deploy
```

SEE [hardhat package.json](./packages/hardhat/package.json) to see all deployment commands.

## Auto-Funding

The Hardhat project will attempt to auto-fund the keeper deployed contract, which otherwise has to be done manually.

The amount in LINK to send as part of this process can be modified in this [Hardhat Config](https://github.com/lets-fucking-game/lets-fucking-game/blob/main/packages/hardhat/helper-hardhat-config.ts), and are configurable per network.

| Parameter  | Description                                       | Default Value |
| ---------- | :------------------------------------------------ | :------------ |
| fundAmount | Amount of LINK to transfer when funding contracts | 1 LINK        |

## Verify on Blockchain Explorers

You'll need an `Blockchain Explorers API Key` configured in your env file.

All deployment script include verify part.

For more information, SEE the [README](./packages/hardhat/README.md).

## Test

If the test command is executed without a specified network it will run locally and only perform the unit tests:

```bash
yarn test:contracts
```

For coverage report:

```bash
yarn coverage:contracts
```

## Format

Fix formatting according to prettier config in the respective workspace:

```bash
yarn format:dapp
yarn format:hardhat
```

## Lint

```bash
yarn lint:dapp
```

# Miscellaneous

SEE [hardhat package](./packages/hardhat/) to see all smart contracts miscellaneous.
SEE [dapp package](./packages/dapp/) to see all dapp miscellaneous.

## References

- [Chainlink Docs](https://docs.chain.link)
