import { CardAction, CardsContext } from '../context/CardsContext';
import { Dispatch, useContext } from 'react';

export const useCardsContext = (): {state: {cards: Array<{_id: string, name: string, imageUrl: string, rarity: string}>}, dispatch: Dispatch<CardAction>} => {
  const context = useContext(CardsContext)

  if (!context) {
    throw Error('useCardsContext must be used inside an CardsContextProvider')
  }

  return context
}
