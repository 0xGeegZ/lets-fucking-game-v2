import { useCallback } from 'react'
import { useTranslation } from '@pancakeswap/localization'
import { useToast } from '@pancakeswap/uikit'
import useCatchTxError from 'hooks/useCatchTxError'
import { ToastDescriptionWithTx } from 'components/Toast'
import { useGameV2Contract } from 'hooks/useContract'
import { useTransactionAdder } from 'state/transactions/hooks'

export const useVoteToSplitPot = (gameAddress: string) => {
  const { t } = useTranslation()
  const { toastSuccess } = useToast()
  const addTransaction = useTransactionAdder()

  const contract = useGameV2Contract(gameAddress)

  const { fetchWithCatchTxError, loading: isPending } = useCatchTxError()

  const handleVote = useCallback(async () => {
    const receipt = await fetchWithCatchTxError(() => contract.voteToSplitPot())

    if (receipt?.status) {
      toastSuccess(
        t('Success!'),
        <ToastDescriptionWithTx txHash={receipt.transactionHash}>
          {t('You have successfully vote to split pot.')}
        </ToastDescriptionWithTx>,
      )
      addTransaction(
        {
          ...receipt,
          hash: receipt.transactionHash,
        },
        {
          summary: `Vote to split pot for game ${gameAddress}`,
          translatableSummary: {
            text: 'Vote to split pot for game %gameAddress%',
            data: { gameAddress },
          },
          type: 'vote-split-pot',
        },
      )
    }
  }, [fetchWithCatchTxError, contract, toastSuccess, t, addTransaction, gameAddress])

  return { isPending, handleVote }
}
