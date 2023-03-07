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

const StyledStepCard = styled(Box)`
  display: flex;
  align-self: baseline;
  position: relative;
  background: ${({ theme }) => theme.colors.cardBorder};
  padding: 1px 1px 3px 1px;
  border-radius: ${({ theme }) => theme.radii.card};
`

const StepCardInner = styled(Box)`
  width: 100%;
  padding: 24px;
  background: ${({ theme }) => theme.card.background};
  border-radius: ${({ theme }) => theme.radii.card};
`

type Step = { title: string; subtitle: string; label: string }

const StepCard: React.FC<React.PropsWithChildren<{ step: Step }>> = ({ step }) => {
  return (
    <StyledStepCard width="100%">
      <StepCardInner height={['200px', '180px', null, '250px']}>
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
      </StepCardInner>
    </StyledStepCard>
  )
}

const HowToPlay: React.FC<React.PropsWithChildren> = () => {
  const { t } = useTranslation()

  const steps: Step[] = [
    {
      label: t('Step %number%', { number: 1 }),
      title: t('Register for a game'),
      subtitle: t(
        `For the daily action game, choose between available games and register to one of them.</br>
        For the classic contest, just participate on social media platform (creator will have to register the contest on LFG).`,
      ),
    },
    {
      label: t('Step %number%', { number: 2 }),
      title: t('Perform predefined task'),
      subtitle: t(
        `For the daily action game, play once a day during the random time range.</br>
        For the classic contest, perform predefined task asked by creator.`,
      ),
    },
    {
      label: t('Step %number%', { number: 3 }),
      title: t('Game ends'),
      subtitle: t(
        `For the daily action game, try to be one of the last to win the prize.</br>
        For the classic contest, wait until the required number of players has registered, draw will be automatically triggered.`,
      ),
    },
  ]
  return (
    <Box width="100%">
      <Flex mb="40px" alignItems="center" flexDirection="column">
        <Heading mb="24px" scale="xl" color="secondary">
          {t('How to Play')}
        </Heading>
        <Text textAlign="center">{t('Let’s Fucking Game Rules')}</Text>
        <Text>{t('Simple & Fun!')}</Text>
      </Flex>
      <StepContainer>
        {steps.map((step) => (
          <StepCard key={step.label} step={step} />
        ))}
      </StepContainer>
    </Box>
  )
}

export default HowToPlay
