import styled from 'styled-components'
import { Box, Flex, Text, Heading, Image } from '@pancakeswap/uikit'
import { useTranslation } from '@pancakeswap/localization'
import FoldableText from 'components/FoldableSection/FoldableText'

const Divider = styled.div`
  background-color: ${({ theme }) => theme.colors.cardBorder};
  height: 1px;
  margin: 40px 0;
  width: 100%;
`

const BulletList = styled.ul`
  list-style-type: none;
  margin-left: 8px;
  padding: 0;
  li {
    margin: 0;
    padding: 0;
  }
  li::before {
    content: '•';
    margin-right: 4px;
    color: ${({ theme }) => theme.colors.textSubtle};
  }
  li::marker {
    font-size: 12px;
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

const WinningCriteriaDrawing = () => {
  return <Image src="/images/Saly-6.png" alt="drawing of winning criteria" width={212} height={212} />
}

const RulesDrawing = () => {
  return <Image src="/images/Saly-23.png" alt="drawing of prize rules" width={118} height={118} />
}

const AllocationGrid = styled.div`
  display: grid;
  grid-template-columns: 4fr 1fr;
  grid-auto-rows: max-content;
  row-gap: 4px;
`

const AllocationColorCircle = styled.div<{ color: string }>`
  border-radius: 50%;
  width: 20px;
  height: 20px;
  margin-right: 8px;
  background-color: ${({ color }) => color};
`

const AllocationMatch: React.FC<React.PropsWithChildren<{ color: string; text: string }>> = ({ color, text }) => {
  return (
    <Flex alignItems="center">
      <AllocationColorCircle color={color} />
      <Text color="textSubtle">{text}</Text>
    </Flex>
  )
}

const PoolAllocations = () => {
  const { t } = useTranslation()
  return (
    <StyledStepCard width={['280px', '330px', '380px']}>
      <StepCardInner height="auto">
        <Flex mb="8px" justifyContent="center" alignItems="center">
          <RulesDrawing />
        </Flex>
        <Flex justifyContent="space-between">
          <Text fontSize="12px" pb="16px" color="secondary" bold textTransform="uppercase">
            {t('Player bank')}
          </Text>
          <Text fontSize="12px" pb="16px" color="secondary" bold textAlign="right" textTransform="uppercase">
            {t('Prize pool allocation')}
          </Text>
        </Flex>
        <AllocationGrid>
          <AllocationMatch color="#FFE362" text={t('First player')} />
          <Text pb="8px" textAlign="right" bold>
            80%
          </Text>
          <AllocationMatch color="#85C54E" text={t('Second player')} />
          <Text pb="8px" textAlign="right" bold>
            10%
          </Text>
          <AllocationMatch color="#028E75" text={t('Third player')} />
          <Text pb="8px" textAlign="right" bold>
            5%
          </Text>
          <AllocationMatch color="#BDC2C4" text={t('Bank')} />
          <Text pb="8px" textAlign="right" bold>
            10%
          </Text>
        </AllocationGrid>
      </StepCardInner>
    </StyledStepCard>
  )
}

const GappedFlex = styled(Flex)`
  gap: 24px;
`

const Rules: React.FC<React.PropsWithChildren> = () => {
  const { t } = useTranslation()

  return (
    <Box width="100%">
      <Flex mb="40px" alignItems="center" flexDirection="column">
        <Heading mb="24px" scale="xl" color="secondary">
          {t('Rules')}
        </Heading>
        <Text textAlign="center">{t('LFG games rules')}</Text>
        {/* <Text>{t('with really simple rules!')}</Text> */}
      </Flex>
      <Divider />
      <GappedFlex flexDirection={['column', 'column', 'column', 'row']}>
        <Flex flex="2" flexDirection="column">
          <Heading mb="24px" scale="lg" color="secondary">
            {t('Games Rules')}
          </Heading>
          <FoldableText title={t('Classic Giveaway Contest')} mb="24px">
            <Text mb="16px" color="textSubtle">
              {t(
                'Contest creators first create a tweet and then use LFG to create the contest, entering the contest rules.',
              )}
            </Text>
            <Text mb="16px" color="textSubtle">
              {t(
                'Participants can join the contest as they traditionally do on social media platforms. For example, if the contest is on Twitter and requires participants to retweet a tweet, they should do so.',
              )}
            </Text>
            <Text mb="24px" color="textSubtle">
              {t(
                'The winner(s) are determined automatically by the smart contract, and the prize will be claimable after verification with their Twitter account using the Twitter API.',
              )}
            </Text>
          </FoldableText>
          <FoldableText title={t('Daily Action Game')} mb="24px">
            <Text mb="16px" color="textSubtle">
              {t("Players interact with the game's smart contract once per day during a randomly selected time slot.")}
            </Text>
            <Text mb="16px" color="textSubtle">
              {t("The last remaining players share the prizes according to the prize pool's distribution.")}
            </Text>
            <Text mb="16px" color="textSubtle">
              {t(
                'When the number of players drops to below 50%, one player can vote to split the pot between the remaining players. If all remaining players agree to split the pot, the pot is fairly distributed between them.',
              )}
            </Text>
            <Text mb="24px" color="textSubtle">
              {t(
                "During the game configuration, the creator have the ability to choose the time slots as well as the winners' structure to allow for more or fewer players to win more or less of the prize pool.",
              )}
            </Text>
          </FoldableText>
          <FoldableText title={t('Split Prizepool')} mb="24px">
            <Text mb="16px" color="textSubtle">
              {t('Players can also vote to split pot when there are less than 50% of remaining players.')}
            </Text>
            <Text mb="16px" color="textSubtle">
              {t(
                ' This could be useful if the game takes too long. If all players vote to split, the smart contract will stop the game and split prizepool to remaining players.',
              )}
            </Text>
          </FoldableText>
          {/* <Heading mb="24px" scale="md">
            {t('Classic Giveaway Contest')}
          </Heading>
          <Text mb="16px" color="textSubtle">
            {t(
              'Contest creators first create a tweet and then use LFG to create the contest, entering the contest rules.',
            )}
          </Text>
          <Text mb="16px" color="textSubtle">
            {t(
              'Participants can join the contest as they traditionally do on social media platforms. For example, if the contest is on Twitter and requires participants to retweet a tweet, they should do so.',
            )}
          </Text>
          <Text mb="24px" color="textSubtle">
            {t(
              'The winner(s) are determined automatically by the smart contract, and the prize will be claimable after verification with their Twitter account using the Twitter API.',
            )}
          </Text>
          <Heading mb="24px" scale="md">
            {t('Daily Action Game')}
          </Heading>
          <Text mb="16px" color="textSubtle">
            {t("Players interact with the game's smart contract once per day during a randomly selected time slot.")}
          </Text>
          <Text mb="16px" color="textSubtle">
            {t("The last remaining players share the prizes according to the prize pool's distribution.")}
          </Text>
          <Text mb="16px" color="textSubtle">
            {t(
              'When the number of players drops to below 50%, one player can vote to split the pot between the remaining players. If all remaining players agree to split the pot, the pot is fairly distributed between them.',
            )}
          </Text>
          <Text mb="24px" color="textSubtle">
            {t(
              "During the game configuration, the creator have the ability to choose the time slots as well as the winners' structure to allow for more or fewer players to win more or less of the prize pool.",
            )}
          </Text>

          <Heading mb="24px" scale="md">
            {t('Prizepool can be splitted')}
          </Heading>
          <Text mb="16px" color="textSubtle">
            {t('Players can also vote to split pot when there are less than 50% of remaining players.')}
          </Text>
          <Text mb="16px" color="textSubtle">
            {t(
              ' This could be useful if the game takes too long. If all players vote to split, the smart contract will stop the game and split prizepool to remaining players.',
            )}
          </Text> */}

          {/* <Text mt="16px" color="textSubtle" fontStyle="italic">
            {t('More options will be added after the MVP test.')}
          </Text> */}
        </Flex>
        <Flex flex="1" justifyContent="center" alignItems="center">
          <WinningCriteriaDrawing />
        </Flex>
      </GappedFlex>
      <Divider />
      <GappedFlex flexDirection={['column', 'column', 'column', 'row']}>
        <Flex flex="2" flexDirection="column">
          <Heading mb="24px" scale="lg" color="secondary">
            {t('PrizePool')}
          </Heading>
          <Text color="textSubtle" mb="8px">
            {t('Here are the default game prize allocation.')}
          </Text>
          <Text color="textSubtle" mb="24px">
            {t('Game creators can update those parameters so check data for each game before register.')}
          </Text>
          <FoldableText title={t('Classic Giveaway Contest')} mb="24px">
            <Text mb="16px" color="textSubtle">
              {t('The prizepool came from game creator only. He will set the prize pool during game creation.')}
            </Text>
          </FoldableText>
          <FoldableText title={t('Daily Action Game')} mb="24px">
            <Text mb="18px" color="textSubtle">
              {t('The prizes for each game can come from two sources:')}
            </Text>
            <Text fontSize="18px" bold ml="16px">
              {t('Player registration')}
            </Text>
            <BulletList>
              <li>
                <Text display="inline" color="textSubtle">
                  {t(
                    'Registration amount paid by people goes back into the prize pools, minus creator and treasury fees.',
                  )}
                </Text>
              </li>
            </BulletList>

            <Text fontSize="18px" bold ml="16px" mt="16px">
              {t('Creator Prizes')}
            </Text>
            <BulletList>
              <li>
                <Text display="inline" color="textSubtle">
                  {t('Creator can create a game and set the prize pool during game creation.')}
                </Text>
              </li>
            </BulletList>
          </FoldableText>

          {/* <Heading mb="8px" scale="md">
            {t('Classic Giveaway Contest')}
          </Heading>

          <Text mb="24px" color="textSubtle">
            {t('The prizepool came from game creator only. He will set the prize pool during game creation.')}
          </Text>

          <Heading mb="8px" scale="md">
            {t('Daily Action Game')}
          </Heading>
          <Text mb="18px" color="textSubtle">
            {t('The prizes for each game can come from two sources:')}
          </Text>
          <Text fontSize="18px" bold ml="16px">
            {t('Player registration')}
          </Text>
          <BulletList>
            <li>
              <Text display="inline" color="textSubtle">
                {t(
                  'Registration amount paid by people goes back into the prize pools, minus creator and treasury fees.',
                )}
              </Text>
            </li>
          </BulletList>
          <Text fontSize="18px" bold ml="16px" mt="16px">
            {t('Creator Prizes')}
          </Text>
          <BulletList>
            <li>
              <Text display="inline" color="textSubtle">
                {t('Creator can create a game and set the prize pool during game creation.')}
              </Text>
            </li>
          </BulletList> */}
        </Flex>
        <Flex flex="1" justifyContent="center">
          <PoolAllocations />
        </Flex>
      </GappedFlex>
      <Divider />
    </Box>
  )
}

export default Rules
