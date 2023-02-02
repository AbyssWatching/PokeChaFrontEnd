import React, { createContext, useReducer } from 'react'

interface CardAction {
  type: string,
  payload: any
}

interface CardsState {
  cards: any[]
}

const initialState: CardsState = {
  cards: []
}

const CardsContext = createContext<{ state: CardsState, dispatch: React.Dispatch<CardAction> }>({
  state: initialState,
  dispatch: () => null
})

const cardsReducer = (state: CardsState, action: CardAction) => {
  switch (action.type) {
    case 'SET_CARDS': 
      return {
        cards: action.payload
      }
    case 'CREATE_CARDS':
      return {
        cards: [action.payload, ...state.cards]
      }
    case 'DELETE_CARD':
      return {
        cards: state.cards.filter((w) => w._id !== action.payload._id)
      }
    default:
      return state
  }
}

interface Props {
  children: React.ReactNode
}

const CardsContextProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(cardsReducer, initialState)

  return (
    <CardsContext.Provider value={{ state, dispatch }}>
      { children }
    </CardsContext.Provider>
  )
}

export { CardsContext, CardsContextProvider, CardAction }
