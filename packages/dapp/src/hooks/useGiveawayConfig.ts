import { useMemo } from 'react'
import { giveawayConfig, defaultGameConfig } from 'config/internal/giveawayConfig'

import { useActiveChainId } from './useActiveChainId'

export const useGiveawayConfig = () => {
  const { chainId } = useActiveChainId()

  if (!giveawayConfig[chainId]) throw new Error(`No giveaway config found for chain id ${chainId}`)

  return useMemo(() => giveawayConfig[chainId], [chainId])
}

export const useDefaultGameConfig = () => {
  return useMemo(() => defaultGameConfig, [])
}

export const useGiveawayConfigFallback = () => {
  const { chainId } = useActiveChainId()

  return useMemo(() => giveawayConfig[chainId] || defaultGameConfig, [chainId])
}
