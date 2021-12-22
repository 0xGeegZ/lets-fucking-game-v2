import React, { useCallback, useEffect, useState } from 'react'
import { Box, Heading, Text, Button } from '@chakra-ui/react'
import {
  useContractFunction,
  TransactionState,
  useEthers,
  ChainId,
} from '@usedapp/core'
import { BigNumber, utils } from 'ethers'
import { useContract } from '../hooks/useContract'
import { ContractId } from '../conf/config'
import { APIConsumer } from '../../types/typechain'
import { Layout } from '../components/layout/Layout'
import { Error } from '../components/Error'

/**
 * Helpers
 */
const formatter = new Intl.NumberFormat('en-us', {
  minimumFractionDigits: 4,
  maximumFractionDigits: 4,
})

const formatEther = (wei: BigNumber) =>
  formatter.format(parseFloat(utils.formatEther(wei)))

const getLoadingText = (status: TransactionState) =>
  (status === 'Mining' && 'Mining Request') ||
  (status === 'Success' && 'Fulfilling Request')

/**
 * Component
 */
function ExternalAPI(): JSX.Element {
  const [requestId, setRequestId] = useState('')
  const [volumeData, setVolumeData] = useState<BigNumber | undefined>()

  const { chainId } = useEthers()

  const apiConsumer = useContract<APIConsumer>(ContractId.ApiConsumer)

  const { send, state, events } = useContractFunction(
    apiConsumer,
    'requestVolumeData',
    { transactionName: 'External API Request' }
  )

  const requestVolumeData = async () => {
    await send()
    setVolumeData(null)
  }

  const readVolumeData = useCallback(async () => {
    const volume = await apiConsumer.volume()
    setVolumeData(volume)
  }, [apiConsumer])

  useEffect(() => {
    if (events) {
      const event = events.find((e) => e.name === 'ChainlinkRequested')
      if (event) {
        setRequestId(event.args.id)
      }
    }
  }, [events])

  useEffect(() => {
    if (apiConsumer && requestId) {
      apiConsumer.on('ChainlinkFulfilled', (id: string) => {
        if (requestId === id) {
          readVolumeData()
          apiConsumer.removeAllListeners()
        }
      })
    }
  }, [apiConsumer, requestId, readVolumeData])

  const isLoading =
    state.status === 'Mining' || (state.status === 'Success' && !volumeData)

  const hasError = state.status === 'Exception'

  return (
    <Layout>
      <Heading as="h1" mb="8">
        External API
      </Heading>
      {chainId === ChainId.Rinkeby && (
        <Error message="Oracle on Rinkeby is in maintenance mode. Please switch to Kovan." />
      )}
      <Box maxWidth="container.sm" p="8" mt="8" bg="gray.100">
        {hasError && <Error message={state.errorMessage} />}
        <Heading as="h2" size="md" mb="4">
          Volume data from CryptoCompare API
        </Heading>
        <Button
          onClick={requestVolumeData}
          isLoading={isLoading}
          loadingText={getLoadingText(state.status)}
          colorScheme="teal"
        >
          New Oracle Request
        </Button>
        {volumeData && (
          <Text fontSize="xl" mt="2">
            ETH VOLUME 24H: {formatEther(volumeData)}
          </Text>
        )}
      </Box>
    </Layout>
  )
}

export default ExternalAPI
