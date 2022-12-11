import { useCallback } from 'react'
import { useTranslation } from '@pancakeswap/localization'
import { useToast } from '@pancakeswap/uikit'
import useCatchTxError from 'hooks/useCatchTxError'
import { ToastDescriptionWithTx } from 'components/Toast'
import { useGameV2Contract } from 'hooks/useContract'
import { BigNumber } from '@ethersproject/bignumber'
import { useTransactionAdder } from 'state/transactions/hooks'

export const useClaimPrize = (gameAddress: string, epoch: BigNumber) => {
  const { t } = useTranslation()
  const { toastSuccess } = useToast()
  const addTransaction = useTransactionAdder()

  const contract = useGameV2Contract(gameAddress)

  const { fetchWithCatchTxError, loading: isPending } = useCatchTxError()

  const handleClaim = useCallback(async () => {
    const receipt = await fetchWithCatchTxError(() => contract.claimPrize(epoch))

    if (receipt?.status) {
      toastSuccess(
        t('Success!'),
        <ToastDescriptionWithTx txHash={receipt.transactionHash}>
          {t('You have successfully claimed your prize.')}
        </ToastDescriptionWithTx>,
      )

      addTransaction(
        {
          ...receipt,
          hash: receipt.transactionHash,
        },
        {
          summary: `Claim prize for game ${gameAddress} and round ${epoch}`,
          translatableSummary: {
            text: 'Claim prize for game %gameAddress% and round %epoch%',
            data: { gameAddress, epoch: epoch.toNumber() },
          },
          type: 'claim-prize',
        },
      )
    }
  }, [fetchWithCatchTxError, contract, epoch, toastSuccess, t, addTransaction, gameAddress])

  return { isPending, handleClaim }
}
