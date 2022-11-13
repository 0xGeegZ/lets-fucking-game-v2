import { useTranslation } from '@pancakeswap/localization'
import styled from 'styled-components'
import { Text, Flex, LinkExternal, Skeleton } from '@pancakeswap/uikit'
import ActionButton from 'views/Farms/components/YieldBooster/components/ActionButton'

export interface ExpandableSectionProps {
  bscScanAddress?: string
  infoAddress?: string
}

const Wrapper = styled.div`
  margin-top: 24px;
`

const StyledLinkExternal = styled(LinkExternal)`
  font-weight: 400;
`

const ActionContainer = styled.div`
  margin-bottom: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const DetailsSection: React.FC<React.PropsWithChildren<ExpandableSectionProps>> = ({ bscScanAddress }) => {
  const {
    t,
    currentLanguage: { locale },
  } = useTranslation()

  return (
    <Wrapper>
      {/* {isCommunity && auctionHostingEndDate && (
        <Flex justifyContent="space-between">
          <Text>{t('Auction Hosting Ends')}:</Text>
          <Text>
            {new Date(auctionHostingEndDate).toLocaleString(locale, {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            })}
          </Text>
        </Flex>
      )} */}
      {/* <Flex justifyContent="space-between">
        <Text>{t('Total Liquidity')}:</Text>
        {totalValueFormatted ? <Text>{totalValueFormatted}</Text> : <Skeleton width={75} height={25} />}
      </Flex>
      {!removed && (
        <StyledLinkExternal href={addLiquidityUrl}>{t('Get %symbol%', { symbol: lpLabel })}</StyledLinkExternal>
      )} */}
      <StyledLinkExternal href={bscScanAddress}>{t('View Contract')}</StyledLinkExternal>
      {/* <StyledLinkExternal href={infoAddress}>{t('See Pair Info')}</StyledLinkExternal> */}
      <ActionContainer style={{ paddingTop: 16 }}>
        <ActionButton title={`${t('Game Rules')}`} description={t("More info about Let's Fucking Game")} />
      </ActionContainer>
    </Wrapper>
  )
}

export default DetailsSection
