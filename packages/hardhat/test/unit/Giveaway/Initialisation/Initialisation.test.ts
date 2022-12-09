import { expect } from 'chai'

import { initialiseTestData } from '../../../factories/setup'

describe('GiveawayContract', function () {
  beforeEach(initialiseTestData)
  context('Giveaway contract deployed', function () {
    describe('when the creator tries to initialize a game already initialized', function () {
      it('should create a giveaway', async function () {
        const deployedGiveawaysBefore = await this.giveaway
          .connect(this.owner)
          .getGiveaways()

        await this.giveaway
          .connect(this.bob)
          .createGiveaway(
            this.giveawayData.name,
            this.giveawayData.image,
            this.giveawayData.userId,
            this.giveawayData.tweetId,
            this.giveawayData.endTimestamp,
            this.giveawayData.retweetMaxCount,
            this.giveawayData.prizes,
            { value: this.giveawayData.giveawayAmount }
          )

        const deployedGiveaways = await this.giveaway
          .connect(this.owner)
          .getGiveaways()
        expect(deployedGiveaways.length).to.be.equal(
          deployedGiveawaysBefore.length + 1
        )
      })
    })
  })
  context('Giveaway constructor', function () {
    describe('when Giveaway gets deployed', function () {
      it('should set the correct values to state variables', async function () {
        const responseGiveaways = await this.giveaway
          .connect(this.owner)
          .getGiveaways()

        const responseOwner = await this.giveaway.owner()

        expect(responseOwner).to.be.equal(this.owner.address)
        expect(responseGiveaways.length).to.be.equal(1)
      })
    })
  })
})
