import { initialiseTestData } from '../../../factories/setup'

describe('GiveawayContract', function () {
  beforeEach(initialiseTestData)
  context('Giveaway contract deployed', function () {
    describe('when the creator tries to initialize a game already initialized', function () {
      it.only('should create a giveaway', async function () {
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

        // const deployedGiveaways = await this.giveaway
        //   .connect(this.owner)
        //   .giveaways()
        // console.log(
        //   '🚀 ~ file: Initialisation.test.ts:24 ~ deployedGiveaways',
        //   deployedGiveaways
        // )
      })
    })
  })
  // context('Giveaway constructor', function () {
  //   describe('when Giveaway gets deployed', function () {
  //     it('should set the correct values to state variables', async function () {
  //       const responseLatestGameV1VersionId =
  //         await this.giveaway.latestVersionId()

  //       const responseGameV1 = await this.giveaway.childs(
  //         responseLatestGameV1VersionId
  //       )
  //       const responseOwner = await this.giveaway.owner()

  //       const responseAuthorizedAmounts =
  //         await this.giveaway.getAuthorizedAmounts()

  //       expect(responseOwner).to.be.equal(this.owner.address)
  //       expect(responseLatestGameV1VersionId).to.be.equal('0')
  //       expect(responseGameV1.deployedAddress).to.be.equal(
  //         this.deployedPayableGame.address
  //       )
  //       expect(responseAuthorizedAmounts.toString()).to.be.equal(
  //         this.authorizedAmounts.toString()
  //       )
  //     })
  //   })
  // })
})
