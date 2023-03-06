import styled from 'styled-components'
import { Box, Flex, Text, Heading } from '@pancakeswap/uikit'
import { useTranslation } from '@pancakeswap/localization'

const GappedFlex = styled(Flex)`
  gap: 24px;
`

const Why: React.FC<React.PropsWithChildren> = () => {
  const { t } = useTranslation()

  return (
    <Box width="100%">
      <Flex mb="24px" alignItems="center" flexDirection="column">
        <Heading mb="24px" scale="xl" color="secondary">
          {t('About Us')}
        </Heading>
        <Text color="textSubtle">
          {t(
            'We are a team of passionate developers who are excited about the potential of blockchain technology and its ability to transform the way we interact with the world. Our mission is to create a more transparent and secure platform for hosting online contests and bring a new way to activate communities.',
          )}
        </Text>
      </Flex>
      <GappedFlex flexDirection={['column', 'column', 'column', 'row']}>
        <Flex flex="2" flexDirection="column">
          <Heading mt="24px" scale="md">
            {t('To Have Fun')}
          </Heading>
          <Text mb="16px" color="textSubtle">
            {t(
              'We created this project because we love to have fun while exploring new technologies. LFG is a project that allows us to experiment with the latest advancements in web3 while providing a fun and engaging experience for our users.',
            )}
          </Text>
          <Heading mt="24px" scale="md">
            {t('To Discover Web3')}
          </Heading>
          <Text mb="16px" color="textSubtle">
            {t(
              "As a team of developers, we are always looking for ways to push the boundaries of what's possible with technology. With LFG, we have the opportunity to learn about new concepts like keepers and EPNS and explore the full potential of the blockchain.",
            )}
          </Text>
          <Heading mt="24px" scale="md">
            {t('To Bring a New Way to Engage Communities')}
          </Heading>
          <Text mb="16px" color="textSubtle">
            {t(
              'We believe that online contests are a great way to engage with your community, but we also recognize that there are a lot of scams and fake contests out there. With LFG, we aim to provide a secure and transparent platform that allows creators to easily activate their community through fun and engaging games.',
            )}
          </Text>
        </Flex>
      </GappedFlex>
    </Box>
  )
}

export default Why
