import { createContext, useEffect, useMemo, useReducer, useState } from 'react'

import { useWeb3React } from '@pancakeswap/wagmi'
import { parseEther } from '@ethersproject/units'
import { formatBytes32String } from '@ethersproject/strings'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { defaultGameConfig } from 'config/internal/gameConfig'
import { useGameConfig } from 'hooks/useGameConfig'
import { useRouter } from 'next/router'

import fetchGames from 'state/games/fetchGames'

import { Actions, BNB, ContextType, NFT, State } from 'views/GameForm/types'

const DEFAULT_PRIZE_TYPE = 'STANDARD'
const initialState: State = {
  isInitialized: false,
  name: defaultGameConfig.NAME_DEFAULT,
  currentStep: 0,
  treasuryFee: defaultGameConfig.TREASURY_FEE_DEFAULT,
  creatorFee: defaultGameConfig.CREATOR_FEE_DEFAULT,
  registrationAmount: defaultGameConfig.REGISTRATION_AMOUNT_DEFAULT.toString(),
  freeGamePrizepoolAmount: '0.5',
  maxPlayers: defaultGameConfig.PLAYERS_DEFAULT,
  playTimeRange: defaultGameConfig.PLAY_TIME_RANGE_DEFAULT,
  encodedCron: defaultGameConfig.ENCODED_CRON_DEFAULT,
  numberPlayersAllowedToWin: 2,
  prizeType: DEFAULT_PRIZE_TYPE,
  successMessage: null,
  errorMessage: null,
}

const reducer = (state: State, action: Actions): State => {
  switch (action.type) {
    case 'previous_step':
      return {
        ...state,
        currentStep: state.currentStep - 1,
      }
    case 'next_step':
      return {
        ...state,
        currentStep: state.currentStep + 1,
      }
    case 'initialize':
      return {
        ...state,
        isInitialized: true,
        currentStep: action.currentStep,
        registrationAmount: action.registrationAmount,
      }
    case 'game_name':
      return {
        ...state,
        isInitialized: true,
        currentStep: action.currentStep,
        name: action.name,
      }
    case 'game_creation':
      return {
        ...state,
        isInitialized: true,
        currentStep: state.currentStep,
        treasuryFee: action.treasuryFee,
        creatorFee: action.creatorFee,
        registrationAmount: action.registrationAmount,
        freeGamePrizepoolAmount: action.freeGamePrizepoolAmount,
        maxPlayers: action.maxPlayers,
        playTimeRange: action.playTimeRange,
        encodedCron: action.encodedCron,
      }
    case 'prize_configuration':
      return {
        ...state,
        numberPlayersAllowedToWin: action.numberPlayersAllowedToWin,
        prizeType: action.prizeType,
        currentStep: state.currentStep,
      }
    case 'game_confirmation_and_contract_creation':
      return {
        ...state,
        currentStep: state.currentStep,
      }

    case 'success_or_error_message':
      return {
        successMessage: action.successMessage,
        errorMessage: action.errorMessage,
        currentStep: state.currentStep,
        ...state,
      }
    default:
      return state
  }
}

export const GameCreationContext = createContext<ContextType>(null)

const GameCreationProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const { account, chainId } = useActiveWeb3React()
  const initialGameConfig = useGameConfig()
  const [gameConfig, setGameConfig] = useState(null)
  const [game, setGame] = useState(null)

  const router = useRouter()
  const { id } = router.query

  // Initial checks
  useEffect(() => {
    const loadGames = async () => {
      // TODO create custom hook
      const games = await fetchGames(chainId)

      const foundGame = games.find((g) => g.id === Number(id))

      const usedAmounts = games
        .map((g) => {
          return Number(g.registrationAmount)
        })
        .filter(Boolean)

      const updatedAuthorizedAmounts = initialGameConfig.AUTHORIZED_REGISTRATION_AMOUNTS.filter((amount) =>
        foundGame
          ? !usedAmounts.includes(amount) || Number(foundGame.registrationAmount) === amount
          : !usedAmounts.includes(amount),
      )

      const updatedRegistrationAmount = parseEther(
        `${(updatedAuthorizedAmounts.length > 1
          ? updatedAuthorizedAmounts[1]
          : updatedAuthorizedAmounts[0]
        ).toString()}`,
      )

      // TODO Load itemCreationAmount directly from smart contract
      const updatingGameConfig = {
        ...initialGameConfig,
        AUTHORIZED_REGISTRATION_AMOUNTS: updatedAuthorizedAmounts,
        REGISTRATION_AMOUNT_DEFAULT: updatedRegistrationAmount,
      }

      setGameConfig(updatingGameConfig)
      if (foundGame) {
        setGame(foundGame)
        dispatch({ type: 'game_name', currentStep: 0, name: foundGame.name })

        dispatch({
          type: 'game_creation',
          currentStep: 0,
          treasuryFee: Number(foundGame.treasuryFee),
          creatorFee: Number(foundGame.creatorFee),
          registrationAmount: Number(foundGame.registrationAmount).toString(),
          freeGamePrizepoolAmount: Number(foundGame.prizepool).toString(),
          maxPlayers: foundGame.maxPlayers,
          playTimeRange: foundGame.playTimeRange,
          encodedCron: foundGame.encodedCron,
        })
        dispatch({
          type: 'prize_configuration',
          currentStep: 0,
          numberPlayersAllowedToWin: foundGame.prizes.length,
          prizeType: initialState.prizeType,
        })
      }

      dispatch({
        type: 'initialize',
        currentStep: 0,
        registrationAmount: (foundGame
          ? parseEther(`${foundGame.registrationAmount}`)
          : updatedRegistrationAmount
        ).toString(),
      })
    }

    if (account && initialGameConfig) loadGames()
  }, [account, chainId, id, initialGameConfig])

  const actions: ContextType['actions'] = useMemo(
    () => ({
      previousStep: (currentStep: number) => dispatch({ type: 'previous_step', currentStep: currentStep - 1 }),
      nextStep: (currentStep: number) => dispatch({ type: 'next_step', currentStep: currentStep + 1 }),
      setInitialize: (currentStep: number, registrationAmount: string) =>
        dispatch({ type: 'initialize', currentStep, registrationAmount }),
      setGameName: (currentStep: number, name: string) => dispatch({ type: 'game_name', currentStep, name }),
      setGameCreation: (
        currentStep: number,
        treasuryFee: number,
        creatorFee: number,
        registrationAmount: string,
        freeGamePrizepoolAmount: string,
        maxPlayers: number,
        playTimeRange: number,
        encodedCron: string,
      ) =>
        dispatch({
          type: 'game_creation',
          currentStep,
          treasuryFee,
          creatorFee,
          registrationAmount,
          freeGamePrizepoolAmount,
          maxPlayers,
          playTimeRange,
          encodedCron,
        }),
      setPrizeConfiguration: (
        numberPlayersAllowedToWin: number,
        prizeType: NFT | BNB | 'STANDARD',
        currentStep: number,
      ) =>
        dispatch({
          type: 'prize_configuration',
          currentStep,
          numberPlayersAllowedToWin,
          prizeType,
        }),
      setGameConfirmationAndContractCreation: (currentStep: number) =>
        dispatch({
          type: 'game_confirmation_and_contract_creation',
          currentStep,
          ...state,
        }),
      setSuccessOrErrorMessage: (successMessage: string | null, errorMessage: string | null, currentStep: number) =>
        dispatch({
          type: 'success_or_error_message',
          currentStep,
          successMessage,
          errorMessage,
        }),
    }),
    [state],
  )

  return (
    <GameCreationContext.Provider value={{ ...state, actions, gameConfig, game }}>
      {children}
    </GameCreationContext.Provider>
  )
}

export default GameCreationProvider
