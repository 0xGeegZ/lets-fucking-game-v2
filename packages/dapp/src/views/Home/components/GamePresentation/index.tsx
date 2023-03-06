import styled from 'styled-components'
import { Box, Flex, Text, Heading } from '@pancakeswap/uikit'
import { useTranslation } from '@pancakeswap/localization'

const StepContainer = styled(Flex)`
  gap: 24px;
  width: 100%;
  flex-direction: column;
  ${({ theme }) => theme.mediaQueries.md} {
    flex-direction: row;
  }
`

const StyledGameCard = styled(Box)`
  display: flex;
  align-self: baseline;
  position: relative;
  background: ${({ theme }) => theme.colors.cardBorder};
  padding: 1px 1px 3px 1px;
  border-radius: ${({ theme }) => theme.radii.card};
`

const GameCardInner = styled(Box)`
  width: 100%;
  padding: 24px;
  background: ${({ theme }) => theme.card.background};
  border-radius: ${({ theme }) => theme.radii.card};
`

type Step = { title: string; subtitle: string; label: string }

const GameCard: React.FC<React.PropsWithChildren<{ step: Step }>> = ({ step }) => {
  return (
    <StyledGameCard width="100%">
      <GameCardInner height={['200px', '180px', null, '250px']}>
        <Text mb="16px" fontSize="12px" bold textAlign="right" textTransform="uppercase">
          {step.label}
        </Text>
        <Heading mb="16px" scale="lg" color="secondary">
          {step.title}
        </Heading>
        <Text color="textSubtle">
          {/* {step.subtitle} */}
          {/* eslint-disable-next-line react/no-danger */}
          <div dangerouslySetInnerHTML={{ __html: step.subtitle }} />
        </Text>
      </GameCardInner>
    </StyledGameCard>
  )
}

const GamePresentation: React.FC<React.PropsWithChildren> = () => {
  const { t } = useTranslation()

  const steps: Step[] = [
    {
      label: t('Game type #%number%', { number: 1 }),
      title: t('Classic Giveaway Contests'),
      subtitle: t(
        `Join our classic contest by completing a predefined task (such as liking or retweeting a post) on you favorite Social Media. </br>
        Winners will be randomly selected from the pool of participants. </br>
        Prize will be claimable by winner(s) after verification of their Social Media account property.`,
      ),
    },
    {
      label: t('Game type #%number%', { number: 2 }),
      title: t('Daily Action Game'),
      subtitle: t(`Register to the game thanks to LFG dapp. </br>
      Play our one-button game once a day during a random time slot. </br>
      Be one of the last players to share the prize pool.`),
    },
  ]
  return (
    <Box width="100%">
      <Flex mb="40px" alignItems="center" flexDirection="column">
        <Heading mb="24px" scale="xl" color="secondary">
          {t('Fun and innovative games contests')}
        </Heading>
        <Text textAlign="center">
          {t('LFG provides a transparent and secure dapp for hosting two types of Social Media contests:')}
        </Text>
      </Flex>
      <StepContainer>
        {steps.map((step) => (
          <GameCard key={step.label} step={step} />
        ))}
      </StepContainer>
    </Box>
  )
}

export default GamePresentation
