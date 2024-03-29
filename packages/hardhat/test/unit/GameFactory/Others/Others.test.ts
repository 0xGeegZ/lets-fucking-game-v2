/* eslint-disable sonarjs/no-duplicate-string */
import { expectRevert } from '@openzeppelin/test-helpers'
import { expect } from 'chai'
import { ethers } from 'hardhat'

import { initialiseTestData } from '../../../factories/setup'

describe('GameFactoryContract', function () {
  beforeEach(initialiseTestData)
  context('GameFactory transferOwnership', function () {
    describe('when called by non admin', function () {
      it('should revert with correct message', async function () {
        await expectRevert(
          this.gameFactory
            .connect(this.alice)
            .transferAdminOwnership(this.alice.address),
          'Caller is not the admin'
        )
      })
    })

    describe('when called by admin', function () {
      it('should transfer the administration to given address', async function () {
        await this.gameFactory
          .connect(this.owner)
          .transferAdminOwnership(this.alice.address)
        const newAdmin = await this.gameFactory.owner()

        expect(newAdmin).to.be.equal(this.alice.address)
      })
    })
  })

  context('GameFactory withdrawFunds', function () {
    describe('when called by non admin', function () {
      it('should revert with correct message', async function () {
        await expectRevert(
          this.gameFactory.connect(this.alice).withdrawFunds(),
          'Caller is not the admin'
        )
      })
    })
  })

  context('GameFactory setNewVersion', function () {
    describe('when called by non admin', function () {
      it('should revert with correct message', async function () {
        await expectRevert(
          this.gameFactory.connect(this.alice).setNewVersion(this.game.address),
          'Caller is not the admin'
        )
      })
    })

    describe('when called by admin', function () {
      it('should add the new implementation version to games', async function () {
        await this.gameFactory
          .connect(this.owner)
          .setNewVersion(this.secondGameV1.address)
        const responseGameV1s1 = await this.gameFactory.items('0')
        const responseGameV1s2 = await this.gameFactory.items('1')

        expect(responseGameV1s1.id).to.be.equal('0')
        expect(responseGameV1s1.deployedAddress).to.be.equal(
          this.deployedPayableGame.address
        )
        expect(responseGameV1s2.id).to.be.equal('1')
        expect(responseGameV1s2.deployedAddress).to.be.equal(
          this.deployedFreeGame.address
        )
      })
    })
  })

  context('GameFactory addAuthorizedAmounts', function () {
    describe('when admin update authorizedAmounts', function () {
      it('should be updated with correct amounts', async function () {
        const toUpdateAuthorizedAmounts = [ethers.utils.parseEther('999')]

        const responseAuthorizedAmountsBefore = await this.gameFactory
          .connect(this.owner)
          .getAuthorizedAmounts()

        await this.gameFactory
          .connect(this.owner)
          .addAuthorizedAmounts(toUpdateAuthorizedAmounts)

        const responseAuthorizedAmountsAfter = await this.gameFactory
          .connect(this.owner)
          .getAuthorizedAmounts()

        expect(responseAuthorizedAmountsBefore.length + 1).to.be.equal(
          responseAuthorizedAmountsAfter.length
        )
      })

      it('should be updated with no duplicates amounts', async function () {
        const toUpdateAuthorizedAmounts = [
          ...this.authorizedAmounts,
          ethers.utils.parseEther('999'),
          ethers.utils.parseEther('999'),
        ]

        const responseAuthorizedAmountsBefore = await this.gameFactory
          .connect(this.owner)
          .getAuthorizedAmounts()

        await this.gameFactory
          .connect(this.owner)
          .addAuthorizedAmounts(toUpdateAuthorizedAmounts)

        const responseAuthorizedAmountsAfter = await this.gameFactory
          .connect(this.owner)
          .getAuthorizedAmounts()

        expect(responseAuthorizedAmountsBefore.length + 1).to.be.equal(
          responseAuthorizedAmountsAfter.length
        )
      })
    })
    describe('when called by non admin', function () {
      it('should revert with correct message', async function () {
        const toUpdateAuthorizedAmounts = [ethers.utils.parseEther('999')]

        await expectRevert(
          this.gameFactory
            .connect(this.alice)
            .addAuthorizedAmounts(toUpdateAuthorizedAmounts),
          'Caller is not the admin'
        )
      })
    })
  })

  context('GameFactory updateCronUpkeep', function () {
    describe('when called by non admin', function () {
      it('should revert with correct message', async function () {
        await expectRevert(
          this.gameFactory
            .connect(this.alice)
            .updateCronUpkeep(this.owner.address),
          'Caller is not the admin'
        )
      })
    })

    describe('when called by admin', function () {
      it('should update keeper address for the factory and all games and associated keeper job', async function () {
        const newCronUpkeep = this.cronUpkeepSecondary.address
        this.cronUpkeepSecondary.addDelegator(this.gameFactory.address)
        await this.gameFactory.connect(this.owner).pauseAll()
        await expect(
          this.gameFactory.connect(this.owner).updateCronUpkeep(newCronUpkeep)
        )
          .to.emit(this.gameFactory, 'CronUpkeepUpdated')
          .withArgs(newCronUpkeep)
        const updatedFactoryCronUpkeep = await this.gameFactory.cronUpkeep()
        const updatedGameCronUpkeep =
          await this.deployedPayableGame.getCronUpkeep()
        expect(updatedFactoryCronUpkeep).to.be.equal(newCronUpkeep)
        expect(updatedGameCronUpkeep).to.be.equal(newCronUpkeep)
      })

      it('should revert if keeper address is not a contract address', async function () {
        await expectRevert(
          this.gameFactory
            .connect(this.owner)
            .updateCronUpkeep(this.bob.address),
          'Transaction reverted: function call to a non-contract account'
        )
      })
      it('should revert if keeper address is not initialized', async function () {
        await expectRevert(
          this.gameFactory.connect(this.owner).updateCronUpkeep(''),
          'resolver or addr is not configured for ENS name'
        )
      })
    })
  })

  context('GameFactory pauseAll & resumeAll', function () {
    describe('when called by non admin', function () {
      it('should revert with correct message', async function () {
        await expectRevert(
          this.gameFactory.connect(this.bob).pauseAll(),
          'Caller is not the admin'
        )
        await expectRevert(
          this.gameFactory.connect(this.bob).resumeAll(),
          'Caller is not the admin'
        )
      })
    })

    describe('when called by admin', function () {
      it('should pause the factory and all games and associated keeper job', async function () {
        await this.gameFactory.connect(this.owner).pauseAll()

        await expectRevert(
          this.gameFactory
            .connect(this.owner)
            .createNewGame(
              this.name,
              this.maxPlayers,
              this.playTimeRange,
              this.correctRegistrationAmount,
              this.treasuryFee,
              this.creatorFee,
              this.encodedCron,
              this.prizes,
              { value: this.itemCreationAmount }
            ),
          'Pausable: paused'
        )
      })

      it('should resume the factory and all games and associated keeper job', async function () {
        await this.gameFactory.connect(this.owner).pauseAll()
        await this.gameFactory.connect(this.owner).resumeAll()

        const registrationAmount =
          this.authorizedAmounts[this.authorizedAmounts.length - 1]

        const updatedPrizes = this.prizes
        updatedPrizes[0].amount = registrationAmount.mul(this.maxPlayers)

        await this.gameFactory
          .connect(this.owner)
          .createNewGame(
            this.name,
            this.maxPlayers,
            this.playTimeRange,
            registrationAmount,
            this.treasuryFee,
            this.creatorFee,
            this.encodedCron,
            updatedPrizes,
            { value: this.itemCreationAmount }
          )
      })

      it('should revert if call resumeAll before pauseAll', async function () {
        await expectRevert(
          this.gameFactory.connect(this.owner).resumeAll(),
          'Pausable: not paused'
        )
        await this.gameFactory.connect(this.owner).pauseAll()

        await expectRevert(
          this.gameFactory.connect(this.owner).pauseAll(),
          'Pausable: paused'
        )
      })
    })
  })
})
