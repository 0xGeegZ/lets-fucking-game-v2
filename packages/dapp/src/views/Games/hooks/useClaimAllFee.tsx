import { useCallback } from 'react'
import { useTranslation } from '@pancakeswap/localization'
import { useToast } from '@pancakeswap/uikit'
import useCatchTxError from 'hooks/useCatchTxError'
import { ToastDescriptionWithTx } from 'components/Toast'
import { useGameV2Contract } from 'hooks/useContract'
import { useTransactionAdder } from 'state/transactions/hooks'

export const useClaimAllFee = (gameAddress: string) => {
  const { t } = useTranslation()
  const { toastSuccess } = useToast()
  const addTransaction = useTransactionAdder()

  const contract = useGameV2Contract(gameAddress)

  const { fetchWithCatchTxError, loading: isPending } = useCatchTxError()

  const handleClaimTreasuryFee = useCallback(async () => {
    const receipt = await fetchWithCatchTxError(() => contract.claimTreasuryFee())

    if (receipt?.status) {
      toastSuccess(
        t('Success!'),
        <ToastDescriptionWithTx txHash={receipt.transactionHash}>
          {t('You have successfully claimed treasury fee')}
        </ToastDescriptionWithTx>,
      )
      addTransaction(
        {
          ...receipt,
          hash: receipt.transactionHash,
        },
        {
          summary: `Claim treasury fee for game ${gameAddress}`,
          translatableSummary: {
            text: 'Claim treasury fee for game %gameAddress%',
            data: { gameAddress },
          },
          type: 'claim-treasury-fee',
        },
      )
    }
  }, [fetchWithCatchTxError, contract, toastSuccess, t, addTransaction, gameAddress])

  const handleClaimCreatorFee = useCallback(async () => {
    const receipt = await fetchWithCatchTxError(() => contract.claimCreatorFee())

    if (receipt?.status) {
      toastSuccess(
        t('Success!'),
        <ToastDescriptionWithTx txHash={receipt.transactionHash}>
          {t('You have successfully claimed creator fee')}
        </ToastDescriptionWithTx>,
      )
      addTransaction(
        {
          ...receipt,
          hash: receipt.transactionHash,
        },
        {
          summary: `Claim creator fee for game ${gameAddress}`,
          translatableSummary: {
            text: 'Claim creator fee for game %gameAddress%',
            data: { gameAddress },
          },
          type: 'claim-creator-fee',
        },
      )
    }
  }, [fetchWithCatchTxError, contract, toastSuccess, t, addTransaction, gameAddress])

  const handleClaimAllFee = useCallback(async () => {
    handleClaimTreasuryFee()
    handleClaimCreatorFee()
  }, [handleClaimTreasuryFee, handleClaimCreatorFee])

  return { isPending, handleClaimAllFee }
}
