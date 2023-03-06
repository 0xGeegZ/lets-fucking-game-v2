import { Heading, Flex, Text, ChartIcon, CommunityIcon, SwapIcon } from '@pancakeswap/uikit'
import { useTranslation } from '@pancakeswap/localization'
import useTheme from 'hooks/useTheme'
import IconCard, { IconCardData } from '../IconCard'
import StatCardContent from './StatCardContent'

const Stats = () => {
  const { t } = useTranslation()
  const { theme } = useTheme()

  const UsersCardData: IconCardData = {
    icon: <CommunityIcon color="secondary" width="36px" />,
  }

  const TradesCardData: IconCardData = {
    icon: <SwapIcon color="primary" width="36px" />,
  }

  const StakedCardData: IconCardData = {
    icon: <ChartIcon color="failure" width="36px" />,
  }

  return (
    <Flex justifyContent="center" alignItems="center" flexDirection="column">
      <Heading textAlign="center" scale="xl">
        {t('Fun and innovative games contests')}
      </Heading>
      {/* <Heading textAlign="center" scale="xl" mb="32px">
        {t('classic giveaway contests and gamified contests')}
      </Heading> */}
      {/* <Text textAlign="center" color="textSubtle">
        {t('LFG provides a transparent and secure dapp for hosting two types of contests:')}
      </Text> */}
      <Flex flexWrap="wrap">
        <Text display="inline" textAlign="center" color="textSubtle" mb="20px">
          {t('LFG provides a transparent and secure dapp for hosting two types of contests:')}
        </Text>
      </Flex>

      {/* <Text textAlign="center" color="textSubtle" bold mb="32px">
        {t('Actual MVP games')}
      </Text> */}

      <Flex flexDirection={['column', null, null, 'row']}>
        <IconCard {...UsersCardData} mr={[null, null, null, '16px']} mb={['16px', null, null, '0']}>
          <StatCardContent
            headingText={t('Classic Giveaway')}
            bodyText={t(
              'Join our classic contest by completing a predefined task (such as liking or retweeting a post). Winners are randomly selected from the pool of entrants.',
            )}
            highlightColor={theme.colors.secondary}
          />
        </IconCard>
        <IconCard {...TradesCardData} mr={[null, null, null, '16px']} mb={['16px', null, null, '0']}>
          <StatCardContent
            headingText={t('Daily Action')}
            bodyText={t('Play our one-button game once a day and be one of the last players to share the prize pool.')}
            highlightColor={theme.colors.primary}
          />
        </IconCard>
      </Flex>
    </Flex>
  )
}

export default Stats
