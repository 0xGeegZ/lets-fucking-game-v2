import { Card, Flex } from '@pancakeswap/uikit'
import ExpandableSectionButton from 'components/ExpandableSectionButton'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { useCallback, useState, useEffect } from 'react'
import styled from 'styled-components'
import { getBlockExploreLink } from 'utils'
import { DeserializedGame } from 'state/types'
import parser from 'cron-parser'
import moment from 'moment'
import BigNumber from 'bignumber.js'
import CardPlayerSection from 'views/Games/components/GameCard/components/CardPlayerSection'
import CardHeadingSection from 'views/Games/components/GameCard/components/CardHeadingSection'
import DetailsSection from 'views/Games/components/GameCard/components/DetailsSection'
import CardContentSection from 'views/Games/components/GameCard/components/CardContentSection'

const StyledCard = styled(Card)`
  align-self: baseline;
  max-width: 100%;
  margin: 0 0 24px 0;
  ${({ theme }) => theme.mediaQueries.sm} {
    max-width: 350px;
    margin: 0 12px 46px;
  }
`

const GameCardInnerContainer = styled(Flex)`
  flex-direction: column;
  justify-content: space-around;
  padding: 24px;
`

const ExpandingWrapper = styled.div`
  padding: 24px;
  border-top: 2px solid ${({ theme }) => theme.colors.cardBorder};
  overflow: hidden;
`

interface GameCardProps {
  game: DeserializedGame
  account?: string
}

const GameCard: React.FC<React.PropsWithChildren<GameCardProps>> = ({ game, account }) => {
  const { chainId } = useActiveWeb3React()

  const [showExpandableSection, setShowExpandableSection] = useState(false)
  const [cronHumanReadable, setCronHumanReadable] = useState('')

  const {
    name,
    versionId,
    epoch,
    id,
    isPaused,
    isInProgress,
    isRegistering,
    isDeleted,
    maxPlayers,
    remainingPlayersCount,
    playerAddressesCount,
    registrationAmount,
    itemCreationAmount,
    address,
    prizepool,
    encodedCron,
    creator,
    treasuryFee,
    treasuryAmount,
    creatorFee,
    creatorAmount,
    prizes,
    lastRoundWinners,
    userData: {
      isCreator,
      isAdmin,
      isPlaying,
      nextFromRange,
      nextToRange,
      isCanVoteSplitPot,
      isInTimeRange,
      isLoosing,
    },
    // TODO GUIGUI USE playerData
    playerData: {
      playerAddress,
      roundRangeLowerLimit,
      roundRangeUpperLimit,
      hasPlayedRound,
      roundCount,
      position,
      hasLost,
      isSplitOk,
    },
  } = game

  const toggleExpandableSection = useCallback(() => {
    setShowExpandableSection((prev) => !prev)
  }, [])

  let timezone = 'Etc/UTC'
  try {
    timezone = Intl.DateTimeFormat().resolvedOptions().timeZone
  } catch (e) {
    // noop
  }

  useEffect(() => {
    if (!encodedCron) return
    try {
      const interval = parser.parseExpression(encodedCron, { tz: 'Etc/UTC' })
      const transform = moment(interval.next().toString()).format('hh:mm A')
      setCronHumanReadable(`${transform}`)
    } catch (e) {
      setCronHumanReadable('')
    }
  }, [encodedCron, timezone])

  const isReady = game.prizepool !== undefined

  const lastGamePrize = lastRoundWinners.find((winner) => {
    return winner.playerAddress === account
    // TODO GUIGUI WHY playerAddress is not defined
    // return winner.playerAddress === playerAddress
  })
  const isWonLastGames = !!lastGamePrize
  const lastGameWonAmount = isWonLastGames ? lastGamePrize.amountWon : new BigNumber('0')
  const lastGameepoch = isWonLastGames ? lastGamePrize.epoch : new BigNumber('0')
  const isPrizeClaimed = isWonLastGames ? lastGamePrize.prizeClaimed : true

  // TODO GUIGUI use RoundProgress to display a progressBar if necessary
  return (
    <StyledCard
      isActive={!isDeleted}
      isFailure={hasLost}
      isWarning={!isRegistering && !isInProgress}
      isSuccess={isPlaying}
    >
      <GameCardInnerContainer>
        <CardHeadingSection
          id={id}
          name={name}
          epoch={epoch}
          versionId={versionId}
          chainId={chainId}
          prizepool={prizepool}
          multiplier={registrationAmount.toNumber() !== 0 ? prizepool.dividedBy(registrationAmount) : null}
          isPaused={isPaused}
          isReady={isReady}
          isFree={registrationAmount.toNumber() === 0}
          isInProgress={isInProgress}
          isRegistering={isRegistering}
          hasLost={hasLost}
        />

        <CardContentSection
          registrationAmount={registrationAmount}
          prizepool={prizepool}
          maxPlayers={maxPlayers}
          remainingPlayersCount={remainingPlayersCount}
          playerAddressesCount={playerAddressesCount}
          cronHumanReadable={cronHumanReadable}
          isReady={isReady}
          prizes={prizes}
          isInProgress={isInProgress}
          isRegistering={isRegistering}
        />

        <CardPlayerSection
          id={id}
          address={address}
          epoch={epoch}
          isInProgress={isInProgress}
          isRegistering={isRegistering}
          nextFromRange={nextFromRange}
          nextToRange={nextToRange}
          encodedCron={encodedCron}
          remainingPlayersCount={remainingPlayersCount}
          playerAddressesCount={playerAddressesCount}
          isPlaying={isPlaying}
          isWonLastGames={isWonLastGames}
          lastGameWonAmount={lastGameWonAmount}
          lastGameepoch={lastGameepoch}
          isPrizeClaimed={isPrizeClaimed}
          isCanVoteSplitPot={isCanVoteSplitPot}
          isInTimeRange={isInTimeRange}
          itemCreationAmount={itemCreationAmount}
          registrationAmount={registrationAmount}
          creatorAmount={creatorAmount}
          treasuryAmount={treasuryAmount}
          roundCount={roundCount}
          isReady={isReady}
          isPaused={isPaused}
          isCreator={isCreator}
          isAdmin={isAdmin}
          hasLost={hasLost}
          isLoosing={isLoosing}
          hasPlayedRound={hasPlayedRound}
          isSplitOk={isSplitOk}
          account={account}
        />
      </GameCardInnerContainer>

      <ExpandingWrapper>
        <ExpandableSectionButton onClick={toggleExpandableSection} expanded={showExpandableSection} />
        {showExpandableSection && (
          <DetailsSection
            isReady={isReady}
            bscScanAddress={getBlockExploreLink(address, 'address', chainId)}
            treasuryFee={treasuryFee}
            creatorFee={creatorFee}
            creator={getBlockExploreLink(creator, 'address', chainId)}
          />
        )}
      </ExpandingWrapper>
    </StyledCard>
  )
}

export default GameCard
